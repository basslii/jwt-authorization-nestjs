import { IUser } from "./user.entity"

export class CreateUserDto implements IUser {
    id: number

    username: string

    password: string

    email: string
}