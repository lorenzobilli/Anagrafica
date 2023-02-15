import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../core/services/data.service';
import { FiscalCodeService } from '../core/services/fiscal-code.service';
import { FcDialogComponent } from '../fc-dialog/fc-dialog.component';
import { Person } from '../people/people.component';

@Component({
	selector: 'mytable',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

	displayedColumns: string[] = ['name', 'surname', 'gender', 'birthDate', 'birthPlace', 'fiscalCode' ];
	dataSource = new MatTableDataSource(this.dataService.getPeople());

	constructor(private dataService: DataService, private fiscalCodeService: FiscalCodeService, private liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

	@ViewChild(MatSort) sort!: MatSort;

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	computeFiscalCode(person: Person) {
		let splittedDate = person.birthDate != null ? person.birthDate.split("/") : null;
		let birthDate = splittedDate != null ? 
			new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1, parseInt(splittedDate[0])) : undefined;
		this.fiscalCodeService.setData(person.name, person.surname, person.gender, birthDate, person.birthPlace);
		this.fiscalCodeService.computeFiscalCode().then((fiscalCode) => {
			this.dialog.open(FcDialogComponent, {
				data: {
					header: "Codice fiscale",
					content: fiscalCode
				}
			})
		})
		.catch((error) => {
			this.dialog.open(FcDialogComponent, {
				data: {
					header: "Errore",
					content: error.message
				}
			})
		});
	}
}
