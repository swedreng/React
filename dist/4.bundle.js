webpackJsonp([4],{209:function(e,n,t){e.exports=t.p+"b79c26b4d255c8b198d5a7b59b9800c6.png"},210:function(e,n,t){e.exports=t.p+"84902caf03e72dba8ce01006e00d83a0.png"},211:function(e,n,t){e.exports=t.p+"c311bdd329d569f269595d5f556c8baf.png"},212:function(e,n,t){e.exports=t.p+"06531de4a5f91a88b8a819970c29e9a5.png"},230:function(e,n,t){var a=t(231);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0};r.transform=void 0;t(9)(a,r);a.locals&&(e.exports=a.locals)},231:function(e,n,t){n=e.exports=t(8)(undefined),n.push([e.i,'.commentssmain .row {\n  padding-bottom: 20px; }\n\n.commetpp {\n  height: 50px;\n  display: table; }\n  .commetpp img {\n    width: 50px;\n    height: 50px;\n    margin-left: -10px;\n    border-radius: 50%; }\n\n.commentdate {\n  float: right;\n  margin-top: 10px;\n  color: #b4b6bd; }\n\n.commentdiv {\n  position: relative;\n  overflow: hidden; }\n  .commentdiv p {\n    word-wrap: break-word;\n    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n    font-size: 14px; }\n  .commentdiv .commentdiv--area {\n    padding: 5px; }\n    .commentdiv .commentdiv--area .clap {\n      width: 28px;\n      height: 28px;\n      background-image: url("'+t(209)+'");\n      background-size: cover;\n      float: left;\n      margin-top: 8px; }\n    .commentdiv .commentdiv--area b {\n      float: left;\n      padding: 5px;\n      margin-top: 8px; }\n    .commentdiv .commentdiv--area .active {\n      background-image: url('+t(210)+'); }\n    .commentdiv .commentdiv--area span {\n      float: right;\n      margin-bottom: 10px; }\n    .commentdiv .commentdiv--area .crown {\n      width: 28px;\n      height: 28px;\n      background-image: url("'+t(211)+'");\n      background-size: cover;\n      float: left;\n      margin-top: 8px;\n      margin-right: 10px; }\n    .commentdiv .commentdiv--area .crownactive {\n      width: 32px;\n      height: 32px;\n      background-image: url("'+t(211)+'");\n      background-size: cover;\n      float: left;\n      margin-top: 8px;\n      background-image: url('+t(212)+');\n      margin-right: 10px; }\n  .commentdiv hr {\n    margin-top: 5px;\n    margin-bottom: 5px; }\n\n@media screen and (min-width: 1024px) {\n  .commentdiv {\n    position: relative;\n    overflow: hidden; }\n    .commentdiv p {\n      word-wrap: break-word;\n      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n      font-size: 14px; } }\n\n@media screen and (min-width: 1024px) {\n  height: 50px;\n  img {\n    width: 0px !important;\n    width: 40px;\n    height: 50px; } }\n',""])},48:function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),c=t(0),m=function(e){return e&&e.__esModule?e:{"default":e}}(c),l=(t(2),t(1),t(5));!function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);n["default"]=e}(l);t(230);var d=function(e){function n(e){return a(this,n),r(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return o(n,e),i(n,[{key:"render",value:function(){var e=this.props.comments.CommentBest;return m["default"].createElement("div",{className:"commentssmain"},e.map(function(e,n){return m["default"].createElement("div",{className:"row",key:n},m["default"].createElement("div",{className:"col-xs-12 col-lg-2 hidden-md hidden-xs"},m["default"].createElement("div",{className:"commetpp"},m["default"].createElement("img",{src:e.user.pp}))),m["default"].createElement("div",{className:"col-xs-12 col-lg-10 col-md-12 commentdiv img-thumbnail"},m["default"].createElement("b",null,e.user.firstname," ",e.user.lastname),m["default"].createElement("p",null,e.writing),m["default"].createElement("hr",null),m["default"].createElement("div",{className:"commentdiv--area"},m["default"].createElement("div",{className:0==n?"crownactive":"null"}),m["default"].createElement("div",{className:"clap"}),m["default"].createElement("b",null,e.like)),m["default"].createElement("span",{className:"commentdate"},e.Time)))}))}}]),n}(c.Component);n["default"]=d}});