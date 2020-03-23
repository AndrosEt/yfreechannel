import { Component, OnInit } from '@angular/core';
import {PicObject, RequestService} from '../service/request.service';
import {ClipboardService} from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productItemList: PicObject[] = [];
  isLoading = true

  constructor(
    private requestService: RequestService,
    private clipboardService: ClipboardService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    // let teststr = "Air_Purifier$19.99.jpg"
    // // let reg = new RegExp('_', "g")
    // let name  = teststr.replace('.jpg', '')
    //   .replace(reg, ' ')
    //   .match(/.+$/)
    // console.log(name)
    let reg = new RegExp('_', 'g');
    let item = 'Air_Purifier$19.99.jpg';

    let name = item.match(/.+(\$)/)[0].substring(0, item.lastIndexOf('$'))
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.JPG', '')
      .replace('.PNG', '')
      .replace(reg, ' ');

    let price = item.match(/\$.+/)[0]
      .replace('$', '')
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.JPG', '')
      .replace('.PNG', '')


    this.requestService.getArticles().subscribe(
      jsonData => {
        this.isLoading = false
        this.productItemList = jsonData
        let reg = new RegExp('_', "g")
        this.productItemList.map( item => {
          if (item.name.indexOf('&') > -1) {
            // only if get the price tag
            let priceStr = item.name.substring(item.name.indexOf('&'), item.name.length)
            item['price'] = priceStr.substring(priceStr.indexOf('&') + 1, priceStr.indexOf('.'))
            item['fraction'] = priceStr.substring(priceStr.indexOf('.') + 1, priceStr.lastIndexOf('.'))
            item.name = item.name.replace(item.name.substring(item.name.indexOf('&'), item.name.lastIndexOf('.')), '')
          }
          item.name = item.name
            // .replace( item.name.substring(item.name.indexOf('&'), item.name.lastIndexOf('.')),'')
            .replace('.jpg', '')
            .replace('.png', '')
            .replace('.JPG', '')
            .replace('.PNG','')
            .replace(reg, ' ')
          item.download_url = item.download_url
            .replace('raw.githubusercontent.com', 'cdn.jsdelivr.net/gh')
            .replace('/master', '')
        })
      }
    )
  }

  copyDetail(str: string) {
    this.clipboardService.copyFromContent(str);
    this.message.info('Copied');
  }

  gotoAmazon(keyWord) {

  }
}
