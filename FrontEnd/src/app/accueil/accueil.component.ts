import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  sujetForm: FormGroup;
  id_user: any;
  token: any;
  constructor(private authService: AuthService, private userService: UserService,
              private router: Router, private cookieService: CookieService) {
                this.sujetForm = new FormGroup({
                  titre: new FormControl(''),
                  description: new FormControl('')
                });
               }

  ngOnInit() {
  }
  ajouterUnSujet() {
    this.token = this.authService.ConnectedToken;
    this.id_user = this.authService.ConnectedToken._id;
    this.userService.ajouterUnSujet(this.id_user, this.sujetForm.value).subscribe((data: any) => {
      console.log(data);
      location.reload();
    });
  }
  logOut() {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/auth/login']);
  }

}
