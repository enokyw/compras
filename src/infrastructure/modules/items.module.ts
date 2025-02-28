import { Module } from "@nestjs/common";
import { ItemsController } from "../controllers/items.controller";
import { HanaModule } from "./hana.module";
import { ItemsService } from "src/application/services/items.service";
import { HanaItemsAdapter } from "../adapters/hanaItems.adapter";

@Module({
    imports: [HanaModule],
    controllers: [ItemsController],
    providers: [ItemsService, HanaItemsAdapter],
})
export class ItemsModule { }