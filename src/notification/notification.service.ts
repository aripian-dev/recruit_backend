import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { Notification } from "./notification.model";
import { Transaction } from './notification_transaction.model';
import * as notiEnum from './notification.enum';
import * as moment from 'moment';
import { CreateTransactionDto, ResponseNotificationDto, UserDataDto, SendNotificationDto, NotificationObjDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification) private readonly notifyModel: ReturnModelType<typeof Notification>,
    @InjectModel(Transaction) private readonly transactionModel: ReturnModelType<typeof Transaction>
  ) {}

  async createNotification(notiReq: SendNotificationDto): Promise<ResponseNotificationDto> {
    try {
      // Check user data
      const userDetail = await this.getUserDetails(notiReq.user_id);

      const notiObj = await this.notifyModel.findById(notiReq.notification_id);

      // Send message here
      await this.sendNotification(userDetail, notiObj);
      return {
        messages: notiObj.notification_message,
        user_id: userDetail.user_id,
        status: notiEnum.notificationStatusEnum.sent,
        channel: notiObj.notification_channel,
      }
    } catch(error) {
      throw error;
    }
  }

  private async getUserDetails(userId: string): Promise<UserDataDto> {
    // We simulate of getting user data here, in ordinary flow user data will come from another service
    if (userId !== '1'){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      }, HttpStatus.NOT_FOUND)
    } else {
      return {
        name: 'John Doe',
        user_id: '1',
        company_id: '563',
      }
    } 
  }

  async getNotificationByChannel(channel: string): Promise<NotificationObjDto[]> {
    const allObj = await this.notifyModel.find();
    const notifyObj = await this.notifyModel.find({
      notification_channel: channel,
    });

    if (notifyObj.length < 1) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No notification obj not found',
      }, HttpStatus.NOT_FOUND)
    } else {
      return notifyObj;
    }
  }

  private async sendNotification(userDetail: UserDataDto, notiObj: NotificationObjDto) {
    // Create a transaction message here
    try {
      for (const channel of notiObj.notification_channel) {
        const notiTrans: CreateTransactionDto = {
          company_id: userDetail.company_id,
          user_id: userDetail.user_id,
          notification_type: notiObj.notification_type,
          status: notiEnum.notificationStatusEnum.pending,
          messages: notiObj.notification_message,
          channel: channel,
          sent_date: moment().toISOString()
        };
        let transaction = await this.transactionModel.create(notiTrans);
        switch (channel) {
          case notiEnum.notificationChannel.email:
            console.log(`Send email to ${transaction.user_id}`);
            break;
          default:
            console.log(`Send by ${transaction.channel}`)
        }
        transaction.status = notiEnum.notificationStatusEnum.sent;
        await transaction.save();
      }
    } catch(error) {
      throw error;
    }
  }
}
