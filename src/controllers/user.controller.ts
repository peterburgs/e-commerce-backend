import {inject} from "@loopback/core";
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where,
} from "@loopback/repository";
import {UserServiceBindings} from "@loopback/authentication-jwt";
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from "@loopback/rest";
import {User} from "../models";
import {UserRepository} from "../repositories";
import hashPassword from "../utils/hashPassword";

export class UserController {
  constructor(
    @inject(UserServiceBindings.USER_REPOSITORY)
    public userRepository: UserRepository,
  ) {}

  @post("/users")
  @response(201, {
    description: "User model instance",
    content: {"application/json": {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {
            title: "NewUser",
            exclude: ["id"],
          }),
        },
      },
    })
    user: Omit<User, "id">,
  ): Promise<User> {
    const dbUser = await this.userRepository.find({
      where: {
        email: user.email,
      },
    });
    if (dbUser.length === 0) {
      user.hashedPassword = await hashPassword(user.hashedPassword);
      return this.userRepository.create(user);
    }
    throw new Error("Email already existed");
  }

  @get("/users/count")
  @response(200, {
    description: "User model count",
    content: {"application/json": {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get("/users")
  @response(200, {
    description: "Array of User model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch("/users")
  @response(200, {
    description: "User PATCH success count",
    content: {"application/json": {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get("/users/{id}")
  @response(200, {
    description: "User model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(User, {exclude: "where"}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch("/users/{id}")
  @response(204, {
    description: "User PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put("/users/{id}")
  @response(204, {
    description: "User PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del("/users/{id}")
  @response(204, {
    description: "User DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
