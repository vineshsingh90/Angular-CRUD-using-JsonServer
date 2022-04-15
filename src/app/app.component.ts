import { Component } from '@angular/core';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public coreService: CoreService) {}
  showLoader = false;

  ngOnInit() {
    this.coreService.loaderStatus.subscribe((res: any) => {
      setTimeout(() => {
        this.showLoader = res;
      }, 0);
    });
  }
}
