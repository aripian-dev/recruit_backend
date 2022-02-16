import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery} from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto, FullResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('jobs')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FullResponseDto,
    description: 'Job created successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiBody({
    type: CreateJobDto,
    required: true,
  })
  async createJob(@Body() createJobDto: CreateJobDto): Promise<CreateJobDto> {
    return await this.jobService.createJob(createJobDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [FullResponseDto],
    description: 'Job list found successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job list not found',
  })
  async findAllJobList(): Promise<FullResponseDto[]> {
    return await this.jobService.findAllJobs();
  }

  @Get('get-by-name/:name')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [FullResponseDto],
    description: 'Job list found successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job list not found',
  })
  async findOneJobDetailbyName(@Param('name') name: string): Promise<FullResponseDto[]>{
    return await this.jobService.findJobByName(name);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FullResponseDto,
    description: 'Job details found successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job details not found',
  })
  async findOneJobDetail(@Param('id') id: string): Promise<FullResponseDto>{
    return await this.jobService.findOneJob(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FullResponseDto,
    description: 'Job updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiBody({
    type: CreateJobDto,
    required: true,
  })
  async updateJobDetail(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<FullResponseDto> {
    return await this.jobService.updateJob(id, updateJobDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FullResponseDto,
    description: 'Job details found successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job details not found',
  })
  async deleteJob(@Param('id') id: string): Promise<String> {
    return await this.jobService.deleteJob(id);
  }
}
