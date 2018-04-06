import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("cargado");
  }

  public loadGame(type) {
    let width, height, mines;
    switch (type) {
      case 'F':
        // Facil
        width = 3;
        height = 3;
        mines = 1;
        break;
      case 'N':
      default:
        // Normal
        width = 5;
        height = 5;
        mines = 4;
        break;
      case 'D':
        // Dificil
        width = 7;
        height = 7;
        mines = 8;
        break;
      case 'I':
        // Encabronado
        width = 10;
        height = 10;
        mines = 99;
        break;
    }
    this.router.navigate(['game', width, height, mines]);
  }
}
