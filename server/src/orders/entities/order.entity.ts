import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  READY_TO_BOOK = 'READY_TO_BOOK',
  BOOKED = 'BOOKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text' })
  rawMessage: string;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column({ type: 'text' })
  fullAddress: string;

  @Column({ nullable: true })
  thana: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  landmark: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  codAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveryCharge: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.READY_TO_BOOK,
  })
  status: OrderStatus;

  @Column({ nullable: true })
  courierName: string;

  @Column({ nullable: true })
  trackingCode: string;

  @Column({ nullable: true })
  consignmentId: string;

  @Column({ nullable: true })
  aiConfidence: string; // HIGH, MEDIUM, LOW

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
