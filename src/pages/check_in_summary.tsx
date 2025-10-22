import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn } from '@src/assets/components/btn';
import type { RoomDb } from '@src/main';
import { BOOKED_ROOM, CHECKED_IN_ROOM, type BookedRoom, type CheckedInRoom } from '@src/assets/components/db';
// Importing page styling
import '@src/assets/styles/global.css';
import '@src/assets/styles/check_in.css';
import '@src/assets/styles/check_in_summary.css';

export interface CheckInSummaryProps {
    roomNo: number;
}

interface CheckInRootProps {
    props: CheckInSummaryProps | null;
    checkedInRooms: RoomDb<CheckedInRoom>
    bookedRooms: RoomDb<BookedRoom>
}

interface CheckInData {
    name: string;
    duration: number;
    cost: number;
    checkinDate: string;
}

export default function Page({ props, checkedInRooms, bookedRooms }: CheckInRootProps) {
    const nav = useNavigate();

    const [checkinData, setCheckInData] = useState<CheckInData | null>(null);

    useEffect(() => {
        if (props === null) {
            alert('This was unexpected');
            nav('/');
            return;
        }
        const bookedRoom = bookedRooms.get(props.roomNo)!;
        const room = checkedInRooms.get(props.roomNo);
        if (props === null || typeof room === 'undefined') {
            alert('This was unexpected');
            nav('/');
            return;
        }

        setCheckInData({
            name: bookedRoom[BOOKED_ROOM.NAME],
            duration: bookedRoom[BOOKED_ROOM.DURATION],
            cost: room[CHECKED_IN_ROOM.COST],
            checkinDate: room[CHECKED_IN_ROOM.DATE]
        });
    }, []);

    return (
        <div className="container checkin">
            <div className="header">
                <h1>Check-In Summary</h1>
            </div>
            <div className="checkin-summary">
                <div id="sc" className="summary-card">
                    {
                        checkinData !== null && props !== null ? (
                            <>
                                <h2>Guest Name: {checkinData.name}</h2>
                                <p><strong>Room Number:</strong> {props.roomNo}</p>
                                <p><strong>Stay Duration:</strong> {checkinData.duration} day(s)</p>
                                <p><strong>Total Cost:</strong> {checkinData.cost}$</p>
                                <p><strong>Check-In Date:</strong> {checkinData.checkinDate}</p>
                                <p><strong>Status:</strong> Checked In</p>
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
    );
}