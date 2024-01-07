import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import { CalcComponent } from "./operation/calc/calc.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
        CalcComponent
    ]
})
export class AppComponent {
  title = 'CalcPrep';
  currentOperation = "Addition"

  OnOperationchange(selection:MatButtonToggleChange) {
    console.log(selection);
    this.currentOperation = selection.value
  }
}
