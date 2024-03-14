import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CrudNote extends Document {

    @Prop({
        unique: true,
        index: true
    })
    id: string

    @Prop({
        index: true
    })
    title: string;

    @Prop({
        index: true
    })
    description: string;
}

export const NotesSchema = SchemaFactory.createForClass( CrudNote );