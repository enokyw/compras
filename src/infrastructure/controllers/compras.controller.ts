import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ComprasService } from '../../application/services/compras.service';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { PaginationDto } from 'src/domain/pagination.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
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
