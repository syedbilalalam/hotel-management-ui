import { useState, useEffect, type ReactNode } from 'react';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import {
    HOTEL_ROOM,
    ROOM_STATUS, 
    ROOM_TYPE, 
    type HotelRoom} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/available_rooms.css';
import type { RoomDb } from '@src/main';

type RoomsList = {
    number: number;
    type: ROOM_TYPE;
    status: ROOM_STATUS;
}[];

const ROOM_TYPE_NAME = ['Single', 'Double'] as const;

interface AvailableRoomProps {
    hotelRooms: RoomDb<HotelRoom>;
}

interface RoomTypeValueProps {
    type: 'SINGLE' | 'DOUBLE';
    children: ReactNode;
}
interface RoomStatusValueProps {
    type: 'BOOKED' | 'AVAILABLE';
    children: ReactNode;
}

function RoomTypeValue(props: RoomTypeValueProps) {
    return (
        <div className={'roomTypeValue'}>
            <div className={'imageHolder ico'}>
                {props.type === 'SINGLE' ? (
                    <img src={'/icons/svg/person_outline.svg'} alt={'icon'} />
                ): (
                    <img src={'/icons/svg/supervisor_account.svg'} alt={'icon'} />
                )}
            </div>
            <span>{props.children}</span>
        </div>
    )
}

function RoomStatusValue(props: RoomStatusValueProps) {
    return (
        <div className={'roomStatusValue'}>
            <div className={'imageHolder ico'}>
                {props.type === 'BOOKED' ? (
                    <img src={'/icons/svg/book_avr.svg'} alt={'icon'} />
                ): (
                    <img src={'/icons/svg/door_back.svg'} alt={'icon'} />
                )}
            </div>
            <span className={props.type === 'BOOKED' ? 'booked' : 'available'}>{props.children}</span>
        </div>
    )
}

export default function Page({ hotelRooms }: AvailableRoomProps) {

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
    }, [hotelRooms]);

    return (
        <div className={'availableRooms'}>
            <Navbar />
            <CenteredBody maxWidth={840} minWidth={500}>
                <PageTitle parentPath={'/'} text={'Available Rooms'} />
                
                <table className={'tbl'}>
                    <thead>
                        <tr>
                            <th className={'roomNo'}>Room No</th>
                            <th>Room Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomsData.map((data) => {
                            const isBooked = data.status === ROOM_STATUS.BOOKED;
                            return (
                                <tr key={data.number}>
                                    <td className={'roomNo'}>{data.number}</td>
                                    <td className={'right'}>
                                        <RoomTypeValue type={ROOM_TYPE.SINGLE === data.type ? 'SINGLE' : 'DOUBLE'}>
                                            {ROOM_TYPE_NAME[data.type]}
                                        </RoomTypeValue>
                                    </td>
                                    <td className={'right'}>
                                        <RoomStatusValue type={isBooked ? 'BOOKED' : 'AVAILABLE'}>
                                            {isBooked ? 'Booked' : 'Available'}
                                        </RoomStatusValue>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


            </CenteredBody>
        </div>
    )
}