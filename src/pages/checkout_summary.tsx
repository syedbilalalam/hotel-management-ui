import { Btn } from '@src/assets/components/btn';

// Importing styles
// import '@src/assets/styles/global.css';

export interface CheckoutSummaryProps {
    name: string;
    roomNo: number;
    duration: number;
    cost: number;
    checkinDate: string;
}

export default function Page({ props }: { props: CheckoutSummaryProps | null; }) {
    return (
        <div className="container checkOutSummary">
            <div className="header">
                <h1>Check-Out Summary</h1>
            </div>
            <div className="checkin-summary">
                <div id="sc" className="summary-card">
                    {
                        props !== null ? (
                            <>
                                <h2>Guest Name: {props.name}</h2>
                                <p><strong>Room Number:</strong> {props.roomNo}</p>
                                <p><strong>Stay Duration:</strong> {props.duration} day(s)</p>
                                <p><strong>Total Cost:</strong> {props.cost}$</p>
                                <p><strong>Check-In Date:</strong> {props.checkinDate}</p>
                                <p><strong>Status:</strong> Checked Out</p>
                            </>
                        ) : (

                            <p><strong>Loading....</strong></p>
                        )
                    }

                </div>
            </div>
            <div className="button-container">
                <Btn
                    className="confirm-btn"
                    to={'/'}
                >Continue</Btn>
            </div>
        </div>
    )
}