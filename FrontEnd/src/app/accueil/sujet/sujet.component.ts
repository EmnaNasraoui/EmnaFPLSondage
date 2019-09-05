import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css']
})
export class SujetComponent implements OnInit {
  id_sujet: any;
  results: any;
  voteForm: FormGroup;
  id_user: any;
  show: boolean = true;
  shown: boolean = true;
  compteurVote: number;
  votesOui: number;
  votesNon: number;
  numVotes: number;
  now: any;
  timeStart: any
  constructor(private router: ActivatedRoute, private userService: UserService, private authService: AuthService) {
    this.voteForm = new FormGroup({
      vote: new FormControl('')
    });
  }

  ngOnInit() {
    this.id_user = this.authService.ConnectedToken._id;
    this.id_sujet = this.router.snapshot.paramMap.get('id');
    this.userService.user(this.id_user).subscribe((data: any) => {
      console.log(data.numbreDeVote);
      this.compteurVote = data.numbreDeVote;
    });
    this.userService.tousLesVotesOui(this.id_sujet).subscribe((data: any) => {
      this.votesOui = data.length;
      console.log('votesOui', this.votesOui);
    });
    this.userService.tousLesVotesNon(this.id_sujet).subscribe((data: any) => {
      this.votesNon = data.length;
      console.log('votesNon', this.votesNon);
    });
    this.userService.sujet(this.id_sujet).subscribe((data: any) => {
      console.log(data);
      console.log(data.vote.length);
      this.numVotes = data.vote.length;
      this.results = [data];
      console.log(data.auteur._id);
      if (data.auteur._id === this.id_user) {
        this.shown = false;
      } else {
        this.shown;
        console.log(this.shown);
        for (let i = 0; i < data.vote.length; i++) {
          if ((data.vote[i].auteur !== this.id_user && data.auteur._id === this.id_user) || data.auteur._id === this.id_user) {
            this.show = true;
          } else {
            this.show = false;
          }
        }
      }
    });
  }
  ajouterVote(value) {
    console.log(this.compteurVote);
    this.id_user = this.authService.ConnectedToken._id;
    this.voteForm.value.vote = value;
    console.log(this.voteForm.value);
    if (this.compteurVote < 5) {
      this.userService.ajouterVote(this.id_user, this.id_sujet, this.voteForm.value).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      });
    } else {
      alert('Vous pouvez voter que 5 fois par 24h');
      this.now = new Date().getHours();
      console.log(this.now);
      this.timeStart = this.now + 24;
      console.log( this.timeStart * 3600 * 1000);
      setTimeout(() => {
        this.userService.mettreAZeroCompteurDeVote(this.id_user).subscribe((data: any) => {
          console.log(data);
        });
      }, this.timeStart * 3600 * 1000);
    }
  }
}
