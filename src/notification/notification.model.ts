import { prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { IsString } from "class-validator";

export class Notification {
  @IsString()
  @prop({ required: true })
  notification_label: string;

  @IsString()
  @prop({ required: true })
  notification_type: string;

  @IsString()
  @prop({ required: true })
  notification_message: string;

  @IsString()
  @prop()
  notification_desc: string;

  @prop({ required: true, default: [] })
  notification_channel: string[];
}