import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent {
  @Input() tutorialStep: any;

  tutorialSteps = [
    {
      title: 'Schritt 1: Neue Klasse anlegen',
      texts: ['Im <span class="bold"><a href="../home/">Home</a></span> Tab eine neue Klasse hinzufügen'],
      images: [{ src: 'assets/images/tutorial/step1.png', alt: 'Steps' }],
      children: [],
      isExpanded: true
    },
    {
      title: 'Schritt 2: Schüler hinzufügen',
      texts: [
        'Auf eine der neu erstellten Klassen klicken. Nach Weiterleitung auf neue Website, Namen der Schüler eingeben.',
        'Die einzelnen Schüler können durch einen Klick auf den jeweiligen Namen auch wieder gelöscht werden.'
      ],
      images: [
        { src: 'assets/images/tutorial/step2.png', alt: 'Steps' },
        { src: 'assets/images/tutorial/step3.png', alt: 'Steps' }
      ],
      children: [],
      isExpanded: false
    },
    {
      title: 'Schritt 3: Klasse auswählen',
      texts: ['Im <span class="bold"><a href="../generator/">Generator</a></span> Tab die gewollte Klasse auswählen.'],
      images: [{ src: 'assets/images/tutorial/step4.png', alt: 'Steps' }],
      children: [],
      isExpanded: false
    },
    {
      title: 'Schritt 4: Schüler Plätzen zuweisen',
      texts: [
        'Durch das Anklicken des gewollten Sitzplatzes wird zufällig ein Schüler aus der Liste dem Feld zugewiesen. Dabei werden nur die ersten drei Buchstaben des Schülers angezeigt. Wenn es Schüler gibt, deren Namen mit den identischen drei Buchstaben beginnen, wird eine Zahl "(1)" neben dem Namen hinzugefügt.',
        'Wenn man auf ein Feld klickt, welchem bereits ein Schüler zugewiesen wurde, wird dem Feld durch Zufall ein neuer Schüler zugewiesen.'
      ],
      images: [
        { src: 'assets/images/tutorial/step5.png', alt: 'Steps' },
        { src: 'assets/images/tutorial/step6.png', alt: 'Steps' }
      ],
      children: [],
      isExpanded: false
    }
  ];

  toggleStep(index: number): void {
    this.tutorialSteps[index].isExpanded = !this.tutorialSteps[index].isExpanded;
  }
}
