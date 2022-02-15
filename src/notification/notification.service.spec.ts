import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { Notification } from "./notification.model";
import { Transaction } from './notification_transaction.model';
import { getModelToken } from "nestjs-typegoose";
import * as notiEnum from './notification.enum';
import * as moment from 'moment';
import { CreateTransactionDto, ResponseNotificationDto, UserDataDto, SendNotificationDto, NotificationObjDto } from './dto/notification.dto';

describe('NotificationService', () => {
  let service: NotificationService;

  const TestNotificationModel = {
    findById: jest.fn(),
  };

  const TestTransactionModel = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockProviders = [
    {
      provide: getModelToken('Notification'),
      useValue: TestNotificationModel,
    },
    {
      provide: getModelToken('Transaction'),
      useValue: TestTransactionModel,
    }
  ];

  const mockedSendNotificationResponse: ResponseNotificationDto = {
    messages: 'some-test-message',
    user_id: '1',
    status: 'sent',
    channel: ['ui'],
  }

  const mockedNotificationObj: NotificationObjDto = {
    notification_label: 'test-notification',
    notification_type: 'test-type',
    notification_message: 'some-test-message',
    notification_desc: 'test-desc',
    notification_channel: ['ui'],
  }

  const mockedTransactionObj: CreateTransactionDto = {
    company_id: 'test-company-id',
    user_id: 'test-user-id',
    notification_type: 'test-type',
    channel: 'ui',
    status: 'sent',
    messages: 'test-message',
    sent_date: 'test-date',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...mockProviders, NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotification', () => {
    describe('happy case', () => {
      it('should create notification transaction', async () => {
        const mockUserId = '1';
        const mockNotificationid = 'some-noticiation-id';

        TestNotificationModel.findById.mockResolvedValueOnce(mockedNotificationObj);
        TestTransactionModel.create.mockImplementation((mockedTransactionObj) => ({
          save: jest.fn(),
        }));

        // Test here
        const res = await service.createNotification({
          user_id: mockUserId,
          notification_id: mockNotificationid,
        });

        expect(res.status).toEqual('sent');
      })
    })
  });
});