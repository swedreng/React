webpackJsonp([11],{206:function(e,t,a){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function l(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(0),u=l(i),d=a(2),f=a(1),m=a(12),p=n(m),h=a(46),b=n(h),v=a(4),g=l(v);a(215);var E=function(e){function t(e){r(this,t);var a=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return o(t,e),c(t,[{key:"componentWillMount",value:function(){var e=this.props.users.user_info,t=this.props.users.user_social_media;console.log(t,11),null==e.phone?this.setState({phone:""}):this.setState({phone:e.phone}),null==e.adress?this.setState({adress:""}):this.setState({adress:e.adress}),null==e.personalwriting?this.setState({personalwriting:""}):this.setState({personalwriting:e.personalwriting}),null==t.facebook?this.setState({facebook:""}):this.setState({facebook:t.facebook}),null==t.twitter?this.setState({twitter:""}):this.setState({twitter:t.twitter}),null==t.instagram?this.setState({instagram:""}):this.setState({instagram:t.instagram})}},{key:"handleSubmit",value:function(e){var t=this.props.userInfoActions.setUserInfo;switch(e){case 1:t({value:this.state.phone,status:1});break;case 2:t({value:this.state.adress,status:2});break;default:t({value:this.state.personalwriting,status:3})}}},{key:"setSocialMedia",value:function(e){var t=this.props.userInfoActions.setSocialMedia;switch(e){case 1:t({value:this.state.facebook,status:1});break;case 2:t({value:this.state.twitter,status:2});break;default:t({value:this.state.instagram,status:3})}}},{key:"render",value:function(){var e=this,t=this.props.users.user_info,a=this.props.users.result,n=this.props.description.message;return null!=t?u["default"].createElement("div",{className:"row "},u["default"].createElement("form",{"class":"form-horizontal"},u["default"].createElement("fieldset",null,u["default"].createElement("legend",null,"Kişisel Bilgiler"),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"textinput"},"Phone"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.phone,onChange:function(t){return e.setState({phone:t.target.value})},type:"text",placeholder:"Telefonunuz","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.handleSubmit(1)},className:"btn btn-danger btn-sm nameupdate"}," ",this.state.phone?"Güncelle":"Kaydet"))),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"lastname"},"Adress"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.adress,onChange:function(t){return e.setState({adress:t.target.value})},type:"text",placeholder:"Adresiniz","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.handleSubmit(2)},className:"btn btn-danger btn-sm nameupdate"},this.state.adress?"Güncelle":"Kaydet"))),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"username"},"Write"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.personalwriting,onChange:function(t){return e.setState({personalwriting:t.target.value})},type:"text",placeholder:"Sizi anlatan birşey ..","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.handleSubmit(3)},className:"btn btn-danger btn-sm nameupdate"},this.state.personalwriting?"Güncelle":"Kaydet"))),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"username"},"Facebook"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.facebook,onChange:function(t){return e.setState({facebook:t.target.value})},type:"text",placeholder:"Facebook(Kullanıcı adınız)","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.setSocialMedia(1)},className:"btn btn-danger btn-sm nameupdate"},this.state.facebook?"Güncelle":"Kaydet"))),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"username"},"Twitter"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.twitter,onChange:function(t){return e.setState({twitter:t.target.value})},type:"text",placeholder:"Twitter(Kullanıcı adınız)","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.setSocialMedia(2)},className:"btn btn-danger btn-sm nameupdate"},this.state.twitter?"Güncelle":"Kaydet"))),u["default"].createElement("div",{"class":"form-group"},u["default"].createElement("label",{"class":"col-md-3 control-label","for":"username"},"İnstagram"),u["default"].createElement("div",{"class":"col-md-6"},u["default"].createElement("input",{value:this.state.instagram,onChange:function(t){return e.setState({instagram:t.target.value})},type:"text",placeholder:"İnstagram(Kullanıcı adınız)","class":"form-control"})),u["default"].createElement("div",{className:"col-md-3"},u["default"].createElement("button",{onClick:function(){return e.setSocialMedia(3)},className:"btn btn-danger btn-sm nameupdate"},this.state.instagram?"Güncelle":"Kaydet"))))),u["default"].createElement("div",null,n?u["default"].createElement("p",{className:!0===a?"alert alert-success":!1===a?"alert alert-danger":null},n):null)):u["default"].createElement(g["default"],null)}}]),t}(i.Component),y=function(e){return{users:e.users,description:e.description}},w=function(e){return{userActions:(0,f.bindActionCreators)(p,e),userInfoActions:(0,f.bindActionCreators)(b,e)}};t["default"]=(0,d.connect)(y,w)(E)},215:function(e,t,a){var n=a(216);"string"==typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0};l.transform=void 0;a(9)(n,l);n.locals&&(e.exports=n.locals)},216:function(e,t,a){t=e.exports=a(8)(undefined),t.push([e.i,".custab {\n  border: 1px solid #ccc;\n  padding: 5px;\n  margin: 5% 0;\n  box-shadow: 3px 3px 2px #ccc;\n  transition: 0.5s; }\n\n.custab:hover {\n  box-shadow: 3px 3px 0px transparent;\n  transition: 0.5s; }\n\n.updateForm {\n  width: 80%;\n  margin: 0px auto; }\n  .updateForm input {\n    padding: 10px; }\n\n.updateButton {\n  display: block;\n  margin: 10px auto; }\n\n@media screen and (max-width: 768px) {\n  .updateForm {\n    display: block;\n    margin: 0px auto;\n    padding: 10px;\n    width: 100%; } }\n",""])}});