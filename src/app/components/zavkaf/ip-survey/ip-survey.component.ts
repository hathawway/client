import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ip, IpPps, PpStatistic } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';
import { IpPpsService } from 'src/app/services/ipPps.service';

@Component({
  selector: 'app-ip-survey',
    templateUrl: './ip-survey.component.html',
  styleUrls: ['./ip-survey.component.less'],
})
export class IpSurveyComponent implements OnInit {

  constructor(private ipPpsService: IpPpsService,
              private ipService: IpService,) { }

  idIp!: string;

  term!: string;

  dataIp$: Observable<Ip> | undefined;
  data$: Observable<IpPps[]> | undefined;

  dataStatistika: Observable<PpStatistic[]> | undefined;

  ngOnInit(): void {
    this.idIp = this.ipPpsService.getId();
    this.dataIp$ = this.ipService.getIpById(this.idIp);
    this.data$ = this.ipPpsService.getIpPps(this.idIp);
    this.ipService.getIpById(this.idIp).subscribe(data => console.log(data));
    this.dataStatistika = this.ipService.getStatistikaForPps(Number(this.idIp).toString());
  }

}
