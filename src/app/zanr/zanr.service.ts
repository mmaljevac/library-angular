import { Injectable } from '@angular/core';
import {Zanr} from "./zanrovi/zanr.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {Knjiga} from "./zanr-detail/knjiga.model";

@Injectable({
  providedIn: 'root'
})
export class ZanrService {

  // @ts-ignore
  zanrovi : Zanr[] = null;
  // @ts-ignore
  knjige: Knjiga[] = null;

  // @ts-ignore
  zanrSubject: BehaviorSubject<Zanr[]> = new BehaviorSubject(null);
  // @ts-ignore
  knjigaSubject: BehaviorSubject<Knjiga[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getZanrovi()
      .subscribe(res => {
        this.zanrovi = res;
        this.zanrSubject.next(this.zanrovi);
      });

    this.dataService.getKnjigeByZanr()
      .subscribe(res => {
        this.knjige = res;
        this.knjigaSubject.next(this.knjige);
      });
  }

  getZanrovi(){
    return this.zanrSubject;
  }

  getKnjige(){
    return this.knjigaSubject;
  }

  addZanr(zanr : any){
    this.dataService.addZanr(zanr)
      .subscribe((res => {
        console.log(res);
        this.zanrovi.push(zanr);
        this.zanrSubject.next(this.zanrovi);
      }));
  }

  addKnjiga(knjiga : any){
    this.dataService.addKnjiga(knjiga)
      .subscribe((res => {
        console.log(res);
        this.knjige.push(knjiga);
        this.knjigaSubject.next(this.knjige);
      }));
  }

  getZanr(id : any){
    return this.zanrovi.find(c => c.id==id);
  }

  getKnjiga(id : any){
    return this.knjige.find(c => c.id==id);
  }

  deleteZanr(id : any){
    this.dataService.deleteZanr(id)
      .subscribe((res => {
        console.log(res);
        this.zanrovi=this.zanrovi.filter(z => z.id!=id);
        this.zanrSubject.next(this.zanrovi);
      }));
  }

  deleteKnjiga(id : any){
    this.dataService.deleteKnjiga(id)
      .subscribe((res => {
        console.log(res);
        this.knjige=this.knjige.filter(z => z.id!=id);
        this.knjigaSubject.next(this.knjige);
      }));
  }

  editZanr(zanr : any){
    this.dataService.editZanr(zanr)
      .subscribe((res => {
        console.log(res);
        this.zanrovi[this.zanrovi.findIndex(z => z.id==zanr.id)]=zanr;
      }),error => {
        console.log(error);
      });
  }

  editKnjiga(knjiga : any){
    this.dataService.editKnjiga(knjiga)
      .subscribe((res => {
        console.log(res);
        this.knjige[this.knjige.findIndex(z => z.id==knjiga.id)]=knjiga;
      }),error => {
        console.log(error);
      });
  }
}
