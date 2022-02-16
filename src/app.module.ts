import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { createMongooseOptions } from './database'
import { JobModule } from './job/job.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => createMongooseOptions('mongodb+srv://admin:adminuser@cluster0.obq35.mongodb.net/recruitment?retryWrites=true&w=majority'),
    }),
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
