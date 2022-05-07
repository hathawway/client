import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay, TUI_LAST_DAY } from '@taiga-ui/cdk';
import { TuiNamedDay } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class IpComponent implements OnInit {

  term!: string;
  data: Observable<Ip[]> | undefined;

  form!: FormGroup;
  open = false;

  messageError = "";

  from: TuiDay | null = null;
	to: TuiDay | null = null;
	min = new TuiDay(2017, 9, 4);
	max = TuiDay.currentLocal();
	items = [
	  new TuiNamedDay(
	    TUI_LAST_DAY.append({year: -1}),
	    'Сегодня',
	    TuiDay.currentLocal(),
	  ),
	];

  constructor(private ipService: IpService) {
      this.ipService.onClick.subscribe(cnt=>this.data = cnt);
    }


  ngOnInit(): void {   
    this.getData();  
  }

  getData() {
    this.ipService.setReqSearch("office")
    this.ipService.doClick()
  }

  edit(ip:Ip) {
    this.open = true;
    this.form = new FormGroup({
      id: new FormControl(ip.id),
      isagreement:new FormControl(ip.isagreement  === null ? null : ip.isagreement),
      data_agreement:new FormControl(ip.data_agreement === null ? null : ip.data_agreement),
      isimplementation: new FormControl(ip.isimplementation === null ? null : ip.isimplementation),
      data_implementation: new FormControl(ip.data_implementation === null ? null : ip.data_implementation)
    })
    const dataAgr = ip.data_agreement.toString().split('-')
    const dataImpl = ip.data_agreement.toString().split('-')
    this.from = ip.data_agreement === null ? null : new TuiDay(Number(dataAgr[0]), Number(dataAgr[1]), Number(dataAgr[2]));
	  this.to = ip.data_implementation === null ? null : new TuiDay(Number(dataImpl[0]), Number(dataImpl[1]), Number(dataImpl[2]));
    
  }

  onSubmit() {
    
    console.log(this.form.value)
    this.form.disable()
    this.ipService.updateIp(this.form.value).subscribe(
      () => {
        this.ipService.doClick(),
        this.close()
      },
      error => {
        this.messageError = error.error.message
      }
    )
    this.form.enable()
  }

  close() {
    this.open = false;
    this.form.reset();
    this.messageError = "";
  }


}
