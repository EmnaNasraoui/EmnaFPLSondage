import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SujetComponent } from './accueil/sujet/sujet.component';
import { TousLesSujetsComponent } from './accueil/tous-les-sujets/tous-les-sujets.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'registre', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' }]
  },

  {
    path: 'accueil', component: AccueilComponent, children: [
      { path: 'sujet/:id', component: SujetComponent },
      { path: 'tousLesSujets', component: TousLesSujetsComponent },
      { path: '**', redirectTo: 'auth/login' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
