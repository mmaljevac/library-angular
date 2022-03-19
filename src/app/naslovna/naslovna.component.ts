import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrls: ['./naslovna.component.css']
})
export class NaslovnaComponent implements OnInit {

  user!: User;
  knjigas: any[];
  query?: string;

  constructor(private auth: AuthService) {
    this.knjigas = [];
  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  fetchData() {
    if (this.query && this.query.length > 0) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`).then(res => res.json())
        .then(data => {
          console.log(data);
          this.knjigas = data.items;
        })
    }
  }
}
