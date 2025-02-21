import { Injectable } from '@nestjs/common';
import { SAPAdapter } from '../../infrastructure/adapters/sap.adapter';
import { AuthDto } from 'src/domain/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly sapAdapter: SAPAdapter) { }

    async login(authDto: AuthDto) {
        const auth = await this.sapAdapter.authenticate(authDto);
        if (!auth) {
            throw new Error('Credenciales incorrectas');
        }
        const { SessionTimeout, SessionId } = auth;

        return { SessionId, SessionTimeout };
    }
}