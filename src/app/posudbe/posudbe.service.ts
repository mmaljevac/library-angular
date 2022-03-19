import { Injectable } from '@angular/core';
import {Posudba} from "./posudba.model";
import {Zanr} from "../zanr/zanrovi/zanr.model";
import {Knjiga} from "../zanr/zanr-detail/knjiga.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class PosudbeService {

  // @ts-ignore
  posudbe : Posudba[] = null;

  // @ts-ignore
  posudbaSubject: BehaviorSubject<Posudba[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getPosudbe()
      .subscribe(res => {
        this.posudbe = res;
        this.posudbaSubject.next(this.posudbe);
      });
  }

  getPosudbe(){
    return this.posudbaSubject;
  }

  addPosudba(posudba : any){
    this.dataService.addPosudba(posudba)
      .subscribe((res => {
        console.log(res);
        this.posudbe.push(posudba);
        this.posudbaSubject.next(this.posudbe);
      }));
  }

  getPosudba(id : any){
    return this.posudbe.find(c => c.id==id);
  }

  deletePosudba(id : any){
    this.dataService.deletePosudba(id)
      .subscribe((res => {
        console.log(res);
        this.posudbe=this.posudbe.filter(z => z.id!=id);
        this.posudbaSubject.next(this.posudbe);
      }));
  }

  editPosudba(posudba : any){
    this.dataService.editPosudba(posudba)
      .subscribe((res => {
        console.log(res);
        this.posudbe[this.posudbe.findIndex(z => z.id==posudba.id)]=posudba;
      }),error => {
        console.log(error);
      });
  }


}
