import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PokerRoomDetailComponent } from './poker-room-detail/poker-room-detail.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PickCardComponent } from './poker-room-detail/pick-card/pick-card.component';
import { PlayerComponent } from './poker-room-detail/player/player.component';
import { DeckComponent } from './poker-room-detail/deck/deck.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SimpleNotificationsModule } from 'angular2-notifications';

const appRoutes: Routes = [
  { path: 'pokerroom/:id', component: PokerRoomDetailComponent },
  { path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PokerRoomDetailComponent,
    HomeComponent,
    PickCardComponent,
    PlayerComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    MatPasswordStrengthModule
  ],
  providers: [
    { provide: REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
