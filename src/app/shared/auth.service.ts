import { Injectable} from '@angular/core';
import {User} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable, Subject} from "rxjs";

@Injectable()
export class AuthService {

  users : User[] = [];

  private user!: User;
  private token! : string;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : {email : string, lozinka: string}){

    this.http.get('https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici.json')
      .pipe(map((res : any) => {
        const users = [];
        for(let key in res) {
          users.push({...res[key], id: key});
        }
        return users;
      }))
      .subscribe((res : User[]) => {
        console.log(res);
        this.users = res;
      })

    new Observable(observer => {
      setTimeout(()=>{
        let u = this.users.find(u => u.email==credentials.email && u.lozinka==credentials.lozinka);
        observer.next(u);
      },1000);
    }).subscribe( (user : any)=>{

      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authChange.next(true);
        alert("Uspješna prijava!");
        this.router.navigate(['/']);
      } else {
        this.errorEmitter.next('Pogrešni podaci za prijavu!');
      }

    });



  }

  logout(){
    this.user = new User();
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    if (!this.user) this.user=JSON.parse(localStorage.getItem('user') as any);
    return {...this.user};
  }


  isAuthenticated(){
    return this.user!=null;
  }



}
