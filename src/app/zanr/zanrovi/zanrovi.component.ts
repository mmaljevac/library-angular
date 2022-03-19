import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user.model";
import {Zanr} from "./zanr.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ZanrService} from "../zanr.service";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.css']
})
export class ZanroviComponent implements OnInit {

  user!: User;
  query='';

  // @ts-ignore
  zanrovi : Zanr[] = null;
  // @ts-ignore
  zanrSubject : BehaviorSubject<Zanr[]>=null;
  // @ts-ignore
  subscription : Subscription = null;

  add:boolean = false;
  new : Zanr = {naziv:''};
  // @ts-ignore
  editingIndex : number = null;
  editingZanr : Zanr = {id:'', naziv:''};

  selectedZanr : Zanr = {id:'', naziv:''};
  mode : string = '';

  constructor(private auth: AuthService, private http: HttpClient, private zanrService: ZanrService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.zanrSubject=this.zanrService.getZanrovi();
    this.subscription=this.zanrSubject
    .subscribe(res => {
    this.zanrovi=res;
    });
  }

  addZanr(){
    console.log(this.new);
    this.zanrService.addZanr(this.new);
  }

  startEditing(zanr : any){
    this.selectedZanr={...zanr};
    this.mode='edit';
  }


  startAdding(){
    this.selectedZanr={id:'', naziv:''};
    this.mode='add';
  }


  onCancel(){
    this.selectedZanr={id:'', naziv:''};
    this.mode='';
  }

  deleteZanr(i : any){
    console.log(i);
    let c = this.zanrovi[i];
    this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi/${c.id}.json`)
      .subscribe((res => {
        console.log(res);
        this.zanrovi.splice(i,1);
      }));
  }

  setEdit(i : any){
    this.editingZanr= {...this.zanrovi[i]};
    this.editingIndex=i;
  }

  doneEditing(i : any){

    this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi/${this.editingZanr.id}/.json`,this.editingZanr)
      .subscribe((res => {
        console.log(res);
        // @ts-ignore
        this.editingIndex=null;
        this.zanrovi[i]=this.editingZanr;
        // @ts-ignore
        this.editingZanr=null;
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
