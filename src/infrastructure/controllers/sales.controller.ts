import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SalesService } from "src/application/services/sales.service";

@Controller('SaleOrders')
export class SalesController {
    constructor(private readonly salesService:SalesService) {}

    @Get(':DocNum')
    @ApiResponse({ status: 200, description: 'Sale Order' })
    async findSaleOrderByDocNum(@Param('DocNum') DocNum: number) {
        const result = await this.salesService.SaleOrder(DocNum);
        if (!result) {
            throw new HttpException('Sale Order not found!', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}