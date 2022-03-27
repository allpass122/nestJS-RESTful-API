# nextJS-RESTful-API

# Install

yarn install 後還是少 package

> npm install @nestjs/common
> npm install @nestjs/core
> npm install class-validator
> 如果還有缺什麼就裝什麼！！！

對沒錯！我一開始用 yarn 裝不好最後用 npm 才過，所以變混用了．

# Run

under dir: restful_api, `yarn start: dev`

# Test

I use `postman` to test my api.
Curl is okay in normal situation, but it is recommend for you using postman.

# Basic

In `user.module.ts`, `user.service.ts`
Please run under `/api`, eg. `http://localhost:3000/api` `http://localhost:3000/api/?name=Mary`

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
3. If update email exist , get Bad Request. Because our system only accept an email once.

- Delete User

1. If ID (user) not exist, get Bad Request.

# Bonus

Please run under `/enroll`.

其實還可以分 Course 類別，礙於時間問題加上 Courses 是 readonly，所以只有寫 Enrollment， course 則是裡面的一般物件．
大部分要求按照 spec 去做，有不一樣或是我覺得必要加入的設定會額外補充在下面

- Get Enroll By Enroll Id
  > Special function:
  > To convenience testing and debugging. If id = -1, system will print ALL enrolls.
  > The same with NO query string in Requirement 10.
- 同一個 userId 不該重複 enroll 同一個 course
- Requirement 10 中三種參數為 ＆ 關係，如果找不到符合條件的 enrollments 會直接回傳空的 array. 不會 Bad Request.

# Advance

- 增加 `app.middleware.ts` 去做 authorization 的控制
- 並且修改 user.module enrollment.module 控制哪些 path 哪些 request 要進去 middleware.

# API 總整理

因為打完前面 readme 後還是覺得有點亂，我按照 requirement 順序整理一次 API 的呼叫方法．

## Basic(/api)

1. createUser: `http://localhost:3000/api`, method:`POST`, body need JSON type user data, return create user.
2. getUserById: `http://localhost:3000/api/<id>`, method:`GET`, return an user.
3. queryByNameOrEmail: `http://localhost:3000/api/?email=<email>&name=<name>`, method:`GET`, return query result.
4. userEdit: `http://localhost:3000/api/<id>`, method:`PUT`, body need JSON type user data, return edited data.
5. userDelete: `http://localhost:3000/api/<id>`, method:`DELETE`, return deleted data.
   > JSON type user data example: {"name":"Mary1234", "email": "ABC@gmail.com"}

## Bonus(/enroll)

6. getUserByCourseId: `http://localhost:3000/enroll/course/<course-id>/user`, method:`GET`, return users.
7. createEnroll: `http://localhost:3000/enroll/`, method:`POST`, body need JSON type enroll data, return new enroll.
8. enrollDelete: `http://localhost:3000/enroll/<enroll-id>`, method:`DELETE`, return deleted data.
9. getEnrollById: `http://localhost:3000/enroll/<enroll-id>`, method:`GET`, return an enroll.
10. queryEnroll: `http://localhost:3000/enroll/?role=<student | teacher>&userId=<user-id>&courseId=<course-id>`, method:`GET`, return query result.
11. getCourseByCourseId: `http://localhost:3000/enroll/course/<course-id>`, method:`GET`, return a course.
12. getCourseByUserId: `http://localhost:3000/enroll/user/<user-id>/course`, method:`GET`, return courses.
    > JSON type enroll data example: {"userId": 1648369580222, "courseId": 3, "role": "student"}

## Advance

因為有寫 advance 1 4 5 7 8 要在 bearer token 才會過．
