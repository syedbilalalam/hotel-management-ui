import { useState, useEffect, useRef } from 'react';

import Payment from './payment';
import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import { FormBtnPair, PrimaryBtn, SecBtn } from '@src/pages/components/form_btns';
import { FormFieldsHolder, Input, Selection } from '@src/pages/components/form_elems';
import {
    MARRIAGE_STATUS,
    HOTEL_ROOM,
    ROOM_STATUS,
    ROOM_TYPE,
    ROOM_PRICE,
    type HotelRoom,
    type BookedRoom
} from '@src/assets/components/db';
import type { RoomDb, Wallet } from '@src/main';

// Importing page styling
import '@src/assets/styles/book_room.css';

type MarriageTypeSelection = 'Single' | 'Married';

interface BookRoomProps {
    hotelRooms: RoomDb<HotelRoom>
    bookedRooms: RoomDb<BookedRoom>
    wallet: Wallet;
}

interface PaymentProcess {
    amount: number;
    status: 'PENDING' | 'SUCCESS';
    room: HotelRoom;
}

export interface PaymentState {
    set: (fn: (prev: PaymentProcess | null) => PaymentProcess | null) => void;
}

export default function Page({ hotelRooms, bookedRooms, wallet }: BookRoomProps) {
    const nav = useNavigate();

    const [paymentProcess, setPaymentProcess] = useState<PaymentProcess | null>(null);
    const [roomNumber, setRoomNumber] = useState<number | null>(null);
    const [guestName, setGuestName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [marriageStatus, setMarriageStatus] = useState<MarriageTypeSelection | 'UNSPECIFIED'>('UNSPECIFIED');
    const [days, setDays] = useState<number | null>(null);

    const formElem = useRef<HTMLFormElement>(null);

    const calculateCost = () => {
        if (!days || roomNumber === null) {
            throw new Error('Please enter valid room no. with no of days you want to stay');
        }
        const hotelRoom = hotelRooms.get(roomNumber);
        if (!hotelRoom) {
            throw new Error('Please enter a valid room no.');
        }
        let roomValue = ROOM_PRICE.SINGLE;
        const roomType = hotelRoom[HOTEL_ROOM.TYPE];
        if (roomType === ROOM_TYPE.DOUBLE) roomValue = ROOM_PRICE.DOUBLE;

        const finalCalc = roomValue * days;

        return finalCalc;
    }

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

        // Calculating the cost
        let cost = 0;
        try {
            cost = calculateCost();
        }
        catch {
            alert('Something went wrong!');
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

        setPaymentProcess({
            amount: cost,
            status: 'PENDING',
            room: hotelRoom
        });
    };

    const printCost = () => {
        try {
            const cost = calculateCost();
            alert(`Total Cost: ${cost}$`);
        }
        catch (e) {
            const err = e as Error;
            alert(err.message);
        }
    }

    useEffect(() => {
        if (paymentProcess === null || paymentProcess.status !== 'SUCCESS') return;
        setPaymentProcess(null);
        
        wallet.set(wallet.value + paymentProcess.amount);
        
        // Updating hotel room var
        paymentProcess.room[HOTEL_ROOM.STATUS] = ROOM_STATUS.BOOKED;
        alert('Sucessfully booked');

        nav('/');
    }, [paymentProcess, nav, wallet]);

    return (
        <div className={'bookRoom'}>
            <Navbar />
            {paymentProcess === null ? (

                <CenteredBody maxWidth={660}>
                    <div className={'miniNav'}>
                        <PageTitle parentPath={'/'} text={'Book a Room'} />
                        {/* <div className={'walletInfo'}>
                            <span>Wallet: </span>
                            <span className={'value'}>{wallet.value}</span>
                            <img src={'/icons/svg/monetization_on.svg'} alt={'icon'} />
                        </div> */}
                    </div>
                    <form ref={formElem}>

                        <FormFieldsHolder>

                            <Input
                                id={'roomNo'} title={'Room No'}
                                placeholder={'Enter room no here'}
                                type={'number'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    let numValue: number | null = parseInt(target.value);
                                    if (isNaN(numValue)) numValue = null;
                                    setRoomNumber(numValue);
                                }}
                                required={true}
                            />

                            <Input
                                id={'guestName'} title={'Guest Name'}
                                placeholder={'Enter your name here'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    setGuestName(target.value);
                                }}
                                required={true}
                            />

                            <Input
                                id={'phoneNumber'} title={'Phone Number'}
                                placeholder={'Enter your phone number here'}
                                type={'number'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    setPhone(target.value);
                                }}
                                required={true}
                            />

                            <Input
                                id={'email'} title={'Email'}
                                placeholder={'Enter your email here'}
                                type={'email'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    setEmail(target.value);
                                }}
                                required={true}
                            />

                            <Selection
                                id={'marriageStatus'} title={'Marriage Status'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    setMarriageStatus(target.value as MarriageTypeSelection);
                                }}
                                required={true}
                            >
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </Selection>

                            <Input
                                id={'stayDuration'} title={'Stay Duration [ Day(s) ]'}
                                placeholder={'Enter your stay duration'}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    let numValue: number | null = parseInt(target.value);
                                    if (isNaN(numValue)) numValue = null;
                                    setDays(numValue);
                                }}
                                required={true}
                            />
                        </FormFieldsHolder>
                        <FormBtnPair>
                            <PrimaryBtn
                                onClick={(e) => {
                                    e.preventDefault();
                                    requestBooking();
                                }}
                            >
                                <span>Request Booking</span>
                                <div className={'imageHolder ico'}>
                                    <img src={'/icons/svg/receipt.svg'} alt={'icon'} />
                                </div>
                            </PrimaryBtn>
                            <SecBtn onClick={printCost}>
                                <span>Calculate Cost</span>
                                <div className={'imageHolder ico'}>
                                    <img src={'/icons/svg/monetization_on.svg'} alt={'icon'} />
                                </div>
                            </SecBtn>
                        </FormBtnPair>
                    </form>
                </CenteredBody>

            ) : (

                <Payment amount={paymentProcess.amount} paymentState={{set: setPaymentProcess}} />

            )}

        </div>
    )
}