import { initBasta } from '@bastaai/basta-admin-js';
import {initBasta as okBasta } from '@bastaai/basta-js';
import * as dotenv from 'dotenv';
dotenv.config();

const credentials: { accountId: string; secretKey: string } = {
    accountId: process.env.BASTA_API_KEY,
    secretKey: process.env.BASTA_ACCOUNT_ID
}
const bastaAdmin = initBasta(credentials, false);

const basta = okBasta(false);


const createAuction = () => string => {
    let auctionStart = new Date();
    auctionStart.setUTCHours(auctionStart.getUTCHours() + 1)
    let result =  bastaAdmin.sale.create({
        title: "Test auction",
        description: "this is a test auction",
        dates : {
            openDate: new Date(),
            // ending
            closingDate: auctionStart.toISOString() 
        },
        currency: "USD",
        bidInrementTable: {
            rules: [
                { lowRange: 0, highRange: 10000, step: 1000},
                { lowRange: 100000, highRange: 500000, step: 25000 },
            ],
        },
        closingMethod: "OVERLAPPING",
        closingTimeCountdown: 6000
    }).then(res => {
        console.log("this is res ", res)
    });

    console.log("here is the result", result)
}

let r = createAuction();
console.log("r", r);