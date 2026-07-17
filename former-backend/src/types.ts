import type { JwtPayload } from 'jsonwebtoken';
import type { Request } from 'express';

export type Token = {
    id: number;
};

export type TokenRequest = Request & { token?: Token | JwtPayload };
