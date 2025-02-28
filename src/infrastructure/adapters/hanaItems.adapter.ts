import { Injectable } from "@nestjs/common";
import { HanaService } from "src/application/services/hana.service";

@Injectable()
export class HanaItemsAdapter {
    constructor(private readonly hanaservice: HanaService) { }

    async queryItems() {
        const items = await this.hanaservice.query(`
            SELECT
                *
            FROM OITM
            LIMIT 10
        `);
        if(Array.isArray(items) && items.length) {
            return {
                data: items,
                meta: {
                    page: 1,
                    totalPages: 1,
                    totalRecords: items.length
                }
            }
        }
        return {
            data: [],
            meta: {
                page: 1,
                totalPages: 1,
                totalRecords: 0
            }
        };
    }
}