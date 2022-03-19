import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ZanrService} from "../zanr.service";
import {DataService} from "../../data.service";
import {Knjiga} from "./knjiga.model";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-zanrovi-detail',
  templateUrl: './zanr-detail.component.html',
  styleUrls: ['./zanr-detail.component.css']
})
export class ZanrDetailComponent implements OnInit {

  query = '';
  // @ts-ignore
  knjige : Knjiga[] = null;

  // @ts-ignore
  knjigaSubject : Observable<Knjiga[]>=null;

  // @ts-ignore
  subscription : Subscription = null;

  add:boolean = false;
  // @ts-ignore
  new : Knjiga = {
    naziv: '',
    opis:'',
    ocjena:0,
    godina:0,
    urlSlike:'',
    zanrId:0,
    autorId:0
  };

  // id : any;
  naziv : any;
  // opis : any;
  // ocjena : any;
  // zanrId : any;
  // autorId : any;
  // @ts-ignore
  knjiga : Knjiga;

  // @ts-ignore
  selectedKnjiga : Knjiga = {id:'', naziv:'', opis:'', ocjena:0, godina:0, urlSlike:'', zanrId:0, autorId:0};
  mode : string = '';

  constructor(private http: HttpClient, private zanrService: ZanrService, private route: ActivatedRoute, private dataService: DataService  ) { }

  async ngOnInit() {

    this.naziv = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);


    this.knjigaSubject = this.dataService.getKnjigeByZanr(this.route.snapshot.params['id']);
    this.subscription = this.knjigaSubject
      .subscribe(res => {
        this.knjige=res;
      });


  }

  addKnjiga(){
    console.log(this.new);
    this.zanrService.addKnjiga(this.new);
  }

  startEditing(knjiga : any){
    this.selectedKnjiga={...knjiga};
    this.mode='edit';
  }


  startAdding(){
    this.selectedKnjiga={id:'', naziv:'', opis:'', ocjena:0, godina:0, urlSlike:'', zanrId:0, autorId:0};
    this.mode='add';
  }


  onCancel(){
    this.selectedKnjiga={id:'', naziv:'', opis:'', ocjena:0, godina:0, urlSlike:'', zanrId:0, autorId:0};
    this.mode='';
  }

  deleteKnjiga(i : any){
    console.log(i);
    let c = this.knjige[i];
    this.http.delete(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/knjige/${c.id}.json`)
      .subscribe((res => {
        console.log(res);
        this.knjige.splice(i,1);
      }));
  }

  // setEdit(i : any){
  //   this.editingZanr= {...this.knjige[i]};
  //   this.editingIndex=i;
  // }

  // doneEditing(i : any){
  //
  //   this.http.patch(`https://js-projekt-d18a4-default-rtdb.firebaseio.com/zanrovi/${this.editingZanr.id}/.json`,this.editingZanr)
  //     .subscribe((res => {
  //       console.log(res);
  //       // @ts-ignore
  //       this.editingIndex=null;
  //       this.zanrovi[i]=this.editingZanr;
  //       // @ts-ignore
  //       this.editingZanr=null;
  //     }),error => {
  //       console.log(error);
  //     });
  //
  //   // @ts-ignore
  //   this.editingIndex=null;
  //
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
