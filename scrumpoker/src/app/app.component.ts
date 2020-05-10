import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public notificationOptions = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
  }
}
