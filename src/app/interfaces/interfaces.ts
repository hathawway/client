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
    other_kafedrs: string[],
    tel: string,
    snils: string,
    roles: BookRole[],
    is_active: boolean,
}

export interface Role {
    id: number,
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
    ispps: boolean
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
    kind_activity:KindActivity,
    norma: string,
    book_unit: BookUnit
}

export interface BookUnit {
    id: string,
    name: string
}

export interface Kafedra {
    id: string,
    norma: string,
    user:User,
    book_work: BookWork,
    book_office:BookOffice,
    book_post:BookPost
}

export interface Ip {
    id: string,
    data_start: Date,
    data_end: Date,
    kafedra: Kafedra,
    isagreement:string,
    data_agreement:Date,
    isimplementation: string,
    data_implementation: Date,
}

export interface IpPps {
    id: string,
    semester: string,
    kind_activity: KindActivity,
    activity: Activity,
    unitPlan: string,
    hourPlan: string,
    datePlan: Date,
    unitFact: string,
    hourFact: string,
    dateFact: Date,
    remark: string,
    idip: string,
}

export interface Request {
    request:string
}

export interface Message {
    error: any;
    message: string
}

export interface PpStatistic {
  kind_activity_name: string,
  norma_po_doljnosti: string,
  norma_na_kaf: string,
  semestr_1_plan: string,
  semestr_2_plan: string,
  itog_plan: string,
  ostatok_plan: string,
  semestr_1_fact: string,
  semestr_2_fact: string,
  itog_fact: string,
  ostatok_fact: string
}
