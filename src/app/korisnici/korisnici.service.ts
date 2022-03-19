import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Korisnik} from "./korisnik.model";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {


  // @ts-ignore
  korisnici : Korisnik[] = null;

  // @ts-ignore
  korisnikSubject: BehaviorSubject<Korisnik[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getKorisnici()
      .subscribe(res => {
        this.korisnici = res;
        this.korisnikSubject.next(this.korisnici);
      });
  }

  getKorisnici(){
    return this.korisnikSubject;
  }

  addKorisnik(korisnik : any){
    this.dataService.addKorisnik(korisnik)
      .subscribe((res => {
        console.log(res);
        this.korisnici.push(korisnik);
        this.korisnikSubject.next(this.korisnici);
      }));
  }

  getKorisnik(id : any){
    return this.korisnici.find(c => c.id==id);
  }

  deleteKorisnik(id : any){
    this.dataService.deleteKorisnik(id)
      .subscribe((res => {
        console.log(res);
        this.korisnici=this.korisnici.filter(z => z.id!=id);
        this.korisnikSubject.next(this.korisnici);
      }));
  }

  editKorisnik(korisnik : any){
    this.dataService.editKorisnik(korisnik)
      .subscribe((res => {
        console.log(res);
        this.korisnici[this.korisnici.findIndex(z => z.id==korisnik.id)]=korisnik;
      }),error => {
        console.log(error);
      });
  }
}
