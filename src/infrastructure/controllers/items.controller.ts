import { Controller, Get, Query } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ItemsService } from "src/application/services/items.service";
import { ItemsDto } from "src/domain/items.dto";

@Controller('Items')
export class ItemsController {
    constructor(private readonly itemsService:ItemsService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Items' })
    async findItems(@Query() itemsDto: ItemsDto) {
        return await this.itemsService.findItems(itemsDto);
    }
}