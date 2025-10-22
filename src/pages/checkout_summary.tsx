// Importing styles
import '@src/assets/styles/global.css';

export default function Page() {
    return (
        <div className="container checkOutSummary">
            <div className="header">
                <h1>Check-Out Summary</h1>
            </div>
            <div className="checkin-summary">
                <div id="sc" className="summary-card">

                </div>
            </div>
            <div className="button-container">
                <button className="confirm-btn">Continue</button>
            </div>
        </div>
    )
}