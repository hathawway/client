export interface User {
    login: string,
    password: string
}

export interface BookRole {
    id?: string,
    name: string
}

export interface Roles {
    id?: string,
    user: User,
    role: string
}

export interface BookOffice {
    id: string,
    name: string
}

export interface BookPost {
    id?: string,
    name: string
}

export interface Message {
    error: any;
    message: string
}