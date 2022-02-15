import {
  IsBoolean,
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional, ApiResponseProperty} from '@nestjs/swagger';
import { notificationStatusEnum, notificationTypeEnum, notificationChannel } from '../notification.enum';

export class CreateTransactionDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'company id',
	})
	company_id: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'user id',
	})
	user_id: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification type',
	})
	notification_type: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification channel',
	})
	channel: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification status',
	})
	status: string;

	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification message',
	})
	messages: string;

	@IsString()
	@ApiProperty({
		required: false,
		type: 'string',
		description: 'notification sent date',
	})
	sent_date: string;
}

export class SendNotificationDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'user id',
	})
	user_id: string;

	@IsNotEmpty()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification id',
	})
	notification_id: string;
}

export class ResponseNotificationDto {
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification message',
	})
	messages: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'user id',
	})
	user_id: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification status',
	})
	status: string;

	@IsString()
	@ApiProperty({
		required: true,
		description: 'notification type',
	})
	channel: string[];
}

export class UserDataDto {
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'notification message',
	})
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		required: true,
		type: 'string',
		description: 'user id',
	})
	user_id: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'company_id',
	})
	company_id: string;
}

export class NotificationObjDto {
	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification label',
	})
	notification_label: string;

	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification type',
	})
	notification_type: string;

	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification message',
	})
	notification_message: string;

	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification description',
	})
	notification_desc: string;

	@IsString()
	@ApiProperty({
		type: 'string',
		description: 'notification channel',
	})
	notification_channel: string[];
}