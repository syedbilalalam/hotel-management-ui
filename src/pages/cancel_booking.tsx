import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import { FormBtnPair, PrimaryBtn, SecBtn } from '@src/pages/components/form_btns';
import { FormFieldsHolder, Input } from '@src/pages/components/form_elems';
import {
    HOTEL_ROOM, ROOM_STATUS,
    type BookedRoom, type HotelRoom
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/cancel_booking.css';
import type { RoomDb } from '@src/main';
import { useRef, useState } from 'react';

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

export default function Page({hotelRooms, bookedRooms}: CancelBookingProps) {
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
        <>
            <Navbar />
            <CenteredBody maxWidth={700}>
                <PageTitle parentPath={'/'} text={'Cancel Booking'} />
                <form ref={formElem}>
                    <FormFieldsHolder>
                        <Input
                            id={'roomNo'} title={'Room No'}
                            placeholder={'Enter room no here'}
                            onInput={(e)=> {
                                const rn = parseInt((e.target as HTMLInputElement).value);
                                if (isNaN(rn))
                                    setRoomNo(null);
                                else
                                    setRoomNo(rn)
                            }}
                            type={'number'}
                            required={true}
                        />
                    </FormFieldsHolder>
                    <FormBtnPair>
                        <PrimaryBtn onClick={cancelBooking}>
                            <span>Cancel Booking</span>
                            <div className={'imageHolder ico'}>
                                <img src={'/icons/svg/event_busy.svg'} alt={'icon'} />
                            </div>
                        </PrimaryBtn>
                        <SecBtn onClick={()=> {
                            nav('/');
                        }}>
                            <span>Keep Booking</span>
                            <div className={'imageHolder ico'}>
                                <img src={'/icons/svg/grading.svg'} alt={'icon'} />
                            </div>
                        </SecBtn>
                    </FormBtnPair>
                </form>
            </CenteredBody>
        </>
    )
}