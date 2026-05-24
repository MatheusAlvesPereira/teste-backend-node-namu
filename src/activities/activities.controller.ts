import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ActivitiesService } from './activities.service';
import { ActivityResponseDto } from './dto/activity-response.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activities')
@Controller('programs/:programId/activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create activity for a program' })
  @ApiCreatedResponse({ type: ActivityResponseDto })
  create(
    @Param('programId', ParseIntPipe) programId: number,
    @Body() dto: CreateActivityDto,
  ) {
    return this.activitiesService.create(programId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List activities of a program' })
  findAll(
    @Param('programId', ParseIntPipe) programId: number,
    @Query() query: PaginationQueryDto,
  ) {
    return this.activitiesService.findAllByProgram(
      programId,
      query.page,
      query.limit,
    );
  }

  @Get(':activityId')
  @ApiOperation({ summary: 'Get activity by id' })
  @ApiOkResponse({ type: ActivityResponseDto })
  findOne(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('activityId', ParseIntPipe) activityId: number,
  ) {
    return this.activitiesService.findOne(programId, activityId);
  }

  @Patch(':activityId')
  @ApiOperation({ summary: 'Update activity' })
  @ApiOkResponse({ type: ActivityResponseDto })
  update(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('activityId', ParseIntPipe) activityId: number,
    @Body() dto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(programId, activityId, dto);
  }

  @Delete(':activityId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete activity' })
  @ApiNoContentResponse()
  remove(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('activityId', ParseIntPipe) activityId: number,
  ) {
    return this.activitiesService.remove(programId, activityId);
  }
}
