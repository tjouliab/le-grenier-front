import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ChambresComponent } from './pages/chambres/chambres.component';
import { RestaurationComponent } from './pages/restauration/restauration.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'chambres', component: ChambresComponent },
  { path: 'restauration', component: RestaurationComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
