import { useNavigate } from 'react-router-dom';
import Navbar from '@src/pages/components/navbar';
import PageTitle from '@src/pages/components/page_title';
import CenteredBody from '@src/pages/components/centered_body';
import { FormBtnPair, PrimaryBtn, SecBtn } from '@src/pages/components/form_btns';
import {
    useState, useRef, useEffect,
    type FormEventHandler, type ReactNode
} from 'react';
import {
    MARRIAGE_STATUS,
    HOTEL_ROOM,
    ROOM_STATUS,
    ROOM_TYPE,
    ROOM_PRICE,
    type HotelRoom,
    type BookedRoom
} from '@src/assets/components/db';
import type { RoomDb } from '@src/main';

// Importing page styling
import '@src/assets/styles/book_room.css';

type MarriageTypeSelection = 'Single' | 'Married';

export function meta() {
    return [
        { title: "Castel Of Programmers" },
        { name: "description", content: "Hotel Management App" },
    ];
}

interface BookRoomProps {
    hotelRooms: RoomDb<HotelRoom>
    bookedRooms: RoomDb<BookedRoom>
}

interface InputProps {
    id: string;
    title: string;
    placeholder: string;
    type?: 'text' | 'number' | 'password' | 'email';
    width?: number;
    onInput?: FormEventHandler<HTMLInputElement>;
    required?: boolean;
}
interface SelectionProps {
    id: string;
    title: string;
    children: ReactNode;
    width?: number;
    onInput?: FormEventHandler<HTMLSelectElement>;
    required?: boolean;
}

function Selection({
    id, title,
    required = false,
    onInput,
    children,
    ...props
}: SelectionProps) {

    const [maxWidth, setMaxWidth] = useState('340px');

    useEffect(() => {
        if (props.width) setMaxWidth(`${props.width}px`);
    });

    return (
        <div className={'selectionHolder'}>
            <label htmlFor={id}>{title}</label>
            <select
                id={id} style={{ maxWidth }}
                onInput={onInput}
                required={required}
            >
                {children}
            </select>
        </div>
    )
}
function Input({
    id, title,
    placeholder,
    type = 'text',
    required = false,
    onInput,
    ...props
}: InputProps) {

    const [maxWidth, setMaxWidth] = useState('340px');

    useEffect(() => {
        if (props.width) setMaxWidth(`${props.width}px`);
    });

    return (
        <div className={'inputHolder'}>
            <label htmlFor={id}>{title}</label>
            <input
                id={id} type={type}
                placeholder={placeholder}
                style={{ maxWidth }}
                onInput={onInput}
                required={required}
            />
        </div>
    )
}

export default function Page({ hotelRooms, bookedRooms }: BookRoomProps) {
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
        <div className={'bookRoom'}>
            <Navbar />
            <CenteredBody maxWidth={600}>
                <PageTitle parentPath={'/'} text={'Book a Room'} />
                <form ref={formElem}>

                    <div className={'requiredFields'}>

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
                    </div>
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
                        <SecBtn onClick={calculateCost}>
                            <span>Calculate Cost</span>
                            <div className={'imageHolder ico'}>
                                <img src={'/icons/svg/monetization_on.svg'} alt={'icon'} />
                            </div>
                        </SecBtn>
                    </FormBtnPair>
                </form>
            </CenteredBody>
        </div>
    )
}