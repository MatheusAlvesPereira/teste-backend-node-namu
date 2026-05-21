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
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramResponseDto } from './dto/program-response.dto';
import { ProgramSummaryDto } from './dto/program-summary.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramsService } from './programs.service';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a wellness program' })
  @ApiCreatedResponse({ type: ProgramResponseDto })
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List programs with pagination' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.programsService.findAll(query.page, query.limit);
  }

  @Get(':programId/summary')
  @ApiOperation({
    summary: 'Program report: activities, participations and top users',
  })
  @ApiOkResponse({ type: ProgramSummaryDto })
  getSummary(@Param('programId', ParseIntPipe) programId: number) {
    return this.programsService.getSummary(programId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiOkResponse({ type: ProgramResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiOkResponse({ type: ProgramResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgramDto,
  ) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete program' })
  @ApiNoContentResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.remove(id);
  }
}
