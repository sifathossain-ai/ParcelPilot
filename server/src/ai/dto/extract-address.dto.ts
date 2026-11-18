import { IsNotEmpty, IsString } from 'class-validator';

export class ExtractAddressDto {
  @IsString()
  @IsNotEmpty({ message: 'Raw message text is required' })
  rawMessage: string;
}
