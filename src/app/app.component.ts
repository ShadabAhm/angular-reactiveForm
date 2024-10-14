import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelTrainingFormComponent } from "./model-training-form/model-training-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModelTrainingFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactiveForm';
}
