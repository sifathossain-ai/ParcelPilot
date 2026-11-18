import { Controller, Post, Body } from '@nestjs/common';
import { CourierService } from './courier.service';
import { BookCourierDto } from './dto/book-courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post('book')
  async book(@Body() dto: BookCourierDto) {
    return this.courierService.bookCourier(dto);
  }
}
