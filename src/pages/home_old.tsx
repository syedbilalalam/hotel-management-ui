import { Btn } from '@src/assets/components/btn';
// Page styleing
// import '@src/assets/styles/home.css';
// import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface HomePageProps {
    setLoginState: (val: boolean) => void;
}

export default function Page({ setLoginState }: HomePageProps) {

    return (
        <>
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
        </>
    );
}
