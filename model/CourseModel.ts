import * as Mongoose from "mongoose";
import { ICourseModel } from '../interfaces/ICourseModel';
import { Response } from 'express';
import { ScheduleModel } from './ScheduleModel';

class CourseModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            courseID: String,
            courseName: String,
            title: String,
            description: String,
            categoryID: String,
            instructorID: String,
            userID: String,
            price: Number,
            schedule: Array,
            courseImage: String,
        }, { collection: 'courses' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true } as any);
            this.model = Mongoose.model<ICourseModel>('Course', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getSingleCourse(response: Response, courseId: String): Promise<void> {
        try {
            const course = await this.model.findOne({ courseID: courseId }).populate('instructorID').populate('categoryID').populate('schedule');
            if (course) {
                response.json(course);
            } else {
                response.status(404).send("Course not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    // Updated method for fetching a single course by name
    public async getSingleCourseByName(response: Response, courseName: string): Promise<void> {
        try {
            const course = await this.model.findOne({ courseName: courseName }).populate('schedule');
            if (course) {
                response.json(course);
            } else {
                response.status(404).send("Course not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getAllCourses(response: Response): Promise<void> {
        try {
            const courses = await this.model.find().populate('instructorID').populate('categoryID').populate('schedule');
            response.json(courses);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    // Updated method for fetching a single course by name
    public async getCoursesUsingUserId(response: Response, userId: string): Promise<void> {
        try {
            console.log(userId);
            const course = await this.model.find({ userID: userId }).populate('schedule');
            console.log(course);
            if (course) {
                response.json(course);
            } else {
                response.status(404).send("Course not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async createCourse(course: ICourseModel): Promise<ICourseModel> {
        try {
            const newCourse = new this.model(course);
            const result = await newCourse.save();
            return result;
        } catch (e) {
            console.error(e);
            throw new Error(e.message);
        }
    }

    public async updateCourse(courseID: string, updatedCourse: ICourseModel): Promise<{ message: string, status: number }> {
        try {
            console.log(`Attempting to update course with ID: ${courseID}`);
            console.log(`Updated course data: ${JSON.stringify(updatedCourse)}`);
    
            const result = await this.model.updateOne({ courseID: courseID }, updatedCourse);
    
            if (result.nModified === 1 || result.modifiedCount === 1) {
                console.log(`Course with ID: ${courseID} updated successfully.`);
                return result;
                //return { message: "Course updated successfully.", status: 200 };
            } else {
                console.log(`Course with ID: ${courseID} not found.`);
                return { message: "Course not found.", status: 404 };
            }
        } catch (e) {
            console.error(`Error updating course with ID: ${courseID}. Error: ${e.message}`);
            throw new Error(e.message);
        }
    }
    
    


    public async deleteCourse(courseID: String): Promise<{ message: string, status: number }> {
        try {    
            const result = await this.model.deleteOne({ courseID: courseID });
    
            if (result.deletedCount === 1) {
                return result;
                //return { message: "Course deleted successfully.", status: 200 };
            } else {
                console.log(`Course with ID: ${courseID} not found.`);
                return { message: "Course not found.", status: 404 };
            }
        } catch (e) {
            console.log(`Error deleting course with ID: ${courseID}. Error: ${e.message}`);
            console.error(e);
            throw new Error(e.message);
        }
    }
    


    public async enrollStudent(courseID: String, studentID: String): Promise<{ message: string, status: number, course?: ICourseModel }> {
        try {
            const course = await this.model.findOne({ courseID: courseID });
            if (course) {
                if (course.students.includes(studentID)) {
                    return { message: "Student is already enrolled.", status: 400 };
                } else {
                    course.students.push(studentID);
                    await course.save();
                    return { message: "Student enrolled successfully.", status: 200, course };
                }
            } else {
                return { message: "Course not found.", status: 404 };
            }
        } catch (e) {
            console.error(e);
            throw new Error(e.message);
        }
    }

}
export { CourseModel };