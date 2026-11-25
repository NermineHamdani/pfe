import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.html', 
  styleUrl: './login.css'       
})
export class LoginComponent {

  // Cet objet reste lié à ton formulaire HTML
  credentials = {
    email: '',
    motDePasse: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = ''; 

    // On appelle l'authentification réelle via Spring Boot
    this.authService.login(this.credentials).subscribe({
      next: (user) => {
        
        if (user.role === 'ADMIN') {
          // Action faite : Enregistrement de l'état de connexion de l'admin
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', 'ADMIN'); // Optionnel mais utile pour la sécurité
          
          this.router.navigate(['/dashboard']);
        } else if (user.role === 'USER') {
          // Action faite : Enregistrement de l'état de connexion de l'utilisateur
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', 'USER'); // Optionnel mais utile pour la sécurité
          
          this.router.navigate(['/user-dashboard']); 
        }
      },
      error: (err) => {
        this.errorMessage = "Identifiants incorrects.";
      }
    });
  }
}