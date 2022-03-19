import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PROJEKT';

  constructor(private auth:AuthService){
  }

  ngOnInit(){
    let user = this.auth.getUser();


  }
}
