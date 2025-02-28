import { Injectable } from "@nestjs/common";
import { HanaItemsAdapter } from "src/infrastructure/adapters/hanaItems.adapter";

@Injectable()
export class ItemsService {
    constructor(private readonly hanaAdapter: HanaItemsAdapter) { }
    async findItems() {
        try {
            return await this.hanaAdapter.queryItems();
        } catch (error) {
            throw new Error(`Error! ${error.message}`);
        }
    }
}