import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateJobDto, FullResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IJobDocument } from './job.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
  ) {}

  async createJob(createJobDto: CreateJobDto): Promise<FullResponseDto> {
    try {
      const job = await this.jobModel.create(createJobDto);

      return job;
    } catch (error) {
      throw error;
    }
  }

  async findAllJobs(): Promise<FullResponseDto[]> {
    try {
      const jobList = await this.jobModel.find();

      if(jobList.length < 1) {
        throw new HttpException('no job list found', HttpStatus.NOT_FOUND);
      }

      return jobList;
    } catch (error) {
      throw error;
    }
  }

  async findOneJob(id: string): Promise<FullResponseDto> {
    try {
      const job = await this.jobModel.findById(id);

      if(!job) {
        throw new HttpException('no job detail found', HttpStatus.NOT_FOUND);
      }

      return job;
    } catch (error) {
      throw error;
    }
  }

  async findJobByName(jobName: string): Promise<FullResponseDto[]> {
    try {
      const jobList = await this.jobModel.find({ title: { $regex: jobName, $options: 'i'}});

      if(!jobList) {
        throw new HttpException('no job detail found', HttpStatus.NOT_FOUND);
      }

      return jobList;
    } catch (error) {
      throw error;
    }
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto): Promise<FullResponseDto> {
    try {
      const job = await this.jobModel.findOneAndUpdate({id},updateJobDto);

      if(!job) {
        throw new HttpException('no job detail found', HttpStatus.NOT_FOUND);
      }

      return job;
    } catch (error) {
      throw error;
    }
  }

  async deleteJob(id: string): Promise<string> {
    try {
      const job = await this.jobModel.findOneAndDelete({id});
      return id;
    } catch (error) {
      throw error;
    }
  }
}
