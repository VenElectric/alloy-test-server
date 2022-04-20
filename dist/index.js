"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(require("cors")({
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
}));
app.use(express_1.default.json());
const url = process.env.ALLOY_URL;
app.post("/server-request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerData = req.body;
    // encode to base 64
    const encodedBase64Token = Buffer.from(`${process.env.WORKFLOW_TOKEN}:${process.env.WORKFLOW_SECRET}`).toString("base64");
    const authorization = `Basic ${encodedBase64Token}`;
    try {
        // axios request to Alloy
        const verificationResponse = yield (0, axios_1.default)({
            url,
            method: "post",
            headers: { Authorization: authorization },
            data: customerData,
        });
        res.status(200).send(verificationResponse.data.summary);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                res.status(error.response.status).send(JSON.stringify(error.response));
            }
            else if (error.request) {
                res.status(error.response.status).send(JSON.stringify(error.request));
            }
            else {
                res.status(500).send(JSON.stringify(error));
            }
        }
    }
}));
app.listen(port, () => {
    console.log(port);
});
//# sourceMappingURL=index.js.map