(this["webpackJsonpfake-store-front"]=this["webpackJsonpfake-store-front"]||[]).push([[0],{132:function(e,t,o){"use strict";o.r(t);var r=o(0),c=o.n(r),n=o(70),i=o.n(n),l=(o(81),o(30),o(1)),s=function(e){var t=e.title;return Object(l.jsx)("div",{className:"container-fluid",children:Object(l.jsx)("header",{className:"header",children:Object(l.jsx)("h1",{children:t})})})},a=function(e){var t=e.title;return Object(l.jsx)("div",{className:"container-fluid",children:Object(l.jsx)("header",{className:"header",children:Object(l.jsx)("h2",{children:t})})})},d=function(){return Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)(a,{title:"HomePage"}),Object(l.jsx)("div",{children:"Purpose: Evalute Different Video Players that will use the Video Streaming Service"})]})},j=o(21),u=function(e){var t=e.useRef,o=e.title,c=e.id,n=e.color,i=e.hoverColor,s=e.backGroundColor,a=e.hoverBackgroundColor,d=Object(r.useState)(n),u=Object(j.a)(d,2),h=u[0],b=u[1],f=Object(r.useState)(s),v=Object(j.a)(f,2),O=v[0],p=v[1];function x(e,t){b(e),p(t)}var g={color:"".concat(h),backgroundColor:"".concat(O)};return Object(l.jsx)("a",{style:g,onMouseEnter:function(){return x(i,a)},onMouseLeave:function(){return x(n,s)},id:c,href:t,children:o})};u.defaultProps={color:"white",hoverColor:"rgb(253, 253, 253)",backGroundColor:"rgb(70, 70, 70)",hoverBackgroundColor:"rgb(61, 61, 61)"};var h=u,b=function(e){var t=e.navConfig,o=e.bgColor,r=e.color,c=e.hoverColor,n=e.backgroundColor,i=e.hoverBackgroundColor;return Object(l.jsx)("nav",{children:Object(l.jsx)("div",{className:"menu",style:{backgroundColor:o},children:Object(l.jsx)("ul",{children:t.map((function(e){return Object(l.jsx)("li",{id:e.id.toString()+"lid",children:Object(l.jsx)(h,{id:e.key,title:e.title,useRef:e.ref,color:r,hoverColor:c,backGroundColor:n,hoverBackgroundColor:i},e.id.toString())},e.id.toString()+"li")}))})})})};b.defaultProps={navConfig:[{id:1,title:"Home",ref:"/",component:"HompePage"}],color:"white",hoverColor:"rgb(240, 240, 240)",backGroundColor:"rgb(70, 70, 70)",hoverBackgroundColor:"rgb(61, 61, 61)",bgColor:"rgb(70,70,70)"};var f=b,v=o(71),O=o.n(v),p=function(e){e.url;return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)("h3",{children:"React Player"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"More documentation"}),Object(l.jsx)("li",{children:"Easy to install"}),Object(l.jsx)("li",{children:"No Poster Option (yet)"})]}),Object(l.jsx)("sub",{children:"https://www.npmjs.com/package/react-player"}),Object(l.jsx)("div",{children:Object(l.jsx)(O.a,{url:"http://localhost:8080/videos/videofiles?videosrc=testvideo",controls:!0})}),Object(l.jsx)("div",{children:Object(l.jsx)("a",{href:"#",children:"Change"})})]})})};p.defaultProps={url:"http://media.w3.org/2010/05/sintel/trailer.mp4"};var x=p,g=o(72),m=function(e){e.url;return Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)("h2",{children:"video-react player"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"It has been a struggle to get this working. A lot of dependencie issues."}),Object(l.jsx)("li",{children:"Unable to get the CSS to work right."}),Object(l.jsx)("li",{children:"Will finetune controls to auto start."})]}),Object(l.jsx)(g.Player,{playsInline:!0,poster:"/assets/poster.png",src:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",width:720,height:480})]})};m.defaultProps={url:"http://media.w3.org/2010/05/sintel/trailer.mp4"};var C=m,w=function(){return Object(l.jsx)("div",{children:"That is a 404 baby"})},y=o(73),k=(o(126),{type:"video",sources:[{src:"http://media.w3.org/2010/05/sintel/trailer.mp4"}]}),P=function(){return Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:"Documentation is lacking. Took a while to troublshoot the sources."}),Object(l.jsx)("li",{children:"Cannont control size very well."})]}),Object(l.jsx)(y.a,{source:k,controls:!0,width:720,height:"480px"})]})},S=o(75),N=o(12),R=function(e){var t=e.videoInfo,o="".concat(function(){var e=window.location.hostname,t=window.location.port,o="http://".concat(e,":").concat(t);return"3000"===t?"http://localhost:8080":o}(),"/videos/videofiles?videosrc=").concat(t.src),c=Object(r.useRef)(o),n=Object(r.useRef)(o);return Object(r.useEffect)((function(){if(n.current===o)return console.log("current",n.current),console.log("videoref",c.current),void console.log("DAMN",t);c.current&&(console.log(".load()"),c.current.load()),n.current=o}),[o,t]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"HTMLFiveVideo"}),Object(l.jsx)("video",{width:"720",controls:t.defaultControls,ref:c,children:Object(l.jsx)("source",{src:o,type:"video/mp4"})})]})},F=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),o=t[0],c=t[1],n=Object(r.useState)(null),i=Object(j.a)(n,2),s=i[0],a=i[1],d=Object(r.useState)([]),u=Object(j.a)(d,2),h=u[0],b=u[1],f=Object(r.useState)(""),v=Object(j.a)(f,2),O=v[0],p=v[1],x=window.location.host,g=window.location.port,m=window.location.protocol,C=function(){return"3000"===g?"http://localhost:8080/videos/videostub":"".concat(m,"//").concat(x,"/videos/videostub")};if(console.log(C()),Object(r.useEffect)((function(){fetch(C()).then((function(e){return e.json()})).then((function(e){b(e.videos),c(!0)})).catch((function(e){a(e),c(!0)}))}),[]),s)return Object(l.jsx)("div",{children:s});if(!o)return Object(l.jsx)("div",{children:"Loading..."});return console.log(h.src),""===O&&p(h[0]),Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{className:"container-fluid temp-container",children:[Object(l.jsx)(R,{videoInfo:O}),Object(l.jsx)("div",{children:h.map((function(e,t){return Object(l.jsx)("div",{children:Object(l.jsx)("a",{href:"#".concat(t),onClick:function(){p(h[t])},children:e.title})},e.id)}))})]})})};var B=function(){var e=[{id:1,title:"Home",ref:"/videoplayer",component:d},{id:2,title:"Video-React",ref:"/videoplayer/videoreact",component:C},{id:3,title:"React-Player",ref:"/videoplayer/reactplayer",component:x},{id:4,title:"PlyrReact",ref:"/videoplayer/plyrreact",component:P},{id:5,title:"FSVideoPlayer",ref:"/videoplayer/fsvideoplayer",component:F}];return Object(l.jsx)(S.a,{children:Object(l.jsxs)("div",{className:"fluid-container",children:[Object(l.jsx)(f,{navConfig:e}),Object(l.jsx)(s,{title:"React VideoPlayer Evaluation"}),Object(l.jsxs)(N.c,{children:[e.map((function(e){return Object(l.jsx)(N.a,{path:e.ref,component:e.component,exact:!0},e.id)})),Object(l.jsx)(N.a,{path:"*",component:w})]})]})})},E=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,134)).then((function(t){var o=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,i=t.getTTFB;o(e),r(e),c(e),n(e),i(e)}))};i.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(B,{})}),document.getElementById("root")),E()},30:function(e,t,o){},81:function(e,t,o){}},[[132,1,2]]]);
//# sourceMappingURL=main.0c365683.chunk.js.map