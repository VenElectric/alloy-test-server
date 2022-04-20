"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
let url = "https://sandbox.alloy.co/v1/evaluations";
const encodedBase64Token = Buffer.from(`${process.env.WORKFLOW_TOKEN}:${process.env.WORKFLOW_SECRET}`).toString("base64");
const authorization = `Basic ${encodedBase64Token}`;
(0, axios_1.default)({
    url,
    method: "get",
    headers: { Authorization: authorization },
    data: {
        phone_number: "18042562188",
        name_first: "John",
        name_last: "Doe",
        email_address: "john.doe@example.com",
        birth_date: "1985-01-23",
        address_line_1: "1717 E Test St",
        address_city: "Richmond",
        address_state: "VA",
        document_ssn: "123456789",
        address_postal_code: "23220",
        address_country_code: "US",
        social_twitter: "dog_rates",
    },
}).then((response) => console.log(response)).catch(function (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
});
//.done();
//# sourceMappingURL=test.js.map