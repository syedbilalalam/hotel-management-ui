import { Btn } from '@src/assets/components/btn';

// Importing page styling
import '@src/assets/styles/check_in.css';
import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    return (
        <div className="container checkIn">
            <div className="header">
                <h1>Check In</h1>
            </div>
            <form id="cancelBookingForm" action="../checkin-summary/index.html" method="get" className="cancel-booking-form">
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Check In:</label>
                    <input type="number" id="roomNumber" name="roomnumber" min="1" placeholder="Enter Room Number" required />
                    <br />
                    <label htmlFor="date">Enter check In date:</label>
                    <input type="date" id="date" name="date" placeholder="Check In date" required />
                </div>
                <div className="btn-group-compressed">
                    <button
                        type="submit"
                        className="btn"
                    >Check In</button>
                    <Btn
                        type='button'
                        className="btn exit-btn"
                        to={'/'}
                    >Back</Btn>
                </div>
            </form>
        </div>
    );
}