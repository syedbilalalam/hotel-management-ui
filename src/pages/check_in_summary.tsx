import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import { PrimaryBtn } from '@src/pages/components/form_btns';
import { SummaryCardsContainer, SummaryCard } from '@src/pages/components/summary_card';
import type { RoomDb } from '@src/main';
import {
    BOOKED_ROOM, CHECKED_IN_ROOM,
    type BookedRoom, type CheckedInRoom
} from '@src/assets/components/db';

// Importing styles
import '@src/assets/styles/check_in_summary.css';

export interface CheckInSummaryProps {
    roomNo: number;
}

interface CheckInRoomProps {
    props: CheckInSummaryProps | null;
    checkedInRooms: RoomDb<CheckedInRoom>
    bookedRooms: RoomDb<BookedRoom>
}

interface CheckInData {
    name: string;
    duration: number;
    cost: number;
    date: string;
}

export default function Page({ props, checkedInRooms, bookedRooms }: CheckInRoomProps) {
    const nav = useNavigate();

    const [checkinData, setCheckInData] = useState<CheckInData | null>(null);

    useEffect(() => {
        if (props === null) {
            alert('This was unexpected');
            nav('/', { replace: true });
            return;
        }
        const bookedRoom = bookedRooms.get(props.roomNo)!;
        const room = checkedInRooms.get(props.roomNo);
        if (props === null || typeof room === 'undefined') {
            alert('This was unexpected');
            nav('/', { replace: true });
            return;
        }

        setCheckInData({
            name: bookedRoom[BOOKED_ROOM.NAME],
            duration: bookedRoom[BOOKED_ROOM.DURATION],
            cost: room[CHECKED_IN_ROOM.COST],
            date: room[CHECKED_IN_ROOM.DATE]
        });
    }, []);

    return (
        <div className={'checkInSummary summaryPage'}>
            <Navbar />
            <div className={'titleContainer'}>
                <PageTitle text={'Check-in Summary'} parentPath={'/'} />
            </div>
            {checkinData !== null && props !== null ? (
                <>
                    <SummaryCardsContainer>
                        <SummaryCard
                            roomNo={props.roomNo}
                            guestName={checkinData.name}
                            duration={checkinData.duration}
                            totalCost={checkinData.cost}
                            checkinDate={checkinData.date}
                            status={'Checked in'}
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