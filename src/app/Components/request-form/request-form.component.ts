import { CalcStoreService } from './../../Services/calc-store.service';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeModel, PathRequestModel } from 'src/app/Core/models';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { LoadingService } from 'src/app/util/loading-service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  @ViewChild('autoSource') autoSource!: MatAutocomplete;
  @ViewChildren('autoDest') autoDest!: QueryList<MatAutocomplete>;

  calcForm!: FormGroup;
  destinations: FormArray = new FormArray([]);
  sourceControl: FormControl = new FormControl('', [Validators.required]);
  maxCount = 5;
  minCount = 1;

  public destinations$ = this.calcStore.destinations$;
  public sources$ = this.calcStore.sources$;

  public sourceArray: Array<NodeModel> | undefined;
  public destinationArray: Array<NodeModel> | undefined;

  constructor(
    public loadingService: LoadingService,
    private calcStore: CalcStoreService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.calcStore.initDestinations();
    this.calcStore.initSources();

    this.calcForm = this.formBuilder.group({
      source: this.sourceControl,
      useWyv: false,
      useSoe: false,
      useShips: false,
      destinations: this.formBuilder.array([])
    });

    this.addItem();

    this.sources$.subscribe(x => {
      this.sourceArray = x;
    });

    this.destinations$.subscribe(x => {
      this.destinationArray = x;
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      destination: new FormControl('', [Validators.required]),
    });
  }

  addItem(): void {
    this.destinations = this.calcForm.get('destinations') as FormArray;
    this.destinations.push(this.createItem());
  }

  removeItem(): void {
    this.destinations = this.calcForm.get('destinations') as FormArray;
    this.destinations.removeAt(this.destinations.length-1);
  }

  submit(): void {
    debugger;
    const destArray = new Array<number>();
    for(const c of this.destinations.controls){
      if(c.value.destination){
        destArray.push(c.value.destination);
      }
    }

    const payload: PathRequestModel = {
      sourcePoint: this.calcForm.value.source,
      useWyvern: this.calcForm.value.useWyv,
      useShips: this.calcForm.value.useShips,
      useSoe: this.calcForm.value.useSoe,
      destinations: destArray
    }

    if(!payload.sourcePoint || !payload.destinations.length || payload.destinations.length === 0){
      return;
    }

    this.calcStore.getCalcResult(payload);
  }

  changeSrc() {
    const value = this.calcForm.value.source;
    this.calcStore.filterSources(value);
  }

  changeDest(index: number) {
    const controls = this.destinations.controls;
    const requiredControl = controls[index];
    const value = requiredControl.value.destination;
    this.calcStore.filterDestinations(value);
  }

  handleControlBlur() {
    if(!this.autoDest.find(x => x.isOpen) && !this.autoSource.isOpen) {
      this.calcStore.refillDestinations();
      this.calcStore.refillSources();
    }
  }

  displayFnSources(value?: number) {
    if(value) {
      let result = this.sourceArray?.find(_ => _.id === value)?.name;
      return result ? result : "";
    }
    return  "";
  }

  displayFnDestinations(value?: number) {
    if(value) {
      let result = this.destinationArray?.find(_ => _.id === value)?.name;
      return result ? result : "";
    }
    return  "";
  }
}
