import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  tousLesSujets() {
    return this.http.get('http://localhost:3000/user/tousLesSujets');
  }
  ajouterUnSujet(id_auteur, sujet) {
    return this.http.post(`http://localhost:3000/user/creerUnSujet/${id_auteur}`, sujet);
  }
  tousLesVotes() {
    return this.http.get('http://localhost:3000/user/tousVotes');
  }
  sujet(id_sujet) {
    return this.http.get(`http://localhost:3000/user/sujet/${id_sujet}`);
  }
  user(id_user) {
    return this.http.get(`http://localhost:3000/user/user/${id_user}`);
  }
  ajouterVote(id_auteur, id_sujet, vote) {
    return this.http.post(`http://localhost:3000/user/ajouterUnVote/${id_auteur}/${id_sujet}`, vote);
  }
  tousLesVotesOui(id_sujet) {
    return this.http.get(`http://localhost:3000/user/tousVotesOui/${id_sujet}`);
  }
  tousLesVotesNon(id_sujet) {
    return this.http.get(`http://localhost:3000/user/tousVotesNon/${id_sujet}`);
  }
  mettreAZeroCompteurDeVote(id_user) {
    return this.http.get(`http://localhost:3000/user/compteurDeVote/${id_user}`);
  }
}
