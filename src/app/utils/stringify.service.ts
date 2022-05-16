import { Injectable } from "@angular/core";
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { Activity, BookOffice, BookPost, BookStatus, BookStepen, BookUnit, BookWork, BookZvanie, Kafedra, KindActivity, Role } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class StrService{

    constructor() {}

    @tuiPure
    stringifyy(items: Role[]): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(
            items.map(({user}) => [
                Number(user.id), 
                [user.second, user.first, user.third].join(' ')
            ] as [number, string])
        );
        return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }

    @tuiPure
    stringifyName(items: KindActivity[] | BookUnit[] | BookPost[] | 
        BookOffice[] | BookStatus[] | BookStepen[] | 
        BookZvanie[] | BookWork[]): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(
            items.map((item) => [
                Number(item.id), 
                item.name
            ] as [number, string])
        );
        return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }

    @tuiPure
    stringifyKafedra(items: Kafedra[]): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(
            items.map(({id, book_office}) => [
                Number(id), 
                book_office.name
            ] as [number, string])
        );
        return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }

    @tuiPure
    stringifyActivity(items: Activity[]): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(
            items.map(({id, name, norma, book_unit}) => [
                Number(id), 
                name + "(" + norma + ", " + book_unit.name + ")"
            ] as [number, string])
        );
        return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }


}




