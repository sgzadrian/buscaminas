import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  width: number;
  height: number;
  mines: number;

  field = [];

  score: number = 0;
  total: number = 0;

  status:number = 0;

  constructor(private router: Router, private active: ActivatedRoute) { }

  ngOnInit() {
    this.width = parseInt(this.active.snapshot.params['width']);
    this.height = parseInt(this.active.snapshot.params['height']);
    this.mines = parseInt(this.active.snapshot.params['mines']);

    this.fill();
    this.setMines();

    if(this.mines == 99) {
      this.total = 1;
    } else {
      for(let i = 0; i < this.height; i++) {
        console.log(this.field);
        for(let j = 0; j < this.width; j++) {
          this.total += this.field[i][j];
        }
      }
      this.total -= this.mines * 9;
    }
  }

  public getRandom(max: number) {
    return Math.floor((Math.random() * max));
  }

  public fill() {
    let isMine = this.mines == 99 ? 9 : 0;
    for (let i = 0; i < this.height; i++) {
      let aux = [];
      for (let j = 0; j < this.height; j++) {
        aux.push(isMine);
      }
      this.field.push(aux);
    }
  }

  public setMines() {
    let x, y;
    if(this.mines == 99) {
      x = this.getRandom(this.width);
      y = this.getRandom(this.height);
      this.field[x][y] = 1;
    } else {
      for(let i = 0; i < this.mines; i++) {
        x = this.getRandom(this.width);
        y = this.getRandom(this.height);
        if(this.field[x][y] < 9) {
          this.fillBorder(x, y);
          this.field[x][y] = 9;
        } else {
          i--;
        }
      }
    } 
  }

  public fillBorder(x: number, y: number) {
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        let ax = x + i;
        let ay = y + j;
        if((ax < 0 || ax > (this.width - 1)) || (ay < 0 || ay > (this.height - 1))) {
        } else {
          this.field[ax][ay]++;
          if (this.field[ax][ay] >= 9) {
            this.field[ax][ay] = 9;
          }
        }
      }
    }
  }

  public clickedLeft(x: number, y: number) {
    let fieldVal = this.field[x][y];
    let btn = document.querySelector('#btn-mine-'+x+y);
    if(btn.className == "btn-flag") {
      return;
    }
    if(fieldVal == 9) {
      btn.className += " boom";
      this.status = -1;
    } else {
      btn.className += (" btn-number-" + fieldVal);
      btn.textContent = fieldVal;
      if(fieldVal == 0) {
        this.openBorders(x,y);
      } else {
        this.score += fieldVal;
      }
    }
    if(this.score == this.total) {
      this.status = 1;
    }
  }

  public clickedRight(e: Event, x: number, y: number) {
    e.preventDefault();
    let btn = document.querySelector('#btn-mine-' + x + y);
    switch(btn.className) {
      case "btn-mine":
        console.log("Normal");
        btn.className = "btn-flag";
        btn.textContent = "🚩";
        break;
        case "btn-flag":
        console.log("Bandera");
        btn.className = "btn-ask";
        btn.textContent = "?";
        break;
        case "btn-ask":
        console.log("Pregunta");
        btn.className = "btn-mine";
        btn.textContent = "";
        break;
      default:
        break;
    }
  }

  public openBorders(x: number, y: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let ax = x + i;
        let ay = y + j;
        if (!((ax < 0 || ax > (this.width - 1)) || (ay < 0 || ay > (this.height - 1)))) {
          if (!(this.field[ax][ay] >= 9)) {
            let btn = document.querySelector('#btn-mine-'+ax+ay);
            if(!btn.className.includes("number")) {
              this.clickedLeft(ax, ay);
            }
          }
        }
      }
    }
  }

  public reset() {
    this.field = [];
    this.mines = null;
    this.width = null;
    this.height = null;
    this.total = 0;
    this.score = 0;
    this.status = 0;
    this.ngOnInit();
  }

  public return() {
    this.field = [];
    this.mines = null;
    this.width = null;
    this.height = null;
    this.total = 0;
    this.score = 0;
    this.status = 0;
    this.router.navigate(['']);
  }

}
