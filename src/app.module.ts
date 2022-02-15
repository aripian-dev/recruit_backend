import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from "nestjs-typegoose";
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://mongodb_container:27017/brio_test", {
      useNewUrlParser: true,
    }),
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
