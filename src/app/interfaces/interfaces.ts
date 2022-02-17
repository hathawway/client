export interface User {
    id: string,
    login: string,
    password: string,
    first: string,
    second: string,
    third: string,
    book_office: BookOffice,
    book_role: BookRole,
    book_post: BookPost,
    book_work: BookWork,
    book_status: BookStatus,
    book_stepen: BookStepen,
    book_zvanie: BookZvanie,
    tel: string,
    email:string

}

export interface BookRole {
    id: string,
    name: string
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