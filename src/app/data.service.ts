import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http:HttpClient) { }

  getZanrovi(){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi.json')
      .pipe(map(res => {
        const zanrovi=[];
        for (let key in res){
          // @ts-ignore
          zanrovi.push({...res[key], id:key});
        }
        console.log(zanrovi);
        return zanrovi;
      }));
  }

  getPosudbe(){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe.json')
      .pipe(map(res => {
        const posudbe=[];
        for (let key in res){
          // @ts-ignore
          posudbe.push({...res[key], id:key});
        }
        console.log(posudbe);
        return posudbe;
      }));
  }

  getKorisnici(){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici.json')
      .pipe(map(res => {
        const korisnici=[];
        for (let key in res){
          // @ts-ignore
          korisnici.push({...res[key], id:key});
        }
        console.log(korisnici);
        return korisnici;
      }));
  }

  getAutori(){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori.json')
      .pipe(map(res => {
        const autori=[];
        for (let key in res){
          // @ts-ignore
          autori.push({...res[key], id:key});
        }
        console.log(autori);
        return autori;
      }));
  }

  getKnjigeByZanr(filterId?:string){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige.json')
      .pipe(map(res => {
        let knjige=[];
        for (let key in res){
          // @ts-ignore
          knjige.push({...res[key], id:key});
        }
        if (filterId) {
          let filtered = [];
          for (const j of knjige) {
            if (j.zanrId == filterId) {
              filtered.push(j);
            }
          }
          return filtered;
        }
        return knjige;
      }));
  }

  getKnjigeByAutor(filterId?:string){
    return this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige.json')
      .pipe(map(res => {
        let knjige=[];
        for (let key in res){
          // @ts-ignore
          knjige.push({...res[key], id:key});
        }
        if (filterId) {
          let filtered = [];
          for (const j of knjige) {
            if (j.autorId == filterId) {
              filtered.push(j);
            }
          }
          return filtered;
        }
        return knjige;
      }));
  }

  addZanr(zanr : any){
    return this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi.json',zanr);
  }

  addPosudba(posudba : any){
    return this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe.json',posudba);
  }

  addKorisnik(korisnik : any){
    return this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici.json',korisnik);
  }

  addAutor(autor : any){
    return this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori.json',autor);
  }

  addKnjiga(knjiga : any){
    return this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige.json',knjiga);
  }

  deleteZanr(id : any){
    return this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi/${id}.json`)
  }

  deletePosudba(id : any){
    return this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe/${id}.json`)
  }

  deleteKorisnik(id : any){
    return this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici/${id}.json`)
  }

  deleteAutor(id : any){
    return this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori/${id}.json`)
  }

  deleteKnjiga(id : any){
    return this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige/${id}.json`)
  }

  editZanr(zanr : any){
    return this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi/${zanr.id}/.json`,zanr)
  }

  editPosudba(posudba : any){
    return this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe/${posudba.id}/.json`,posudba)
  }

  editKorisnik(korisnik : any){
    return this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici/${korisnik.id}/.json`,korisnik)
  }

  editAutor(autor : any){
    return this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori/${autor.id}/.json`,autor)
  }

  editKnjiga(knjiga : any){
    return this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige/${knjiga.id}/.json`,knjiga)
  }

}
