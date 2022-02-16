import * as mongoose from 'mongoose';
import {jobStatusEnum} from './job.enum';

function getStringEnumValue<E extends Record<keyof E, string>>(e: E): E[keyof E][] {
	return (Object.keys(e) as (keyof E)[]).map((k) => e[k]);
}

export const jobSchema = new mongoose.Schema({
  title: {
  	type: String,
  	required: true,
  },
  location: {
  	type: String,
  	required: true,
  },
  status: {
  	type: String,
  	required: true,
  	enum: getStringEnumValue(jobStatusEnum),
  },
  desc: String,
}, {
	timestamps: {
		createdAt: true,
		updatedAt: true,
	}
});