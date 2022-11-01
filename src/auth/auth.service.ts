import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/app/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.usr_id, usr_email: user.usr_email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

    async validateUser(email: string, password: string) {
        let user: UsersEntity;
        try {
            user = await this.userService.findOneOrFail({ usr_email:email });
        } catch (error) {
            return null;
        }
        return user;
    }
}
