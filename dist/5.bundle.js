webpackJsonp([5],{217:function(e,n,t){var r=t(218);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;t(9)(r,o);r.locals&&(e.exports=r.locals)},218:function(e,n,t){n=e.exports=t(8)(undefined),n.push([e.i,".contact-facebook {\n  width: 30px;\n  height: 30px;\n  float: right;\n  background-image: url("+t(219)+");\n  background-size: cover; }\n\n.contact-twitter {\n  width: 30px;\n  height: 30px;\n  margin: 0 auto !important;\n  background-image: url("+t(220)+");\n  background-size: cover; }\n\n.contact-instagram {\n  width: 30px;\n  height: 30px;\n  background-image: url("+t(221)+");\n  background-size: cover; }\n\n.social-media {\n  padding-bottom: 10px; }\n",""])},219:function(e,n,t){e.exports=t.p+"8b72048455c67729213b733a9c7431be.png"},220:function(e,n,t){e.exports=t.p+"5268604070f4834899023bd50f82b3ff.png"},221:function(e,n,t){e.exports=t.p+"eb8f7feedb9f02c864efe4120fc0a4e1.png"},49:function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function u(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),c=t(0),s=r(c),f=t(2),p=t(1),l=t(32),b=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}(l),d=t(4);r(d);t(217);var h=function(e){function n(e){o(this,n);var t=a(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={},t}return u(n,e),i(n,[{key:"render",value:function(){var e=this.props.viewperson.person,n=this.props.users.user_share_info;return s["default"].createElement("div",{className:"row"},s["default"].createElement("b",null,"Toplam post sayısı:")," ",e?e.postCount:n.postCount,s["default"].createElement("br",null),s["default"].createElement("b",null,"Toplam yorum sayısı:")," ",e?e.commentCount:n.commentCount)}}]),n}(c.Component),m=function(e){return{viewperson:e.viewperson,users:e.users}},g=function(e){return{userShareActions:(0,p.bindActionCreators)(b,e)}};n["default"]=(0,f.connect)(m,g)(h)}});