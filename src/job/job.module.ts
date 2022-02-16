import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { jobSchema } from './job.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'jobs', schema: jobSchema},
    ]),
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
