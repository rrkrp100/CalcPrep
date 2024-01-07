import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'; 

@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatSelectModule, MatInputModule ],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.scss',
})
export class CalcComponent implements OnChanges {
  @Input()
  public operationType = 'Addition';
  public isAnswerVisible = false;
  private numbers: Array<number> = [1, 2, 3, 4];
  public displayItems: Array<any> = [];
  public answer: any = -1;
  public disableDropDown = false;
  public numberOfOperands: number = 2;
  private difficultyLevel: number = 2;

  constructor() {
    this.nextQuestion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.disableDropDown = false;
    if (this.operationType == 'Division') {
      this.disableDropDown = true;
      this.numberOfOperands = 2;
    }
    this.nextQuestion();
  }

  public showAnswer() {
    this.calculateAnswer();
    this.isAnswerVisible = true;
  }

  public nextQuestion() {
    this.isAnswerVisible = false;
    this.createnumbers();
    this.createDisplayArray();
  }

  public updateNumberOfOperands(event: number) {
    this.numberOfOperands = event;
    this.nextQuestion();
  }
  public updateDifficulty(diff: number) {
    this.difficultyLevel = diff;
    this.nextQuestion();
  }
  private createDisplayArray() {
    this.displayItems = [];
    let operand: string = '';

    switch (this.operationType) {
      case 'Addition':
        operand = '+';
        break;
      case 'Substraction':
        operand = '-';
        break;
      case 'Multiplication':
        operand = 'x';
        break;
      case 'Division':
        operand = '/';
        break;
    }

    for (let i = 0; i < this.numbers.length - 1; i++) {
      this.displayItems.push(this.numbers[i]);
      this.displayItems.push(operand);
    }
    this.displayItems.push(this.numbers[this.numbers.length - 1]);
  }
  private createnumbers() {
    this.numbers = new Array<number>(this.numberOfOperands);
    for (let i = 0; i < this.numberOfOperands; i++) {
      let num = Math.floor(Math.random() * (Math.pow(10,this.difficultyLevel)));
      this.numbers[i] = num;
    }
    if (this.operationType == 'Division') {
      this.numbers.sort((a, b) => b - a);
    }
  }

  private calculateAnswer() {
    this.answer = 0;
    switch (this.operationType) {
      case 'Addition':
        this.add();
        break;
      case 'Substraction':
        this.substract();
        break;
      case 'Multiplication':
        this.multiply();
        break;
      case 'Division':
        this.divide();
        break;
    }
  }
  private add() {
    this.numbers.forEach((element) => {
      this.answer += element;
    });
  }
  private multiply() {
    this.answer = 1;
    this.numbers.forEach((element) => {
      this.answer *= element;
    });
  }
  private substract() {
    this.answer = this.numbers[0];
    for (let i = 1; i < this.numbers.length; i++) {
      this.answer -= this.numbers[i];
    }
  }
  private divide() {
    this.answer = (this.numbers[0] / this.numbers[1]).toFixed(2);
  }
}
