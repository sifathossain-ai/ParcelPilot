import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false, nullable: true })
  passwordHash?: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  fullName: string;

  @Column({ type: 'varchar', length: 100, default: 'My Shop' })
  shopName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'varchar', length: 20, default: 'local' })
  provider: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
