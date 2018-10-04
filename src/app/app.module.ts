import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatRadioModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { PeopleCreateComponent } from "./people/people-create/people-create.component";
import { HeaderComponent } from "./header/header.component";
import { PeopleListComponent } from "./people/people-list/post-list.component";

@NgModule({
  declarations: [
    AppComponent,
    PeopleCreateComponent,
    HeaderComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
