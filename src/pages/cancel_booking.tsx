import { Btn } from '@src/assets/components/btn';

// Importing page styling
import '@src/assets/styles/cancel_booking.css';
import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    return (
        <div className="container cancelBooking">
            <div className="header">
                <h1>Cancel Booking</h1>
            </div>
            <form id="cancelBookingForm" className="cancel-booking-form">
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Cancel Booking:</label>
                    <input
                        type="number" placeholder="Enter Room Number"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn">Cancel Booking</button>
                    <Btn
                        className="btn exit-btn"
                        to={'/'}
                    >Back</Btn>
                </div>
            </form>
        </div>
    );
}