import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../model/item.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Person } from '../../model/person.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class PersonService {

  constructor(@InjectRepository(Person) private readonly repository: Repository<Person>) {
  }

  public async add(person: Person) {
    let existedPersons = await this.repository.findBy({email : person.email});
    if(existedPersons.length > 0){
      throw new HttpException('email already linked to an account please, please log in', 400)
    }
    return await this.repository.save(this.repository.create(person));
  }

  public async findByEmail(email: string) {
    return await this.repository.findBy({email : email})
  }

}
