"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
var mongoose = require("mongoose");
var MongoConnect = /** @class */ (function () {
    function MongoConnect() {
    }
    MongoConnect.connect = function () {
        var db = process.env.MongoURI || '';
        return mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    };
    return MongoConnect;
}());
exports.MongoConnect = MongoConnect;
