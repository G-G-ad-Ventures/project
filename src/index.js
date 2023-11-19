"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basta_admin_js_1 = require("@bastaai/basta-admin-js");
var basta_js_1 = require("@bastaai/basta-js");
var dotenv = require("dotenv");
dotenv.config();
var credentials = {
    accountId: process.env.BASTA_API_KEY,
    secretKey: process.env.BASTA_ACCOUNT_ID
};
var bastaAdmin = (0, basta_admin_js_1.initBasta)(credentials, false);
var basta = (0, basta_js_1.initBasta)(false);
var createAuction = function () { return function (string) {
    var auctionStart = new Date();
    auctionStart.setUTCHours(auctionStart.getUTCHours() + 1);
    var result = bastaAdmin.sale.create({
        title: "Test auction",
        description: "this is a test auction",
        dates: {
            openDate: auctionStart.toISOString(),
            // ending
            closingDate: auctionStart.toISOString()
        },
        currency: "USD",
        bidInrementTable: {
            rules: [
                { lowRange: 0, highRange: 10000, step: 1000 },
                { lowRange: 100000, highRange: 500000, step: 25000 },
            ],
        },
        closingMethod: "OVERLAPPING",
        closingTimeCountdown: 6000
    }).then(function (res) {
        console.log("this is res ", res);
    });
    console.log("here is the result", result);
}; };
var r = createAuction();
console.log("r", r);
