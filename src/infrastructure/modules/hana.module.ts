import { Module } from "@nestjs/common";
import { HanaService } from "src/application/services/hana.service";
import { HanaAdapter } from "../adapters/hana.adapter";

@Module({
    providers: [HanaService, HanaAdapter],
    exports: [HanaService, HanaAdapter],
})
export class HanaModule {}