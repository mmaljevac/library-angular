import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage! : string;
  signinForm! : FormGroup;

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required]),
      'lozinka' : new FormControl(null, [Validators.required])
    });

    this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });
  }

  onLogin(){
    this.auth.login(this.signinForm.value);
  }

}
