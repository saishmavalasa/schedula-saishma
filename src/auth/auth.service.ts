import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async signup(body: SignupDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = this.userRepository.create({
        const user = this.userRepository.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        });
        });

        await this.userRepository.save(user);
        await this.userRepository.save(user);

        return {
            message: 'User registered successfully',
        };
    }

    async login(body: LoginDto) {
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

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}