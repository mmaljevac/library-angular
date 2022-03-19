import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Autor} from "./autor.model";
import {HttpClient} from "@angular/common/http";
import {AutorService} from "../autor.service";
import {User} from "../../shared/user.model";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-autori',
  templateUrl: './autori.component.html',
  styleUrls: ['./autori.component.css']
})
export class AutoriComponent implements OnInit {

  user!: User;

  // @ts-ignore
  autori : Autor[] = null;
  // @ts-ignore
  autorSubject : BehaviorSubject<Autor[]>=null;
  // @ts-ignore
  subscription : Subscription = null;

  add:boolean = false;
  new : Autor = {ime:'', prezime:''};
  // @ts-ignore
  editingIndex : number = null;
  editingAutor : Autor = {id:'', ime:'', prezime:''};

  selectedAutor : Autor = {id:'', ime:'', prezime:''};
  mode : string = '';

  constructor(private auth: AuthService, private http: HttpClient, private autorService: AutorService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.autorSubject=this.autorService.getAutori();
    this.subscription=this.autorSubject
      .subscribe(res => {
        this.autori=res;
      });
  }

  addAutor(){
    console.log(this.new);
    this.autorService.addAutor(this.new);
  }

  startEditing(autor : any){
    this.selectedAutor={...autor};
    this.mode='edit';
  }

  startAdding(){
    this.selectedAutor={id:'', ime:'', prezime:''};
    this.mode='add';
  }

  onCancel(){
    this.selectedAutor={id:'', ime:'', prezime:''};
    this.mode='';
  }

  deleteAutor(i : any){
    console.log(i);
    let c = this.autori[i];
    this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori/${c.id}.json`)
      .subscribe((res => {
        console.log(res);
        this.autori.splice(i,1);
      }));
  }

  setEdit(i : any){
    this.editingAutor= {...this.autori[i]};
    this.editingIndex=i;
  }

  doneEditing(i : any){

    this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/autori/${this.editingAutor.id}/.json`,this.editingAutor)
      .subscribe((res => {
        console.log(res);
        // @ts-ignore
        this.editingIndex=null;
        this.autori[i]=this.editingAutor;
        // @ts-ignore
        this.editingAutor=null;
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
