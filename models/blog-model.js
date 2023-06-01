const db = require('../data/database');
const mongodb = require('mongodb');

class Blog {
    constructor(userId, userName, title, content, date, blogId) {
        this.userId = userId;
        this.userName = userName;
        this.title = title;
        this.content = content;

        if(date) {
            this.date = date;
        } else {
            this.date = new Date();
        }

        if(this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        this.id = blogId;

    }
    
    async saveBlog(next) {
        if(this.id) {
            let blogId;

            try {
                blogId = new mongodb.ObjectId(this.id);
            } catch(error) {
                return next(error);
            }

            await db.getDb().collection('blogs').updateOne({ _id: blogId}, {$set: {
                date: this.date,
                formattedDate: this.formattedDate,
                title: this.title,
                content: this.content
            }});
        } else {
            await db.getDb().collection('blogs').insertOne({
                userId: this.userId,
                userName: this.userName,
                date: this.date,
                formattedDate: this.formattedDate,
                title: this.title,
                content: this.content
            });
        }
    }

    static findAllBlogs() {
        return db.getDb().collection('blogs').find().toArray();
    }

    static findBlogById(blogId, next) {
        let bId;
        try {
            bId = new mongodb.ObjectId(blogId);
        }catch(error) {
            return next(error);
        }

        return db.getDb().collection('blogs').findOne({ _id: bId});
    }

    static async findBlogByUser(userId, next) {
        const blogs = await db.getDb().collection('blogs').find({userId: userId}).toArray();
        return blogs;
    }

    static async deleteBlog(blogId, next) {
        let bId; 
        try {
            bId = new mongodb.ObjectId(blogId);
        } catch(error) {
            return next(error);
        }

        await db.getDb().collection('blogs').deleteOne({ _id: bId});
    }
}

module.exports = Blog;