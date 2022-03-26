import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Blockchains } from '../../../core/models/blockchains';
import { ClientFactoryService } from '../../../core/services';

@Component({
  selector: 'app-amount-bar',
  templateUrl: './amount-bar.component.html',
  styleUrls: ['./amount-bar.component.scss']
})
export class AmountBarComponent implements OnChanges {

  @Input() address: string;
  @Input() blockchain: Blockchains;
  @Output() amountChanged = new EventEmitter<number>();

  amountFormControl = new FormControl('', [Validators.required]);
  balance: number;
  isLoading: boolean;

  constructor(private clientFactory: ClientFactoryService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadBalance();
  }

  loadBalance() {
    if (!this.address) {
      return;
    }
    this.isLoading = true;
    const client = this.clientFactory.getClient(this.blockchain);
    client.getBalance(this.address)
      .then(amount => {
        this.balance = amount;
        this.amountFormControl.addValidators(Validators.max(amount));
      })
      .finally(() => setTimeout(() => this.isLoading = false, 1000));
  }


  onAmountChange(newAmount: number) {
    this.amountChanged.emit(newAmount);
  }

}