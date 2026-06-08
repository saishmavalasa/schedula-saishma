import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async signup(body: any) {
        const existingUser = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = this.userRepository.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        });

        await this.userRepository.save(user);

        return {
            message: 'User registered successfully',
        };
    }

    async login(body: any) {
        const user = await this.userRepository.findOne({
            where: { email: body.email },
        });

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
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            access_token: token,
        };
    }
}