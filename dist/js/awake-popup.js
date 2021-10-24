"use strict";function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _classPrivateMethodInitSpec(t,e){_checkPrivateRedeclaration(t,e),e.add(t)}function _checkPrivateRedeclaration(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function _classPrivateMethodGet(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var _render=new WeakSet,_assign=new WeakSet,AwakePopup=function(){function n(t,e){_classCallCheck(this,n),_classPrivateMethodInitSpec(this,_assign),_classPrivateMethodInitSpec(this,_render),this.$button=document.querySelector(t),this.$popup=null,this.$closeBtn=null,this.$body=document.querySelector("body"),this.$html=document.querySelector("html"),this.$options=e,this.$options.content=null!==(t=e.content)&&void 0!==t?t:"",this.$options.overlay=null!==(t=e.overlay)&&void 0!==t&&t,this.$options.closeButton=null!==(t=this.$options.closeButton)&&void 0!==t&&t,this.$buttons=null!==(t=e.buttons)&&void 0!==t&&t.length?e.buttons:[],this.$overlayClose=null===(t=e.overlayClose)||void 0===t||t,this.$scroll=null!==(e=e.noScroll)&&void 0!==e&&e,_classPrivateMethodGet(this,_render,_render2).call(this),_classPrivateMethodGet(this,_assign,_assign2).call(this)}return _createClass(n,[{key:"customButtonHandler",value:function(t,e){e.handler(t,e)}},{key:"isOpen",get:function(){return this.$popup&&this.$popup.classList.contains("open")}},{key:"scrollbarWidth",get:function(){var t=document.createElement("div");t.style.overflowY="scroll",t.style.width="50px",t.style.height="50px",t.style.visibility="hidden",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}},{key:"closeButtonHandler",value:function(){this.close()}},{key:"overlayClickHandler",value:function(t){"popup-overlay"===t.target.dataset.type&&this.close()}},{key:"clickHandler",value:function(){this.open()}},{key:"getPopupTemplate",value:function(t){var e,n;return 0<(null===(e=t.buttons)||void 0===e?void 0:e.length)&&(n=_toConsumableArray(t.buttons).map(function(t,e){var n;return'<button type="'.concat(null!==(n=t.buttonType)&&void 0!==n?n:"button",'" class="').concat(null!==(n=t.buttonClasses)&&void 0!==n&&n.length?t.buttonClasses.join(" "):"",'" data-index="').concat(e,'">').concat(t.buttonText,"</button>")})),'\n      <div class="awake-popup__content">\n        '.concat(t.closeButton?'<button class="awake-popup__close" data-close></button>':"","\n        ").concat(null!==(t=null==t?void 0:t.content)&&void 0!==t?t:"",'\n        <div class="awake-popup__custom-buttons">').concat(n?n.join(""):"","</div>\n     </div>\n    ")}},{key:"open",value:function(){this.$popup.classList.add("open"),this.$scroll&&(this.$html.style.paddingRight=this.scrollbarWidth+"px",this.$body.classList.add("no-overflow"),this.$html.classList.add("no-overflow"))}},{key:"close",value:function(){this.$popup.classList.remove("open"),this.$scroll&&(this.$html.style.paddingRight="0",this.$body.classList.remove("no-overflow"),this.$html.classList.remove("no-overflow"))}},{key:"destroy",value:function(){this.$button&&this.$button.removeEventListener("click",this.clickHandler),this.$popup.remove()}}]),n}();function _render2(){this.$popup=document.createElement("div"),this.$popup.classList.add("awake-popup"),this.$popup.setAttribute("data-type","popup-overlay"),this.$options.overlay&&this.$popup.classList.add("overlay"),this.$popup.innerHTML=this.getPopupTemplate(this.$options),this.$body.append(this.$popup)}function _assign2(){var n=this;this.clickHandler=this.clickHandler.bind(this),this.overlayClickHandler=this.overlayClickHandler.bind(this),this.closeButtonHandler=this.closeButtonHandler.bind(this),this.$button&&this.$button.addEventListener("click",this.clickHandler),this.$overlayClose&&!this.isOpen&&this.$popup&&this.$popup.addEventListener("click",this.overlayClickHandler),this.$options.closeButton&&(this.$closeBtn=this.$popup.querySelector("button[data-close]"),this.$closeBtn.addEventListener("click",this.closeButtonHandler)),this.$buttons.length&&this.$buttons.find(function(e,t){e.handler&&(n.customButtonHandler=n.customButtonHandler.bind(n),n.$popup.querySelector('button[data-index="'.concat(t,'"]')).addEventListener(null!==(t=e.handlerType)&&void 0!==t?t:"click",function(t){return n.customButtonHandler(t,e)}))})}