import { type MouseEvent, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import SpaOutlined from '@mui/icons-material/SpaOutlined';

export function DesktopLogo() {
    return <span className="desktop-brand"><SpaOutlined aria-hidden="true" /><span>Contabily</span></span>;
}
export function DesktopSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`desktop-surface ${className}`}>{children}</div>;
}
export function openContabily(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (document.querySelector('.contabily-dot-transition')) return;
    const destination = event.currentTarget.href;
    const navigate = () => {
        window.history.pushState(null, '', destination);
        flushSync(() => window.dispatchEvent(new PopStateEvent('popstate')));
        requestAnimationFrame(() => {
            const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
            if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
            else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { navigate(); return; }
    const returning = new URL(destination).pathname !== '/contabily';
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const curtain = document.createElement('div');
    curtain.className = "contabily-dot-transition" + (returning ? ' portfolio-dot-transition' : '');
    curtain.setAttribute('aria-hidden', 'true');
    curtain.style.setProperty('--origin-x', `${x}px`);
    curtain.style.setProperty('--origin-y', `${y}px`);
    curtain.innerHTML = renderToStaticMarkup(
        <div className="destination-opening">
            <div className="destination-signature">
                {returning ? <><strong className="opening-ff"><span className="ff-letter">f</span><span className="ff-letter">f</span><span className="ff-dot">.</span></strong><span className="opening-name">FABRISIO FILHO</span></> : <DesktopLogo />}
            </div>
            {!returning && <svg className="opening-financial-trace" viewBox="0 0 800 300" fill="none" focusable="false">
                {[75, 150, 225].map(y => <path key={y} d={`M0 ${y} H800`} stroke="currentColor" strokeOpacity=".1" strokeDasharray="2 10" />)}
                <path className="opening-trace-guide" d="M0 245 L90 245 L130 218 L170 229 L225 187 L270 205 L325 158 L365 174 L425 132 L470 147 L530 102 L575 116 L635 70 L680 83 L735 40 L800 40" stroke="currentColor" strokeOpacity=".1" />
                <path className="opening-trace-line" pathLength="1" d="M0 245 L90 245 L130 218 L170 229 L225 187 L270 205 L325 158 L365 174 L425 132 L470 147 L530 102 L575 116 L635 70 L680 83 L735 40 L800 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle r="3.5" fill="currentColor" className="opening-trace-point">
                    <animateMotion dur="1.5s" begin="0.5s" fill="freeze" calcMode="linear" path="M0 245 L90 245 L130 218 L170 229 L225 187 L270 205 L325 158 L365 174 L425 132 L470 147 L530 102 L575 116 L635 70 L680 83 L735 40 L800 40" />
                </circle>
            </svg>}
        </div>
    );
    document.body.append(curtain);
    const signature = curtain.querySelector<HTMLElement>('.destination-signature');
    if (signature) {
        const bounds = signature.getBoundingClientRect();
        signature.animate([
            { opacity: 0, transform: `translate(${x - bounds.left - bounds.width / 2}px, ${y - bounds.top - bounds.height / 2}px) scale(.15)` },
            { opacity: 1, transform: 'translate(0, 0) scale(1)' },
        ], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
    }
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const animation = curtain.animate([{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });

    const finishOpening = async () => {
        navigate();
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        await new Promise(resolve => window.setTimeout(resolve, returning ? 400 : 850));
        try {
            await curtain.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, fill: 'forwards' }).finished;
        } finally { curtain.remove(); }
    };
    void animation.finished.then(finishOpening, navigate);
    window.addEventListener('pageshow', () => curtain.remove(), { once: true });
}







