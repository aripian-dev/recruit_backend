import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateJobDto, FullResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { jobStatusEnum } from './job.enum';
import { jobSchema } from './job.schema';
import { IJobDocument } from './job.interface';

describe('NotificationService', () => {
  let service: JobService;

  const TestJobModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  const mockProviders = [
    {
      provide: getModelToken('jobs'),
      useValue: TestJobModel,
    }
  ];

  const mockedFullResponseDto: FullResponseDto = {
    title: 'test-job',
    status: jobStatusEnum.open,
    location: 'test-location',
    desc: 'test-description',
  }

  const mockedCreateJobDto: CreateJobDto = {
    title: 'test-job',
    status: jobStatusEnum.open,
    location: 'test-location',
    desc: 'test-description',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...mockProviders, JobService],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJob', () => {
    describe('happy case', () => {
      it('should create a job', async () => {
        // Test here
        TestJobModel.create.mockImplementation((mockedCreateJobDto) => ({
          save: jest.fn(),
        }));
        const res = await service.createJob(mockedCreateJobDto);

        expect(res).toBeDefined();
      })
    })
  });
});
