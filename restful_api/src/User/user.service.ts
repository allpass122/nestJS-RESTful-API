import { BadRequestException, Injectable, Param } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}
const users: User[] = [];

@Injectable()
export class UserService {
  createUser(param): string {
    if (users.find((u) => u.email === param.email) !== undefined) {
      let id = users.find((u) => u.email === param.email).id;
      throw new BadRequestException(`This email exist ${id}`);
    }
    const newUser: User = {
      id: Date.now(),
      name: param.name,
      email: param.email,
    };
    users.push(newUser);
    return `create user success, id:${newUser.id}`;
  }

  getUserById(id): string {
    if (Number(id) === -1) {
      return JSON.stringify(users);
    }
    if (users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (users.find((u) => u.id === Number(id)) !== undefined) {
      // console.log(users.find((u) => u.id === Number(id)));
      return JSON.stringify(users.find((u) => u.id === Number(id)));
    } else {
      throw new BadRequestException(`User not found`);
    }
  }

  queryByNameOrEmail(query): string {
    if (!query.name && !query.email) {
      throw new BadRequestException(`Query one of name/email`);
    } else if (!query.name && query.email) {
      return JSON.stringify(users.find((u) => u.email === query.email));
    } else if (query.name && !query.email) {
      return JSON.stringify(users.filter((u) => u.name === query.name));
    } else if (query.name && query.email) {
      throw new BadRequestException(`Only allow query one of name/email`);
    }
    return '';
  }

  userEdit(id, update): string {
    if (users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (users.find((u) => u.id === Number(id)) !== undefined) {
      if (users.find((u) => u.email === update.email)) {
        throw new BadRequestException(`This email exist`);
      } else {
        users.find((u) => u.id === Number(id)).email = update.email;
        users.find((u) => u.id === Number(id)).name = update.name;
        return JSON.stringify(users.find((u) => u.id === Number(id)));
      }
    } else {
      throw new BadRequestException(`User not found`);
    }
  }

  userDelete(id): string {
    if (users.length === 0) {
      throw new BadRequestException(`User not found`);
    }
    if (users.find((u) => u.id === Number(id)) !== undefined) {
      const tmp = users.find((u) => u.id === Number(id));
      users.splice(
        users.findIndex((u) => u.id === Number(id)),
        1,
      );
      return JSON.stringify(tmp);
    } else {
      throw new BadRequestException(`User not found`);
    }
  }
}
