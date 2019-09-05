import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.userForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      motDePasse: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }
  register() {
    this.authService.registre(this.userForm.value).subscribe((data: any) => {
      console.log(data);
      alert('ajouté avec succès');
      this.router.navigate(['auth/login']);

    });
  }

}
