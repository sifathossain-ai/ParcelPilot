import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookCourierDto {
  @IsString()
  @IsNotEmpty({ message: 'Order ID is required' })
  orderId: string;

  @IsString()
  @IsNotEmpty({ message: 'Courier name is required (e.g. Steadfast)' })
  courierName: string;

  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  recipientPhone: string;

  @IsString()
  @IsNotEmpty()
  recipientAddress: string;

  @IsNumber()
  codAmount: number;

  @IsOptional()
  @IsString()
  note?: string;
}
