import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { ConsultazioneComponent } from './consultazione/consultazione.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataService } from './core/services/data.service';
import { FiscalCodeService } from './core/services/fiscal-code.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FcDialogComponent } from './fc-dialog/fc-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CopyClipboardSnackbarComponent } from './copy-clipboard-snackbar/copy-clipboard-snackbar.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentComponent,
		StepperComponent,
		InserimentoComponent,
		ConsultazioneComponent,
		TableComponent,
		FcDialogComponent,
		CopyClipboardSnackbarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatDatepickerModule,
		MatMomentDateModule,
		FlexLayoutModule,
		MatTableModule,
		MatSortModule,
		MatRadioModule,
		MatIconModule,
		MatSlideToggleModule,
		MatPaginatorModule,
		MatDialogModule,
		ClipboardModule,
		MatSnackBarModule
	],
	providers: [{ provide: LOCALE_ID, useValue: "it" }, DataService, FiscalCodeService],
	bootstrap: [AppComponent]
})
export class AppModule { }
