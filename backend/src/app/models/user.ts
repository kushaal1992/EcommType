import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs'

const salt_Round: number | any = process.env.Salt_Round;

let addressInfo = new Schema({
    addressLine1: String,
    addressLine2: String,
    city: String,
    pin: String
})

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 12
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'user'
    },
    address: addressInfo

})

UserSchema.pre('save', function(next) {
    const user: any = this;
    if(user.isModified('password')){
        const saltRound = parseInt(salt_Round)
        genSalt(saltRound, (err, salt) => {
            hash(user.password, salt, (err, hash) => {
                if(err) {
                    throw err
                } else {
                    user.password = hash
                    next()
                }
            })
        })
    
} else  {
    next()
    }
});

export const User = model('User', UserSchema)