import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tous-les-sujets',
  templateUrl: './tous-les-sujets.component.html',
  styleUrls: ['./tous-les-sujets.component.css']
})
export class TousLesSujetsComponent implements OnInit {
  Sujets: any;
  Votes: any;
  id_user: any;
  voteForm: FormGroup;
  show: boolean;
  shown: boolean;
  compteurVote: number;
  now: any;
  timeStart: any;
  constructor(private userService: UserService, private authService: AuthService) {
    this.voteForm = new FormGroup({
      vote: new FormControl('')
    });
  }

  ngOnInit() {
    this.id_user = this.authService.ConnectedToken._id;
    this.userService.user(this.id_user).subscribe((data: any) => {
      this.compteurVote = data.numbreDeVote;
    });
    this.userService.tousLesSujets().subscribe((data: any) => {
      console.log(data);
      this.Sujets = data;
      console.log('id user', this.id_user);
      for (let i = 0; i < this.Sujets.length; i++) {
        if (data[i].auteur === this.id_user) {
          this.Sujets[i]['shown'] = false;
        } else {
          this.Sujets[i]['shown'] = true;
          for (let j = 0; j < this.Sujets[i].vote.length; j++) {
            console.log(this.Sujets[i].vote[j].auteur);
            this.Votes = this.Sujets[i].vote[j];
            if ((data[i].vote[j].auteur === this.id_user)) {
              this.Votes['show'] = false;
            } else {
              this.Votes['show'] = true;
            }
            console.log(this.Sujets[i].vote[j]);
          }
        }
      }
      console.log(this.Sujets);

    });
  }
  ajouterVote(value, id) {
    console.log(id);
    console.log(this.compteurVote);

    this.id_user = this.authService.ConnectedToken._id;
    this.voteForm.value.vote = value;
    console.log(this.voteForm.value);
    if (this.compteurVote < 5) {
      this.userService.ajouterVote(this.id_user, id, this.voteForm.value).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      });
    } else {
      alert('Vous pouvez voter que 5 fois par 24h');
      this.now = new Date().getHours();
      console.log(this.now);
      this.timeStart = this.now + 24;
      console.log(this.timeStart * 3600 * 1000);
      setTimeout(() => {
        this.userService.mettreAZeroCompteurDeVote(this.id_user).subscribe((data: any) => {
          console.log(data);
        });
      }, this.timeStart * 3600 * 1000);
    }
  }
}
