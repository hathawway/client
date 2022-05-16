import { Inject, Injectable } from "@angular/core";
import {TuiNotificationsService} from "@taiga-ui/core";

@Injectable({
    providedIn:'root'
})

export class NotiService {

    constructor(@Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService) {}

    toast(error: string) {
        this.notificationsService.show(error, {label: 'Ошибка'}).subscribe(value => {console.log('внутри')})
    }
}
