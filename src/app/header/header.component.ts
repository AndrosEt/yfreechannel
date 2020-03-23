import { Component, OnInit } from '@angular/core';
import {RequestService} from '../service/request.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';
// import TweenLite = gsap.TweenLite;
// import 'gsap';
import { TimelineLite, Back, Power1, SlowMo, TweenLite } from 'gsap'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isPc = false
  showMenu = false

  constructor(
    private requestService: RequestService
  ) {
    this.isPc = this.requestService.getUserAgent()
  }

  ngOnInit() {
    let element =  document.getElementsByClassName('root-container')[0]
    element.setAttribute('style', `width: ${document.body.clientWidth}px`)

  }

  openMenu() {
    this.showMenu = true

  }

  handleOk(): void {
    this.showMenu = false;
  }

  handleCancel(): void {
    this.showMenu = false;
  }

  gotoHome() {

  }

  gotoProducts() {

  }
}
