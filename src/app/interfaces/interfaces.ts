export interface User {
    id: string,
    login: string,
    password: string,
    first: string,
    second: string,
    third: string,
    book_office: BookOffice,
    book_post: BookPost,
    book_work: BookWork,
    book_status: BookStatus,
    book_stepen: BookStepen,
    book_zvanie: BookZvanie,
    tel: string,
    email:string

}

export interface Role {
    id: string,
    user: User,
    book_role: BookRole
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
    name: string,
    ispps: string
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


export interface StavkaYear {
    id: string,
    norma: string
}

export interface NormaStudy {
    id: string,
    norma: string,
    book_post:BookPost
}

export interface KindActivity {
    id: string,
    name: string,
    user:User
}

export interface NormaKindActivity {
    id: string,
    norma: string,
    book_post:BookPost,
    kind_activity: KindActivity
}

export interface Activity {
    id: string,
    name: string,
    kind_activity:KindActivity
}

export interface BookUnit {
    id: string,
    name: string
}

export interface NormaActivity {
    id: string,
    norma: string,
    activity:Activity,
    book_unit: BookUnit,
    book_post:BookPost
}

export interface Kafedra {
    id: string,
    norma: string,
    user:User,
    book_work: BookWork,
    book_office:BookOffice,
    book_post:BookPost
}

export interface Message {
    error: any;
    message: string
}