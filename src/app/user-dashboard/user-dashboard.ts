import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";
import { HeaderComponent } from "../header/header";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboardComponent implements OnInit {

  // Données dynamiques pour les compteurs du haut
  stats = {
    totalDocuments: 128,
    recents: 32,
    partages: 8,
    favoris: 15
  };

  // Liste des documents récents (reproduit exactement la maquette)
  documentsRecents = [
    { nom: 'Rapport annuel 2024.pdf', categorie: 'Rapports', badgeClass: 'badge-red', iconClass: 'fas fa-file-pdf pdf-ext', modifieLe: '20/05/2024', taille: '2.4 Mo' },
    { nom: 'Budget prévisionnel.xlsx', categorie: 'Finances', badgeClass: 'badge-green', iconClass: 'fas fa-file-excel excel-ext', modifieLe: '18/05/2024', taille: '1.1 Mo' },
    { nom: 'Plan de projet.docx', categorie: 'Projets', badgeClass: 'badge-purple', iconClass: 'fas fa-file-word word-ext', modifieLe: '15/05/2024', taille: '890 Ko' },
    { nom: 'Présentation produit.pdf', categorie: 'Présentations', badgeClass: 'badge-orange', iconClass: 'fas fa-file-powerpoint ppt-ext', modifieLe: '12/05/2024', taille: '3.2 Mo' },
    { nom: 'Stratégie marketing.pptx', categorie: 'Marketing', badgeClass: 'badge-magenta', iconClass: 'fas fa-file-powerpoint ppt-ext', modifieLe: '10/05/2024', taille: '5.7 Mo' }
  ];

  // Liste des catégories du bas
  categories = [
    { nom: 'Rapports', quantite: 24, iconColor: 'icon-red' },
    { nom: 'Finances', quantite: 18, iconColor: 'icon-green' },
    { nom: 'Projets', quantite: 32, iconColor: 'icon-purple' },
    { nom: 'Présentations', quantite: 15, iconColor: 'icon-orange' },
    { nom: 'Marketing', quantite: 12, iconColor: 'icon-magenta' }
  ];

  // Liste des activités récentes (colonne droite)
  activites = [
    { texte: 'Vous avez ajouté <strong>Rapport annuel 2024.pdf</strong>', temps: 'Il y a 2 heures', type: 'upload' },
    { texte: 'Vous avez partagé <strong>Plan de projet.docx</strong>', temps: 'Il y a 1 jour', type: 'share' },
    { texte: 'Vous avez ajouté <strong>Présentation produit.pdf</strong>', temps: 'Il y a 2 jours', type: 'upload' }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log("Le tableau de bord utilisateur ATB est prêt et dynamisé !");
  }
}