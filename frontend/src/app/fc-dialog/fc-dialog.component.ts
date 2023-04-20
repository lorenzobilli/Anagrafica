import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopyClipboardSnackbarComponent } from '../copy-clipboard-snackbar/copy-clipboard-snackbar.component';

export interface FcDialogData {
	header: string;
	content: string;
}

@Component({
	selector: 'app-fc-dialog',
	templateUrl: './fc-dialog.component.html',
	styleUrls: ['./fc-dialog.component.scss']
})

export class FcDialogComponent {
	private snackBarDuration: number = 3;

	constructor(@Inject(MAT_DIALOG_DATA) public data: FcDialogData, private clipboard: Clipboard, private snackBar: MatSnackBar) { }

	copyToClipboard() {
		this.clipboard.copy(this.data.content);
		this.openSnackBar();
	}

	private openSnackBar() {
		this.snackBar.openFromComponent(CopyClipboardSnackbarComponent, {
			duration: this.snackBarDuration * 1000,
		});
	}
}