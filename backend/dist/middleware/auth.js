"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function validateUser(req, res, next) {
    var token = req.headers['x-access-token'];
    var private_key = process.env.PRIVATE_KEY || '';
    jsonwebtoken_1.verify(token, private_key, function (err, decoded) {
        if (err) {
            res.status(400).json({ status: 'failed', message: 'Your session is expired', data: null });
        }
        else {
            console.log(decoded);
            req.body.userId = decoded.id;
            next();
        }
    });
}
exports.validateUser = validateUser;
