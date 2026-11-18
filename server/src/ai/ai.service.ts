import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ExtractedAddressResult {
  customerName: string;
  customerPhone: string;
  fullAddress: string;
  district?: string;
  thana?: string;
  area?: string;
  landmark?: string;
  codAmount: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async extractAddress(rawMessage: string): Promise<ExtractedAddressResult> {
    if (this.openai && this.configService.get<string>('OPENAI_API_KEY')) {
      try {
        return await this.extractWithLLM(rawMessage);
      } catch (err) {
        this.logger.error('Failed to extract via OpenAI, falling back to heuristic extractor', err);
      }
    }
    return this.heuristicExtraction(rawMessage);
  }

  private async extractWithLLM(rawMessage: string): Promise<ExtractedAddressResult> {
    const prompt = `You are an expert AI parser specialized in Bangladeshi F-commerce customer messages.
Customers write order details in informal Bangla or Banglish with missing thana/district, spelling mistakes, and colloquial landmarks.

Extract the details and return ONLY a valid JSON object matching this schema:
{
  "customerName": "string (name of customer)",
  "customerPhone": "string (valid 11-digit Bangladeshi mobile number e.g. 017XXXXXXXX)",
  "fullAddress": "string (formatted clean address)",
  "district": "string (e.g. Dhaka, Chittagong, Sylhet)",
  "thana": "string (police station / upazila e.g. Mirpur, Dhanmondi, Uttara)",
  "area": "string (neighborhood, road, block, sector)",
  "landmark": "string (e.g. near mosque, behind school, 3rd floor)",
  "codAmount": number (cash on delivery amount in BDT, 0 if not specified),
  "confidence": "HIGH" | "MEDIUM" | "LOW" (HIGH if phone and thana/district are clear, MEDIUM if thana is inferred, LOW if phone or address is missing/ambiguous)
}

Customer raw message:
"""${rawMessage}"""`;

    const response = await this.openai!.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a precise address extraction engine that outputs only valid JSON.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from AI');
    }

    const parsed = JSON.parse(content);
    return {
      customerName: parsed.customerName || 'Customer',
      customerPhone: this.normalizePhone(parsed.customerPhone || ''),
      fullAddress: parsed.fullAddress || rawMessage,
      district: parsed.district || 'Dhaka',
      thana: parsed.thana || '',
      area: parsed.area || '',
      landmark: parsed.landmark || '',
      codAmount: Number(parsed.codAmount) || 0,
      confidence: parsed.confidence || 'MEDIUM',
    };
  }

  private heuristicExtraction(rawMessage: string): ExtractedAddressResult {
    // Regex for Bangladeshi mobile number: 013-019 followed by 8 digits
    const phoneMatch = rawMessage.match(/(?:(?:\+?880|0)\s*1[3-9]\d{2}[\s-]?\d{6})/);
    const phone = phoneMatch ? this.normalizePhone(phoneMatch[0]) : '';

    // COD amount detection (e.g., 1200 taka, 1200tk, tk 1200)
    const codMatch = rawMessage.match(/(\d{3,5})\s*(?:tk|taka|টাকা|bdt)?/i);
    const cod = codMatch ? Number(codMatch[1]) : 0;

    return {
      customerName: 'Extracted Lead',
      customerPhone: phone,
      fullAddress: rawMessage.replace(/\n+/g, ', ').trim(),
      district: 'Dhaka',
      thana: 'Mirpur',
      area: '',
      landmark: '',
      codAmount: cod,
      confidence: phone ? 'MEDIUM' : 'LOW',
      notes: 'Extracted via fallback parser',
    };
  }

  private normalizePhone(phone: string): string {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('880')) {
      return cleaned.slice(2);
    }
    return cleaned;
  }
}
