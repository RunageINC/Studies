import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async create(createReportBody: CreateOrReadReportBody, user: User) {
    const reportInstance = this.reportsRepository.create(createReportBody);

    reportInstance.user = user;

    return await this.reportsRepository.save(reportInstance);
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('No ID was provided');
    }

    return this.reportsRepository.findOneBy({ id });
  }

  async createEstimate(query: GetEstimateQuery) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('longitude - :longitude BETWEEN -5 and 5', {
        longitude: query.longitude,
      })
      .andWhere('latitude - :latitude BETWEEN -5 and 5', {
        latitude: query.latitude,
      })
      .andWhere('year - :year BETWEEN -3 and 3', {
        year: query.year,
      })
      .andWhere('approved IS TRUE ')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawMany();
  }

  async changeApproval(id: number, approveReportBody: ApproveReportBody) {
    const report = await this.findOne(id);

    if (!report) throw new NotFoundException('Report not found');

    report.approved = approveReportBody.approved;

    return await this.reportsRepository.save(report);
  }
}
