import { Body, Controller, Get, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { Person } from '../../model/person.entity';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../auth.guard';
import { AccessToken } from '../../model/accessToken';

@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService, private jwtService: JwtService) {
  }

  @Public()
  @Post()
  @ApiCreatedResponse({ type: Person })
  public async add(@Body() person: Person) {
    return this.service.add(person);
  }

  @Public()
  @HttpCode(200)
  @Post('authenticate')
  public async authenticate(@Body() person: Person) {
    let personToAuthenticate: Person[] = await this.service.findByEmail(person.email);
    if (personToAuthenticate.length == 0 || personToAuthenticate[0].password !== person.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: person.id, email: person.email };
    return new AccessToken(await this.jwtService.signAsync(payload))
  }
}
