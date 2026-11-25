import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  var platformId = inject(PLATFORM_ID) ;
  
  // On vérifie si la variable qu'on a définie au login vaut 'true'
  if(isPlatformBrowser(platformId)){
      if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log("AUTH TRUE");
    return true; // Badge valide 🔓 Accès autorisé !
  } 
  console.log("AUTH FALSE 1");
}
    router.navigate(['/login']);
     console.log("AUTH FALSE");
    return false; 
  
  


};