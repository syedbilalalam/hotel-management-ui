import type { RoomDb } from '@src/main';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn } from '@src/assets/components/btn';
import type { CheckoutSummaryProps } from '@src/pages/checkout_summary';
import { BOOKED_ROOM, CHECKED_IN_ROOM, HOTEL_ROOM, ROOM_STATUS, type BookedRoom, type CheckedInRoom, type HotelRoom } from '@src/assets/components/db';

// Importing page styling
// import '@src/assets/styles/check_out.css';
// import '@src/assets/styles/global.css';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface CheckoutProps {
    setSummaryProps: (newVal: CheckoutSummaryProps) => void;
    checkedInRooms: RoomDb<CheckedInRoom>;
    bookedRooms: RoomDb<BookedRoom>;
    hotelRooms: RoomDb<HotelRoom>;
}


export default function Page({ setSummaryProps, checkedInRooms, bookedRooms, hotelRooms }: CheckoutProps) {
    const nav = useNavigate();

    const [roomNo, setRoomNo] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const requestCheckout = () => {
        if (roomNo === null) {
            alert('Enter room no ');
            return;
        }

        const room = checkedInRooms.get(roomNo);
        if (typeof room === 'undefined') {
            alert('This room is not checked in yet');
            return;
        }

        const bookedRoom = bookedRooms.get(roomNo)!;
        setSummaryProps({
            name: bookedRoom[BOOKED_ROOM.NAME],
            roomNo,
            duration: bookedRoom[BOOKED_ROOM.DURATION],
            cost: room[CHECKED_IN_ROOM.COST],
            checkinDate: room[CHECKED_IN_ROOM.DATE]
        });

        const hotelroom = hotelRooms.get(roomNo)!;

        // Clearing this room for new booking
        hotelroom[HOTEL_ROOM.STATUS] = ROOM_STATUS.AVAILABLE;
        // Canceling booking
        bookedRooms.delete(roomNo);
        // Removing from checking status
        checkedInRooms.delete(roomNo);


        // Navigating to the summary
        nav('/check-out/summary');
    }


    return (
        <div className="container checkOut">
            <div className="header">
                <h1>Check Out</h1>
            </div>
            <form id="cancelBookingForm" method="get" className="cancel-booking-form" ref={formElem}>
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Check Out:</label>
                    <input
                        type="number" id="roomNumber" min="1" placeholder="Enter Room Number"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            const roomNumber = parseInt(target.value);
                            if (isNaN(roomNumber)) setRoomNo(null);
                            else setRoomNo(roomNumber);
                        }}
                        required
                    />
                    <br />
                    <label htmlFor="date">Enter check Out date:</label>
                    <input
                        type="date" id="date" placeholder="Check Out date"
                        required
                    />
                </div>
                <div className="btn-group-compressed">
                    <button
                        type="submit" className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            formElem.current = formElem.current!;
                            if (!formElem.current.checkValidity()) {
                                formElem.current.reportValidity();
                                return;
                            }
                            requestCheckout();
                        }}
                    >Check Out</button>
                    <Btn
                        className="btn exit-btn"
                        type={'button'}
                        to={'/'}
                    >Back</Btn>
                </div>
            </form>
        </div>
    );
}