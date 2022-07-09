/* eslint-disable */

if(typeof String.prototype.replaceAll === "undefined") {
  String.prototype.replaceAll = function(match: any, replace: any) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  }
}

export {};
