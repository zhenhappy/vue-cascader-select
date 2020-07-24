'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var vClickOutside=_interopDefault(require('v-click-outside'));//
//
//
//
//
//
//
//
var script = {
  name: 'Arrow',
  props: {
    borderColor: String,
    direction: {
      type: String,
      validator: function validator(value) {
        return ['up', 'down', 'right'].includes(value);
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', {
    staticClass: "vcs__arrow",
    class: _vm.direction,
    style: {
      borderColor: _vm.borderColor
    }
  }, []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-d981e8f2_0", {
    source: ".vcs__arrow{border-radius:1px;border:solid #ccc;border-width:0 3px 3px 0;cursor:pointer;display:inline-block;padding:3px;transition:150ms all linear;transform-origin:50% 50%;font-size:12px}.vcs__arrow.up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg);margin-bottom:-2px}.vcs__arrow.down{transform:rotate(45deg);-webkit-transform:rotate(45deg);margin-bottom:1px}.vcs__arrow.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-d981e8f2";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */

/*
  Every option should have a string|number label
  and either a value or an options Array
*/
var validateOptions = function validateOptions(validatingOptions) {
  return validatingOptions.every(function (_ref) {
    var label = _ref.label,
        options = _ref.options,
        value = _ref.value;
    return label && typeof label === 'string' && (value || options && Array.isArray(options) && validateOptions(options));
  });
};//
var script$1 = {
  name: 'Option',
  components: {
    Arrow: __vue_component__
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: String,
    onSelect: Function,
    options: {
      type: Array,
      validator: function validator(value) {
        return validateOptions(value);
      }
    },
    value: null,
    selectable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    index: Number
  },
  methods: {
    handleSelection: function handleSelection() {
      var _this$$props = this.$props,
          disabled = _this$$props.disabled,
          selectable = _this$$props.selectable,
          onSelect = _this$$props.onSelect,
          value = _this$$props.value,
          label = _this$$props.label;

      if (selectable && !disabled) {
        onSelect({
          label: label,
          value: value
        });
      }
    }
  },
  computed: {
    isLeaf: function isLeaf() {
      var options = this.$props.options;
      return (options || []).length === 0;
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "vcs__option",
    class: {
      'vcs__option--active': _vm.active,
      'vcs__option--disabled': _vm.disabled,
      'vsc__option--focused': _vm.focused
    },
    on: {
      "mouseenter": function mouseenter($event) {
        return _vm.$emit('openMenu', _vm.value, _vm.options, _vm.index, false);
      },
      "click": _vm.handleSelection,
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) {
          return null;
        }

        if ('button' in $event && $event.button !== 2) {
          return null;
        }

        return _vm.$emit('openMenu', _vm.value, _vm.options, _vm.index, true);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) {
          return null;
        }

        if ('button' in $event && $event.button !== 0) {
          return null;
        }

        return _vm.$emit('closeMenu');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }

        return _vm.$emit('nextOption');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
          return null;
        }

        return _vm.$emit('prevOption');
      }]
    }
  }, [_vm._ssrNode("<span>" + _vm._ssrEscape(_vm._s(_vm.label)) + "</span> "), !_vm.isLeaf ? _c('arrow', {
    attrs: {
      "direction": "right"
    }
  }) : _vm._e()], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-c0ef32a2_0", {
    source: ".vcs__option{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:5px 10px;cursor:pointer;transition:background .2s linear;color:inherit;font-family:inherit;font-size:100%;line-height:1.15;overflow:visible;-webkit-appearance:button}.vcs__option--active{background-color:#eee}.vcs__option span{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:10px}.vcs__option:focus{outline:0}.vsc__option--focused{background:#ddd;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-c0ef32a2";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
