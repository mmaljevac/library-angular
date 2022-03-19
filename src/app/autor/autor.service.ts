import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {Autor} from "./autori/autor.model";
import {Knjiga} from "../zanr/zanr-detail/knjiga.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  // @ts-ignore
  autori : Autor[] = null;
  // @ts-ignore
  knjige: Knjiga[] = null;

  // @ts-ignore
  autorSubject: BehaviorSubject<Autor[]> = new BehaviorSubject(null);
  // @ts-ignore
  knjigaSubject: BehaviorSubject<Knjiga[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getAutori()
      .subscribe(res => {
        this.autori = res;
        // @ts-ignore
        this.autorSubject.next(this.autori);
      });

    this.dataService.getKnjigeByZanr()
      .subscribe(res => {
        this.knjige = res;
        this.knjigaSubject.next(this.knjige);
      });
  }

  getAutori(){
    return this.autorSubject;
  }

  getKnjige(){
    return this.knjigaSubject;
  }

  addAutor(autor : any){
    this.dataService.addAutor(autor)
      .subscribe((res => {
        console.log(res);
        this.autori.push(autor);
        // @ts-ignore
        this.autorSubject.next(this.autori);
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

  getAutor(id : any){
    return this.autori.find(c => c.id==id);
  }

  getKnjiga(id : any){
    return this.knjige.find(c => c.id==id);
  }

  deleteAutor(id : any){
    this.dataService.deleteAutor(id)
      .subscribe((res => {
        console.log(res);
        this.autori=this.autori.filter(z => z.id!=id);
        // @ts-ignore
        this.autorSubject.next(this.autori);
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

  editAutor(autor : any){
    this.dataService.editAutor(autor)
      .subscribe((res => {
        console.log(res);
        this.autori[this.autori.findIndex(z => z.id==autor.id)]=autor;
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
