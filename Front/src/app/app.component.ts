import { Component } from '@angular/core';

@Component({
  selector: 'vg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public optionsNotifications = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'fromRight'
  }
}
