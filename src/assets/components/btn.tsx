import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Props type
interface BtnProps {
    to: string;
    className?: string;
    type?: 'submit' | 'button';
    onClick?: (e: unknown) => void;
    children?: ReactNode;
}

export function Btn(
    { to, children, onClick, ...props }: BtnProps
) {
    const nav = useNavigate();

    return (
        <button
            {...props}
            onClick={(e) => {
                onClick?.(e);
                nav(to);
            }}
        >{children}</button>
    );
}