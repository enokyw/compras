import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ComprasService } from '../../application/services/compras.service';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('PurchaseRequests')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Purchase Requests' })
  async findPurchaseRequests(
    @Query() purchaseRequestsDto: PurchaseRequestsDto,
  ) {
    return await this.comprasService.findPurchaseRequests(purchaseRequestsDto);
  }
}