import type { ReactNode } from 'react';
import type { Wallet } from '@src/main';
import Navbar from '@src/pages/components/navbar';
import CenteredBody from '@src/pages/components/centered_body';
import { Btn } from '@src/assets/components/btn';

// Importing stylessheet
import '@src/assets/styles/account.css';

interface AccountPageProps {
    userName: string;
    wallet: Wallet;
}

interface OptionContainerProps {
    iconPath: string;
    children: ReactNode;
    iconAlt?: string;
}

interface OptionProps extends OptionContainerProps {
    target?: string;
}

function OptionContainer(props: OptionContainerProps) {

    return (
        <div className={'container'}>
            <img className={'tile ico'} src={props.iconPath} alt={props.iconAlt ? props.iconAlt : ''} />
            <div className={'name'}>
                {props.children}
            </div>
        </div>
    )
}

function Option(props: OptionProps) {
    return (
        <div className={'accountOption'}>
            {props.target !== undefined ? (
                <Btn to={props.target} className={'btn'}>
                    <OptionContainer {...props} />
                </Btn>
            ) : (
                <OptionContainer {...props} />
            )}
        </div>
    )
}

export default function Page({ wallet, userName }: AccountPageProps) {
    return (
        <div className={'accountPage'}>
            <Navbar />

            <CenteredBody maxWidth={700}>
                <div className={'title'}>
                    <div className={'iconContainer imageHolder'}>
                        <img src={'icons/svg/person.svg'} alt={'icon'} />
                    </div>
                    <div className={'textContainer'}>
                        <p className={'welcome'}>Welcome,</p>
                        <p className={'name'}>{userName}</p>
                    </div>
                </div>

                <div className={'options'}>
                    <div className={'rows first'}>
                        <Option
                            iconPath={'/icons/svg/wallet.svg'}
                            iconAlt={'Icon'}
                        >
                            <span>Wallet:</span>
                            <span style={{fontWeight: 'bold'}}>{wallet.value}</span>
                            <img className={'ico'} src={'/icons/svg/monetization_on.svg'} alt={'icon'} />
                        </Option>
                    </div>
                    <div className={'rows second'}>
                        <Option
                            target={'/'} iconPath={'/icons/svg/home.svg'}
                            iconAlt={'Icon'}
                        >
                            Main Menu
                        </Option>
                        <Option
                            target={'/account/add-balance'}
                            iconPath={'/icons/svg/add_box.svg'} iconAlt={'Icon'}
                        >
                            Add Balance
                        </Option>
                    </div>
                </div>
            </CenteredBody>
        </div>
    )
}