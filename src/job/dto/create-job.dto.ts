import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional, ApiResponseProperty} from '@nestjs/swagger';
import { jobStatusEnum } from '../job.enum';

export class CreateJobDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'job title',
	})
	title: string;

	@IsNotEmpty()
	@IsEnum(jobStatusEnum)
	@ApiProperty({
		required: true,
		type: 'enum',
		enum: jobStatusEnum,
		description: 'job status',
	})
	status: jobStatusEnum;

	@IsString()
	@ApiPropertyOptional({
		required: false,
		type: 'string',
		description: 'job location',
	})
	location: string;

	@IsString()
	@ApiPropertyOptional({
		required: false,
		type: 'string',
		description: 'job description',
	})
	desc: string;
}

export class FullResponseDto extends CreateJobDto {}