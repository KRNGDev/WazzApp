import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonInput, IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonAvatar, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonFooter } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FirebaseRTBService } from '../service/firebase-rtb.service';

const ALIAS_KEY = "ALIAS"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonInfiniteScrollContent, IonInfiniteScroll, IonLabel, IonAvatar, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, FormsModule, IonInput, IonItem, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
})
export class HomePage implements OnInit {
  public mensajes: any[] = [];
  public from: string = 'Alberto';
  public to: string = '';
  public message: string = '';
  public registrado: boolean = false;

  constructor(public firebaseService: FirebaseRTBService) {
    this.mensajes = firebaseService.mensajes;
    let alias = localStorage.getItem(ALIAS_KEY);
    if (alias) {
      this.registrado = true;
      this.from = alias;
    } else {
      this.registrado = false;
    }
  }
  enviar() {
    console.log(this.message + this.from)
    this.firebaseService.enviarMensaje(this.from, this.message)
  }

  public registrarUsuario() {
    localStorage.setItem(ALIAS_KEY, this.from)
    this.registrado = true;
  }

  ngOnInit(): void {
    this.generateItems();
    this.registrado = false;
  }
  private generateItems() {
    const count = this.mensajes.length + 1;
    for (let i = 0; i < 50; i++) {
      this.mensajes.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
