export const AVAILABLE_ROOMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const ROOM_PRICE = {
    SINGLE: 30,
    DOUBLE: 100
}
export enum ROOM_TYPE {
    SINGLE,
    DOUBLE
}

export enum ROOM_STATUS {
    AVAILABLE,
    BOOKED
}

export enum HOTEL_ROOM {
    TYPE,
    STATUS
}

export enum MARRIAGE_STATUS {
    MARRIED,
    SINGLE
}

export type HotelRoom = [
    ROOM_TYPE,
    ROOM_STATUS
]
export type RoomNumber = number;

export enum BOOKED_ROOM {
    NAME,
    PHONE,
    EMAIL,
    MARRIAGE_STATUS,
    DURATION
}

export type BookedRoom = [
    string, // Guest name
    string, // Guest phone
    string, // Guest email
    MARRIAGE_STATUS, // Marriage status
    number, // Duration
]


export enum CHECKED_IN_ROOM {
    DURATION,
    COST,
    DATE,
}

export type CheckedInRoom = [
    number,
    number,
    string
];
