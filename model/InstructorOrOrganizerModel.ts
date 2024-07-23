import * as Mongoose from "mongoose";
import { UserModel } from './UserModel';
import { IInstructorOrOrganizerModel } from '../interfaces/IInstructorOrOrganizerModel';
import { Response } from 'express';


class InstructorOrOrganizerModel extends UserModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        super(DB_CONNECTION_STRING);
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            instructorID: String,
            userID: String,
            name: String,
            email: { type: String, unique: true },
            phoneNo: String,
            expertise: String,
            experience: Number,
            bio: String,
            rating: Number,
            profileImage: String,
            registrationDate: Date,
        }, { collection: 'instructors' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IInstructorOrOrganizerModel>('InstructorOrOrganizer', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getInstructorNameUsingId(response: Response, instructorId: String): Promise<void> {
        try {
            const instructor = await this.model.findOne({ instructorID: instructorId });
            if (instructor) {
                response.json(instructor);
            } else {
                response.status(404).send("Instructor not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getInstructorUsingUserId(response: Response, userID: String): Promise<void> {
        try {
            console.log(userID);
            const instructor = await this.model.findOne({ userID: userID });
            console.log(instructor);
            if (instructor) {
                response.json(instructor);
            } else {
                response.status(404).send("Instructor not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getAllInstructors(response: Response): Promise<void> {
        try {
            const instructors = await this.model.find();
            if (instructors) {
                response.json(instructors);
            } else {
                response.status(404).send("No instructors found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
    
    public async register(response: any, details: IInstructorOrOrganizerModel): Promise<void> {
        try {
            const newStudent = new this.model(details);
            const result = await newStudent.save();
            response.json({ message: "Registration successful", student: result });
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async login(response: any, email: string, password: string): Promise<void> {
        try {
            const student = await this.model.findOne({ email: email });
            if (!student) {
                response.status(404).send("Student not found.");
                return;
            }
            if (password === student.password) {
                response.json({ message: "Login successful", student: student });
            } else {
                response.status(401).send("Incorrect password.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }


    public async updateProfile(instructorID: string, updatedDetails: IInstructorOrOrganizerModel): Promise<{ message: string, status: number }> {
        try {
            console.log(`Attempting to update profile with ID: ${instructorID}`);
            console.log(`Updated profile data: ${JSON.stringify(updatedDetails)}`);
    
            const result = await this.model.updateOne({ instructorID: instructorID }, updatedDetails);
    
            if (result.nModified === 1 || result.modifiedCount === 1) {
                console.log(`Instructor with ID: ${instructorID} updated successfully.`);
                return result;
                //return { message: "Course updated successfully.", status: 200 };
            } else {
                console.log(`Instructor with ID: ${instructorID} not found.`);
                return { message: "Instructor not found.", status: 404 };
            }
        } catch (e) {
            console.error(`Error updating instructor with ID: ${instructorID}. Error: ${e.message}`);
            throw new Error(e.message);
        }
    }

    public async getReviews(response: any, instructorID: String): Promise<void> {
        try {
            // First, find all courses taught by this instructor
            const courses = await Mongoose.model('Course').find({ instructorID: instructorID });
            if (!courses.length) {
                response.status(404).send("No courses found for this instructor.");
                return;
            }

            // Extract course IDs from the courses array
            const courseIds = courses.map(course => course._id);

            // Now fetch reviews for these courses
            const reviews = await Mongoose.model('Review').find({ courseID: { $in: courseIds } });

            if (!reviews.length) {
                response.status(404).send("No reviews found for the courses taught by this instructor.");
                return;
            }

            response.json(reviews);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {InstructorOrOrganizerModel};