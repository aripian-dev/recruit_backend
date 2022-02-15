import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Notification } from "./notification.model";
import { Transaction } from './notification_transaction.model';
import * as notiEnum from './notification.enum';
import { ResponseNotificationDto, SendNotificationDto, NotificationObjDto } from './dto/notification.dto';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseNotificationDto,
    description: 'Notification sent successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiBody({
    type: SendNotificationDto,
    required: true,
  })
  async create(@Body() sendNotificationObj: SendNotificationDto): Promise<ResponseNotificationDto> {
    return await this.notificationService.createNotification(sendNotificationObj);
  }

  @Get(':channel')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [NotificationObjDto],
    description: 'Notification found successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Notification not found',
  })
  async findOne(@Param('channel') channel: notiEnum.notificationChannel): Promise<NotificationObjDto[]> {
    return await this.notificationService.getNotificationByChannel(channel);;
  }
}
