import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ItemsService } from "src/application/services/items.service";

@Controller('Items')
export class ItemsController {
    constructor(private readonly itemsService:ItemsService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Items' })
    async findItems() {
        return await this.itemsService.findItems();
    }
}