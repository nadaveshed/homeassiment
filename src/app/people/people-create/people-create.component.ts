import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PeoplesService } from "../people.service";

@Component({
  selector: "app-people-create",
  templateUrl: "./people-create.component.html",
  styleUrls: ["./people-create.component.css"]
})
export class PeopleCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  
  constructor(public peoplesService: PeoplesService) {}

  onAddPeople(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.peoplesService.addPeople(form.value.title, form.value.content);
    form.resetForm();
  }
}
