import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyClipboardSnackbarComponent } from './copy-clipboard-snackbar.component';

describe('CopyClipboardSnackbarComponent', () => {
  let component: CopyClipboardSnackbarComponent;
  let fixture: ComponentFixture<CopyClipboardSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyClipboardSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyClipboardSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
