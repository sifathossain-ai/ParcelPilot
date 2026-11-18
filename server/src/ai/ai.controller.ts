import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ExtractAddressDto } from './dto/extract-address.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('extract')
  async extract(@Body() dto: ExtractAddressDto) {
    return this.aiService.extractAddress(dto.rawMessage);
  }
}
