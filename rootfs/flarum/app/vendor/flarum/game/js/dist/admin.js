(()=>{var e={n:a=>{var r=a&&a.__esModule?()=>a.default:()=>a;return e.d(r,{a:r}),r},d:(a,r)=>{for(var t in r)e.o(r,t)&&!e.o(a,t)&&Object.defineProperty(a,t,{enumerable:!0,get:r[t]})},o:(e,a)=>Object.prototype.hasOwnProperty.call(e,a),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},a={};(()=>{"use strict";e.r(a);const r=flarum.core.compat["common/app"];e.n(r)().initializers.add("flarum/game",(function(){console.log("[flarum/game] Hello, forum and admin!")}));const t=flarum.core.compat["admin/app"];var n=e.n(t);n().initializers.add("flarum/game",(function(){n().extensionData.for("flarum-game").registerPermission({icon:"fas fa-gamepad",label:n().translator.trans("flarum-game.admin.permissions.interface"),permission:"game.interface"},"view",95).registerSetting({setting:"flarum-game.enable_push_msg",label:n().translator.trans("flarum-game.admin.settings.enable_push_msg"),type:"boolean"})}))})(),module.exports=a})();
//# sourceMappingURL=admin.js.map