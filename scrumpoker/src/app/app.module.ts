import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PokerRoomDetailComponent } from './poker-room-detail/poker-room-detail.component';
import { HomeComponent } from './home/home.component';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
