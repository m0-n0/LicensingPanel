import express = require('express');

export type SessionRequest = express.Request & {
    session: any;
    sessionID: string;
}


