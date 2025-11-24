import type { ReactNode } from 'react';
import '@src/assets/styles/summary_page.css';

interface SummaryCardProps {
    roomNo: number;
    guestName: string;
    duration: number;
    totalCost: number;
    checkinDate: string;
    status: string;
}

interface SummaryCardsContainerProps {
    children: ReactNode;
}

export function SummaryCard(props: SummaryCardProps) {
    return (
        <div className={'summaryCard'}>
            <p className={'title'}>Room No: <span>{props.roomNo}</span></p>
            <div className={'infoContainer'}>
                <div className={'left'}>
                    <p className={'info'}>Guest Name</p>
                    <p className={'info'}>Stay Duration</p>
                    <p className={'info'}>Total Cost</p>
                    <p className={'info'}>Check-in Date</p>
                    <p className={'info'}>Status</p>
                </div>
                <div className={'right'}>
                    <p className={'info'}>{props.guestName}</p>
                    <p className={'info'}>{props.duration} day(s)</p>
                    <p className={'info cost'}>
                        <span>{props.totalCost}</span>
                        <img src={'/icons/svg/monetization_card.svg'} alt={''} />
                    </p>
                    <p className={'info'}>{props.checkinDate}</p>
                    <p className={'info'}>{props.status}</p>
                </div>
            </div>
        </div>
    )
}

export function SummaryCardsContainer({ children }: SummaryCardsContainerProps) {
    return (
        <div className={'summaryCardsContainer'}>
            {children}
        </div>
    )
}