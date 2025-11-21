import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import '@src/assets/styles/centered_body.css';

interface CenteredBodyProps {
    children: ReactNode;
    maxWidth?: number;
    minWidth?: number;
}

const DEFAULT_MAX_BODY_WIDTH = 1000;

export default function CenteredBody({
    children,
    maxWidth = DEFAULT_MAX_BODY_WIDTH,
    ...props
}: CenteredBodyProps) {

    const [minWidth, setMinWidth] = useState('auto');
    
    useEffect(()=> {
        if (props.minWidth) setMinWidth(`${props.minWidth}px`);
    }, []);
    
    return (
        <div className={'centeredBody'} style={{maxWidth: maxWidth, minWidth}}>
            {children}
        </div>
    )
}