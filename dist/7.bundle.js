webpackJsonp([7],{207:function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function l(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(0),d=l(u),m=n(2),p=n(1),f=n(5),g=a(f),h=n(12),v=a(h),b=n(4),x=l(b),E=n(6),k=l(E),w=n(17),y=l(w);n(242);var N=(0,k["default"])({loader:function(){return n.e(0).then(n.bind(null,19))},loading:x["default"],delay:4e3}),_=(0,k["default"])({loader:function(){return n.e(1).then(n.bind(null,20))},loading:x["default"],delay:4e3}),C=function(e){function t(e){i(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={loadMore:!1,status:!0,comment:{}},n.onUpdate=n.onUpdate.bind(n),n}return r(t,e),c(t,[{key:"actionComment",value:function(e){var t=s({},this.state.comment);t[e]?t[e]=!1:t[e]=!0,this.setState({comment:t})}},{key:"likeSubmit",value:function(e){(0,this.props.postsActions.postLike)({like:1,post_id:e})}},{key:"deletePost",value:function(e){(0,this.props.postsActions.deletePost)({post_id:e})}},{key:"onUpdate",value:function(){var e=this;console.log("viewonupdate");var t=this.props.viewProfileActions.LoginviewProfile,n=this.props.posts.postCount,a=this.props.username;console.log(this.props.posts.data.length<n,23),this.props.posts.data.length<n&&1==this.state.status&&(this.setState({loadMore:!0,status:!1}),t(this.props.posts.data.length>0?{value:this.props.posts.data.length,event:!1,person_username:a}:{value:0,event:!1,person_id:person.id}).then(function(){e.setState({status:!0,loadMore:!1})}))}},{key:"render",value:function(){var e=this,t=this.props.posts.data,n=this.props.auth.user_id;this.props.auth.role;return d["default"].createElement("div",{className:"row"},t.length>0?d["default"].createElement(y["default"],{onUpdate:this.onUpdate},t.map(function(t,a){return d["default"].createElement("div",{className:"posts"},d["default"].createElement("div",{className:"img-thumbnail col-xs-12 col-lg-12 col-md-12 imagediv"},d["default"].createElement("div",{className:"caption MainText"},d["default"].createElement("div",{className:"row"},d["default"].createElement("div",{className:"col-lg-4 col-md-5 col-sm-4 col-xs-8"},d["default"].createElement("img",{className:"ppimage",src:t.user.pp}),d["default"].createElement("b",null," ",t.user.firstname," ",t.user.lastname)),d["default"].createElement("div",{className:"col-lg-7 col-md-7 col-sm-8 col-xs-4"},d["default"].createElement("span",{className:"postTime"},t.Time)),d["default"].createElement("div",{className:"col-lg-1 col-md-5 col-sm-4 col-xs-8"},t.id==n?d["default"].createElement("div",{className:"confirmationUser "+(t.confirmation?"confirmation_active":null)}):d["default"].createElement("div",{className:"confirmation_active"}))),d["default"].createElement("div",{className:"row"},d["default"].createElement("p",null,t.writing))),d["default"].createElement("hr",{style:"write"==t.kind?{display:"none"}:null}),d["default"].createElement("div",{className:"MainImage",style:"write"==t.kind?{display:"none"}:null},d["default"].createElement("img",{src:t.image})),d["default"].createElement("hr",null),d["default"].createElement("div",{className:"icon"},d["default"].createElement("div",{className:"row"},d["default"].createElement("div",{className:"col-lg-3 col-md-4 col-sm-4 col-xs-5"},d["default"].createElement("span",{onClick:function(){return e.likeSubmit(t.post_id)}},d["default"].createElement("div",{className:"like "+(t.IslikedPost?"active":null)}),d["default"].createElement("b",null,"Beğen"))),d["default"].createElement("div",{className:"col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment"},d["default"].createElement("div",{className:"likecount"},d["default"].createElement("img",{src:"src/images/thumb-up.png"}),d["default"].createElement("b",null,t.like)),d["default"].createElement("div",{className:"commentcount"},d["default"].createElement("img",{onClick:function(){return e.actionComment(t.post_id)},src:"src/images/comment-white-oval-bubble.png"}),d["default"].createElement("b",{className:"openComment"},t.CommentCount))),d["default"].createElement("div",{className:"col-lg-3 col-md-2 col-sm-2 col-xs-2"},1==t.user.rank?d["default"].createElement("div",null,"Admin"):d["default"].createElement("div",{className:"dropdown option"},d["default"].createElement("button",{className:"btn btn-default dropdown-toggle",type:"button","data-toggle":"dropdown"},d["default"].createElement("span",{className:"caret"})),d["default"].createElement("ul",{className:"dropdown-menu"},n==t.id?null:d["default"].createElement("li",null,d["default"].createElement("a",{onClick:function(){return e.blockPost(t.post_id)}},"Bunu görmek istemiyorum")),n==t.id||1==t.user.rank||2==t.user.rank?null:d["default"].createElement("li",null,d["default"].createElement("a",{onClick:function(){return e.blockUser(t.post_id,t.user.id)}},"Kullanıcıyı engelle")),n==t.user.id?d["default"].createElement("li",null,d["default"].createElement("a",{onClick:function(){return e.deletePost(t.post_id)}},"Sil")):null))))),d["default"].createElement(_,{status:!!e.state.comment[t.post_id]||"write"==t.kind,post:t}),d["default"].createElement("div",{className:"row Usercomment"},d["default"].createElement(N,{status:!!e.state.comment[t.post_id]||"write"==t.kind,comments:t}))))}),this.state.loadMore?d["default"].createElement("div",{className:"Loading"},d["default"].createElement("img",{src:"src/images/l.gif"})):null):d["default"].createElement(x["default"],null))}}]),t}(u.Component),P=function(e){return{auth:e.auth,description:e.description,posts:e.posts,viewperson:e.viewperson}},M=function(e){return{postsActions:(0,p.bindActionCreators)(g,e),viewProfileActions:(0,p.bindActionCreators)(v,e)}};t["default"]=(0,m.connect)(P,M)(C)},242:function(e,t,n){var a=n(243);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;n(9)(a,l);a.locals&&(e.exports=a.locals)},243:function(e,t,n){t=e.exports=n(8)(undefined),t.push([e.i,'.MainImage {\n  height: auto; }\n  .MainImage img {\n    height: auto;\n    width: 100%;\n    margin-bottom: 10px;\n    overflow: hidden !important; }\n\n.page {\n  margin-left: auto; }\n\n.posts {\n  padding-left: 0px;\n  padding-bottom: 20px; }\n  .posts .imagediv {\n    margin-bottom: 10px !important; }\n    .posts .imagediv hr {\n      margin-top: 5px;\n      margin-bottom: 5px; }\n\n.commentbest {\n  padding: 0px !important; }\n\n.ppimage {\n  height: 40px;\n  width: 40px;\n  padding-right: 3px;\n  border-radius: 50%;\n  vertical-align: middle;\n  margin-top: 10px;\n  margin-left: -10px; }\n\n.postTime {\n  margin-top: 10px;\n  float: right;\n  color: #b4b6bd; }\n\n.option {\n  float: right !important; }\n\n.MainText p {\n  display: table;\n  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n  font-size: 17px;\n  padding-top: 11px !important;\n  margin-left: 10px; }\n\n.icon {\n  padding: 7px; }\n  .icon img {\n    width: 20px;\n    height: 20px;\n    margin-right: 5px; }\n  .icon .likeicon {\n    width: 30px;\n    height: 30px;\n    cursor: pointer;\n    margin-left: 10px; }\n  .icon b {\n    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n    font-size: 15px;\n    padding-left: 2px; }\n\n.jumbotron {\n  padding-top: 0px !important; }\n\n@media only screen and (max-device-width: 768px) {\n  .MainImage {\n    height: 100%; } }\n\n@media only screen and (max-device-width: 425px) {\n  .MainImage {\n    height: 50%; } }\n\n.like {\n  width: 25px;\n  height: 25px;\n  float: left;\n  background-image: url('+n(44)+");\n  background-size: cover; }\n\n.active {\n  background-image: url("+n(45)+"); }\n\n.delete {\n  width: 20px;\n  height: 20px;\n  float: right;\n  background-image: url("+n(77)+");\n  background-size: cover;\n  cursor: pointer; }\n\n.jumbotron .Loading img {\n  width: 100px;\n  height: 100px;\n  margin-left: 50%;\n  margin-right: 50%; }\n\n.likecomment {\n  display: flex; }\n  .likecomment .likecount {\n    margin-right: 5px; }\n\n.confirmation_active {\n  background-image: url("+n(31)+") !important; }\n\n.confirmationUser {\n  width: 30px;\n  height: 30px;\n  float: right;\n  margin-left: 10px;\n  background-image: url("+n(24)+");\n  background-size: cover; }\n\n.Loading img {\n  width: 100px;\n  height: 100px;\n  margin-left: 40%;\n  margin-right: 50%; }\n",""])}});