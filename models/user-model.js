const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../data/database');

class User {
    constructor(email, confirmEmail, password, fullname, street, postal, city) {
        this.email = email,
        this.confirmEmail = confirmEmail,
        this.password = password,
        this.fullname = fullname,
        this.date = new Date(),
        this.formattedDate = this.date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        this.address = {
            street: street,
            postal: postal,
            city: city
        }
    }

    async saveUser() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullname: this.fullname,
            date: this.date,
            formattedDate: this.formattedDate,
            address: this.address
        });
    }

    isUserAlreadyExist() {
        return db.getDb().collection('users').findOne({email: this.email});
    }

    getUserByEmail() {
        return db.getDb().collection('users').findOne({email: this.email}, {projection: {email: 1, password: 1, isAdmin: 1}});
    }

    compareUserPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }

    static async getUserById(userId) {
        const uid = new mongodb.ObjectId(userId);
        const user = await db.getDb().collection('users').findOne({ _id: uid});

        return user;
    }

    static getAllUser() {
        return db.getDb().collection('users').find().toArray();
    }
}

module.exports = User;