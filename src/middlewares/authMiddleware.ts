import express, { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const app = express();

app.use(cookieParser());

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const cookiesToken = req.cookies.jwt;
    const authHeader = req.headers['authorization'];
    const headersToken = authHeader && authHeader.split(' ')[1];
    const token = cookiesToken || headersToken;
    console.log('Token',token);
    if (token) {
        jwt.verify(token, "nyanja cyane secret", (err: any, decodedToken: any) => {
            if (err) {
                res.json({ "Error": "Server error" });
            }
            else {
                console.log(decodedToken.id);
                req.body.userId=decodedToken.id;
                next();
            }
        })
    }
    else {
        res.json({ "Access denied": "Login first" })
    }
}
module.exports = { requireAuth };