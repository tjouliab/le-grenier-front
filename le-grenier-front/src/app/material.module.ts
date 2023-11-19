import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [CommonModule, MatListModule, MatToolbarModule, RouterModule],
})
export class MaterialModule {}
