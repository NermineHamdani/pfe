import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // 👈 Ajout de Router ici

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule], // Active l'utilisation des liens de navigation (routerLink)
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  // 1. On injecte le Router d'Angular dans le constructeur
  constructor(private router: Router) {}

  // 🔥 2. La fonction de déconnexion appelée au clic sur le HTML
  logout(): void {
    console.log("Déconnexion en cours depuis la Sidebar...");
    
    // On nettoie les variables de session locales
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    
    // On redirige l'utilisateur vers l'écran de login
    this.router.navigate(['/login']);
  }
}