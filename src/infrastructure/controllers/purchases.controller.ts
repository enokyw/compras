import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { PurchasesService } from '../../application/services/purchases.service';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('PurchaseRequests')
export class PurchasesController {
    constructor(private readonly comprasService: PurchasesService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Purchase Requests' })
    async findPurchaseRequests(
        @Query() purchaseRequestsDto: PurchaseRequestsDto,
    ) {
        return await this.comprasService.findPurchaseRequests(purchaseRequestsDto);
    }

    @Get(':DocNum')
    @ApiResponse({ status: 200, description: 'Purchase Request' })
    async findPurchaseRequestByDocNum(@Param('DocNum') DocNum: number) {
        const result = await this.comprasService.findPurchaseRequestByDocNum(DocNum);
        if (!result) {
            throw new HttpException('Purchase Request not found!', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}