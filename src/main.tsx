import { StrictMode, useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './index.css'
import Home from '@src/pages/home';
import BookRoom from '@src/pages/book_room';
import Login from '@src/pages/login';
import Account from '@src/pages/account';
import CheckIn from '@src/pages/check_in';
import CheckOut from '@src/pages/checkout';
import AddBalance from '@src/pages/add_balance';
import BookedRooms from '@src/pages/booked_rooms';
import CancelBooking from '@src/pages/cancel_booking';
import AvailableRooms from '@src/pages/available_rooms';
import { UserContext } from '@src/assets/components/global_context';
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

// Importing global css
import '@src/assets/styles/global.css';

export interface Wallet {
    value: number;
    set: (val: number) => void;
}
export interface Login {
    value: boolean;
    set: (val: boolean) => void;
}

export type RoomDb<T> = Map<RoomNumber, T>;

function saveAppInfo(name: string, map: Map<number, unknown>) {
    const obj = [[...map.keys()], [...map.values()]];
    localStorage.setItem(name, JSON.stringify(obj));
}

function retriveAppInfo<T>(name: string): Map<number, T> | null {
    const appData = localStorage.getItem(name);

    if (appData !== null) {

        const obj = JSON.parse(appData) as [number[], T[]];
        const h = new Map<number, T>();
        obj[0].forEach((key, index) => {
            h.set(key, obj[1][index]);
        })

        return h;
    }
    return null;
}

function getWallet() {
    const walletData = localStorage.getItem('wallet');
    if (walletData === null)
        return null;

    const wallet = parseInt(walletData);
    if (isNaN(wallet)) {
        localStorage.removeItem('wallet');
        return null;
    }

    return wallet;
}

function saveWallet(value: number) {
    localStorage.setItem('wallet', value.toString());
}

export function Main() {
    const [checkinSummaryProps, setCheckinSummaryProps] = useState<CheckInSummaryProps | null>(null);
    const [checkoutSummaryProps, setCheckoutSummaryProps] = useState<CheckoutSummaryProps | null>(null);
    const [renderApp, setRenderApp] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [walletValue, setWalletValue] = useState(100);
    // User info
    const userName = 'Test User';
    const userEmail = 'testuser@edu.pk';
    const userPassword = 'pakistan123';

    const hotelRooms = useRef<RoomDb<HotelRoom>>(null);
    const bookedRooms = useRef<RoomDb<BookedRoom>>(null);
    const checkedInRooms = useRef<RoomDb<CheckedInRoom>>(null);
    const intervalHandler = useRef<number>(null);

    // normal consts
    const wallet = {
        value: walletValue,
        set: setWalletValue
    } as Wallet;
    const login = {
        value: loginState,
        set: setLoginState
    } as Login;

    useEffect(() => {
        hotelRooms.current = new Map<RoomNumber, HotelRoom>();
        bookedRooms.current = new Map<RoomNumber, BookedRoom>();
        checkedInRooms.current = new Map<RoomNumber, CheckedInRoom>();

        // Initializing hotel rooms randomly
        AVAILABLE_ROOMS.forEach((roomNo) => {
            const bytesArr = new Uint8Array(1);
            crypto.getRandomValues(bytesArr);
            let roomType = 0;
            if (bytesArr[0] % 2 === 0) roomType = 1;
            hotelRooms.current!.set(roomNo, [roomType, ROOM_STATUS.AVAILABLE]);
        });

        // Retriving data from local storage
        const saved = {
            hotelrooms: retriveAppInfo<HotelRoom>('hotelrooms'),
            bookedrooms: retriveAppInfo<BookedRoom>('bookedrooms'),
            checkedinrooms: retriveAppInfo<CheckedInRoom>('checkinrooms'),
            wallet: getWallet()
        }

        if (saved.hotelrooms !== null) hotelRooms.current = saved.hotelrooms;
        if (saved.bookedrooms !== null) bookedRooms.current = saved.bookedrooms;
        if (saved.checkedinrooms !== null) checkedInRooms.current = saved.checkedinrooms;
        if (saved.wallet !== null) setWalletValue(saved.wallet);

        setRenderApp(true);
    }, []);

    useEffect(() => {
        if (!renderApp) return;

        // Clearing previous intervals to avoid unwanted looping
        if (intervalHandler.current !== null)
            clearInterval(intervalHandler.current);

        intervalHandler.current = setInterval(() => {
            saveAppInfo('hotelrooms', hotelRooms.current!);
            saveAppInfo('bookedrooms', bookedRooms.current!);
            saveAppInfo('checkinrooms', checkedInRooms.current!);
            saveWallet(wallet.value);
        }, 1000);

    }, [renderApp, wallet.value]);

    return (
        <UserContext.Provider value={{ login }}>
            {!loginState ? (
            <Login {...{ setLoginState, userEmail, userPassword }} />
            ) : renderApp ? (

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={
                        <Account wallet={wallet} userName={userName} />
                    } />
                    <Route path="/account/add-balance" element={
                        <AddBalance {...{ wallet }} />
                    } />
                    <Route path="/available-rooms" element={<AvailableRooms
                        hotelRooms={hotelRooms.current!}
                    />} />
                    <Route
                        path="/book-room" element={
                            <BookRoom
                                bookedRooms={bookedRooms.current!}
                                hotelRooms={hotelRooms.current!}
                                wallet={wallet}
                            />
                        }
                    />
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
                    <Route path="/checkout" element={<CheckOut
                        setSummaryProps={setCheckoutSummaryProps} bookedRooms={bookedRooms.current!}
                        hotelRooms={hotelRooms.current!} checkedInRooms={checkedInRooms.current!}
                    />} />
                    <Route path="/checkout/summary" element={<CheckOutSummary props={checkoutSummaryProps} />} />
                </Routes>
            </BrowserRouter>
            ) : (
            <></>
            )}
        </UserContext.Provider>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
)