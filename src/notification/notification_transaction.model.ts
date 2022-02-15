import { prop } from "@typegoose/typegoose";
import { IsString, IsDateString } from "class-validator";

export class Transaction {
  @IsString()
  @prop({ required: true })
  company_id: string;

  @IsString()
  @prop({ required: true })
  user_id: string;

  @IsString()
  @prop({ required: true })
  status: string;

  @IsString()
  @prop({ required: true })
  notification_type: string;

  @IsString()
  @prop({ required: true })
  channel: string;

  @IsDateString()
  @prop()
  sent_date: string;

  @IsString()
  @prop({required: true })
  messages: string;
}