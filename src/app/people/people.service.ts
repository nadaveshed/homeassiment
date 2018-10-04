import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { People } from "./people.model";

@Injectable({ providedIn: "root" })
export class PeoplesService {
  private peoples: People[] = [];
  private peoplesUpdated = new Subject<People[]>();

  constructor(private http: HttpClient) {}

  getPeoples() {
    this.http
      .get<{ message: string; peoples: any }>(
        "http://localhost:3000/api/people"
      )
      .pipe(map((peopleData) => {
        return peopleData.peoples.map(people => {
          return {
            name: people.name,
            email: people.email,
            gender: people.gender,
            phone: people.phone,
            id: people._id
          };
        });
      }))
      .subscribe(transformedPeoples => {
        this.peoples = transformedPeoples;
        this.peoplesUpdated.next([...this.peoples]);
      });
  }

  getPeopleUpdateListener() {
    return this.peoplesUpdated.asObservable();
  }

  addPeople(name: string, email: string, gender: string, phone: string) {
    const people: People = { id: null, name: name, email: email, gender: gender, phone: phone };
    this.http
      .post<{ message: string, peopleId: string }>("http://localhost:3000/api/peoples", people)
      .subscribe(responseData => {
        const id = responseData.peopleId;
        people.id = id;
        this.peoples.push(people);
        this.peoplesUpdated.next([...this.peoples]);
      });
  }

  deletePeople(peopleId: string) {
    this.http.delete("http://localhost:3000/api/peoples/" + peopleId)
      .subscribe(() => {
        const updatedPeoples = this.peoples.filter(people => people.id !== peopleId);
        this.peoples = updatedPeoples;
        this.peoplesUpdated.next([...this.peoples]);
      });
  }
}
