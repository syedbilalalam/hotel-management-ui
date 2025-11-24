import type { RoomDb } from '@src/main';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import type { CheckoutSummaryProps } from '@src/pages/checkout_summary';
import { FormFieldsHolder, Input } from '@src/pages/components/form_elems';
import { FormBtnPair, PrimaryBtn, SecBtn } from '@src/pages/components/form_btns';
import {
    BOOKED_ROOM, CHECKED_IN_ROOM,
    HOTEL_ROOM, ROOM_STATUS,
    type BookedRoom, type CheckedInRoom,
    type HotelRoom
} from '@src/assets/components/db';

// Importing page styling
import '@src/assets/styles/checkout.css';

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


export default function Page(props: CheckoutProps) {
    const nav = useNavigate();

    const [checkinDate, setCheckInDate] = useState('');
    const [roomNo, setRoomNo] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const requestCheckout = () => {
        if (roomNo === null) {
            alert('Enter room no ');
            return;
        }

        const room = props.checkedInRooms.get(roomNo);
        if (typeof room === 'undefined') {
            alert('This room is not checked in yet');
            return;
        }

        const bookedRoom = props.bookedRooms.get(roomNo)!;
        props.setSummaryProps({
            name: bookedRoom[BOOKED_ROOM.NAME],
            roomNo,
            duration: bookedRoom[BOOKED_ROOM.DURATION],
            cost: room[CHECKED_IN_ROOM.COST],
            checkinDate: room[CHECKED_IN_ROOM.DATE]
        });

        const hotelroom = props.hotelRooms.get(roomNo)!;

        // Clearing this room for new booking
        hotelroom[HOTEL_ROOM.STATUS] = ROOM_STATUS.AVAILABLE;
        // Canceling booking
        props.bookedRooms.delete(roomNo);
        // Removing from checking status
        props.checkedInRooms.delete(roomNo);


        // Navigating to the summary
        nav('/check-out/summary');
    }

    return (
        <>
            <Navbar />
            <CenteredBody maxWidth={700}>
                <PageTitle text="Checkout" parentPath={'/'} />
                <form ref={formElem}>
                    <FormFieldsHolder>
                        <Input
                            id={'roomNo'} title={'Room No'}
                            placeholder={'Enter room no here'}
                            type={'number'}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const roomNo = parseInt(target.value);
                                if (isNaN(roomNo)) setRoomNo(null);
                                else setRoomNo(roomNo);
                            }}
                            required={true}
                        />
                        <Input
                            id={'checkoutDate'} title={'Checkout Date'}
                            placeholder={'Select yoru checkin date'}
                            type={'date'}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setCheckInDate(target.value);
                            }}
                            required={true}
                        />
                    </FormFieldsHolder>
                    <FormBtnPair>
                        <PrimaryBtn onClick={requestCheckout}>
                            <span>Checkout</span>
                            <img className={'ico'} src={'/icons/svg/point_of_sale.svg'} alt={''} />
                        </PrimaryBtn>
                        <SecBtn onClick={() => {
                            nav('/');
                        }}>Cancel</SecBtn>
                    </FormBtnPair>
                </form>
            </CenteredBody>
        </>
    );
}