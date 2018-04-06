import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private electron: ElectronService, private router: Router) {}

}
