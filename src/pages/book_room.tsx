import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn } from '@src/assets/components/btn';
import {
    hotelRooms,
    bookedRooms,
    MARRIAGE_STATUS,
    HOTEL_ROOM,
    ROOM_STATUS,
    ROOM_TYPE,
    ROOM_PRICE
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/book_room.css';
import '@src/assets/styles/global.css';

type MarriageTypeSelection = 'Single' | 'Married';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    const nav = useNavigate();

    const [roomNumber, setRoomNumber] = useState<number | null>(null);
    const [guestName, setGuestName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [marriageStatus, setMarriageStatus] = useState<
        MarriageTypeSelection | 'UNSPECIFIED'
    >('UNSPECIFIED');
    const [days, setDays] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const requestBooking = () => {
        formElem.current = formElem.current!;

        // Validating fields
        if (!formElem.current.checkValidity()) {
            formElem.current.reportValidity();
            return;
        }

        if (roomNumber === null || days === null || days === 0) return;

        const hotelRoom = hotelRooms.get(roomNumber);

        const targetRoomData = bookedRooms.get(roomNumber);
        if (typeof targetRoomData !== 'undefined') {
            alert('Room already booked!')
            return;
        };

        if (typeof hotelRoom === 'undefined') {
            alert('Room not found in this hotel');
            return;
        }

        // Verifying room type
        if (marriageStatus === 'Married' && hotelRoom[HOTEL_ROOM.TYPE] === ROOM_TYPE.SINGLE) {
            alert("This room capacity is only for single person try other rooms");
            return;
        }

        bookedRooms.set(roomNumber, [
            guestName,
            phone,
            email,
            marriageStatus === 'Single' ? MARRIAGE_STATUS.SINGLE
                : MARRIAGE_STATUS.MARRIED,
            days
        ]);

        // Updating hotel room var
        hotelRoom[HOTEL_ROOM.STATUS] = ROOM_STATUS.BOOKED;

        alert('Sucessfully booked');

        nav('/');
    };

    const calculateCost = () => {
        if (!days || roomNumber === null) {
            alert('Please enter valid room no. with no of days you want to stay');
            return;
        }
        const hotelRoom = hotelRooms.get(roomNumber);
        if (!hotelRoom) {
            alert('Please enter a valid room no.');
            return;
        }
        let roomValue = ROOM_PRICE.SINGLE;
        const roomType = hotelRoom[HOTEL_ROOM.TYPE];
        if (roomType === ROOM_TYPE.DOUBLE) roomValue = ROOM_PRICE.DOUBLE;

        const finalCalc = roomValue * days;

        alert(`Total Cost: ${finalCalc}$`)
    }

    return (
        <div className="container bookRoom">
            <div className="header">
                <h1>Book a Room</h1>
            </div>
            <form id="bookingForm" method="POST" ref={formElem}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="room-number">Room Number:</label>
                        <input
                            id={'room-number'}
                            type="number"
                            min="1" placeholder="Enter Room Number"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                let numValue: number | null = parseInt(target.value);
                                if (isNaN(numValue)) numValue = null;
                                setRoomNumber(numValue);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="guest-name">Guest Name:</label>
                        <input
                            id={'guest-name'}
                            type="text"
                            placeholder="Enter Guest Name"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setGuestName(target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            id={'phone'}
                            type="tel"
                            placeholder="Enter Phone Number"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setPhone(target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Email Address"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setEmail(target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="marriage-status">Marriage Status:</label>
                        <select
                            id="marriage-status"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setMarriageStatus(target.value as MarriageTypeSelection);
                            }}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="days">Days:</label>
                        <input
                            type="number" id="days" min="1"
                            placeholder="Enter Number of Days"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                let numValue: number | null = parseInt(target.value);
                                if (isNaN(numValue)) numValue = null;
                                setDays(numValue);
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button
                        type="button"
                        className="btn bookRoom"
                        onClick={calculateCost}
                    >Calculate Cost</button>
                    <button
                        type={'submit'}
                        className="btn bookRoom"
                        onClick={(e) => {
                            e.preventDefault();
                            requestBooking();
                        }}
                    >Book Room</button>
                    <Btn className="btn bookRoom exit-btn" to='/'>Back</Btn>
                </div>
            </form>
        </div>
    );
}