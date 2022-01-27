export interface User {
    login: string,
    password: string
}

export interface Book_role {
    id?: string,
    name: string
}

export interface Roles {
    id?: string,
    user: User,
    role: string
}

export interface Office {
    name: string
}