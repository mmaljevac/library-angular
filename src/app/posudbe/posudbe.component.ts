import { Component, OnInit } from '@angular/core';
import {Zanr} from "../zanr/zanrovi/zanr.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Posudba} from "./posudba.model";
import {HttpClient} from "@angular/common/http";
import {ZanrService} from "../zanr/zanr.service";
import {PosudbeService} from "./posudbe.service";
import {User} from "../shared/user.model";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-posudbe',
  templateUrl: './posudbe.component.html',
  styleUrls: ['./posudbe.component.css']
})
export class PosudbeComponent implements OnInit {

  user!: User;
  query='';

  // @ts-ignore
  posudbe : Posudba[] = null;
  // @ts-ignore
  posudbaSubject : BehaviorSubject<Posudba[]>=null;
  // @ts-ignore
  subscription : Subscription = null;

  add:boolean = false;
  randBrPosudbe! : number;
  new : Posudba = {brPosudbe:'', datumPosudbe:'', korisnikId:0, knjigaId:0};
  // @ts-ignore
  editingIndex : number = null;
  editingPosudba : Posudba = {id:'', brPosudbe:'', datumPosudbe:'', korisnikId:0, knjigaId:0};

  selectedPosudba : Posudba = {id:'', brPosudbe:'', datumPosudbe:'', korisnikId:0, knjigaId:0};
  mode : string = '';

  constructor(private auth: AuthService, private http: HttpClient, private posudbeService: PosudbeService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.posudbaSubject=this.posudbeService.getPosudbe();
    this.subscription=this.posudbaSubject
      .subscribe(res => {
        this.posudbe=res;
      });
  }

  addPosudba(){
    console.log(this.new);
    this.posudbeService.addPosudba(this.new);
  }

  startEditing(posudba : any){
    this.selectedPosudba={...posudba};
    this.mode='edit';
  }


  startAdding(){
    this.selectedPosudba={id:'', brPosudbe:'', datumPosudbe:'', korisnikId:0, knjigaId:0};
    this.mode='add';
  }


  onCancel(){
    this.selectedPosudba={id:'', brPosudbe:'', datumPosudbe:'', korisnikId:0, knjigaId:0};
    this.mode='';
  }

  deletePosudba(i : any){
    console.log(i);
    let c = this.posudbe[i];
    this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe/${c.id}.json`)
      .subscribe((res => {
        console.log(res);
        this.posudbe.splice(i,1);
      }));
  }

  setEdit(i : any){
    this.editingPosudba= {...this.posudbe[i]};
    this.editingIndex=i;
  }

  doneEditing(i : any){

    this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/posudbe/${this.editingPosudba.id}/.json`,this.editingPosudba)
      .subscribe((res => {
        console.log(res);
        // @ts-ignore
        this.editingIndex=null;
        this.posudbe[i]=this.editingPosudba;
        // @ts-ignore
        this.editingPosudba=null;
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
