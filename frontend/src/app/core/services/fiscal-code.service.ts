import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FiscalCodeService {

	private name!: string;
	private surname!: string;
	private gender!: string;
	private birthDate?: Date;
	private birthPlace?: string;

	constructor() { }

	public setData(name: string, surname: string, gender: string, birthDate?: Date, birthPlace?: string) {
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthDate = birthDate;
		this.birthPlace = birthPlace;
	}

	private isVowel(letter: string) {
		switch (letter.toLowerCase()) {
			case "a":
			case "e":
			case "i":
			case "o":
			case "u":
				return true;
			default:
				return false;
		}
	}

	private async getCityCode(birthCity?: string) {
		const url = "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json";
		try {
			const response: any = await fetch(url);
			const cities: any = await response.json();
			for (let city of cities) {
				if (city.nome.toLowerCase() === birthCity?.toLowerCase()) {
					return city.codiceCatastale;
				}
			}
		} catch (error) {
			console.error(`Unable to make request: ${error}`);
		}
	}

	private computeSurnameSection(surname: string) {
		surname = surname.replace(/\s/g, "");
		surname = surname.replace(/'/g, "");
		let remaining: number = 3;
		let surnameSection: string = "";

		if (surname.length <= remaining) {
			surnameSection = surname;
			remaining -= surname.length;
			while (remaining != 0) {
				surname += "X";
				remaining--;
			}
			return surnameSection;
		}

		for (let letter of surname) {
			if (!this.isVowel(letter)) {
				surnameSection += letter.toUpperCase();
				if (--remaining === 0) {
					break;
				}
			}
		}

		if (remaining != 0) {
			for (let letter of surname) {
				if (this.isVowel(letter)) {
					surnameSection += letter.toUpperCase();
					if (--remaining === 0) {
						break;
					}
				}
			}
		}

		return surnameSection;
	}

	private computeNameSection(name: string) {
		name = name.replace(/\s/g, "");
		let remaining: number = 3;
		let nameSection: string = "";
	
		if (name.length <= remaining) {
			nameSection = name;
			remaining -= name.length;
			while (remaining != 0) {
				name += "X";
				remaining--;
			}
			return nameSection;
		}
	
		for (let letter of name) {
			if (!this.isVowel(letter)) {
				nameSection += letter.toUpperCase();
			}
		}
	
		if (nameSection.length < 3) {
			remaining -= nameSection.length;
			for (let letter of name) {
				if (this.isVowel(letter)) {
					nameSection += letter.toUpperCase();
					if (--remaining === 0) {
						break;
					}
				}
			}
		} else if (nameSection.length === 3) {
			nameSection = nameSection[0] + nameSection[1] + nameSection[2];
		} else {
			nameSection = nameSection[0] + nameSection[2] + nameSection[3];
		}
	
		return nameSection;
	}

	private computeYearSection(date?: Date) {
		return date?.getFullYear().toString().slice(2);
	}
	
	private computeMonthSection(date?: Date) {
		const monthLetters = "ABCDEHLMPRST";
		const month: string = date != null ? monthLetters[date.getMonth()] : "";
		return month;
	}
	
	private computeDayGenderSection(gender?: string, date?: Date) {
		let dayNumber: number = date != null ? date.getDate() : 0;
		let day: string = "";
		if (gender === "F") {
			dayNumber += 40;
			day = dayNumber.toString();
		}
		if (dayNumber < 10) {
			day = "0" + dayNumber.toString();
		}
	
		return day;
	}

	private computeControlCharacter(code: string) {
		const even: Map<string, number> = new Map([
			["0", 0], ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6], ["7", 7], ["8", 8], ["9", 9],
			["A", 0], ["B", 1], ["C", 2], ["D", 3], ["E", 4], ["F", 5], ["G", 6], ["H", 7], ["I", 8], ["J", 9],
			["K", 10], ["L", 11], ["M", 12], ["N", 13], ["O", 14], ["P", 15], ["Q", 16], ["R", 17], ["S", 18], ["T", 19],
			["U", 20], ["V", 21], ["W", 22], ["X", 23], ["Y", 24], ["Z", 25]
		]);

		const odd: Map<string, number> = new Map([
			["0", 1], ["1", 0], ["2", 5], ["3", 7], ["4", 9], ["5", 13], ["6", 15], ["7", 17], ["8", 19], ["9", 21],
			["A", 1], ["B", 0], ["C", 5], ["D", 7], ["E", 9], ["F", 13], ["G", 15], ["H", 17], ["I", 19], ["J", 21],
			["K", 2], ["L", 4], ["M", 18], ["N", 20], ["O", 11], ["P", 3], ["Q", 6], ["R", 8], ["S", 12], ["T", 14],
			["U", 16], ["V", 10], ["W", 22], ["X", 25], ["Y", 24], ["Z", 23]
		]);

		const modulo: Map<number, string> = new Map([
			[0, "A"], [1, "B"], [2, "C"], [3, "D"], [4, "E"], [5, "F"], [6, "G"], [7, "H"],
			[8, "I"], [9, "J"], [10, "K"], [11, "L"], [12, "M"], [13, "N"], [14, "O"], [15, "P"],
			[16, "Q"], [17, "R"], [18, "S"], [19, "T"], [20, "U"], [21, "V"], [22, "W"], [23, "X"],
			[24, "Y"], [25, "Z"]
		]);
	
		let codedNumber: number = 0;
		let pos: number = 1;
		for (let c of code) {
			codedNumber += pos % 2 == 0 ? even.get(c)! : odd.get(c)!;
			pos++;
		}
		return modulo.get(codedNumber % 26);
	}

	public async computeFiscalCode() {
		if (this.birthDate === null || this.birthPlace === null || this.birthDate === undefined || this.birthPlace === undefined) {
			throw new Error("Data di nascita e/o comune di nascita mancanti");
		}
		let cityCode: string = await this.getCityCode(this.birthPlace);
		let fiscalCode: string = 
			this.computeSurnameSection(this.surname) +
			this.computeNameSection(this.name) +
			this.computeYearSection(this.birthDate) +
			this.computeMonthSection(this.birthDate) +
			this.computeDayGenderSection(this.gender, this.birthDate) +
			cityCode;
			fiscalCode += this.computeControlCharacter(fiscalCode);
		return fiscalCode;
	}
}
