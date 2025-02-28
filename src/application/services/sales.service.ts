import { Injectable } from "@nestjs/common";
import { HanaSalesAdapter } from "src/infrastructure/adapters/hanaSales.adapter";

@Injectable()
export class SalesService {
    constructor(private readonly hanaAdapter: HanaSalesAdapter) { }

    async SaleOrder(DocNum: number) {
        try {
            return await this.hanaAdapter.QuerySaleOrderByDocNum(DocNum);
        } catch (error) {
            throw new Error(`Error! ${error.message}`);
        }
    }
}