import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

@Module({
  imports: [ConfigModule],
  controllers: [CourierController],
  providers: [CourierService],
  exports: [CourierService],
})
export class CourierModule {}
