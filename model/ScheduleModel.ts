import * as Mongoose from "mongoose";
import { IScheduleModel } from '../interfaces/IScheduleModel';

class ScheduleModel {
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
            scheduleID: String,
            courseID: String,
            instructorID: String,
            date: Date,
            startTime: String,
            endTime: String,
            location: String,
        }, { collection: 'schedules' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IScheduleModel>('Schedule', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async createSchedule(response: any, schedule: IScheduleModel): Promise<void> {
        try {
            const newSchedule = new this.model(schedule);
            const result = await newSchedule.save();
            response.json(result);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async updateSchedule(response: any, scheduleID: String, updatedSchedule: IScheduleModel): Promise<void> {
        try {
            const result = await this.model.updateOne({ scheduleID: scheduleID }, updatedSchedule);
            if (result.nModified === 1) {
                response.json({ message: "Schedule updated successfully." });
            } else {
                response.status(404).send("Schedule not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async deleteSchedule(response: any, scheduleID: String): Promise<void> {
        try {
            const result = await this.model.deleteOne({ scheduleID: scheduleID });
            if (result.deletedCount === 1) {
                response.json({ message: "Schedule deleted successfully." });
            } else {
                response.status(404).send("Schedule not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {ScheduleModel};