import Mongoose = require("mongoose");

interface IReviewModel extends Mongoose.Document {
    reviewID: string;
    userID: string;
    courseID: string;
    rating: number;
    comment: string;
}

export {IReviewModel};