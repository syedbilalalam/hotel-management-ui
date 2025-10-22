import { StrictMode, useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from '@src/pages/home';
import AvailableRooms from '@src/pages/available_rooms';
import BookRoom from '@src/pages/book_room';
import BookedRooms from '@src/pages/booked_rooms';
import CancelBooking from '@src/pages/cancel_booking';
import CheckIn from '@src/pages/check_in';
import CheckOut from '@src/pages/check_out';
import CheckInSummary, { type CheckInSummaryProps } from '@src/pages/check_in_summary';
import CheckOutSummary, { type CheckoutSummaryProps } from '@src/pages/checkout_summary';
import {
    AVAILABLE_ROOMS,
    ROOM_STATUS,
    type BookedRoom,
    type CheckedInRoom,
    type HotelRoom,
    type RoomNumber
} from '@src/assets/components/db';


export type RoomDb<T> = Map<RoomNumber, T>;


function Main() {
    const [checkinSummaryProps, setCheckinSummaryProps] = useState<CheckInSummaryProps | null>(null);
    const [checkoutSummaryProps, setCheckoutSummaryProps] = useState<CheckoutSummaryProps | null>(null);
    const [renderApp, setRenderApp] = useState(false);



    const hotelRooms = useRef<RoomDb<HotelRoom>>(null);
    const bookedRooms = useRef<RoomDb<BookedRoom>>(null);
    const checkedInRooms = useRef<RoomDb<CheckedInRoom>>(null);


    useEffect(() => {

        hotelRooms.current = new Map<RoomNumber, HotelRoom>();


        AVAILABLE_ROOMS.forEach((roomNo) => {
            const bytesArr = new Uint8Array(1);
            crypto.getRandomValues(bytesArr);
            let roomType = 0;
            if (bytesArr[0] % 2 === 0) roomType = 1;
            hotelRooms.current!.set(roomNo, [roomType, ROOM_STATUS.AVAILABLE]);
        });

        bookedRooms.current = new Map<RoomNumber, BookedRoom>();

        checkedInRooms.current = new Map<RoomNumber, CheckedInRoom>();

        setRenderApp(true);
    }, []);



    return (
        renderApp ? (

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/available-rooms" element={<AvailableRooms
                        hotelRooms={hotelRooms.current!}
                    />} />
                    <Route path="/book-room" element={<BookRoom bookedRooms={bookedRooms.current!} hotelRooms={hotelRooms.current!} />} />
                    <Route path="/booked-rooms" element={<BookedRooms
                        bookedRooms={bookedRooms.current!}
                        hotelRooms={hotelRooms.current!}
                    />} />
                    <Route path="/cancel-booking" element={<CancelBooking
                        bookedRooms={bookedRooms.current!}
                        hotelRooms={hotelRooms.current!}
                    />} />
                    <Route path="/check-in" element={<CheckIn
                        setSummaryProps={setCheckinSummaryProps}
                        hotelRooms={hotelRooms.current!}
                        checkedInRooms={checkedInRooms.current!}
                        bookedRooms={bookedRooms.current!}
                    />} />
                    <Route path="/check-in/summary" element={<CheckInSummary
                        props={checkinSummaryProps}
                        checkedInRooms={checkedInRooms.current!}
                        bookedRooms={bookedRooms.current!}
                    />} />
                    <Route path="/check-out" element={<CheckOut
                        setSummaryProps={setCheckoutSummaryProps} bookedRooms={bookedRooms.current!}
                        hotelRooms={hotelRooms.current!} checkedInRooms={checkedInRooms.current!}
                    />} />
                    <Route path="/check-out/summary" element={<CheckOutSummary props={checkoutSummaryProps} />} />
                </Routes>
            </BrowserRouter>
        ) : (
            <></>
        )
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
)