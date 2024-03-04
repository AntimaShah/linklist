import { Schema, model, models } from "mongoose";


const EventSchema = new Schema({
    type: String, // click or view
    page: String, // for example "antima"
    uri: String, // /antima | https://
}, {timestamps: true});

export const Event = models?.Event || model('Event', EventSchema);