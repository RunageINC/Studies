import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }: { obj: { user: User } }) => obj.user.id)
  @Expose()
  userId: number;
}
