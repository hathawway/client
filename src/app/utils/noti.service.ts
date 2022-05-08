import { Inject, Injectable } from "@angular/core";
import {TuiNotificationsService} from "@taiga-ui/core";

@Injectable({
    providedIn:'root'
})

export class NotiService {

    constructor(@Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService) {}

    toast(error: string) {
        console.log('Пробую сделать ошибку');
        this.notificationsService.show(error, {label: 'ошибка'}).subscribe(value => {console.log('внутри')})
        // .show(error, {
        //     label: 'Ошибка',
        // })
        // .subscribe();
    }
}
