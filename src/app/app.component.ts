import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iprwc-frontend';
  showHead = false;
  constructor(private router: Router) {
    router.events.forEach((event) => {
     if (event instanceof NavigationStart) {
       if (event.url === '/login' || event.url === '/register' || event.url === '/') {
         this.showHead = false;
       } else {
         this.showHead = true;
       }
     }
    });
  }
}
