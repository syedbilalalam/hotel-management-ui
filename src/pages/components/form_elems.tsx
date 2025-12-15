import {
    useEffect, useState,
    type FormEventHandler, type ReactNode
} from 'react';
import '@src/assets/styles/form_elems.css';


interface FormFieldsHolderProps {
    children: ReactNode;
}

interface InputProps {
    id: string;
    title: string;
    placeholder: string;
    type?: 'text'
        | 'number'
        | 'password'
        | 'email'
        | 'date';
    width?: number;
    value?: string;
    onInput?: FormEventHandler<HTMLInputElement>;
    required?: boolean;
}

interface SelectionProps {
    id: string;
    title: string;
    children: ReactNode;
    width?: number;
    onInput?: FormEventHandler<HTMLSelectElement>;
    required?: boolean;
}

export function Selection({
    id, title,
    required = false,
    onInput,
    children,
    ...props
}: SelectionProps) {

    const [maxWidth, setMaxWidth] = useState('340px');

    useEffect(() => {
        if (props.width) setMaxWidth(`${props.width}px`);
    }, [props.width]);

    return (
        <div className={'selectionHolder'}>
            <label htmlFor={id}>{title}</label>
            <select
                id={id} style={{ maxWidth }}
                onInput={onInput}
                required={required}
            >
                {children}
            </select>
        </div>
    )
}
export function Input({
    id, title,
    placeholder,
    type = 'text',
    required = false,
    onInput,
    ...props
}: InputProps) {

    const [maxWidth, setMaxWidth] = useState('340px');

    useEffect(() => {
        if (props.width) setMaxWidth(`${props.width}px`);
    }, [props.width]);

    return (
        <div className={'inputHolder'}>
            <label htmlFor={id}>{title}</label>
            <input
                id={id} type={type}
                placeholder={placeholder}
                style={{ maxWidth }}
                onInput={onInput}
                value={props.value}
                required={required}
            />
        </div>
    )
}

export function FormFieldsHolder({ children }: FormFieldsHolderProps) {
    return (
        <div className={'requiredFields'}>
            {children}
        </div>
    )
}