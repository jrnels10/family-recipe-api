import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.respository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  private client: ClientProxy;

  constructor(
    @InjectRepository(UserRepository)
    private userepository: UserRepository,
    private jwtService: JwtService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877
      }
    });
  }
  accumulate(data: number[]) {
    return this.client.send<number, number[]>('add', data)
  }
  signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userepository.signUp(authcredentialsDto);
  }

  async signin(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.userepository.validateUserPassword(
      authSignInCredentialsDto,
    );
    if (!user.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Genereate JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken, user };
  }

  async findByPayLoad(payload: any) {
    const { userId } = payload;
    return await this.userepository.findOne({ id: userId });
  }
}
