(()=>{var t={n:e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a}),a},d:(e,a)=>{for(var s in a)t.o(a,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:a[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e);const a=flarum.core.compat["common/extend"],s=flarum.core.compat["common/app"];var r=t.n(s);const n=flarum.core.compat["admin/components/ExtensionPage"];var i=t.n(n);const l=flarum.core.compat["common/components/Select"];var o=t.n(l);const h=flarum.core.compat["common/components/Switch"];var c=t.n(h);r().initializers.add("the-turk-mathren",(function(t){(0,a.extend)(i().prototype,"sections",(function(t){"the-turk-mathren"==this.extension.id&&t.has("permissions")&&t.remove("permissions")})),t.extensionData.for("the-turk-mathren").registerSetting((function(){return m("div",{className:"MathRen-SettingsContainer"},m("div",{className:"MathRen-KatexOptions"},m("h3",null,t.translator.trans("the-turk-mathren.admin.settings.katex_options_heading")),m("hr",null),m("h4",null,t.translator.trans("the-turk-mathren.admin.settings.delimiters_label")),m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.delimiters_text")),m("div",{className:"helpText"},m("i",{className:"fa-icon fas fa-exclamation-circle"}),t.translator.trans("the-turk-mathren.admin.settings.bbcode_delimiters_rule_text")),m("div",{className:"MathRen--flex Mathren--binary"},m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.block_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.block_delimiters"),placeholder:"[math]%e%[/math]"}))),m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.block_asciimath_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.block_asciimath_delimiters"),placeholder:"[asmath]%e%[asmath]"})))),m("div",{className:"MathRen--flex"},m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.inline_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.inline_delimiters"),placeholder:"[imath]%e%[/imath]"}))),m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.inline_asciimath_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.inline_asciimath_delimiters"),placeholder:"[iasmath]%e%[iasmath]"})))),m("div",{className:"MathRen--flex"},m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.alias_block_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.alias_block_delimiters"),placeholder:"$$%e%$$,₺₺%e%₺₺"}))),m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.alias_block_asciimath_delimiters_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.alias_block_asciimath_delimiters"),placeholder:"\\$%e%\\$"})))),m("div",{className:"MathRen--flex"},m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.alias_inline_delimiters_text")),m("div",{className:"Form-group"},m("input",{type:"text",className:"FormControl",bidi:this.setting("the-turk-mathren.alias_inline_delimiters"),placeholder:"\\(%e%\\)"}))),m("div",{className:"MathRen--delimiterGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.alias_inline_asciimath_delimiters_text")),m("div",{className:"Form-group"},m("input",{type:"text",className:"FormControl",bidi:this.setting("the-turk-mathren.alias_inline_asciimath_delimiters"),placeholder:"\\{%e%\\}"})))),m("div",{className:"helpText"},m("i",{className:"fa-icon fas fa-exclamation-circle"}),t.translator.trans("the-turk-mathren.admin.settings.primary_delimiters_text")),m("div",{className:"MathRen--flex"},m("div",{className:"Form-group"},m("label",null,t.translator.trans("the-turk-mathren.admin.settings.output_mode_label")),m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.output_mode_text"))),m("div",{className:"Form-group"},m(o(),{value:this.setting(["the-turk-mathren.output_mode"])(),options:{html:"HTML",mathml:"MathML",htmlAndMathml:"HTML & MathML"},buttonClassName:"Button",onchange:this.settings["the-turk-mathren.output_mode"]}))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.enable_fleqn"])()&&"0"!==this.setting(["the-turk-mathren.enable_fleqn"])(),onchange:this.settings["the-turk-mathren.enable_fleqn"]},t.translator.trans("the-turk-mathren.admin.settings.enable_fleqn_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.enable_leqno"])()&&"0"!==this.setting(["the-turk-mathren.enable_leqno"])(),onchange:this.settings["the-turk-mathren.enable_leqno"]},t.translator.trans("the-turk-mathren.admin.settings.enable_leqno_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.color_is_text_color"])()&&"0"!==this.setting(["the-turk-mathren.color_is_text_color"])(),onchange:this.settings["the-turk-mathren.color_is_text_color"]},t.translator.trans("the-turk-mathren.admin.settings.color_is_text_color_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.throw_on_error"])()&&"0"!==this.setting(["the-turk-mathren.throw_on_error"])(),onchange:this.settings["the-turk-mathren.throw_on_error"]},t.translator.trans("the-turk-mathren.admin.settings.throw_on_error_label"))),m("div",{className:"MathRen--flex"},m("div",{className:"Form-group"},m("label",null,t.translator.trans("the-turk-mathren.admin.settings.error_color_label")),m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.error_color_text"))),m("div",{className:"Form-group"},m("input",{type:"color",className:"FormControl",bidi:this.setting("the-turk-mathren.error_color")}))),m("h4",null,t.translator.trans("the-turk-mathren.admin.settings.sizing_options_heading")),m("div",{className:"MathRen--flex"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.minimum_thickness_text")),m("div",{className:"Form-group"},m("input",{type:"number",lang:"en-US",min:"0",step:".01",className:"FormControl",bidi:this.setting("the-turk-mathren.min_rule_thickness"),placeholder:"0.05"}))),m("div",{className:"MathRen--flex"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.maximum_size_text")),m("div",{className:"Form-group"},m("input",{type:"number",min:"0",className:"FormControl",bidi:this.setting("the-turk-mathren.max_size"),placeholder:"10"}))),m("div",{className:"Form-group"},m("label",null,t.translator.trans("the-turk-mathren.admin.settings.macros_label")),m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.macros_text")),m("div",{className:"helpText"},m("i",{className:"fa-icon fas fa-exclamation-circle"}),t.translator.trans("the-turk-mathren.admin.settings.java_syntax_text")),m("textarea",{className:"FormControl",bidi:this.setting("the-turk-mathren.macros"),placeholder:'"\\\\RR": "\\\\mathbb{R}"'})),m("div",{className:"MathRen--flex"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.maximum_expand_limit_text")),m("div",{className:"Form-group"},m("input",{type:"number",min:"0",className:"FormControl",bidi:this.setting("the-turk-mathren.max_expand"),placeholder:"1000"})))),m("div",{className:"MathRen-CDNOptions"},m("h3",null,t.translator.trans("the-turk-mathren.admin.settings.cdn_options_heading")),m("hr",null),m("div",{className:"MathRen--flex Mathren--binary"},m("div",{className:"MathRen--cdnGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.cdn_katex_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.cdn_katex")}))),m("div",{className:"MathRen--cdnGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.sri_katex_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.sri_katex")})))),m("div",{className:"MathRen--flex Mathren--binary"},m("div",{className:"MathRen--cdnGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.cdn_asciimath2tex_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.cdn_asciimath2tex")}))),m("div",{className:"MathRen--cdnGroup"},m("div",{className:"helpText"},t.translator.trans("the-turk-mathren.admin.settings.sri_asciimath2tex_text")),m("div",{className:"Form-group"},m("input",{className:"FormControl",type:"text",bidi:this.setting("the-turk-mathren.sri_asciimath2tex")}))))),m("div",{className:"MathRen-OtherOptions"},m("h3",null,t.translator.trans("the-turk-mathren.admin.settings.other_options_heading")),m("hr",null),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.enable_editor_buttons"])()&&"0"!==this.setting(["the-turk-mathren.enable_editor_buttons"])(),onchange:this.settings["the-turk-mathren.enable_editor_buttons"]},t.translator.trans("the-turk-mathren.admin.settings.enable_editor_buttons_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.aliases_as_primary"])()&&"0"!==this.setting(["the-turk-mathren.aliases_as_primary"])(),onchange:this.settings["the-turk-mathren.aliases_as_primary"]},t.translator.trans("the-turk-mathren.admin.settings.aliases_as_primary_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.allow_asciimath"])()&&"0"!==this.setting(["the-turk-mathren.allow_asciimath"])(),onchange:this.settings["the-turk-mathren.allow_asciimath"]},t.translator.trans("the-turk-mathren.admin.settings.allow_asciimath_label"))),m("div",{className:"Form-group"},m(c(),{state:!!this.setting(["the-turk-mathren.enable_copy_tex"])()&&"0"!==this.setting(["the-turk-mathren.enable_copy_tex"])(),onchange:this.settings["the-turk-mathren.enable_copy_tex"]},t.translator.trans("the-turk-mathren.admin.settings.enable_copy_tex_label"))),m("div",{className:"helpText"},m("i",{className:"fa-icon fas fa-exclamation-circle"}),t.translator.trans("the-turk-mathren.admin.settings.quote_button_text"))))}))}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map