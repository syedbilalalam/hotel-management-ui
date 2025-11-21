import { useState, useEffect, type ReactNode } from 'react';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import { Btn } from '@src/assets/components/btn';
import CenteredBody from '@src/pages/components/centered_body';
import {
    HOTEL_ROOM,
    ROOM_STATUS, 
    type HotelRoom, 
    type ROOM_TYPE
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/available_rooms.css';
import type { RoomDb } from '@src/main';

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

interface AvailableRoomProps {
    hotelRooms: RoomDb<HotelRoom>;
}

interface RoomTypeValueProps {
    type: 'SINGLE' | 'DOUBLE';
    children: ReactNode;
}

function OldComponent({hotelRooms}: AvailableRoomProps) {
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

function RoomTypeValue(props: RoomTypeValueProps) {
    return (
        <div className={'roomTypeValue'}>
            <div className={'imageHolder ico'}>
                {props.type === 'SINGLE' ? (
                    <img src={'/icons/svg/supervisor_account.svg'} alt={'icon'} />
                ): (
                    <img src={'/icons/svg/person_outline.svg'} alt={'icon'} />
                )}
            </div>
            <span>{props.children}</span>
        </div>
    )
}

export default function Page(availableRoomProps: AvailableRoomProps) {
    return (
        <div className={'availableRooms'}>
            <Navbar />
            <CenteredBody maxWidth={840}>
                <PageTitle parentPath={'/'} text={'Available Rooms'} />
                
                <table className={'tbl'}>
                    <tr>
                        <th className={'roomNo'}>Room No</th>
                        <th>Room Type</th>
                        <th>Status</th>
                    </tr>
                    
                    <tr>
                        <td className={'roomNo'}>Bilal</td>
                        <td className={'right'}>
                            <RoomTypeValue type={'DOUBLE'}>Double</RoomTypeValue>
                        </td>
                        <td className={'right'}>Karachi</td>
                    </tr>

                    <tr>
                        <td className={'roomNo'}>Ayesha</td>
                        <td className={'right'}>
                            <RoomTypeValue type={'SINGLE'}>Single</RoomTypeValue>
                        </td>
                        <td className={'right'}>Lahore</td>
                    </tr>
                    </table>

            </CenteredBody>
            { false ? (<OldComponent hotelRooms={availableRoomProps.hotelRooms}/>) : (<></>)}
        </div>
    )
}