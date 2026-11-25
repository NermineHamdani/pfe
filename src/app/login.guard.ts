import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Console } from 'console';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  
var platformId = inject(PLATFORM_ID) ;
if(isPlatformBrowser(platformId)){
    console.log("HERE PLTFORM ID")
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole'); // On récupère le rôle stocké au login
  // Si l'utilisateur est DÉJÀ connecté
  if (isLoggedIn === 'true') {
    console.log("Utilisateur déjà connecté, redirection automatique...");
    
    // On le redirige vers le bon dashboard selon son rôle
    if (userRole === 'ADMIN') {
      router.navigate(['/dashboard']);
    } else if (userRole === 'USER') {
      router.navigate(['/user-dashboard']);
    } else {
      router.navigate(['/dashboard']); // Sécurité par défaut
    }
    
    return false; // On lui bloque l'accès à la page de Login
  }

  return true; // L'utilisateur n'est pas connecté, il peut accéder au Login normalement !
  } 
  return true;
}
 