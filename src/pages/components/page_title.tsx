import { Btn } from '@src/assets/components/btn';
import '@src/assets/styles/page_title.css';

interface PageTitleProps {
    parentPath: string;
    text: string;
}

export default function PageTitle({parentPath, text}: PageTitleProps) {
    return (
        <div className={'pageTitle'}>
            <Btn to={parentPath} className={'icoBorder btn'}>
                <div className={'ico imageHolder'}>
                    <img src={'/icons/svg/arrow_back.svg'} alt={'back'} />
                </div>
            </Btn>
            <span className={'text'}>{text}</span>
        </div>
    )
}