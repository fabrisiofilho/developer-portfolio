import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { pt } from './pt';
import { en } from './en';

export type Locale = 'pt-BR' | 'en-US';
export type LocalizedText = Record<Locale, string>;
const storageKey = 'portfolio.locale';

export function detectLocale(preferred: string, saved?: string | null): Locale {
    if (saved === 'pt-BR' || saved === 'en-US') return saved;
    return /^pt(?:-|$)/i.test(preferred) ? 'pt-BR' : 'en-US';
}

function initialLocale() {
    let saved: string | null = null;
    try {
        saved = localStorage.getItem(storageKey);
    } catch {
        /* Storage can be disabled. */
    }
    return detectLocale(navigator.languages?.[0] || navigator.language, saved);
}

const I18n = createContext<{
    locale: Locale;
    t: typeof pt;
    chooseLocale: (locale: Locale) => void;
} | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState(initialLocale);
    const readingPosition = useRef<{
        section: HTMLElement;
        top: number;
    } | null>(null);
    const switching = useRef(false);
    const changedLocale = useRef(false);
    const t = locale === 'pt-BR' ? pt : en;

    useLayoutEffect(() => {
        if (!changedLocale.current) return;
        changedLocale.current = false;

        const position = readingPosition.current;
        readingPosition.current = null;
        if (position) {
            const root = document.documentElement;
            const previous = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';
            window.scrollBy({
                top:
                    position.section.getBoundingClientRect().top - position.top,
                behavior: 'auto',
            });
            root.style.scrollBehavior = previous;
        }
    }, [locale]);

    useEffect(() => {
        const title = `Fabrisio Filho — ${t.headline}`;
        document.documentElement.lang = locale;
        document.title = title;
        for (const [selector, value] of [
            ['meta[name="description"]', t.heroDescription],
            ['meta[property="og:description"]', t.heroDescription],
            ['meta[property="og:title"]', title],
            ['meta[property="og:locale"]', locale.replace('-', '_')],
            [
                'meta[property="og:locale:alternate"]',
                locale === 'pt-BR' ? 'en_US' : 'pt_BR',
            ],
        ])
            document.querySelector(selector)?.setAttribute('content', value);
    }, [locale, t]);

    function chooseLocale(next: Locale) {
        if (next === locale || switching.current) return;
        if (window.scrollY > 0) {
            const section = Array.from(
                document.querySelectorAll<HTMLElement>('main > section'),
            ).find((item) => item.getBoundingClientRect().bottom > 0);
            if (section) {
                readingPosition.current = {
                    section,
                    top: section.getBoundingClientRect().top,
                };
            }
        }
        changedLocale.current = true;
        const view = document as Document & {
            startViewTransition?: (update: () => void) => {
                finished: Promise<void>;
            };
        };
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setLocale(next);
        } else {
            const wave = document.createElement('div');
            wave.className = 'locale-wave';
            wave.setAttribute('aria-hidden', 'true');
            switching.current = true;

            function finish() {
                wave.remove();
                document.documentElement.classList.remove('locale-reveal');
                switching.current = false;
            }

            if (view.startViewTransition) {
                document.documentElement.classList.add('locale-reveal');
                const transition = view.startViewTransition(() => {
                    document.body.append(wave);
                    flushSync(() => setLocale(next));
                });
                void transition.finished.then(finish, finish);
            } else {
                document.body.append(wave);
                setLocale(next);
                wave.addEventListener('animationend', finish, { once: true });
            }
        }
        try {
            localStorage.setItem(storageKey, next);
        } catch {
            /* Keep the in-memory choice. */
        }
    }

    return (
        <I18n.Provider value={{ locale, t, chooseLocale }}>
            {children}
        </I18n.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18n);
    if (!context) throw new Error('I18nProvider is required');
    return context;
}
