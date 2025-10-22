export const AVAILABLE_ROOMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export enum ROOM_TYPE {
    SINGLE,
    DOUBLE
}

export enum ROOM_STATUS {
    AVAILABLE,
    BOOKED
}

export enum ROOM_RECORD {
    ROOM_TYPE,
    ROOM_STATUS
}

export enum ROOM_RECORD_MAP_NAME {
    ROOM_TYPE,
    ROOM_STATUS
}

export enum MARRIAGE_STATUS {
    MARRIED,
    SINGLE
}

export type RoomRecord = [
    ROOM_TYPE,
    ROOM_STATUS
]
type RoomNumber = number;

export type BookedRoomsMap = [
    string, // Guest name
    string, // Guest phone
    string, // Guest email
    MARRIAGE_STATUS, // Marriage status
    number, // Duration
]



const hotelRooms = new Map<RoomNumber, RoomRecord>();


AVAILABLE_ROOMS.forEach((roomNo) => {
    const bytesArr = new Uint8Array(1);
    crypto.getRandomValues(bytesArr);
    let roomType = 0;
    if (bytesArr[0] % 2 === 0) roomType = 1;
    hotelRooms.set(roomNo, [roomType, ROOM_STATUS.AVAILABLE]);
});

const bookedRooms = new Map<RoomNumber, BookedRoomsMap>();

export { hotelRooms, bookedRooms };