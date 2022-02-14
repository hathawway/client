export interface User {
    id: string,
    login: string,
    password: string,
    first: string,
    second: string,
    third: string,
    office: BookOffice,
    post: BookPost,
    work: BookWork,
    status: BookStatus,
    stepen: BookStepen,
    zvanie: BookZvanie,
    tel: string,
    email:string

}

export interface BookRole {
    id: string,
    name: string
}

//хз зачем это мне пока что
export interface Roles {
    id: string,
    user: User,
    role: string
}

export interface BookOffice {
    id: string,
    name: string
}

export interface BookPost {
    id: string,
    name: string
}

export interface BookWork {
    id: string,
    name: string
}

export interface BookStatus {
    id: string,
    name: string
}

export interface BookZvanie {
    id: string,
    name: string
}

export interface BookStepen {
    id: string,
    name: string
}

export interface Message {
    error: any;
    message: string
}