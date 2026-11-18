import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CourierService } from '../courier/courier.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly courierService: CourierService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      status: OrderStatus.READY_TO_BOOK,
      codAmount: createOrderDto.codAmount || 0,
      deliveryCharge: 70.0,
    });
    return this.orderRepository.save(order);
  }

  async findAll(userId?: string): Promise<Order[]> {
    if (userId) {
      return this.orderRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    }
    return this.orderRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { success: true };
  }

  async dispatchToCourier(id: string, courierName: string = 'Steadfast Courier'): Promise<Order> {
    const order = await this.findOne(id);

    const bookingResult = await this.courierService.bookCourier({
      orderId: order.id,
      courierName: courierName,
      recipientName: order.customerName,
      recipientPhone: order.customerPhone,
      recipientAddress: order.fullAddress,
      codAmount: Number(order.codAmount),
      note: 'ParcelPilot order delivery',
    });

    order.courierName = bookingResult.courierName;
    order.trackingCode = bookingResult.trackingCode;
    order.consignmentId = bookingResult.consignmentId;
    order.deliveryCharge = bookingResult.deliveryCharge;
    order.status = OrderStatus.BOOKED;

    return this.orderRepository.save(order);
  }
}
