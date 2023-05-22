export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
}

export class User implements IUser {
    constructor(
        id?: number,
        email?: string,
        password?: string,
        username?: string,
    ) { }
}