export enum Role {
    Admin = "Admin",
    client = "User",
}

export type consoleColor = {
    red: string[];
    green:string[];
}

export type UserTypes = {
    username:string;
    email:string;
    password:string;
    role:Role;
}

export interface UserRow{
    // id:any;
    email:string;
    username:string;
    password:string;
    role:Role;
}