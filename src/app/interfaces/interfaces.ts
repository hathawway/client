export interface User {
    id: string,
    login: string,
    password: string,
    first: string,
    second: string,
    third: string,
    role: string,
    office: string,
    post: string,
    work: string,
    status: string,
    stepen: string,
    zvanie: string,
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

export interface Message {
    error: any;
    message: string
}