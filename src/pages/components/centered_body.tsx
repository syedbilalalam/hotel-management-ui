import type { ReactNode } from 'react';
import '@src/assets/styles/centered_body.css';

interface CenteredBodyProps {
    children: ReactNode;
    maxWidth?: number;
}

const DEFAULT_MAX_BODY_WIDTH = 1000;

export default function CenteredBody({
    children,
    maxWidth = DEFAULT_MAX_BODY_WIDTH
}: CenteredBodyProps) {
    
    return (
        <div className={'centeredBody'} style={{maxWidth: `${maxWidth}px`}}>
            {children}
        </div>
    )
}