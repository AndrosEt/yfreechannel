import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  buf: string = '';

  constructor() {
  }

  ngOnInit() {

  }

  transformJson() {
    let datainput = document.getElementById('jsoninput');
    let jsonData = JSON.parse(datainput['value']);

    jsonData.captionList.forEach((value, index) => {
      this.buf = this.buf + (index + 1) + '\n';
      this.buf = this.buf + value.startTime + ' --> ' + value.endTime + '\n';
      this.buf = this.buf + value.subPro + '\n';
      this.buf = this.buf + '\n';
    });
    document.getElementById('jsonoutput')['value'] = this.buf;
  }

  transformSrt() {
    let initIndex = 2;
    const step = 4;
    let outputData = '';
    let datainput = document.getElementById('srtinput');
    let srt = datainput['value'];
    let inputList = srt.split('\n');

    for (let i = 0; i < ((inputList.length / 4) + 1); i++) {
      outputData = outputData + inputList[initIndex];
      initIndex = initIndex + 4;
    }

    console.log(inputList);
    // jsonData.captionList.forEach((value, index) => {
    //   this.buf = this.buf + (index + 1) + '\n'
    //   this.buf = this.buf + value.startTime + ' --> ' + value.endTime + '\n'
    //   this.buf = this.buf + value.subPro + '\n'
    //   this.buf = this.buf + '\n'
    // })
    document.getElementById('srtoutput')['value'] = outputData;
  }

  transformAuto() {
    let initIndex = 2;
    const step = 4;
    let outputData = [];
    let datainput = document.getElementById('autoinput');
    let srt = datainput['value'];
    let inputList = srt.split('\n');

    inputList = inputList.filter(function (value) {
      if (value.trim().length <= 0) {
        // Remove ''
        return false;
      } else if (parseInt(value.trim())) {
        // Remove number
        return false;
      } else if (value.indexOf('-->') > -1) {
        // Remove -->
        return false;
      } else {
        return true;
      }
    });

    inputList.forEach(function (value) {
      if (outputData.indexOf(value) === -1) {
        outputData.push(value);
      }
    });

    console.log(outputData);
    document.getElementById('autooutput')['value'] = outputData.join(' ');
  }

  transformAuto2() {
    let initIndex = 0;
    const step = 4;
    let outputData = [];
    let outputDataBuf = [];
    let bufContainer = [];
    let bigDataList = [];
    let datainput = document.getElementById('autoinput2');
    let srt = datainput['value'];
    let inputList = srt.split('\n');

    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].trim().length <= 0 && bufContainer.length > 0) {
        let item = {};
        item['dataList'] = [];
        item['serialNumber'] = bufContainer[0];
        item['timeLine'] = {
          startTime: bufContainer[1].substring(0, bufContainer[1].indexOf('-->') - 1),
          endTime: bufContainer[1].substring(bufContainer[1].indexOf('-->') + 4, bufContainer[1].lenght)
        };
        for (let i = 2; i < bufContainer.length; i++) {
          item['dataList'].push(bufContainer[i]);
        }
        bigDataList.push(item);
        bufContainer = [];
      } else {
        bufContainer.push(inputList[i]);
      }
    }


    for (let i = 0; i < bigDataList.length - 1; i++) {
      let buf1 = bigDataList[i];
      let isIndex = false;
      buf1['dataList'].forEach(function (buf1Data) {
        if (outputData.length > 0) {
          outputData[outputData.length - 1].dataList.forEach(function (buf2Data) {
            if (buf2Data === buf1Data) {
              isIndex = true;
              outputData[outputData.length - 1].timeLine.endTime = buf1.timeLine.endTime;
            }
          });
        }
      });
      if (!isIndex) {
        outputData.push(buf1);
      }
    }

    outputData.forEach(function (data) {
      // console.log(data.serialNumber)
      // console.log(data.timeLine.startTime + ' --> ' + data.timeLine.endTime)
      // console.log(data.dataList)
      outputDataBuf.push(data.serialNumber.toString());
      outputDataBuf.push(data.timeLine.startTime.toString() + ' --> ' + data.timeLine.endTime.toString());
      data.dataList.forEach(function (item) {
        outputDataBuf.push(item)
      })
      // outputDataBuf = outputData.concat(data.dataList);
      outputDataBuf.push('');
      console.log(outputDataBuf)
    });

    // console.log(outputData)
    // console.log(outputDataBuf)

    // for(let i = 0; i <  bigDataList.length - 1; i++) {
    //   let buf1 = bigDataList[i]
    //   let isIndex = false
    //   buf1['dataList'].forEach(function (buf1Data) {
    //     outputData.forEach(function (buf2Data) {
    //       if (buf1Data === buf2Data) {
    //         isIndex = true
    //       }
    //     })
    //   })
    //   if (!isIndex) {
    //     outputData.push(buf1.serialNumber)
    //     outputData.push(buf1.timeLine.startTime + ' --> ' + buf1.timeLine.endTime)
    //     outputData = outputData.concat(buf1.dataList)
    //     outputData.push('')
    //   }
    // }
    //
    // console.log(outputData)
    //
    // // console.log(inputList);
    document.getElementById('autooutput2')['value'] = outputDataBuf.join('\n');
  }


  transformAuto3() {
    let initIndex = 0;
    const step = 4;
    let outputData = [];
    let outputDataBuf = [];
    let bufContainer = [];
    let bigDataList = [];
    let datainput = document.getElementById('autoinput3');
    let srt = datainput['value'];
    let inputList = srt.split('\n');

    console.log(inputList)
    // 去掉多余的空格
    inputList.forEach(function (value, index) {
      inputList[index] = value.trim()
    })
    // 多行合并处理
    for (let i = 0; i < inputList.length - 1; i ++) {
      if (bufContainer.length > 0) {
        let bufData = bufContainer[bufContainer.length - 1].match(/([A-Za-z])+/)
        let newData = inputList[i].match(/([A-Za-z])+/)
        if (!!bufData && !!newData && bufData.length > 0 && newData.length > 0) {
          bufContainer[bufContainer.length - 1] = bufContainer[bufContainer.length - 1] + ' ' + inputList[i]
        } else {
          bufContainer.push(inputList[i])
        }
      } else {
        bufContainer.push(inputList[i])
      }
    }

    console.log(bufContainer)
    // console.log(outputDataBuf)

    document.getElementById('autooutput3')['value'] = bufContainer.join('\n');
  }

  transformAuto4() {
    let initIndex = 2;
    const step = 4;
    let outputData = [];
    let datainput = document.getElementById('autoinput4');
    let srt = datainput['value'];
    let inputList = srt.split('\n');

    inputList = inputList.filter(function (value) {
      if (value.trim().length <= 0) {
        // Remove ''
        return false;
      } else if (parseInt(value.trim())) {
        // Remove number
        return false;
      } else if (value.indexOf('-->') > -1) {
        // Remove -->
        return false;
      } else {
        return true;
      }
    });

    inputList.forEach(function (value) {
      if (outputData.indexOf(value) === -1) {
        outputData.push(value);
      }
    });

    console.log(outputData);
    document.getElementById('autooutput4')['value'] = outputData.join('\n');
  }

  transformAuto5() {
    let initIndex = 2;
    const step = 4;
    let outputData = [];
    let datainput = document.getElementById('autoinput5');
    let srt = datainput['value'];
    let s = document.createElement('div');
    s.innerHTML = srt;
    let transcript = s.getElementsByTagName('transcript')[0]
    let testList = transcript.getElementsByTagName('text')
    console.log(testList)
    // let inputList = srt.split('\n');
    //
    // inputList = inputList.filter(function (value) {
    //   if (value.trim().length <= 0) {
    //     // Remove ''
    //     return false;
    //   } else if (parseInt(value.trim())) {
    //     // Remove number
    //     return false;
    //   } else if (value.indexOf('-->') > -1) {
    //     // Remove -->
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    //
    // inputList.forEach(function (value) {
    //   if (outputData.indexOf(value) === -1) {
    //     outputData.push(value);
    //   }
    // });
    //
    // console.log(outputData);
    // document.getElementById('autooutput5')['value'] = outputData.join('\n');
  }

}
