import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import '@src/assets/styles/centered_body.css';

interface CenteredBodyProps {
    children: ReactNode;
    maxWidth?: number;
    minWidth?: number;
    style?: unknown;
}

const DEFAULT_MAX_BODY_WIDTH = 1000;

export default function CenteredBody({
    children,
    maxWidth = DEFAULT_MAX_BODY_WIDTH,
    ...props
}: CenteredBodyProps) {

    const [styles, setStyles] = useState({});
    const [minWidth, setMinWidth] = useState('auto');
    
    useEffect(()=> {
        if (props.minWidth) setMinWidth(`${props.minWidth}px`);
        if (props.style) setStyles(props.style);
    }, [props.minWidth, props.style]);
    
    return (
        <div className={'centeredBody'} style={{maxWidth: maxWidth, minWidth, ...styles}}>
            {children}
        </div>
    )
}