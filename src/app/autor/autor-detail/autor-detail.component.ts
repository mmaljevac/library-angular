import { Component, OnInit } from '@angular/core';
import {Knjiga} from "../../zanr/zanr-detail/knjiga.model";
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {AutorService} from "../autor.service";

@Component({
  selector: 'app-autori-detail',
  templateUrl: './autor-detail.component.html',
  styleUrls: ['./autor-detail.component.css']
})
export class AutorDetailComponent implements OnInit {

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

  constructor(private http: HttpClient, private autorService: AutorService, private route: ActivatedRoute, private dataService: DataService) { }

  async ngOnInit() {
    this.naziv = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);


    this.knjigaSubject = this.dataService.getKnjigeByAutor(this.route.snapshot.params['id']);
    this.subscription = this.knjigaSubject
      .subscribe(res => {
        this.knjige=res;
      });
  }

  addKnjiga(){
    console.log(this.new);
    this.autorService.addKnjiga(this.new);
  }

  deleteKnjiga(i : any){
    console.log(i);
    let c = this.knjige[i];
    this.autorService.deleteKnjiga(c.id);
  }

  startEditing(autor : any){
    this.selectedKnjiga={...autor};
    this.mode='edit';
  }

  startAdding(){
    this.selectedKnjiga={godina: 0, ocjena: 0, opis: "", urlSlike: "", id:'', naziv:''};
    this.mode='add';
  }

  onCancel(){
    this.selectedKnjiga={godina: 0, ocjena: 0, opis: "", urlSlike: "", id:'', naziv:''};
    this.mode='';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
