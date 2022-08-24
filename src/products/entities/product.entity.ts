import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Product extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enterpriseId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  price: number | null;

  @Column({ nullable: true })
  isOffer: boolean | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
