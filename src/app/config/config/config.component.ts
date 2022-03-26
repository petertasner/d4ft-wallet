import { Component, OnInit } from '@angular/core';

import { Config } from '../../core/models/config';
import { ConfigService } from '../../core/services';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  originalConfig: Config;
  config: Config;
  isLoading = false;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.config = this.configService.get();
    this.originalConfig = this.configService.get();
  }

  save() {
    this.configService.update(this.config);
  }
}