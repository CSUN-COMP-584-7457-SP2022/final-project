import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css'],
})
export class ResultModalComponent implements OnInit {
  data: any;

  constructor(public resultModalRef: BsModalRef) {}

  ngOnInit(): void {}

  onClose() {
    this.resultModalRef.hide();
  }

  get isAtRisk() {
    const {
      prediction: [prediction],
    } = this.data;

    if (prediction === 0) {
      return false;
    }

    if (prediction === 1) {
      return true;
    }

    // We are expecting 0 or 1 so if prediction is somehow not [0,1] then there
    // is something really wrong.
    return false;
  }
}
