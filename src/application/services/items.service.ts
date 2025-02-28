import { Injectable } from "@nestjs/common";
import { ItemsDto } from "src/domain/items.dto";
import { HanaItemsAdapter } from "src/infrastructure/adapters/hanaItems.adapter";

@Injectable()
export class ItemsService {
    constructor(private readonly hanaAdapter: HanaItemsAdapter) { }
    async findItems(itemsDto: ItemsDto) {
        try {
            return await this.hanaAdapter.queryItems(itemsDto);
        } catch (error) {
            throw new Error(`Error! ${error.message}`);
        }
    }
}