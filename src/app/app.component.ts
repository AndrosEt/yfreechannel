import {Component, HostBinding, OnInit} from '@angular/core';


import {RouterOutlet} from '@angular/router';
import {JsonData, PicObject, ProductItem, RequestService} from './service/request.service';
import {ClipboardService, IClipboardResponse} from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(

  ) {
  }

  ngOnInit(): void {

  }

}
