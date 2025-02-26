import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SalesService } from "src/application/services/sales.service";

@Controller('SaleOrders')
export class SalesController {
    constructor(private readonly salesService:SalesService) {}

    @Get(':DocNum')
    @ApiResponse({ status: 200, description: 'Sale Order' })
    async findSaleOrderByDocNum(@Param('DocNum') DocNum: number) {
        return await this.salesService.SaleOrder(DocNum);
    }
}