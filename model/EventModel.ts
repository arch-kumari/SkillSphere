import * as Mongoose from "mongoose";
import {IEventModel} from '../interfaces/IEventModel';

class EventModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                eventID: String,
                title: String,
                description: String,
                date: Date,
                location: String,
                organizerID: String,
                participants: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }]
            }, {collection: 'events'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IEventModel>("Event", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async createEvent(response: any, event: IEventModel) {
        var query = this.model.create(event);
        try {
            const result = await query.exec();
            response.json(result);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async updateEvent(response: any, eventID: String, event: IEventModel) {
        var query = this.model.updateOne({ eventID: eventID }, event);
        try {
            const result = await query.exec();
            response.json(result);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async deleteEvent(response: any, eventID: String) {
        var query = this.model.deleteOne({ eventID: eventID });
        try {
            const result = await query.exec();
            response.json(result);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async registerParticipant(response: any, eventID: String, userID: String): Promise<void> {
        try {
            const event = await this.model.findOne({ eventID: eventID });
            if (event) {
                event.participants.push(userID); // Add participant
                await event.save();
                response.json(event);
            } else {
                response.status(404).send('Event not found');
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async cancelRegistration(response: any, eventID: String, userID: String): Promise<void> {
        try {
            const event = await this.model.findOne({ eventID: eventID });
            if (event) {
                event.participants = event.participants.filter(participant => participant !== userID); // Remove participant
                await event.save();
                response.json(event);
            } else {
                response.status(404).send('Event not found');
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {EventModel};