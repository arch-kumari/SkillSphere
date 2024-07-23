import * as Mongoose from "mongoose";
import { UserModel } from './UserModel';
import { IStudentModel } from '../interfaces/IStudentModel';

class StudentModel extends UserModel {
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
            studentID: String,
            userID: String,
            studentName: String,
            email: String,
            phoneNo: String,
            enrolledCourses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }],
            profileImage: String,
            registrationDate: Date,
        }, { collection: 'students' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IStudentModel>('Student', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async register(response: any, studentDetails: IStudentModel): Promise<void> {
        try {
            const newStudent = new this.model(studentDetails);
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

    public async enrollInCourse(response: any, studentID: String, courseID: String): Promise<void> {
        try {
            const student = await this.model.findOne({ studentID: studentID });
            if (student) {
                // Check if student is already enrolled
                if (student.enrolledCourses.includes(courseID)) {
                    response.status(400).send("Student is already enrolled in this course.");
                } else {
                    student.enrolledCourses.push(courseID);
                    await student.save();
                    response.json(student);
                }
            } else {
                response.status(404).send("Student not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async dropCourse(response: any, studentID: String, courseID: String): Promise<void> {
        try {
            const student = await this.model.findOne({ studentID: studentID });
            if (student) {
                student.enrolledCourses = student.enrolledCourses.filter(id => id.toString() !== courseID.toString());
                await student.save();
                response.json({ message: "Course dropped successfully", student: student });
            } else {
                response.status(404).send("Student not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {StudentModel};