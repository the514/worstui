import React, { Component } from 'react';
import $ from 'jquery';

var columnsWidth = {};

class GetColumns extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  static format(columnObjArr, model) {

    let objArr = [];
    let obj = {};
    columnsWidth[model] = 0;
    $.each(columnObjArr, function(index, val) {
      obj = {};

      $.each(columnObjArr[index], function(k, v) {
        obj[k] = columnObjArr[index][k];
      });

      if (columnObjArr[index].width) {
        if (!columnObjArr[index].fixed && !columnObjArr[index].listHidden) {
          columnsWidth[model] += columnObjArr[index].width + 20;
        }
      }

      if (columnObjArr[index].key!==undefined) {
        obj.dataIndex = columnObjArr[index].key;
      }

      objArr.push(obj);
    });

    // console.log(columnsWidth);

    return objArr;
  }

  static tableWidth(){
    return columnsWidth;
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default GetColumns;
