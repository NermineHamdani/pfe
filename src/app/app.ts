import { Component, signal,PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// On importe les deux composants manquants
import { SidebarComponent } from './sidebar/sidebar'; 
import { HeaderComponent } from './header/header';
import { isPlatformBrowser } from '@angular/common';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // On ajoute SidebarComponent et HeaderComponent ici pour que le HTML les reconnaisse
  imports: [RouterOutlet, SidebarComponent, HeaderComponent,NgIf], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('project-app');
  isLoggedIn = "false"; // Variable pour suivre l'état de connexion de l'utilisateur
  constructor(@Inject(PLATFORM_ID) private platformId: object ){
    
    if(isPlatformBrowser(this.platformId)) {
      console.log('platformID');
    if(localStorage.getItem('isLoggedIn')=='true') {
      this.isLoggedIn = "true";
      console.log('token found');
    }else {
      console.log('token not found');
      this.isLoggedIn = "false";
    }
}else{
  console.log('no platformID');
}
console.log("am I logged "+this.isLoggedIn)
}
}
;