var script$2 = {
  name: 'SelectMenu',
  components: {
    Option: __vue_component__$1
  },
  props: {
    notMain: {
      type: Boolean,
      default: false
    },
    onSelect: {
      type: Function,
      required: true
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(value) {
        return validateOptions(value);
      }
    },
    withKeyboard: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    var _this$$props = this.$props,
        options = _this$$props.options,
        withKeyboard = _this$$props.withKeyboard;
    return {
      nextMenu: {
        isOpen: false,
        options: false,
        value: '',
        withKeyboard: false
      },
      selectedOption: withKeyboard ? 0 : null,
      optionsLength: options.length
    };
  },
  mounted: function mounted() {
    if (this.$props.withKeyboard) {
      this.$refs.options[0].$el.focus();
    }
  },
  methods: {
    handleOpenNextMenu: function handleOpenNextMenu(value, options, index) {
      var withKeyboard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.selectedOption = index;
      this.$refs.options[index].$el.focus();

      if (options && this.nextMenu.value !== value) {
        this.nextMenu = {
          isOpen: true,
          options: options,
          value: value,
          withKeyboard: withKeyboard
        };
      }

      if (options && this.$refs.childMenu) {
        this.$refs.childMenu.resetNextMenu();
      }

      if (!options) {
        this.resetNextMenu();
      }
    },
    handleCloseMenu: function handleCloseMenu() {
      if (this.$parent && this.$parent.resetNextMenu) {
        this.$parent.resetNextMenu();
      }
    },
    resetNextMenu: function resetNextMenu() {
      var _this = this;

      this.nextMenu = {
        isOpen: false,
        options: [],
        value: ''
      };
      this.$nextTick(function () {
        if (_this.selectedOption >= 0 && _this.$refs.options[_this.selectedOption]) {
          _this.$refs.options[_this.selectedOption].$el.focus();
        }
      });
    },
    moveOption: function moveOption() {
      var increment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var selectedOption = this.selectedOption,
          optionsLength = this.optionsLength;
      var newSelectedOption = increment ? selectedOption + 1 : selectedOption - 1;
      newSelectedOption = newSelectedOption >= 0 ? newSelectedOption : optionsLength - 1;
      newSelectedOption %= optionsLength;
      this.selectedOption = newSelectedOption;
      this.$refs.options[newSelectedOption].$el.focus();
    }
  },
  watch: {
    options: function options() {
      this.resetNextMenu();

      if (!this.$props.withKeyboard) {
        this.selectedOption = null;
      }
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vcs__select-menu",
    class: {
      'vcs__select-menu__not-main': _vm.notMain
    }
  }, [_vm._l(_vm.options, function (option, index) {
    return _c('Option', {
      key: option.value,
      ref: "options",
      refInFor: true,
      attrs: {
        "active": option.value === _vm.nextMenu.value,
        "disabled": option.disabled,
        "focused": index === _vm.selectedOption,
        "index": index,
        "label": option.label,
        "onSelect": _vm.onSelect,
        "options": option.options,
        "selectable": option.selectable,
        "value": option.value
      },
      on: {
        "openMenu": _vm.handleOpenNextMenu,
        "closeMenu": _vm.handleCloseMenu,
        "nextOption": function nextOption($event) {
          return _vm.moveOption(true);
        },
        "prevOption": function prevOption($event) {
          return _vm.moveOption(false);
        }
      }
    });
  }), _vm._ssrNode(" "), _c('transition', {
    attrs: {
      "name": "vcs__fade"
    }
  }, [_vm.nextMenu.isOpen ? _c('SelectMenu', {
    ref: "childMenu",
    attrs: {
      "notMain": true,
      "onSelect": _vm.onSelect,
      "options": _vm.nextMenu.options,
      "withKeyboard": _vm.nextMenu.withKeyboard
    }
  }) : _vm._e()], 1)], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-185990e2_0", {
    source: ".vcs__select-menu{border-radius:4px;border:1px solid #ccc;display:flex;flex-direction:column;margin-top:2px;padding:5px 0;position:relative;text-align:left;width:100%;background:#fff;position:absolute;left:0;top:calc(100% + 2px);margin-top:0}.vcs__select-menu__not-main{position:absolute;left:calc(100% - 1px);top:-1px;margin-top:0;width:auto}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-185990e2";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);//
var script$3 = {
  name: 'VueCascaderSelect',
  components: {
    Arrow: __vue_component__,
    SelectMenu: __vue_component__$2
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      validator: function validator(value) {
        return validateOptions(value);
      }
    },
    value: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isOpen: false,
      withKeyboard: false
    };
  },
  methods: {
    handleSelect: function handleSelect(option) {
      this.$emit('select', option);
    },
    handleOpen: function handleOpen() {
      var withKeyboard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$emit('opened');
      this.isOpen = !this.isOpen;
      this.withKeyboard = withKeyboard;
    },
    handleClose: function handleClose() {
      this.$emit('closed');
      this.isOpen = false;
    }
  },
  watch: {
    value: function value() {
      this.isOpen = false;
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.handleClose,
      expression: "handleClose"
    }],
    staticClass: "vcs",
    on: {
      "keydown": function keydown($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        return _vm.handleClose($event);
      }
    }
  }, [_vm._ssrNode("<div tabindex=\"0\" class=\"vcs__picker\">", "</div>", [_vm._ssrNode("<input disabled=\"disabled\"" + _vm._ssrAttr("placeholder", _vm.placeholder) + _vm._ssrAttr("value", _vm.value) + "> "), _c('transition', {
    attrs: {
      "name": "vcs__fade"
    }
  }, [_vm.value ? _c('div', {
    staticClass: "vcs__cross"
  }, [_c('button', {
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.$emit('clear');
      }
    }
  }, [_vm._v("\n          ×\n        ")])]) : _vm._e()]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vcs__arrow-container\">", "</div>", [_c('Arrow', {
    attrs: {
      "borderColor": "#ccc",
      "direction": _vm.isOpen ? 'up' : 'down'
    }
  })], 1)], 2), _vm._ssrNode(" "), _c('transition', {
    attrs: {
      "name": "vcs__fade"
    }
  }, [_vm.isOpen ? _c('SelectMenu', {
    attrs: {
      "onSelect": _vm.handleSelect,
      "options": _vm.options,
      "withKeyboard": _vm.withKeyboard
    }
  }) : _vm._e()], 1)], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-a55839ec_0", {
    source: "button{padding:0;background:0 0;border:none;text-align:left;font-size:unset}.vcs{position:relative}.vcs__picker{position:relative;display:flex;width:100%}.vcs__picker input{align-items:center;border-radius:4px;border:1px solid #ccc;box-shadow:none;cursor:pointer;display:flex;flex-direction:row;font-size:inherit;height:30px;justify-content:space-between;overflow:hidden;padding:0 55px 0 10px;text-align:center;text-align:left;text-overflow:ellipsis;user-select:none;white-space:nowrap;width:100%;-webkit-appearance:none}.vcs__picker input:disabled{background:inherit;opacity:1}.vcs__arrow-container{border-left:1px solid #ccc;cursor:pointer;padding-left:10px;margin-left:10px;position:absolute;right:11px;top:50%;transform:translate(0,-50%)}.vcs__cross{position:absolute;right:33px;top:50%;transform:translate(0,-50%)}.vcs__cross button{-webkit-appearance:none;background:0 0;border:none;color:#bbb;cursor:pointer;font-size:18px;opacity:.7;padding:0 3px;transition:opacity .2s linear}.vcs__cross button:hover{opacity:1}.vcs__fade-enter-active,.vcs__fade-leave-active{transition:opacity .2s}.vcs__fade-enter,.vcs__fade-leave-to{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-a55839ec";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, createInjectorSSR, undefined);var install = function installVueCascaderSelect(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueCascaderSelect', __vue_component__$3);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$3.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$3;