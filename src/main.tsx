import { StrictMode } from 'react'
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
import CheckOutSummary from '@src/pages/checkout_summary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />
        <Route path="/book-room" element={<BookRoom />} />
        <Route path="/booked-rooms" element={<BookedRooms />} />
        <Route path="/cancel-booking" element={<CancelBooking />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/check-out/summary" element={<CheckOutSummary />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
