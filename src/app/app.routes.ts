import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { UtilisateursComponent } from './utilisateurs/utilisateurs';
import { UserDashboardComponent } from './user-dashboard/user-dashboard';
import { LoginComponent } from './login/login';
import { authGuard } from './auth.guard'; 
import { loginGuard } from './login.guard'; // 👈 1. Ajout de l'import du nouveau Guard pour le login

export const routes: Routes = [
  // 🔐 Route Admin protégée (Si pas connecté -> renvoie au Login)
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  
  { path: 'utilisateurs', component: UtilisateursComponent },
  
  // 🔐 Route User Dashboard protégée (Si pas connecté -> renvoie au Login)
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  
  // 🚪 Route Login filtrée (Si DÉJÀ connecté -> redirige directement vers son propre Dashboard)
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] }, // 👈 2. Application du Guard ici
  
  // Par défaut, si l'utilisateur arrive sur l'application, on le redirige vers le login
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];