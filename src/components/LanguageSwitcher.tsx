import { useTranslation } from '../i18n/I18nProvider';

export function LanguageSwitcher() {
    const { locale, chooseLocale, t } = useTranslation();
    return (
        <div
            className="locale-switcher"
            role="group"
            aria-label={t.localeLabel}
        >
            <button
                lang="pt-BR"
                aria-label="PT — Português (Brasil)"
                aria-pressed={locale === 'pt-BR'}
                onClick={() => chooseLocale('pt-BR')}
            >
                <span
                    aria-hidden="true"
                    className="locale-flag locale-flag-br"
                />{' '}
                PT
            </button>
            <button
                lang="en-US"
                aria-label="EN — English (United States)"
                aria-pressed={locale === 'en-US'}
                onClick={() => chooseLocale('en-US')}
            >
                <span
                    aria-hidden="true"
                    className="locale-flag locale-flag-us"
                />{' '}
                EN
            </button>
        </div>
    );
}
