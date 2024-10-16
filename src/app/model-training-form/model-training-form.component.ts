import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-training-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './model-training-form.component.html',
  styleUrl: './model-training-form.component.css'
})
export class ModelTrainingFormComponent {

  dropdown2Options: string[][] = [];
  dropdown3Options: string[][] = [];

  modelTrainingForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.modelTrainingForm = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addItem();
  }

  get items(): FormArray {
    return this.modelTrainingForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      dropdown1: ['', Validators.required],
      dropdown2: ['', Validators.required],
      dropdown3: ['', Validators.required],
      colx: '',
    });

    this.items.push(itemFormGroup);
    this.dropdown2Options.push([]); 
    this.dropdown3Options.push([]); 
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.dropdown2Options.splice(index, 1);
      this.dropdown3Options.splice(index, 1);
    } else {
      alert('At least one row must be present.');
    }

  }

  onDropdown1Change(event: any, index: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'h2o' || selectedValue==='weka') {
      this.dropdown2Options[index] = ['Classification', 'Regression'];
    } else if (selectedValue === 'scikit') {
      this.dropdown2Options[index] = ['Classification', 'Regression', 'Forecasting'];
    } else {
      this.dropdown2Options[index] = [];
    }

    const concatenatedValue = selectedValue + ' Hey';
    this.items.at(index).patchValue({
      colx: concatenatedValue
    });

    this.dropdown3Options[index] = [];
    this.items.at(index).get('dropdown2')?.setValue(''); 
    this.items.at(index).get('dropdown3')?.setValue(''); 
  }

  onDropdown2Change(event: any, index: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Classification') {
      this.dropdown3Options[index] = ['NaiveBayesMultinomial','AdaBoost', 'SupportVectorMachines', 
        'ExtraTrees', 'Bagging', 'LogisticRegression', 'DecisionTrees', 'XGradientBoosting',
         'RandomForest','GradientBoostingMachines','KNearestNeighbour'];
    } else if (selectedValue === 'Regression') {
      this.dropdown3Options[index] = ['AdaBoost', 'SupportVectorMachines', 'ExtraTrees', 'Bagging', 'LinearRegression', 'DecisionTrees', 'XGradientBoosting', 'RandomForest', 'MultiLayerPerceptron'];
    } else if (selectedValue === 'Forecasting') {
      this.dropdown3Options[index] = ['XGradientBoosting', 'RandomForest', 'MultiLayerPerceptron'];
    } else {
      this.dropdown3Options[index] = [];
    }

    this.items.at(index).get('dropdown3')?.setValue(''); 
  }

  onSubmit(): void {
    console.log(this.modelTrainingForm.value);
  }
}