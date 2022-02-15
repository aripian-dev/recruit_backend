import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.model';
import { Transaction } from './notification_transaction.model'

@Module({
  imports: [
    TypegooseModule.forFeature([Notification]),
    TypegooseModule.forFeature([Transaction]),
   ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
