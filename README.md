# nextJS-RESTful-API

# Install

yarn install 後還是少 package

> npm install @nestjs/common
> npm install @nestjs/core
> npm install class-validator
> 如果還有缺什麼就裝什麼！！！

# Test

I use `postman` to test my api.
Curl is okay in normal situation, but it is recommend for you using postman.

# Basic

In `user.module.ts`, `user.service.ts`
Please run under api/, eg. `http://localhost:3000/api` `http://localhost:3000/api/?name=Mary`

- Create User(POST):

1. If you send a post request with body formatted like {"name":"Mary", "email": "abc@gmail.com"}, you will create a user. Otherwise, get Bad Request.
2. "name" can not be null.
3. If email is not accepted by regex, get Bad Request.
4. User id is given by Date.now().
5. If email is exist, get Bad Request with message "email exist".

- Get a User By ID:

1. If ID is not exist, get Bad Request with message "User not found".
   > Special function:
   > To convenience testing and debugging. If id = -1, system will print ALL users.

- Query a User By Email or Name:

1. not allow query both.
2. email also need to be accepted by regex.
3. query nothing will get Bad Request, too.

- Edit User

1. Email need to match regex.
2. If ID (user) not exist, get Bad Request.
3. If update email exist ( including email not change, which is meaningless ), get Bad Request. Because our system only accept an email once.

- Delete User

1. If ID (user) not exist, get Bad Request.
