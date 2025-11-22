import type { ReactNode, MouseEventHandler } from 'react';
import '@src/assets/styles/form_btns.css';

interface BtnProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

interface FormBtnPair {
    children: ReactNode;
}

export function PrimaryBtn(props: BtnProps) {

    return (
        <div className={'primaryBtn systemBtn btn'} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export function SecBtn(props: BtnProps) {

    return (
        <div className={'secBtn systemBtn btn'} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export function FormBtnPair({ children }: FormBtnPair) {
    return (
        <div className={'formBtnPair'}>
            {children}
        </div>
    )
}