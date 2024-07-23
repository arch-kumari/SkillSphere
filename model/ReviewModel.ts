import * as Mongoose from "mongoose";
import {IReviewModel} from '../interfaces/IReviewModel';

class ReviewModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            reviewID: String,
            userID: String,
            courseID: String,
            rating: Number,
            comment: String,
        }, { collection: 'reviews' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IReviewModel>("Review", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async addReview(response: any, review: IReviewModel): Promise<void> {
        try {
            const newReview = new this.model(review);
            const result = await newReview.save();
            response.json(result);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async updateReview(response: any, reviewID: String, updatedReview: IReviewModel): Promise<void> {
        try {
            const result = await this.model.updateOne({ reviewID: reviewID }, updatedReview);
            if (result.nModified === 1) {
                response.json({ message: "Review updated successfully." });
            } else {
                response.status(404).send("Review not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async deleteReview(response: any, reviewID: String): Promise<void> {
        try {
            const result = await this.model.deleteOne({ reviewID: reviewID });
            if (result.deletedCount === 1) {
                response.json({ message: "Review deleted successfully." });
            } else {
                response.status(404).send("Review not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getReviewsByCourse(response: any, courseID: String): Promise<void> {
        try {
            const reviews = await this.model.find({ courseID: courseID });
            response.json(reviews);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getReviewsByUser(response: any, userID: String): Promise<void> {
        try {
            const reviews = await this.model.find({ userID: userID });
            response.json(reviews);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {ReviewModel};