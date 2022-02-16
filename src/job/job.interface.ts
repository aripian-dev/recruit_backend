import { Document } from 'mongoose'; 
import { jobStatusEnum } from './job.enum';

export interface IJob {
	title: string,
	status: jobStatusEnum,
	location: string,
	desc: string,
	createdAt: string,
	updatedAt: string,
}

export interface IJobDocument extends IJob, Document {}