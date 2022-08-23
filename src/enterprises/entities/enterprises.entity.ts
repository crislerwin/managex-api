import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Enterprise extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  enterpriseName: string;

  @Column({ nullable: true })
  socialReason: string;

  @Column({ nullable: true })
  sponsorName: string;

  @ManyToOne(() => Address, {
    eager: true,
  })
  address: Address | null;

  @Column({ nullable: true })
  employees: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
