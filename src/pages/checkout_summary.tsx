import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import { PrimaryBtn } from '@src/pages/components/form_btns';
import { SummaryCardsContainer, SummaryCard } from '@src/pages/components/summary_card';

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
    const nav = useNavigate();

    useEffect(() => {
        if (props === null)
            nav('/', { replace: true });
    });
    
    return (
        <div className={'checkOutSummary summaryPage'}>
            <Navbar />
            <div className={'titleContainer'}>
                <PageTitle text={'Checkout Summary'} parentPath={'/'} />
            </div>
            {props !== null ? (
                <>
                    <SummaryCardsContainer>
                        <SummaryCard
                            roomNo={props.roomNo}
                            guestName={props.name}
                            duration={props.duration}
                            totalCost={props.cost}
                            checkinDate={props.checkinDate}
                            status={'Checked out'}
                        />

                        <PrimaryBtn
                            onClick={() => {
                                nav('/');
                            }}
                        >Continue</PrimaryBtn>
                    </SummaryCardsContainer>
                </>
            ): (
                <p><strong>Loading....</strong></p>
            )}
        </div>
    );
}