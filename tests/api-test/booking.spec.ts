import { request } from 'node:http';
import { test, expect, request } from '@playwright/test'
import * as z from 'zod'


const Booking = z.object({
    bookingid: z.number()
})

test('GET booking', async ({ request }) => {

    const response = await request.get('https://restful-booker.herokuapp.com/booking');

    expect(response.ok()).toBe(true);

    const responseBody = await response.json();
    const expectedSchema = z.array(Booking);

    expect(expectedSchema.validate(responseBody)).toBe(true);

})

test('POST booking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-10-24",
                "checkout": "2026-10-30"
            },
            "additionalneeds": "Breakfast"
        }
    })

    expect(response.ok()).toBe(true);

    const resquestBody = await response.json();

    expect(resquestBody).toHaveProperty('booking')

})

test('UPDATE booking', async ({ request }) => {

    //Create Token
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })

    expect(authResponse.ok()).toBe(true);

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;

    //Get all booking
    const getAllBookingResponse = await request.get('https://restful-booker.herokuapp.com/booking');

    expect(getAllBookingResponse.ok()).toBe(true);

    const getAllBookingBody = await getAllBookingResponse.json();
    const randomId = Math.floor(Math.random() * getAllBookingBody.length);
    const bookingId = getAllBookingBody[randomId].bookingid;

    // Get booking by id
    const getBookingByIdResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);

    expect(getBookingByIdResponse.ok()).toBe(true);

    const bookingByIdBody = await getBookingByIdResponse.json();
    console.log(`Before update ${bookingId}`, bookingByIdBody);

    //Update booking id
    /**
        const updateBookingResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            data: {
                "firstname": "Vandy",
                "lastname": "Vie",
                "totalprice": 9999,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-11-01",
                    "checkout": "2026-12-01"
                },
                "additionalneeds": "Breakfast"
            }
        })
    */

    let bookingDetails = bookingByIdBody;
    bookingDetails.firstname = "Vandy";
    bookingDetails.totalprice = 8888;
    bookingDetails.depositpaid = false;

    const updateBookingResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },

        data: bookingDetails
    })

    expect(updateBookingResponse.ok()).toBe(true);

    const updateBookingBody = await updateBookingResponse.json();
    console.log(`After update: `, updateBookingBody);
})

test('DELETE booking', async ({ request }) => {
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })
    expect(authResponse.ok()).toBe(true);

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;

    const deleteResponse = await request.delete('https://restful-booker.herokuapp.com/booking/1', {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        },
    })

})
