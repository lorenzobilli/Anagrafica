import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private darkMode = new Subject<boolean>();
	isDarkMode = this.darkMode.asObservable();
	constructor(private overlay: OverlayContainer) { }

	toggleDarkMode(isDarkMode: boolean) {
		
		this.darkMode.next(isDarkMode);

		if (isDarkMode) {
			this.overlay.getContainerElement().classList.add("darkMode")
		} else {
			this.overlay.getContainerElement().classList.remove("darkMode");
		}
	}
}
