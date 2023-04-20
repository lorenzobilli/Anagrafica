import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../core/services/theme.service';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@HostBinding('class') className = '';
	isDarkMode!: Observable<boolean>

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.isDarkMode = this.themeService.isDarkMode;
	}

	toggleDarkMode(checked: boolean) {
		this.themeService.toggleDarkMode(checked);
	}
}
