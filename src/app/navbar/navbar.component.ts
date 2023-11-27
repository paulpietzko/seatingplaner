import { Component } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  constructor(private firestoreService: FirestoreService) {}

  uploadTestData() {
    this.firestoreService.addTestDocument()
      .then(() => console.log('Dokument erfolgreich hinzugefügt!'))
      .catch(error => console.error('Es gab einen Fehler: ', error));
  }
}