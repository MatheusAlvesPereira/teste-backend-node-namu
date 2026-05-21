import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { ParticipationResponseDto } from './dto/participation-response.dto';
import { ParticipationsService } from './participations.service';

@ApiTags('participations')
@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  @ApiOperation({ summary: 'Register user activity completion' })
  @ApiCreatedResponse({ type: ParticipationResponseDto })
  create(@Body() dto: CreateParticipationDto) {
    return this.participationsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List participations with pagination' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.participationsService.findAll(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get participation by id' })
  @ApiOkResponse({ type: ParticipationResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participationsService.findOne(id);
  }
}
