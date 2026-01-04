import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  async saveReport(
    @Body() createReportBody: CreateReportDto,
    @CurrentUser() user: User,
  ) {
    return await this.reportsService.create(createReportBody, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async updateReport(
    @Param('id') id: string,
    @Body() approveReportBody: ApproveReportDto,
  ) {
    const numericId = parseInt(id);

    return await this.reportsService.changeApproval(
      numericId,
      approveReportBody,
    );
  }
}
