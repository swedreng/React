webpackJsonp([1],{20:function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=n(0),s=function(t){return t&&t.__esModule?t:{"default":t}}(c),u=n(2),l=n(1),p=n(5),m=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e}(p);n(226);var f=function(t){function e(t){o(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={comment:""},n}return a(e,t),i(e,[{key:"commentSubmit",value:function(t){var e=this,n=this.props.commentActions.comment;this.props.commentCount;console.log(this.props.post.CommentLast.length,this.props.post.post_id,56),n({comment:this.state.comment,post_id:this.props.post.post_id}).then(function(){console.log("geldim benn"),e.setState({comment:""})})}},{key:"render",value:function(){var t=this,e=this.state.comment,n=e;return this.props.status?s["default"].createElement("div",{"class":"row"},s["default"].createElement("div",{className:"col-lg-9 yorumyap"},s["default"].createElement("input",{onKeyDown:function(e){13==e.keyCode&&t.commentSubmit()},type:"text",className:"form-control",value:this.state.comment,onChange:function(e){return t.setState({comment:e.target.value})},placeholder:"Yorum yap"})),s["default"].createElement("div",{className:"col-lg-3"},s["default"].createElement("button",{type:"submit",disabled:!n,onClick:function(){return t.commentSubmit()},className:"btn btn-primary btn-sm"},"Yorum Yap"))):null}}]),e}(c.Component),d=function(t){return{posts:t.posts}},y=function(t){return{commentActions:(0,l.bindActionCreators)(m,t)}};e["default"]=(0,u.connect)(d,y)(f)},226:function(t,e,n){var o=n(227);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0};r.transform=void 0;n(9)(o,r);o.locals&&(t.exports=o.locals)},227:function(t,e,n){e=t.exports=n(8)(undefined),e.push([t.i,".comment {\n  margin-top: 10px; }\n\n.commentmain {\n  padding: 10px; }\n\n@media only screen and (max-device-width: 1024px) {\n  .row .yorumyap {\n    padding: 10px !important; } }\n",""])}});