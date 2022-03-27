import { BadRequestException, Injectable, Param } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  users: User[] = [];

  // requirements 1
  createUser(param): any {
    if (this.users.find((u) => u.email === param.email) !== undefined) {
      const id = this.users.find((u) => u.email === param.email).id;
      throw new BadRequestException(`This email exist ${id}`);
    }
    const newUser: User = {
      id: Date.now(),
      name: param.name,
      email: param.email,
    };
    this.users.push(newUser);
    return newUser;
  }

  // requirements 2
  getUserById(id): any {
    if (Number(id) === -1) {
      return this.users;
    }
    if (this.users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (this.users.find((u) => u.id === Number(id)) !== undefined) {
      // console.log(users.find((u) => u.id === Number(id)));
      return this.users.find((u) => u.id === Number(id));
    } else {
      throw new BadRequestException(`User not found`);
    }
  }

  // requirements 3
  queryByNameOrEmail(query): any {
    if (!query.name && !query.email) {
      throw new BadRequestException(`Query one of name/email`);
    } else if (!query.name && query.email) {
      return this.users.find((u) => u.email === query.email);
    } else if (query.name && !query.email) {
      return this.users.filter((u) => u.name === query.name);
    } else if (query.name && query.email) {
      throw new BadRequestException(`Only allow query one of name/email`);
    }
    return '';
  }

  // requirements 4
  userEdit(id, update): any {
    if (this.users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (this.users.find((u) => u.id === Number(id)) !== undefined) {
      if (
        this.users
          .filter((u) => u.id !== Number(id))
          .find((u) => u.email === update.email)
      ) {
        throw new BadRequestException(`This email exist`);
      } else {
        this.users.find((u) => u.id === Number(id)).email = update.email;
        this.users.find((u) => u.id === Number(id)).name = update.name;
        return this.users.find((u) => u.id === Number(id));
      }
    } else {
      throw new BadRequestException(`User not found`);
    }
  }

  // requirements 5
  userDelete(id): any {
    if (this.users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (this.users.find((u) => u.id === Number(id)) !== undefined) {
      const tmp = this.users.find((u) => u.id === Number(id));
      this.users.splice(
        this.users.findIndex((u) => u.id === Number(id)),
        1,
      );
      return tmp;
    } else {
      throw new BadRequestException(`User not found`);
    }
  }
}
