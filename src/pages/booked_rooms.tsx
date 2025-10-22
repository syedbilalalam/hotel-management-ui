import { Btn } from '@src/assets/components/btn';

// Importing page styling
import '@src/assets/styles/booked_rooms.css';
import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    return (
        <div className="container bookedRooms">
            <div className="header">
                <Btn
                    className="btn exit-btn"
                    to={'/'}
                >Back</Btn>
                <h1>Booked Rooms</h1>
            </div>
            <div id="aros" className="rooms-list">
                <p>No rooms are currently booked.</p>
            </div>
        </div>
    );
}