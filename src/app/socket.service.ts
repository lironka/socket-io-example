import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

const backendSocketURL = 'http://localhost:4444';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  constructor() {
    this.socket = io(backendSocketURL);
    this.socket.on('connection', (data: any) => {
      console.log(data);
    });
  }

  /**
   * @param event string, the same name of event as in backand
   * @param body string, any data
   * @example this.send('something', 'Hello Kitty!').subscribe(res => { ..});
   */
  send(eventName: string, body: string) {
    this.socket.emit(eventName, body);
    return Observable.create((observer: any) => {
      this.socket.on(eventName, (response: any) => {
        observer.next(eventName + ' ' + response);
      });
    });
  }

  /**
   * Example Observable
   * @example this.sendObservable().subscribe(val => {...});
   */
  sendObservable() {
    this.socket.emit('something', 'Observable welcome');
    return Observable.create((observer: any) => {
      this.socket.on('something', (data: any) => {
        observer.next('sendObservable: ' + data);
      });
    });
  }

  /**
   * Example Promise
   */
  sendPromise() {
    this.socket.emit('something', 'Promise Bye');
    return new Promise(resolve => {
      this.socket.on('something', (data: any) => {
        resolve('sendPromise ' + data);
      });
    });
  }

  /**
   * Example default
   */
  sendSimple() {
    this.socket.emit('something', 'Simple Hello');

    this.socket.on('something', (data: any) => {
      console.log('sendSimple', data);
    });
  }
}
