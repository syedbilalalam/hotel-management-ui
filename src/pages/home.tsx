import { Btn } from '@src/assets/components/btn';
import Navbar from '@src/pages/components/navbar';
import '@src/assets/styles/home.css';
// Page styleing
// import '@src/assets/styles/home.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface HomePageProps {
    setLoginState: (val: boolean) => void;
}

function Title() {
    return (
        <div className={'homeTitle'}>
            <p>Welcome to Hotel CMS</p>
            <p>The Castle of Programmers</p>
        </div>
    )
}

interface CardProps {
    text: string;
    iconUrl: string;
    linksTo: string;
}

function Card({text, iconUrl, linksTo}: CardProps) {
    return (
        <Btn to={linksTo} className={'card btn'}>
            <div className={'ico imageHolder'}>
                <img src={iconUrl} alt={'icon'} />
            </div>
            <p>{text}</p>
        </Btn>
    )
}

function CardsHolder() {
    return (
        <div className={'cardsHolder'}>
            <Card
                text={'Display Available Rooms'}
                iconUrl={'/icons/svg/bedroom_parent.svg'}
                linksTo={'/available-rooms'}
            />
            <Card
                text={'Book A Room'}
                iconUrl={'/icons/svg/bookmark_add.svg'}
                linksTo={'/book-room'}
            />
            <Card
                text={'Cancel Booking'}
                iconUrl={'/icons/svg/bookmark_remove.svg'}
                linksTo={'/cancel-booking'}
            />
            <Card
                text={'Booked Rooms'}
                iconUrl={'/icons/svg/book.svg'}
                linksTo={'/booked-rooms'}
            />
            <Card
                text={'Check In'}
                iconUrl={'/icons/svg/receipt_long.svg'}
                linksTo={'/check-in'}
            />
            <Card
                text={'Checkout'}
                iconUrl={'/icons/svg/point_of_sale.svg'}
                linksTo={'/checkout'}
            />
        </div>
    )
}

function OldComponent({setLoginState}: HomePageProps) {
    return (
        <div className="container home">
            <div className="header">
                <h1>The Castle of Programmers</h1>
            </div>
            <div className="button-group">
                <Btn
                    className="btn action-event"
                    to={'/available-rooms'}
                >Display Available Rooms</Btn>
                <Btn
                    className="btn action-event"
                    to='/book-room'
                >Book a Room</Btn>
            </div>
            <div className="button-group">
                <Btn
                    className="btn action-event"
                    to={'/cancel-booking'}
                >Cancel Booking</Btn>
                <Btn
                    className="btn action-event"
                    to={'/booked-rooms'}
                >Booked Rooms</Btn>
            </div>
            <div className="button-group">
                <Btn
                    className="btn action-event"
                    to={'/check-in'}
                >Check-In Room</Btn>
                <Btn
                    className="btn action-event"
                    to={'/check-out'}
                >Check-Out Room</Btn>
            </div>
            <div className="footer">
                <button
                    className="btn exit-btn"
                    onClick={() => {
                        setLoginState(false);
                    }}
                >Logout</button>
            </div>
        </div>
    )
}

export default function Page(homePageProps: HomePageProps) {

    return (
        <>
            <Navbar />
            <Title />
            <CardsHolder />
            { false ? (<OldComponent setLoginState={homePageProps.setLoginState}/>) : (<></>)}
        </>
    );
}
