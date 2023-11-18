import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule, MatListModule, MatToolbarModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
