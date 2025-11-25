import { useState, useRef } from 'react';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import { FormFieldsHolder, Input } from '@src/pages/components/form_elems';
import { FormBtnPair, PrimaryBtn, SecBtn } from '@src/pages/components/form_btns';
import type { RoomDb } from '@src/main';
import { useNavigate } from 'react-router-dom';
import type { CheckInSummaryProps } from '@src/pages/check_in_summary';
import { BOOKED_ROOM, ROOM_PRICE, HOTEL_ROOM, ROOM_TYPE, type CheckedInRoom, type BookedRoom, type HotelRoom } from '@src/assets/components/db';
// Importing page styling
import '@src/assets/styles/check_in.css';

interface CheckinProps {
    setSummaryProps: (val: CheckInSummaryProps) => void;
    checkedInRooms: RoomDb<CheckedInRoom>;
    bookedRooms: RoomDb<BookedRoom>;
    hotelRooms: RoomDb<HotelRoom>;
}

export default function Page(props: CheckinProps) {
    const nav = useNavigate();

    const [checkinDate, setCheckInDate] = useState('');
    const [roomNo, setRoomNo] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const startCheckIn = () => {
        if (roomNo === null) {
            alert('Please enter a room number');
            return;
        }
        else if (!checkinDate.length) {
            alert('Please enter date also!');
            return;
        }

        const room = props.checkedInRooms.get(roomNo);
        if (typeof room !== 'undefined') {
            alert('This room is already checked in');
            return;
        }

        const bookedRoom = props.bookedRooms.get(roomNo);
        if (typeof bookedRoom === 'undefined') {
            alert('Room not ready for checkin, Book it first');
            return;
        }

        const hotelRoom = props.hotelRooms.get(roomNo)!;

        const costCalculation = ROOM_PRICE[hotelRoom[HOTEL_ROOM.TYPE] === ROOM_TYPE.SINGLE
            ? 'SINGLE' : 'DOUBLE'
        ] * bookedRoom[BOOKED_ROOM.DURATION];

        props.checkedInRooms.set(roomNo, [
            bookedRoom[BOOKED_ROOM.DURATION],
            costCalculation,
            checkinDate
        ]);

        props.setSummaryProps({ roomNo });
        nav('/check-in/summary');
    }

    return (
        <>
            <Navbar />
            <CenteredBody maxWidth={700}>
                <PageTitle text="Check In" parentPath={'/'} />
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
                            id={'checkInDate'} title={'Check-in Date'}
                            placeholder={'Select your checkin date'}
                            type={'date'}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setCheckInDate(target.value);
                            }}
                            required={true}
                        />
                    </FormFieldsHolder>
                    <FormBtnPair>
                        <PrimaryBtn onClick={startCheckIn}>
                            <span>Check-in</span>
                            <img className={'ico'} src={'/icons/svg/beenhere.svg'} alt={''} />
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