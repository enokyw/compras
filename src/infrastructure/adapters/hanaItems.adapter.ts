import { Injectable } from "@nestjs/common";
import { HanaService } from "src/application/services/hana.service";
import { ItemsDto } from "src/domain/items.dto";

@Injectable()
export class HanaItemsAdapter {
    constructor(private readonly hanaservice: HanaService) { }

    async queryItems(itemsDto: ItemsDto) {
        const { page=1, limit=10 } = itemsDto;
        const [count, items] = await Promise.all([
            this.hanaservice.query(`SELECT COUNT(*) AS "total" FROM OITM`),
            this.hanaservice.query(`
                SELECT
                    *
                FROM OITM
                ORDER BY "ItemCode"
                LIMIT ${limit} OFFSET ${(page - 1) * limit}
            `)
        ]);

        if(Array.isArray(items) && items.length && count?.[0]) {
            return {
                data: items,
                meta: {
                    page,
                    totalPages: Math.ceil(count[0]?.total / limit),
                    totalRecords: count[0]?.total
                }
            }
        }
        return {
            data: [],
            meta: {
                page,
                totalPages: 0,
                totalRecords: 0
            }
        };
    }
}