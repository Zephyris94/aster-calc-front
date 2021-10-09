import { MoveType } from './../../Core/models';
import { CalcStoreService } from './../../Services/calc-store.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculationResultModel } from 'src/app/Core/models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  calcResultToDisplay: CalculationResultModel | undefined;

  constructor(private calcStore: CalcStoreService) { }

  ngOnInit(): void {
    this.calcStore.calcResult$.subscribe(result => {
      this.calcResultToDisplay = result;
    });
  }

  getMoveType(moveType: MoveType): string {
    switch(moveType){
      case MoveType.GK:
        return "GK";
      case MoveType.Ship:
          return "Ship";
      case MoveType.Paradox:
        return "Paradox";
      case MoveType.SoE:
        return "SoE";
      case MoveType.Wyvern:
        return "Wyvern";
    }
  }

}
