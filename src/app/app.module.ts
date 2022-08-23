import { AppSettingsService } from './Services/config-service.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultComponent } from './Components/result/result.component';
import { RequestFormComponent } from './Components/request-form/request-form.component';
import { MainComponent } from './Components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LoadingInterceptor } from './util/loading-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    RequestFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppSettingsService],
    useFactory: (appSettingsService: AppSettingsService) => () =>
      appSettingsService.loadAppSettings(),
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: LoadingInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
