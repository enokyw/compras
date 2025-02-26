import { Module } from "@nestjs/common";
import { SalesController } from "../controllers/sales.controller";
import { SalesService } from "../../application/services/sales.service";
import { HanaModule } from "./hana.module";
import { HanaSalesAdapter } from "../adapters/hanaSales.adapter";

@Module({
    imports: [HanaModule],
    controllers: [SalesController],
    providers: [SalesService, HanaSalesAdapter],
})
export class SalesModule {}