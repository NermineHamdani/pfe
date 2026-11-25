import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UtilisateurService } from '../services/utilisateurs'; 
import { User } from '../models/document';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class UtilisateursComponent implements OnInit {
  
  utilisateurs: User[] = []; 
  displayModal: boolean = false; 
  
  newUser: User = {
    id: undefined,
    nom: '',
    post: '',
    mail: '',
    direction: ''
  };

  constructor(private userService: UtilisateurService) {}

  ngOnInit() {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.utilisateurs = data;
      },
      error: (err: any) => console.error("Erreur de chargement", err)
    });
  }

  openModal() {
    this.newUser = { id: undefined, nom: '', post: '', mail: '', direction: '' };
    this.displayModal = true;
  }

  // Cette méthode correspond exactement au (ngSubmit) du fichier HTML
  enregistrer() {
    console.log("Tentative d'envoi des données :", this.newUser);

    this.userService.saveUser(this.newUser).subscribe({
      next: (res: User) => {
        console.log("Utilisateur enregistré avec succès dans MongoDB !", res);
        this.displayModal = false;
        this.chargerUtilisateurs(); // Recharge instantanément le tableau
        this.newUser = { id: undefined, nom: '', post: '', mail: '', direction: '' }; // Reset
      },
      error: (err: any) => {
        console.error("Le backend Spring Boot a renvoyé une erreur :", err);
        alert("Erreur de connexion avec le serveur. Vérifie si Spring Boot tourne !");
      }
    });
  }
}