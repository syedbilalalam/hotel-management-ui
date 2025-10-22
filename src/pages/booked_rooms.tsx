import { Btn } from '@src/assets/components/btn';
import { bookedRooms, BOOKED_ROOM, type BookedRoom, ROOM_TYPE, hotelRooms, HOTEL_ROOM, ROOM_PRICE } from '@src/assets/components/db';
import { useEffect, useState } from 'react';

// Importing page styling
import '@src/assets/styles/booked_rooms.css';
import '@src/assets/styles/global.css';

type BookedRooms = {
    name: BookedRoom[BOOKED_ROOM.NAME];
    phone: BookedRoom[BOOKED_ROOM.PHONE];
    email: BookedRoom[BOOKED_ROOM.EMAIL];
    roomType: ROOM_TYPE;
    marriageStatus: BookedRoom[BOOKED_ROOM.MARRIAGE_STATUS];
    duration: BookedRoom[BOOKED_ROOM.DURATION];
    roomNumber: number;
}[];

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    const [rooms, setRooms] = useState<BookedRooms>([]);

    useEffect(() => {
        const newRooms: BookedRooms = [];
        for (const [roomNumber, value] of bookedRooms) {

            const roomInfo = hotelRooms.get(roomNumber)!;


            newRooms.push({
                name: value[BOOKED_ROOM.NAME],
                phone: value[BOOKED_ROOM.PHONE],
                email: value[BOOKED_ROOM.EMAIL],
                roomType: roomInfo[HOTEL_ROOM.TYPE],
                marriageStatus: value[BOOKED_ROOM.MARRIAGE_STATUS],
                duration: value[BOOKED_ROOM.DURATION],
                roomNumber
            });
        }
        setRooms(newRooms);
    }, []);

    return (
        <div className="container bookedRooms">
            <div className="header">
                <Btn
                    className="btn exit-btn"
                    to={'/'}
                >Back</Btn>
                <h1>Booked Rooms</h1>
            </div>
            <div id="aros" className="rooms-list">
                {
                    rooms.length ? (rooms.map(data => {

                        const roomType = data.roomType === ROOM_TYPE.SINGLE ? 'Single' : 'Double';
                        const price = ROOM_PRICE[data.roomType === ROOM_TYPE.SINGLE ? 'SINGLE' : 'DOUBLE'] * data.duration;

                        return (
                            <div className="room-card" key={data.roomNumber}>
                                <h2>Room Number: {data.roomNumber}</h2>
                                <p><strong>Room Type:</strong> {roomType}</p>
                                <p><strong>Guest Name:</strong> {data.name}</p>
                                <p><strong>Phone Number:</strong> {data.phone}</p>
                                <p><strong>Email:</strong> {data.email}</p>
                                <p><strong>Days Booked:</strong> {data.duration} day(s)</p>
                                <p><strong>Total Cost:</strong>{price}$</p>
                            </div>
                        );
                    })) : (
                        <p>No rooms are currently booked.</p>
                    )
                }
            </div>
        </div>
    );
}