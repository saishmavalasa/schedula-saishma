import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private users: any[] = [];

    constructor(private jwtService: JwtService) { }

    async signup(body: any) {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        };

        this.users.push(user);

        return {
            message: 'User registered successfully',
        };
    }

    async login(body: any) {
        const user = this.users.find(
            (u) => u.email === body.email,
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(
            body.password,
            user.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            email: user.email,
            role: user.role,
        });

        return {
            access_token: token,
        };
    }
}