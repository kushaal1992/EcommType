"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_1 = require("../models/user");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.login = function (req, res, next) {
        var private_key = process.env.PRIVATE_KEY || '';
        user_1.User.findOne({ email: req.body.email }, function (err, doc) {
            if (err) {
                res.json({ status: 'Login failed!', message: err });
            }
            if (doc != undefined) {
                if (bcryptjs_1.compareSync(req.body.password, doc.password)) {
                    var token = jsonwebtoken_1.sign({ id: doc._id }, private_key, { expiresIn: '1h' });
                    res.json({ status: 'Logged in!', message: 'You can browse', data: token });
                }
                else {
                    res.json({ status: 'Login failed!', message: 'Username or pwd is incorrect' });
                }
            }
            else {
                res.json({ status: 'Login failed!', message: 'Username or pwd is incorrect' });
            }
        });
    };
    UserController.registration = function (req, res, next) {
        var user = new user_1.User(req.body);
        user_1.User.create(user, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ status: 'failed!', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Registered!', data: result });
            }
        });
    };
    UserController.updateProfile = function (req, res, next) {
        console.log(req.body);
        var userId = req.body.userId;
        user_1.User.findByIdAndUpdate(userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            }
        }, function (err, result) {
            if (err) {
                res.status(400).json({ status: 'User not found!', message: err });
            }
            else {
                res.json({ status: 'Success', message: 'Updated!' });
            }
        });
    };
    UserController.getProfile = function (req, res, next) {
        var userId = req.body.userId;
        user_1.User.findById(userId, function (err, result) {
            if (err) {
                console.log(err);
                res.status(401).json({ status: 'failed!', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Users found', data: result });
            }
        });
    };
    return UserController;
}());
exports.UserController = UserController;
