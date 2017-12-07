import { Component } from '@angular/core';

@Component({
  selector: 'coffee-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CoffeeCustomizerComponent {
    downloadTemplate(): void {
        window.open('/assets/files/CoffeeLabelTemplate.zip', '_blank');
    }
}
