export type consoleColor = {
    red: string[];
    green:string[];
}

export type UserTypes = {
    username:string;
    email:string;
    password:string;
    role:string;
}

export interface UserRow{
    // id:any;
    email:string;
    username:string;
    password:string;
    role:string;
}