import { Component, OnInit } from '@angular/core';
import {Posudba} from "../posudbe/posudba.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Korisnik} from "./korisnik.model";
import {HttpClient} from "@angular/common/http";
import {PosudbeService} from "../posudbe/posudbe.service";
import {KorisniciService} from "./korisnici.service";
import {User} from "../shared/user.model";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  user!: User;
  query='';

  // @ts-ignore
  korisnici : Korisnik[] = null;
  // @ts-ignore
  korisnikSubject : BehaviorSubject<Korisnik[]>=null;
  // @ts-ignore
  subscription : Subscription = null;

  add:boolean = false;
  new : Korisnik = {ime:'', prezime:'', email:'', lozinka:'', authLvl:0};
  // @ts-ignore
  editingIndex : number = null;
  editingKorisnik : Korisnik = {id:'', ime:'', prezime:'', email:'', lozinka:'', authLvl:0};

  selectedKorisnik : Korisnik = {id:'', ime:'', prezime:'', email:'', lozinka:'', authLvl:0};
  mode : string = '';

  constructor(private auth: AuthService, private http: HttpClient, private korisnikService: KorisniciService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.korisnikSubject=this.korisnikService.getKorisnici();
    this.subscription=this.korisnikSubject
      .subscribe(res => {
        this.korisnici=res;
      });
  }

  addKorisnik(){
    console.log(this.new);
    this.korisnikService.addKorisnik(this.new);
  }

  startEditing(korisnik : any){
    this.selectedKorisnik={...korisnik};
    this.mode='edit';
  }


  startAdding(){
    this.selectedKorisnik={id:'', ime:'', prezime:'', email:'', lozinka:'', authLvl:0};
    this.mode='add';
  }


  onCancel(){
    this.selectedKorisnik={id:'', ime:'', prezime:'', email:'', lozinka:'', authLvl:0};
    this.mode='';
  }

  deleteKorisnik(i : any){
    console.log(i);
    let c = this.korisnici[i];
    this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici/${c.id}.json`)
      .subscribe((res => {
        console.log(res);
        this.korisnici.splice(i,1);
      }));
  }

  setEdit(i : any){
    this.editingKorisnik= {...this.korisnici[i]};
    this.editingIndex=i;
  }

  doneEditing(i : any){

    this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici/${this.editingKorisnik.id}/.json`,this.editingKorisnik)
      .subscribe((res => {
        console.log(res);
        // @ts-ignore
        this.editingIndex=null;
        this.korisnici[i]=this.editingKorisnik;
        // @ts-ignore
        this.editingKorisnik=null;
      }),error => {
        console.log(error);
      });

    // @ts-ignore
    this.editingIndex=null;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
