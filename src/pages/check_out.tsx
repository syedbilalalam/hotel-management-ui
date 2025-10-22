import { Btn } from '@src/assets/components/btn';

// Importing page styling
import '@src/assets/styles/check_out.css';
import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    return (
        <div className="container checkOut">
            <div className="header">
                <h1>Check Out</h1>
            </div>
            <form id="cancelBookingForm" action="../checkout-summary/index.html" method="get" className="cancel-booking-form">
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Check Out:</label>
                    <input type="number" id="roomNumber" name="roomnumber" min="1" placeholder="Enter Room Number" required />
                    <br />
                    <label htmlFor="date">Enter check Out date:</label>
                    <input type="date" id="date" name="date" placeholder="Check Out date" required />
                </div>
                <div className="btn-group-compressed">
                    <button type="submit" className="btn">Check Out</button>
                    <Btn
                        className="btn exit-btn"
                        to={'/'}
                    >Back</Btn>
                </div>
            </form>
        </div>
    );
}