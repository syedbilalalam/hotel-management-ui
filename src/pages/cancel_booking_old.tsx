import { Btn } from '@src/assets/components/btn';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOTEL_ROOM, ROOM_STATUS, type BookedRoom, type HotelRoom } from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/cancel_booking.css';
import type { RoomDb } from '@src/main';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface CancelBookingProps {
    bookedRooms: RoomDb<BookedRoom>;
    hotelRooms: RoomDb<HotelRoom>;
}

export default function Page({bookedRooms, hotelRooms}: CancelBookingProps) {
    const nav = useNavigate();

    const [roomNo, setRoomNo] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const cancelBooking = () => {
        if (roomNo === null) {
            alert('Please provide room no');
            return;
        }

        // Checking if the room actually present in the hotel or not
        const hotelRoom = hotelRooms.get(roomNo);
        if (!hotelRoom) {
            alert('This room is not present in our hotel');
            return;
        }

        // Checking if the room is even booked so then we proceed to cancelation
        const bookedRoom = bookedRooms.get(roomNo);
        if (!bookedRoom) {
            alert('This room has no active booking to cancel');
            return;
        }

        // Canceling the booking
        bookedRooms.delete(roomNo);
        // Updating the hotel room record
        hotelRoom[HOTEL_ROOM.STATUS] = ROOM_STATUS.AVAILABLE;

        // Sending sucess msg
        alert('Booking sucessfully canceled');
        nav('/');
    }

    return (
        <div className="container cancelBooking">
            <div className="header">
                <h1>Cancel Booking</h1>
            </div>
            <form id="cancelBookingForm" className="cancel-booking-form" ref={formElem}>
                <div className="form-group">
                    <label htmlFor="roomNumber">Enter Room Number to Cancel Booking:</label>
                    <input
                        type="number" placeholder="Enter Room Number"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            const roomNo = parseInt(target.value);
                            if (isNaN(roomNo)) setRoomNo(null);
                            else setRoomNo(roomNo);
                        }}
                        required
                    />
                </div>
                <div className="button-group">
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
                            cancelBooking();
                        }}
                    >Cancel Booking</button>
                    <Btn
                        className="btn exit-btn"
                        to={'/'}
                    >Back</Btn>
                </div>
            </form>
        </div>
    );
}