import { Injectable } from '@angular/core';
import { PeopleComponent } from 'src/app/people/people.component';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private people: PeopleComponent

	constructor() {
		this.people = new PeopleComponent();
		this.people.prePopulate();
	}

	public addPerson(name: string, surname: string, gender: string, birthDate: any, birthPlace: string) {
		this.people.addPerson(name, surname, gender, birthDate, birthPlace);
	}

	public getPeople() {
		return this.people.getPeople();
	}
}
