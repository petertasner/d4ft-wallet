import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';
import { NotificationService } from '../notification/notification.service';
import { BitcoinService } from './bitcoin.service';

@Injectable({
  providedIn: 'root'
})
export class LitecoinService extends BitcoinService {

  constructor(protected configService: ConfigService, protected httpClient: HttpClient, protected notification: NotificationService) {
    super(configService, httpClient, notification);
  }
}