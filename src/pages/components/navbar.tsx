import { Btn } from '@src/assets/components/btn';
import '@src/assets/styles/navbar.css';

export default function Component() {
    return (
        <>
            <nav>
                <div className={'title'}>
                    <div className={'imageHolder'}>
                        <img src={'/icons/rasterized/app.png'} />
                    </div>
                    <div className={'texts'}>
                        <p>THE CASTLE</p>
                        <p>OF PROGRAMMERS</p>
                    </div>
                </div>

                <div className={'options'}>
                    <Btn to={'/'} className={'logout btn'}>
                        <span>Logout</span>
                        <div className={'ico imageHolder'}>
                            <img src={'/icons/svg/logout.svg'} alt={'icon'} />
                        </div>
                    </Btn>
                    <Btn to={'/'} className={'account btn'}>
                        <div className={'ico imageHolder'}>
                            <img src={'/icons/svg/person.svg'} alt={'icon'} />
                        </div>
                    </Btn>
                </div>
            </nav>
        </>
    )
}