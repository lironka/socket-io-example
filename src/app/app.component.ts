import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socket-io-example';

  constructor(private socketService: SocketService) {
    this.socketService.send('something', 'Hello Kitty!').subscribe(res => {
      console.log(res);
    });
  }
}
