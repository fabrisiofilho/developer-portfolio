import { type PointerEvent, type ReactNode } from 'react';
export function Card({ children, className = '' }: {
    children: ReactNode;
    className?: string;
}) {
    function move(e: PointerEvent<HTMLDivElement>) {
        if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        e.currentTarget.style.setProperty('--x', `${x * 100}%`);
        e.currentTarget.style.setProperty('--y', `${y * 100}%`);
        e.currentTarget.style.setProperty('--rx', `${(0.5 - y) * 5}deg`);
        e.currentTarget.style.setProperty('--ry', `${(x - 0.5) * 5}deg`);
    }
    return <div className={`card ${className}`} onPointerMove={move} onPointerLeave={e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); }}>{children}</div>;
}
