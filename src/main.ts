import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { LoginComponent } from './app/components/login/login.component';
import { ItemsComponent } from './app/components/items/items.component';
import { FormsModule } from '@angular/forms'; // ✅ Correct import
import { HttpClientModule } from '@angular/common/http'; // ✅ Correct import

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule, HttpClientModule), // ✅ Corrected
  ],
}).catch((err) => console.error(err));
