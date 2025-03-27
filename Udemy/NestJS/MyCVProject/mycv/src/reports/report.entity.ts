import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
