// 1. Ta classe originale (conservée intacte pour tes autres composants)
export class Document {
  id?: string;
  titre: string = "";
  fichier: string = "";
  datePublication: Date = new Date();
  type: string = "";

  constructor(titre?: string, fichier?: string, datePublication?: Date, type?: string) {
    if (titre) this.titre = titre;
    if (fichier) this.fichier = fichier;
    if (datePublication) this.datePublication = datePublication;
    if (type) this.type = type;
  }
}

// 2. Les interfaces requises pour ton Dashboard et l'alignement Spring Boot / MongoDB
export interface Service {
  id?: string;
  nom: string;
  description?: string;
}

export interface Admin {
  id?: string;
  username?: string;
  email?: string;
}

export interface Application {
  id?: string;
  nom?: string;
}

export interface Documentation {
  id?: string;
  titre: string;
  fichier?: string;
  datePublication: Date | string;
  type: string; 
  statut: string;
  creePar?: Admin;
  service?: Service;
  application?: Application;
}

// À ajouter à la suite de vos interfaces existantes dans document.ts
export interface User {
  id?: string;
  nom: string;
  post: string;
  mail: string;
  direction: string;
}