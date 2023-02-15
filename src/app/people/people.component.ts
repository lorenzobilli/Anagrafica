import { Component } from '@angular/core';

export interface Person {
	name: string,
	surname: string,
	gender: string,
	birthDate?: string,
	birthPlace?: string
}

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
	private people: Person[];

	constructor() {
		this.people = [];
	}

	public prePopulate() {
		this.people.push({ name: "Mario", surname: "Rossi", gender: "M", birthDate: this.birthDateBuilder(1, 1, 1970), birthPlace: "Roma" });
		this.people.push({ name: "Maria", surname: "Bianchi", gender: "F", birthDate: this.birthDateBuilder(1, 1, 1970), birthPlace: "Milano" })
	}

	public addPerson(name: string, surname: string, gender: string, birthDate: any, birthPlace: string) {
		this.people.push(
			{
				name: name,
				surname: surname,
				gender: gender,
				birthDate: birthDate != null ? birthDate.format("DD/MM/YYYY") : undefined,
				birthPlace: birthPlace
			}
		);
	}

	public getPeople() {
		return this.people;
	}

	public printData() {
		for (let person of this.people) {
			console.log(person.name, person.surname);
		}
	}

	private birthDateBuilder(day: number, month: number, year: number) {
		return new Date(year, month - 1, day).toLocaleDateString();
	}
}
