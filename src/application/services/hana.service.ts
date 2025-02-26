import * as hana from '@sap/hana-client';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import 'dotenv/config';

const DB_PARAMS = {
    serverNode: process.env.SERVICE_NODE!,
    uid: 'system',
    pwd: 'AtTu2AUC',
    //encrypt: 'true',
    currentSchema: 'Z_ZPRUEBA_MP3012212000'
}

@Injectable()
export class HanaService implements OnModuleInit, OnModuleDestroy {
    private connection: hana.Connection;
    private readonly logger = new Logger(HanaService.name);

    async onModuleInit() {
        try {
            this.connection = hana.createConnection();
            this.connection.connect({ ...DB_PARAMS });
            
            this.logger.log('Connected to HANA');
        } catch (error) {
            this.logger.error('Failed to connect to HANA', error);
        }
    }

    async query(query: string) {
        try {
            return await this.executeQuery(query);
        }
        catch(error) {
            this.logger.error('Failed to execute query', error);
            throw error;
        }
    }

    private async executeQuery(query: string) {
        return new Promise((resolve, reject) => {
            this.connection.exec(query, (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        });
    }

    async onModuleDestroy() {
        if(this.connection) {
            this.connection.disconnect();
            this.logger.log('Disconnected from HANA');
        }
    }
}