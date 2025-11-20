import { useState, useRef } from 'react';
import type { RoomDb } from '@src/main';
import { useNavigate } from 'react-router-dom';
import { Btn } from '@src/assets/components/btn';
import type { CheckInSummaryProps } from '@src/pages/check_in_summary';
import { BOOKED_ROOM, ROOM_PRICE, HOTEL_ROOM, ROOM_TYPE, type CheckedInRoom, type BookedRoom, type HotelRoom } from '@src/assets/components/db';
// Importing page styling
// import '@src/assets/styles/check_in.css';
// import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface CheckinProps {
    setSummaryProps: (val: CheckInSummaryProps) => void;
    checkedInRooms: RoomDb<CheckedInRoom>;
    bookedRooms: RoomDb<BookedRoom>;
    hotelRooms: RoomDb<HotelRoom>;
}

export default function Page({ setSummaryProps, checkedInRooms, bookedRooms, hotelRooms }: CheckinProps) {
    const nav = useNavigate();

    const [checkinDate, setCheckInDate] = useState('');
    const [roomNo, setRoomNo] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const startCheckIn = () => {
        if (roomNo === null) {
            alert('Please enter a room number');
            return;
        }

        const room = checkedInRooms.get(roomNo);
        if (typeof room !== 'undefined') {
            alert('This room is already checked in');
            return;
        }

        const bookedRoom = bookedRooms.get(roomNo);
        if (typeof bookedRoom === 'undefined') {
            alert('Room not ready for checkin, Book it first');
            return;
        }

        const hotelRoom = hotelRooms.get(roomNo)!;

        const costCalculation = ROOM_PRICE[hotelRoom[HOTEL_ROOM.TYPE] === ROOM_TYPE.SINGLE
            ? 'SINGLE' : 'DOUBLE'
        ] * bookedRoom[BOOKED_ROOM.DURATION];

        checkedInRooms.set(roomNo, [
            bookedRoom[BOOKED_ROOM.DURATION],
            costCalculation,
            checkinDate
        ]);

        setSummaryProps({ roomNo });
        nav('/check-in/summary');
    }

    return (
        <div className="container checkIn">
            <div className="header">
                <h1>Check In</h1>
            </div>
            <form id="cancelBookingForm" method="get" className="cancel-booking-form" ref={formElem}>
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Check In:</label>
                    <input
                        type="number" id="roomNumber" min="1" placeholder="Enter Room Number"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            const roomNo = parseInt(target.value);
                            if (isNaN(roomNo)) setRoomNo(null);
                            else setRoomNo(roomNo);
                        }}
                        required
                    />
                    <br />
                    <label htmlFor="date">Enter check In date:</label>
                    <input
                        type="date" id="date" placeholder="Check In date"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            setCheckInDate(target.value);
                        }}
                        required
                    />
                </div>
                <div className="btn-group-compressed">
                    <button
                        type="submit"
                        className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            formElem.current = formElem.current!;
                            if (!formElem.current.checkValidity()) {
                                formElem.current.reportValidity();
                                return;
                            }
                            startCheckIn();
                        }}
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