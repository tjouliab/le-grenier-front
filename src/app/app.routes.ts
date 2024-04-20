import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccueilComponent } from './components/homepage/accueil/accueil.component';
import { ChambresComponent } from './components/homepage/chambres/chambres.component';
import { RestaurationComponent } from './components/homepage/restauration/restauration.component';
import { ContactComponent } from './components/homepage/contact/contact.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'chambres', component: ChambresComponent },
  { path: 'restauration', component: RestaurationComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
