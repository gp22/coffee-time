import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-container',
  templateUrl: './loading-container.component.html',
  styleUrls: ['./loading-container.component.css']
})
export class LoadingContainerComponent {
  private loading: boolean;

  onQuery(status: boolean) {
    this.loading = status;
  }
}
