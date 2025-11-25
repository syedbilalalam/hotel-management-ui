import { Btn } from '@src/assets/components/btn';
import Navbar from '@src/pages/components/navbar';
import CenteredBody from '@src/pages/components/centered_body';
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

export default function Page(homePageProps: HomePageProps) {

    return (
        <>
            <Navbar />
            <CenteredBody maxWidth={850}>
                <Title />
                <CardsHolder />
            </CenteredBody>
        </>
    );
}
