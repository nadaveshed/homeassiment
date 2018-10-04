import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { People } from "../people.model";
import { PeoplesService } from "../people.service";

@Component({
  selector: "app-people-list",
  templateUrl: "./people-list.component.html",
  styleUrls: ["./people-list.component.css"]
})
export class PeopleListComponent implements OnInit, OnDestroy {

  peoples: People[] = [];
  private peoplesSub: Subscription;

  constructor(public peopleService: PeoplesService) {}

  ngOnInit() {
    this.peopleService.getPeoples();
    this.peoplesSub = this.peopleService.getPeopleUpdateListener()
      .subscribe((peoples: People[]) => {
        this.peoples = this.peoples;
      });
  }

  onDelete(peopleId: string) {
    this.peopleService.deletePeople(peopleId);
  }

  ngOnDestroy() {
    this.peoplesSub.unsubscribe();
  }
}
