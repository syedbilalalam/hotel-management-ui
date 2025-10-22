import { useState, useEffect } from 'react';
import { Btn } from '@src/assets/components/btn';
import {
    HOTEL_ROOM,
    hotelRooms,
    ROOM_STATUS, 
    type ROOM_TYPE
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/available_rooms.css';
import '@src/assets/styles/global.css';

type RoomsList = {
    number: number;
    type: ROOM_TYPE;
    status: ROOM_STATUS;
}[];

const ROOM_TYPE_NAME = ['Single', 'Double'] as const;

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

export default function Page() {
    const [roomsData, setRoomsData] = useState<RoomsList>([]);

    useEffect(() => {
        const newRoomsData: RoomsList = [];

        for (const [key, value] of hotelRooms)
            newRoomsData.push({
                number: key,
                type: value[HOTEL_ROOM.TYPE],
                status: value[HOTEL_ROOM.STATUS]
            });

        setRoomsData(newRoomsData);
    }, []);

    return (
        <div className="container availableRooms">
            <div className="header">
                <Btn
                    className="btn availableRooms exit-btn"
                    to={'/'}
                >Back</Btn>
                <h1>Room Availability</h1>
            </div>
            <table className="availability-table">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="aros">
                    {/* Data will be fetch through cpp */}
                    {roomsData.map((data) => {
                        const isBooked = data.status === ROOM_STATUS.BOOKED;
                        return (
                            <tr key={data.number}>
                                <td>{data.number}</td>
                                <td>{ROOM_TYPE_NAME[data.type]}</td>
                                <td
                                    className={`status ${isBooked ? 'booked' : 'available'}`}
                                >{isBooked ? 'Booked' : 'Available'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}