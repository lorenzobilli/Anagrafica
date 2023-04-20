import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copy-clipboard-snackbar',
  templateUrl: './copy-clipboard-snackbar.component.html',
  styleUrls: ['./copy-clipboard-snackbar.component.scss']
})
export class CopyClipboardSnackbarComponent {
	snackBarRef = inject(MatSnackBarRef);
}
