import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { DocumentationService } from '../services/documentation'; 
import { Documentation } from '../models/document';
import { HeaderComponent } from "../header/header";
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  documentations: any[] = []; 
  displayModal: boolean = false; 
  isEditMode: boolean = false;
  
  // Variables pour la gestion du volet de détails latéral
  displayViewModal: boolean = false;
  selectedDocForView: any = null;

  currentDoc: Documentation = { 
    id: undefined, 
    titre: '', 
    type: '', 
    datePublication: '', 
    statut: 'En attente' 
  };

  constructor(private docService: DocumentationService) {}

  ngOnInit() { 
    this.chargerDonnees(); 
    // 🔥 Ajouté pour forcer le rechargement de la page
  }

  chargerDonnees() {
    this.docService.getDocs().subscribe({
      next: (data: Documentation[]) => {
        console.log("Données brutes reçues du serveur :", data);
        this.documentations = data.map(doc => {
          return {
            ...doc,
            titreAffiche: doc.titre || doc.fichier || "Sans Titre",
            serviceAffiche: doc.service?.nom || doc.type || "Non spécifié"
          };
        });
      },
      error: (err: any) => console.error("Erreur de chargement:", err)
    });
    
  }

  // Remplacement de la méthode fictive par la logique réelle pour le panneau latéral
  openViewModal(doc: any) {
    if (this.selectedDocForView?.id === doc.id && this.displayViewModal) {
      this.displayViewModal = false;
    } else {
      this.selectedDocForView = doc;
      
      // Injection de données API dynamiques simulées basées sur le document sélectionné
      this.selectedDocForView.method = 'GET';
      this.selectedDocForView.apiUrl = `https://api.atb.tn/v1/documentation/${doc.id || 'endpoint'}`;
      this.selectedDocForView.description = `Ce point de terminaison permet aux services internes de l'ATB de récupérer les métadonnées et de valider l'intégrité de la ressource "${doc.titreAffiche}".`;
      
      this.displayViewModal = true;
    }
  }

  openAddModal() {
    this.isEditMode = false;
    const aujourdHui = new Date().toISOString().split('T')[0];
    
    this.currentDoc = { 
      id: undefined, 
      titre: '', 
      type: '', 
      datePublication: aujourdHui, 
      statut: 'En attente' 
    };
    this.displayModal = true;
  }

  onEdit(doc: any) {
    this.isEditMode = true;
    
    let dateFormate = '';
    if (doc.datePublication) {
      dateFormate = new Date(doc.datePublication).toISOString().split('T')[0];
    }

    this.currentDoc = { 
      id: doc.id, 
      titre: doc.titre || doc.titreAffiche, 
      type: doc.service?.nom || doc.type || doc.serviceAffiche, 
      datePublication: dateFormate, 
      statut: doc.statut || 'En attente' 
    }; 
    this.displayModal = true;
  }

  enregistrer() {
    const servicePayload = this.currentDoc.type ? { nom: this.currentDoc.type } : undefined;

    const docAEnvoyer: Documentation = {
      id: this.currentDoc.id || undefined,
      titre: this.currentDoc.titre,
      type: this.currentDoc.type, 
      datePublication: this.currentDoc.datePublication ? new Date(this.currentDoc.datePublication) : new Date(),
      statut: this.currentDoc.statut,
      service: servicePayload
    };

    if (this.isEditMode && docAEnvoyer.id) {
      this.docService.updateDoc(docAEnvoyer.id, docAEnvoyer).subscribe({
        next: () => {
          this.displayModal = false; 
          this.chargerDonnees(); 
        },
        error: (err: any) => console.error("Erreur modification:", err)
      });
    } else {
      this.docService.saveDoc(docAEnvoyer).subscribe({
        next: () => {
          this.displayModal = false; 
          this.chargerDonnees(); 
          this.reinitialiserFormulaire();
        },
        error: (err: any) => console.error("Erreur ajout:", err)
      });
    }
  }

  onDelete(id: any) {
    if (confirm("Supprimer ce document ?")) {
      this.docService.deleteDoc(id).subscribe({
        next: () => this.chargerDonnees(),
        error: (err: any) => console.error("Erreur suppression:", err)
      });
    }
  }

  private reinitialiserFormulaire() {
    const aujourdHui = new Date().toISOString().split('T')[0];
    this.currentDoc = { 
      id: undefined, 
      titre: '', 
      type: '', 
      datePublication: aujourdHui, 
      statut: 'En attente' 
    };
  }
}