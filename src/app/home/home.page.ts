import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { FirebaseRTBService } from '../service/firebase-rtb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
})
export class HomePage {
  public mensajes: string[] = [];
  constructor(private furebaseService: FirebaseRTBService) {
    this.mensajes = this.furebaseService.mensajes;
  }


}
