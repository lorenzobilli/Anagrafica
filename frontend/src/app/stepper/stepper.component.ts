import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

	@ViewChild("stepper") stepper!: ElementRef;

	private name: any;
	private surname: any;
	private gender: any;
	private birthDate: any;
	private birthPlace: any;

	nameSurnameFormGroup = this.formBuilder.group({
		nameForm: ["", [Validators.required, Validators.maxLength(50)]],
		surnameForm: ["", [Validators.required, Validators.maxLength(50)]]
	});

	birthDateFormGroup = this.formBuilder.group({
		birthDateForm: [undefined]
	})

	birthPlaceFormGroup = this.formBuilder.group({
		birthPlaceForm: [undefined]
	});

	constructor(private dataService: DataService, private formBuilder: FormBuilder) {	}

	ngAfterViewInit() {
		this.stepper.nativeElement
	}

	selectRadioButton(event: MatRadioChange) {
		this.gender = event.value;
	}

	submit() {
		this.name = this.nameSurnameFormGroup.controls.nameForm.value;
		this.surname = this.nameSurnameFormGroup.controls.surnameForm.value;
		this.birthDate = this.birthDateFormGroup.controls.birthDateForm.value;
		this.birthPlace = this.birthPlaceFormGroup.controls.birthPlaceForm.value;
		//AppComponent.data.addPerson(this.name, this.surname, this.gender, this.birthDate, this.birthPlace);
		//AppComponent.data.printData();
		this.dataService.addPerson(this.name, this.surname, this.gender, this.birthDate, this.birthPlace);
	}
}
