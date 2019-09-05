import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: any;
  userForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      motDePasse: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }
  Login() {
    this.authService.login(this.userForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.lvl === 'Votre connexion est valide') {
        alert(data.lvl);
        this.token = data.token;
        this.authService.setToken(this.token);
        this.router.navigate(['accueil/tousLesSujets']);
      } else {
        alert(data.lvl);
      }

    });
  }
}
