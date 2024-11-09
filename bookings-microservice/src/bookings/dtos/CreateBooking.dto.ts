
export class CreateBookingDto {
    //validators ignored here for now, they are in the gateway
    eventName: string;
    eventDate: Date;
    guestName: string;
    guestEmail: string;
    guestCount: number;
    specialRequests?: string;
}