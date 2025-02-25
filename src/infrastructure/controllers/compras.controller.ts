import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ComprasService } from '../../application/services/compras.service';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { PaginationDto } from 'src/domain/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('PurchaseRequests')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Purchase Requests' })
  async findPurchaseRequests(
    @Headers('SessionId') sessionId: string,
    @Query() purchaseRequestsDto: PurchaseRequestsDto,
    @Query() paginationDto: PaginationDto
  ) {
    if (!sessionId) {
      return 'SessionId is invalid';
    }
    return await this.comprasService.findPurchaseRequests(sessionId, purchaseRequestsDto, paginationDto);
  }
}