"use strict";(self.webpackChunk_x_poppy_h5_slider=self.webpackChunk_x_poppy_h5_slider||[]).push([[384],{5276:function(e,n,t){t.d(n,{Z:function(){return c}});var i=t(7313),r=t(9556),o=t(6417),a="OnClick";var c=function(e){var n=(0,r.p)(),t=(0,i.useCallback)((function(t){e.clickEffect&&e.children&&(t.stopPropagation(),n(e.clickEffect,{eventName:a}))}),[n,e.children,e.clickEffect]);return e.children?(0,o.jsx)(o.Fragment,{children:(0,i.cloneElement)(i.Children.only(e.children),{onClick:t})}):null}},2384:function(e,n,t){t.r(n);var i=t(6852),r=t(7313),o=t(6123),a=t.n(o),c="Block_main__f8uwU",u="Block_withRound__5GfN9",l="Block_withShadow__aTxrB",d=t(6417);var s=function(e){var n,t,i=null!==(n=e.shadow)&&void 0!==n&&n,o=null!==(t=e.round)&&void 0!==t&&t,s=(0,r.useMemo)((function(){return{background:e.background,padding:e.padding,width:e.width,height:e.height,margin:e.margin}}),[]);return(0,d.jsx)("div",{onClick:e.onClick,style:s,className:a()(c,o&&u,i&&l),children:e.children})},f=t(5276),v=t(8250),h="Space_main__p0NuR";var m=function(e){var n=(0,r.useMemo)((function(){return{padding:e.padding,width:e.width,height:e.height,margin:e.margin}}),[]);return(0,d.jsx)(v.T,{onClick:e.onClick,className:h,style:n,wrap:!0,block:e.block,direction:e.direction,align:e.align,justify:e.justify,gap:e.gap,children:e.children})},p="Float_main__i6V2X";var x=function(e){var n=(0,r.useMemo)((function(){return{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width,height:e.height,transform:e.transform,zIndex:e.zIndex}}),[]);return(0,d.jsx)("div",{className:p,style:n,children:e.children})},g=t(4165),S=t(1413),_=t(5861),k=t(885),y=t(3283),C=t(7026),b=t(3261),w=t(666),j=t(3606),Z=t(6157),I="onSchemaInitial";var R=function(e){var n=(0,C.X)(),t=(0,y.u)(),o=(0,r.useState)(null),a=(0,k.Z)(o,2),c=a[0],u=a[1];return(0,r.useEffect)((function(){e.url&&(0,Z.u)((0,_.Z)((0,g.Z)().mark((function r(){var o,a,c,l,d;return(0,g.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t.start(),r.next=4,(0,b.V)(e.url,null===(o=e.$$schema.info)||void 0===o?void 0:o.baseURL);case 4:a=r.sent,c=new CustomEvent(I,{detail:{schema:a,name:e.name,selector:{find:w.sE,findByType:w.HF,findByProperty:w.nt}}}),n.emit(c),l=(0,j.To)(c.detail.schema)?c.detail.schema:a,d=(0,i.S)(l,{refScopes:(0,S.Z)((0,S.Z)((0,S.Z)({},e.$$schema.definitions),e.$schema.definitions),e),sharedProps:{$$schema:e.$$schema}}),u(d),t.end(),r.next=16;break;case 13:r.prev=13,r.t0=r.catch(0),t.end();case 16:case"end":return r.stop()}}),r,null,[[0,13]])}))))}),[]),c};var E=function(e){return e.children},N=t(7938),M="IFrame_main__qd4kH";var P=function(e){var n,t=e.src&&(0,N.Ax)(e.src,null===(n=e.$$schema.info)||void 0===n?void 0:n.baseURL);return(0,d.jsx)("iframe",{style:{height:e.height},className:M,src:t})},T="Padding_main__xRBSp";var z=function(e){var n,t=null!==(n=e.size)&&void 0!==n?n:"md";return(0,d.jsx)("div",{className:a()(T,t&&"size__"+t),children:e.children})},B=t(163),A=t(9043);var L=function(e){var n=(0,B.oR)();return(0,r.useMemo)((function(){return(0,A.q5)(e.show,!1,(function(e){return n.get(e)}))}),[e.show,n])?e.children:null},$=r.createContext(0);function q(e){return(0,d.jsx)($.Provider,{value:e.index,children:e.children})}var V=t(8733),F=t(9556),H="Slide_main__Ekiqd",D="OnEntrySlide";var J=function(e){var n=(0,V.HJ)(),t=(0,r.useContext)($),i=n.activeIndex===t,o=(0,F.p)();return(0,r.useEffect)((function(){i&&e.entryEffect&&(0,Z.u)((0,_.Z)((0,g.Z)().mark((function n(){return(0,g.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o(e.entryEffect,{eventName:D,detail:{activeIndex:t}});case 2:case"end":return n.stop()}}),n)}))))}),[o,e.entryEffect,t,i]),(0,d.jsx)("div",{style:{background:e.background},className:H,children:e.children})},U=t(4943),G=t(7516),Y=t(9503),K=t(3901),O=t(4942);var W=t(5651),Q="SliderContentLayer_main__PfyW+",X="SliderContentLayer_swiper__3Chyb",ee="SliderContentLayer_locked__AbdmJ",ne=t(2904);var te=function(e){var n,t,i=null!==(n=e.slideElements)&&void 0!==n?n:[],o=(0,V.HJ)(),c=(0,K.Y)(),u=(0,ne.L)().locked;t=c,(0,r.useEffect)((function(){var e=null===t||void 0===t?void 0:t.info;if(e){e.title&&(document.title=e.title),e.lang&&document.documentElement.setAttribute("lang",e.lang);var n=document.head.querySelector("link[rel='icon']");if(n){var i,r,o=null!==(i=e.favicon&&(0,N.Ax)(e.favicon,null===(r=t.info)||void 0===r?void 0:r.baseURL))&&void 0!==i?i:"./favicon.ico";n.setAttribute("href",o)}if(e.description){var a=document.head.querySelector("meta[name='description']");a&&a.setAttribute("content",e.description)}if(e.themeColor){var c=document.head.querySelector("meta[name='theme-colo']");c&&c.setAttribute("content",e.themeColor)}if(e.viewport){var u=document.head.querySelector("meta[name='viewport']");u&&u.setAttribute("content",e.viewport)}if(e.statusBarStyle){var l=document.head.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");l&&l.setAttribute("content",e.statusBarStyle)}if(e.appleTouchIcon){var d=document.head.querySelector("link[rel='apple-touch-icon']");d&&d.setAttribute("href",e.appleTouchIcon)}if(e.background){var s=document.body.querySelector(".app");s&&(s.style.background=e.background)}if(e.contentBackground){var f=document.body.querySelector(".sliderShell");f&&(f.style.background=e.contentBackground)}}}),[t]),function(){var e=(0,B.oR)(),n=(0,V.HJ)();(0,r.useEffect)((function(){var t;e.batchUpdate((t={},(0,O.Z)(t,B.mL.ActiveIndex,n.activeIndex),(0,O.Z)(t,B.mL.TotalCount,n.totalCount),(0,O.Z)(t,B.mL.ActiveIndexTimeStamp+"-"+n.activeIndex,Date.now()),t))}),[n.activeIndex])}();var l=(0,r.useCallback)((function(e){o.onSlideChange(e)}),[o]);return(0,r.useMemo)((function(){return(0,d.jsx)("div",{className:a()(Q,u&&ee),children:(0,d.jsx)(v.tq,{ref:e.swiperRef,initialSwipe:o.initialIndex,className:X,loop:!1,duration:V.df,touchable:!1,vertical:e.vertical,indicator:!1,onChange:l,children:i.map((function(e,n){return(0,d.jsx)(v.tq.Item,{children:(0,d.jsx)(q,{index:n,children:(0,W.z0)(n,o.activeIndex,o.cacheSize)?e:null})},n)}))})})}),[o.activeIndex,u])},ie="Slider_main__N2IU7",re=t(3099),oe="SliderOverlapLayer_main__Ezy9c";var ae=function(e){var n=(0,re.S)(),t=(0,r.useCallback)((function(e){n.setOverlap(e)}),[n]);return(0,d.jsx)("div",{ref:t,className:oe,children:e.children})};var ce=function(e){var n=Array.isArray(e.children)?e.children:[],t=n.length,i=(0,r.useRef)(null);return(0,d.jsx)("div",{className:ie,style:{background:e.background},children:(0,d.jsx)(K.M,{sliderSchema:e.$$schema,children:(0,d.jsx)(U.S,{children:(0,d.jsx)(V.KQ,{swiperRef:i,initialIndex:e.initialIndex,cacheSize:e.cacheSize,totalCount:t,children:(0,d.jsx)(G.W,{children:(0,d.jsx)(B.g3,{data:e.storeData,children:(0,d.jsxs)(Y.k,{children:[t>0&&(0,d.jsx)(te,{swiperRef:i,slideElements:n,vertical:e.vertical}),(0,d.jsx)(ae,{children:e.widgets})]})})})})})})})},ue=t(1168),le="Tack_main__fDjch";var de=function(e){var n=(0,r.useState)(null),t=(0,k.Z)(n,2),i=t[0],o=t[1];return(0,r.useEffect)((function(){if(e.elementId){var n=0,t=5;return function i(){var r=document.getElementById(e.elementId);if(r)return r.style.position="relative",void o(r);t<=0||(t--,n=window.setTimeout(i,500))}(),function(){n>0&&clearTimeout(n)}}}),[]),i?ue.createPortal((0,d.jsx)("div",{className:le,children:e.children}),i):null},se="FlexBox_main__DVkel";var fe=function(e){var n=(0,r.useMemo)((function(){return{padding:e.padding,width:e.width,height:e.height,margin:e.margin,flexDirection:e.direction,alignItems:e.align,justifyContent:e.justify}}),[e.align,e.direction,e.height,e.justify,e.margin,e.padding,e.width]);return(0,d.jsx)("div",{className:se,style:n,children:e.children})},ve="FlexItem_main__uy3r6";var he=function(e){var n=(0,r.useMemo)((function(){return{padding:e.padding,width:e.width,height:e.height,margin:e.margin,flex:e.flex,alignSelf:e.alignSelf,justifySelf:e.justifySelf}}),[]);return(0,d.jsx)("div",{className:ve,style:n,children:e.children})};(0,i.R)(s,"Block"),(0,i.R)(f.Z,"ClickListener"),(0,i.R)(fe,"FlexBox"),(0,i.R)(he,"FlexItem"),(0,i.R)(x,"Float"),(0,i.R)(E,"Group"),(0,i.R)(P,"IFrame"),(0,i.R)(R,"Module"),(0,i.R)(z,"Padding"),(0,i.R)(J,"Slide"),(0,i.R)(ce,"Slider"),(0,i.R)(m,"Space"),(0,i.R)(de,"Tack"),(0,i.R)(L,"ToggleGroup")},9556:function(e,n,t){t.d(n,{p:function(){return p}});var i=t(4165),r=t(1413),o=t(5861),a=t(7313),c=t(8250),u=t(4943),l=t(8733),d=t(9503),s=t(3860),f=t(6956),v=t(163),h=t(815),m=t(2904);function p(){var e=(0,u.P)(),n=(0,l.HJ)(),t=(0,d.G)(),p=(0,v.oR)(),x=(0,h.xb)(),g=(0,m.L)(),S=(0,a.useCallback)(function(){var a=(0,o.Z)((0,i.Z)().mark((function o(a,u,l){var d,v,h,m,S;return(0,i.Z)().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(a){i.next=2;break}return i.abrupt("return");case 2:return v=null===(d=null===l||void 0===l?void 0:l.popupError)||void 0===d||d,h={eventName:u.eventName,detail:(0,r.Z)({},u.detail)},t.pushScope({navigation:{activeIndex:n.activeIndex,totalCount:n.totalCount},event:h}),m=(0,r.Z)((0,r.Z)({},a),{},{event:h,context:{variableScopes:t,i18nMessageBundle:e,navigation:n,store:p,httpClient:x,screenLock:g}}),i.prev=6,i.next=9,m.$$effect(m);case 9:return S=i.sent,t.popScope(),i.abrupt("return",S);case 14:i.prev=14,i.t0=i.catch(6),v&&c.Vq.alert({message:e.getMessage(f.zS.ErrorAlertMessage),confirmButtonText:e.getMessage(f.zS.CommonCloseText),className:s.Z.main});case 18:case"end":return i.stop()}}),o,null,[[6,14]])})));return function(e,n,t){return a.apply(this,arguments)}}(),[]);return S}},4943:function(e,n,t){t.d(n,{P:function(){return l},S:function(){return u}});var i=t(7313),r=t(6956),o=t(3901),a=t(6417),c=i.createContext((0,r.zw)({}));function u(e){var n=(0,o.Y)(),t=null===n||void 0===n?void 0:n.definitions,u=null===t||void 0===t?void 0:t.LocaleMessages,l=(0,i.useMemo)((function(){return(0,r.zw)(null!==u&&void 0!==u?u:{})}),[u]);return(0,a.jsx)(c.Provider,{value:l,children:e.children})}function l(){return(0,i.useContext)(c)}},8733:function(e,n,t){t.d(n,{HJ:function(){return s},KQ:function(){return d},df:function(){return u}});var i=t(885),r=t(7313),o=t(5651),a=t(1443),c=t(6417),u=300,l=r.createContext({initialIndex:0,activeIndex:0,totalCount:0,cacheSize:0,preSlide:a.Z,nextSlide:a.Z,gotoSlide:a.Z,onSlideChange:a.Z});function d(e){var n,t=e.totalCount,a=(0,o.Vy)(e.initialIndex,0,t-1),d=null!==(n=e.cacheSize)&&void 0!==n?n:1,s=(0,r.useState)(a),f=(0,i.Z)(s,2),v=f[0],h=f[1],m=(0,r.useCallback)((function(){var n;null===(n=e.swiperRef.current)||void 0===n||n.swipePrev()}),[e.swiperRef]),p=(0,r.useCallback)((function(){var n;null===(n=e.swiperRef.current)||void 0===n||n.swipeNext()}),[e.swiperRef]),x=(0,r.useCallback)((function(n){var t;null===(t=e.swiperRef.current)||void 0===t||t.swipeTo(n)}),[e.swiperRef]),g=(0,r.useCallback)((function(e){v!==e&&setTimeout((function(){h(e)}),.5*u)}),[v]),S=(0,r.useMemo)((function(){return{initialIndex:a,activeIndex:v,totalCount:t,cacheSize:d,preSlide:m,nextSlide:p,gotoSlide:x,onSlideChange:g}}),[v]);return(0,c.jsx)(l.Provider,{value:S,children:e.children})}function s(){return(0,r.useContext)(l)}},7516:function(e,n,t){t.d(n,{W:function(){return u},g:function(){return l}});var i=t(7313),r=t(8964),o=t(3901),a=t(6417),c=i.createContext((0,r.V)({}));function u(e){var n=(0,o.Y)(),t=(0,i.useMemo)((function(){var e=null===n||void 0===n?void 0:n.definitions,t=null===e||void 0===e?void 0:e.Permissions;return(0,r.V)(null!==t&&void 0!==t?t:{})}),[null===n||void 0===n?void 0:n.definitions]);return(0,a.jsx)(c.Provider,{value:t,children:e.children})}function l(){return(0,i.useContext)(c)}},9503:function(e,n,t){t.d(n,{k:function(){return d},G:function(){return s}});var i=t(1413),r=t(7313),o=t(9043);function a(e){var n=e?[e]:[],t={},r=function(){t=n.reduce((function(e,n){return(0,i.Z)((0,i.Z)({},e),n)}),{})};return r(),{pushScope:function(e){n.push(e),r()},popScope:function(){n.pop(),r()},getExpressValue:function(e,n){return(0,o.Kl)(e,(0,i.Z)((0,i.Z)({},t),n))},getExpressValues:function(e,n,r){return e.reduce((function(e,a){return e[a]=(0,o.Kl)(n[a],(0,i.Z)((0,i.Z)({},t),r)),e}),{})}}}var c=t(3901),u=t(6417),l=r.createContext(a());function d(e){var n,t,o=(0,c.Y)(),d=null===o||void 0===o?void 0:o.definitions,s=(0,r.useMemo)((function(){var e,n,t,r;return a((0,i.Z)((0,i.Z)({},d),{},{title:null!==(e=null===o||void 0===o||null===(n=o.info)||void 0===n?void 0:n.title)&&void 0!==e?e:"",description:null!==(t=null===o||void 0===o||null===(r=o.info)||void 0===r?void 0:r.description)&&void 0!==t?t:""}))}),[d,null===o||void 0===o||null===(n=o.info)||void 0===n?void 0:n.description,null===o||void 0===o||null===(t=o.info)||void 0===t?void 0:t.title]);return(0,u.jsx)(l.Provider,{value:s,children:e.children})}function s(){return(0,r.useContext)(l)}},3901:function(e,n,t){t.d(n,{M:function(){return a},Y:function(){return c}});var i=t(7313),r=t(6417),o=i.createContext({});function a(e){return(0,r.jsx)(o.Provider,{value:e.sliderSchema,children:e.children})}function c(){return(0,i.useContext)(o)}},5651:function(e,n,t){function i(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e===n||Math.abs(e-n)-t<=0}function r(e){return e&&1!==e.length?e.sort((function(){return Math.random()-.5})):e}function o(e,n,t){return e>t&&(e=t),e<n&&(e=n),e}t.d(n,{TV:function(){return r},Vy:function(){return o},z0:function(){return i}})},8964:function(e,n,t){var i;function r(e){return{getPermission:function(n,t){return void 0===e[n]?void 0!==t&&t:!!e[n]}}}t.d(n,{V:function(){return r},v:function(){return i}}),function(e){e.PreviousSlide="PreviousSlide",e.SubmitSlide="SubmitSlide"}(i||(i={}))},3860:function(e,n){n.Z={main:"alertStyleFix_main__D+82I"}}}]);