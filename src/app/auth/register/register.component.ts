import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User[] = [];
  new : User = {email: '', lozinka: '', ime: '', prezime: '', authLvl: 0};
  lozinka2 : string = '';

  // signupForm! : FormGroup;

  registerForm! : FormGroup;
  submitted: boolean = false;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
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

    this.registerForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', Validators.required],
      lozinka: ['', Validators.required],
      lozinka2: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("lozinka", "lozinka2")
      });
  }

  onSubmit() {
    this.submitted = true;
    this.http.post('https://js-projekt-d18a4-default-rtdb.firebaseio.com/korisnici.json', this.new)
      .subscribe(() => {
        this.users.push(this.new);
      })

    alert("Uspješna registracija!");
    this.router.navigate(['/']);
  }

}
