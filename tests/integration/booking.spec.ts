import { Result } from './../../node_modules/zod/src/v3/standard-schema';
import { test, expect } from "@playwright/test";
import * as z from 'zod';

const Booking = z.object({
    bookingid: z.number()
})

test('GET booking api', async ({ request }) => {

    //Endpoint GET booking returns a list of items
    const res = await request.get('https://restful-booker.herokuapp.com/booking')

    expect(res.status()).toBe(200);

    //Returns the JSON representation of response body
    const resBody = await res.json();
    console.log(resBody);

    //tells zod the entire API must be an array of those objects
    const expectedSchema = z.array(Booking);

    //compares the input structure against your defined zod schema
    expect(expectedSchema.safeParse(resBody).success).toBe(true);

})

test('CREATE booking API', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-08-27",
                "checkout": "2026-08-28"
            },
            "additionalneeds": "Breakfast"
        }
    })

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);
    
    const responseBody = await response.json();
    expect(responseBody).toEqual(
        {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-08-27",
                "checkout": "2026-08-28"
            },
            "additionalneeds": "Breakfast"
        }
    )


})