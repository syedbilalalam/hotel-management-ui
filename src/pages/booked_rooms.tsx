import { useEffect, useState } from 'react';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import {
    BOOKED_ROOM, ROOM_TYPE,
    HOTEL_ROOM, ROOM_PRICE,
    type HotelRoom, type BookedRoom
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/booked_rooms.css';
import type { RoomDb } from '@src/main';

type BookedRooms = {
    name: BookedRoom[BOOKED_ROOM.NAME];
    phone: BookedRoom[BOOKED_ROOM.PHONE];
    email: BookedRoom[BOOKED_ROOM.EMAIL];
    roomType: ROOM_TYPE;
    marriageStatus: BookedRoom[BOOKED_ROOM.MARRIAGE_STATUS];
    duration: BookedRoom[BOOKED_ROOM.DURATION];
    roomNumber: number;
}[];

interface BookedRoomsProps {
    bookedRooms: RoomDb<BookedRoom>;
    hotelRooms: RoomDb<HotelRoom>;
}

interface BookedRoomCardProps {
    roomNo: number;
    roomType: 'Single' | 'Double';
    guestName: string;
    phoneNo: string | number;
    email: string;
    duration: number;
    totalCost: number;
}

function Card(props: BookedRoomCardProps) {
    return (
        <div className={'bookedRoomCard'}>
            <p className={'title'}>Room No: <span>{props.roomNo}</span></p>
            <div className={'infoContainer'}>
                <div className={'left'}>
                    <p className={'info'}>Room Type</p>
                    <p className={'info'}>Guest Name</p>
                    <p className={'info'}>Phone Number</p>
                    <p className={'info'}>Email</p>
                    <p className={'info'}>Day(s) Booked</p>
                    <p className={'info'}>Total Cost</p>
                </div>
                <div className={'right'}>
                    <p className={'info'}>{props.roomType}</p>
                    <p className={'info'}>{props.guestName}</p>
                    <p className={'info'}>{props.phoneNo}</p>
                    <p className={'info'}>{props.email}</p>
                    <p className={'info'}>{props.duration}</p>
                    <p className={'info cost'}>
                        <span>{props.totalCost}</span>
                        <img src={'/icons/svg/monetization_card.svg'} alt={''} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Page(props: BookedRoomsProps) {
    const [rooms, setRooms] = useState<BookedRooms>([]);
    
    useEffect(() => {
        const newRooms: BookedRooms = [];
        for (const [roomNumber, value] of props.bookedRooms) {

            const roomInfo = props.hotelRooms.get(roomNumber)!;


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
    }, [props.hotelRooms, props.bookedRooms]);
    
    return (
        <div className={'bookedRooms'}>
            <Navbar />
            <div className={'titleContainer'}>
                <PageTitle parentPath={'/'} text={'Booked Rooms'} />
            </div>
            <div className={'cardsContainer'}>
                {
                    rooms.length ? (rooms.map(data => {

                        const roomType = data.roomType === ROOM_TYPE.SINGLE ? 'Single' : 'Double';
                        const price = ROOM_PRICE[data.roomType === ROOM_TYPE.SINGLE ? 'SINGLE' : 'DOUBLE'] * data.duration;

                        return (
                            
                            <Card
                                roomNo={data.roomNumber}
                                roomType={roomType}
                                guestName={data.name}
                                phoneNo={data.phone}
                                email={data.email}
                                duration={data.duration}
                                totalCost={price}
                            />
                        );
                    })) : (
                        <p>No rooms are currently booked.</p>
                    )
                }
            </div>
        </div>
    );
}