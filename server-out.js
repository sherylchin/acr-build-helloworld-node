var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key2;
      for (key2 in obj) {
      }
      return typeof key2 === "undefined" || hasOwn.call(obj, key2);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length2 = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length2; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/parseuri/index.js
var require_parseuri = __commonJS({
  "node_modules/parseuri/index.js"(exports2, module2) {
    var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var parts = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor"
    ];
    module2.exports = function parseuri(str) {
      var src = str, b = str.indexOf("["), e = str.indexOf("]");
      if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
      }
      var m = re.exec(str || ""), uri = {}, i = 14;
      while (i--) {
        uri[parts[i]] = m[i] || "";
      }
      if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
        uri.ipv6uri = true;
      }
      uri.pathNames = pathNames(uri, uri["path"]);
      uri.queryKey = queryKey(uri, uri["query"]);
      return uri;
    };
    function pathNames(obj, path) {
      var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
      if (path.substr(0, 1) == "/" || path.length === 0) {
        names.splice(0, 1);
      }
      if (path.substr(path.length - 1, 1) == "/") {
        names.splice(names.length - 1, 1);
      }
      return names;
    }
    function queryKey(uri, query) {
      var data = {};
      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
          data[$1] = $2;
        }
      });
      return data;
    }
  }
});

// node_modules/socket.io-client/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/socket.io-client/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/socket.io-client/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/socket.io-client/node_modules/debug/src/debug.js"(exports2, module2) {
    exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports2.coerce = coerce;
    exports2.disable = disable;
    exports2.enable = enable;
    exports2.enabled = enabled;
    exports2.humanize = require_ms();
    exports2.instances = [];
    exports2.names = [];
    exports2.skips = [];
    exports2.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports2.colors[Math.abs(hash) % exports2.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug() {
        if (!debug.enabled) return;
        var self2 = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args2 = new Array(arguments.length);
        for (var i = 0; i < args2.length; i++) {
          args2[i] = arguments[i];
        }
        args2[0] = exports2.coerce(args2[0]);
        if ("string" !== typeof args2[0]) {
          args2.unshift("%O");
        }
        var index = 0;
        args2[0] = args2[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports2.formatters[format];
          if ("function" === typeof formatter) {
            var val = args2[index];
            match = formatter.call(self2, val);
            args2.splice(index, 1);
            index--;
          }
          return match;
        });
        exports2.formatArgs.call(self2, args2);
        var logFn = debug.log || exports2.log || console.log.bind(console);
        logFn.apply(self2, args2);
      }
      debug.namespace = namespace;
      debug.enabled = exports2.enabled(namespace);
      debug.useColors = exports2.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      if ("function" === typeof exports2.init) {
        exports2.init(debug);
      }
      exports2.instances.push(debug);
      return debug;
    }
    function destroy() {
      var index = exports2.instances.indexOf(this);
      if (index !== -1) {
        exports2.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports2.save(namespaces);
      exports2.names = [];
      exports2.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports2.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports2.instances.length; i++) {
        var instance = exports2.instances[i];
        instance.enabled = exports2.enabled(instance.namespace);
      }
    }
    function disable() {
      exports2.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports2.skips.length; i < len; i++) {
        if (exports2.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports2.names.length; i < len; i++) {
        if (exports2.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/socket.io-client/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/socket.io-client/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2 = module2.exports = require_debug();
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports2.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args2) {
      var useColors2 = this.useColors;
      args2[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args2[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args2.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args2[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args2.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports2.storage.removeItem("debug");
        } else {
          exports2.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports2.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports2.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/socket.io-client/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/socket.io-client/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2 = module2.exports = require_debug();
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      supportsColor = require("supports-color");
      if (supportsColor && supportsColor.level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (err) {
    }
    var supportsColor;
    exports2.inspectOpts = Object.keys(process.env).filter(function(key2) {
      return /^debug_/i.test(key2);
    }).reduce(function(obj, key2) {
      var prop = key2.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key2];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    exports2.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports2.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args2) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
        args2[0] = prefix + args2[0].split("\n").join("\n" + prefix);
        args2.push(colorCode + "m+" + exports2.humanize(this.diff) + "\x1B[0m");
      } else {
        args2[0] = getDate() + name + " " + args2[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      } else {
        return (/* @__PURE__ */ new Date()).toISOString() + " ";
      }
    }
    function log() {
      return process.stderr.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports2.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    exports2.enable(load());
  }
});

// node_modules/socket.io-client/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/socket.io-client/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer") {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/socket.io-client/lib/url.js
var require_url = __commonJS({
  "node_modules/socket.io-client/lib/url.js"(exports2, module2) {
    var parseuri = require_parseuri();
    var debug = require_src()("socket.io-client:url");
    module2.exports = url;
    function url(uri, loc) {
      var obj = uri;
      loc = loc || typeof location !== "undefined" && location;
      if (null == uri) uri = loc.protocol + "//" + loc.host;
      if ("string" === typeof uri) {
        if ("/" === uri.charAt(0)) {
          if ("/" === uri.charAt(1)) {
            uri = loc.protocol + uri;
          } else {
            uri = loc.host + uri;
          }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
          debug("protocol-less url %s", uri);
          if ("undefined" !== typeof loc) {
            uri = loc.protocol + "//" + uri;
          } else {
            uri = "https://" + uri;
          }
        }
        debug("parse %s", uri);
        obj = parseuri(uri);
      }
      if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
          obj.port = "80";
        } else if (/^(http|ws)s$/.test(obj.protocol)) {
          obj.port = "443";
        }
      }
      obj.path = obj.path || "/";
      var ipv6 = obj.host.indexOf(":") !== -1;
      var host = ipv6 ? "[" + obj.host + "]" : obj.host;
      obj.id = obj.protocol + "://" + host + ":" + obj.port;
      obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
      return obj;
    }
  }
});

// node_modules/socket.io-parser/node_modules/ms/index.js
var require_ms2 = __commonJS({
  "node_modules/socket.io-parser/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/socket.io-parser/node_modules/debug/src/debug.js
var require_debug2 = __commonJS({
  "node_modules/socket.io-parser/node_modules/debug/src/debug.js"(exports2, module2) {
    exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports2.coerce = coerce;
    exports2.disable = disable;
    exports2.enable = enable;
    exports2.enabled = enabled;
    exports2.humanize = require_ms2();
    exports2.instances = [];
    exports2.names = [];
    exports2.skips = [];
    exports2.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports2.colors[Math.abs(hash) % exports2.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug() {
        if (!debug.enabled) return;
        var self2 = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args2 = new Array(arguments.length);
        for (var i = 0; i < args2.length; i++) {
          args2[i] = arguments[i];
        }
        args2[0] = exports2.coerce(args2[0]);
        if ("string" !== typeof args2[0]) {
          args2.unshift("%O");
        }
        var index = 0;
        args2[0] = args2[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports2.formatters[format];
          if ("function" === typeof formatter) {
            var val = args2[index];
            match = formatter.call(self2, val);
            args2.splice(index, 1);
            index--;
          }
          return match;
        });
        exports2.formatArgs.call(self2, args2);
        var logFn = debug.log || exports2.log || console.log.bind(console);
        logFn.apply(self2, args2);
      }
      debug.namespace = namespace;
      debug.enabled = exports2.enabled(namespace);
      debug.useColors = exports2.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      if ("function" === typeof exports2.init) {
        exports2.init(debug);
      }
      exports2.instances.push(debug);
      return debug;
    }
    function destroy() {
      var index = exports2.instances.indexOf(this);
      if (index !== -1) {
        exports2.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports2.save(namespaces);
      exports2.names = [];
      exports2.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports2.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports2.instances.length; i++) {
        var instance = exports2.instances[i];
        instance.enabled = exports2.enabled(instance.namespace);
      }
    }
    function disable() {
      exports2.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports2.skips.length; i < len; i++) {
        if (exports2.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports2.names.length; i < len; i++) {
        if (exports2.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/socket.io-parser/node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/socket.io-parser/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2 = module2.exports = require_debug2();
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports2.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args2) {
      var useColors2 = this.useColors;
      args2[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args2[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args2.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args2[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args2.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports2.storage.removeItem("debug");
        } else {
          exports2.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports2.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports2.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/socket.io-parser/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "node_modules/socket.io-parser/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2 = module2.exports = require_debug2();
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      supportsColor = require("supports-color");
      if (supportsColor && supportsColor.level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (err) {
    }
    var supportsColor;
    exports2.inspectOpts = Object.keys(process.env).filter(function(key2) {
      return /^debug_/i.test(key2);
    }).reduce(function(obj, key2) {
      var prop = key2.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key2];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    exports2.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports2.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args2) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
        args2[0] = prefix + args2[0].split("\n").join("\n" + prefix);
        args2.push(colorCode + "m+" + exports2.humanize(this.diff) + "\x1B[0m");
      } else {
        args2[0] = getDate() + name + " " + args2[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      } else {
        return (/* @__PURE__ */ new Date()).toISOString() + " ";
      }
    }
    function log() {
      return process.stderr.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports2.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    exports2.enable(load());
  }
});

// node_modules/socket.io-parser/node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/socket.io-parser/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer") {
      module2.exports = require_browser2();
    } else {
      module2.exports = require_node2();
    }
  }
});

// node_modules/component-emitter/index.js
var require_component_emitter = __commonJS({
  "node_modules/component-emitter/index.js"(exports2, module2) {
    if (typeof module2 !== "undefined") {
      module2.exports = Emitter;
    }
    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    function mixin(obj) {
      for (var key2 in Emitter.prototype) {
        obj[key2] = Emitter.prototype[key2];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks) return this;
      if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args2 = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args2[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args2);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  }
});

// node_modules/socket.io-parser/node_modules/isarray/index.js
var require_isarray = __commonJS({
  "node_modules/socket.io-parser/node_modules/isarray/index.js"(exports2, module2) {
    var toString = {}.toString;
    module2.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// node_modules/socket.io-parser/is-buffer.js
var require_is_buffer = __commonJS({
  "node_modules/socket.io-parser/is-buffer.js"(exports2, module2) {
    module2.exports = isBuf;
    var withNativeBuffer = typeof Buffer === "function" && typeof Buffer.isBuffer === "function";
    var withNativeArrayBuffer = typeof ArrayBuffer === "function";
    var isView = function(obj) {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
    };
    function isBuf(obj) {
      return withNativeBuffer && Buffer.isBuffer(obj) || withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj));
    }
  }
});

// node_modules/socket.io-parser/binary.js
var require_binary = __commonJS({
  "node_modules/socket.io-parser/binary.js"(exports2) {
    var isArray = require_isarray();
    var isBuf = require_is_buffer();
    var toString = Object.prototype.toString;
    var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    exports2.deconstructPacket = function(packet) {
      var buffers = [];
      var packetData = packet.data;
      var pack = packet;
      pack.data = _deconstructPacket(packetData, buffers);
      pack.attachments = buffers.length;
      return { packet: pack, buffers };
    };
    function _deconstructPacket(data, buffers) {
      if (!data) return data;
      if (isBuf(data)) {
        var placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
      } else if (isArray(data)) {
        var newData = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
          newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
      } else if (typeof data === "object" && !(data instanceof Date)) {
        var newData = {};
        for (var key2 in data) {
          newData[key2] = _deconstructPacket(data[key2], buffers);
        }
        return newData;
      }
      return data;
    }
    exports2.reconstructPacket = function(packet, buffers) {
      packet.data = _reconstructPacket(packet.data, buffers);
      packet.attachments = void 0;
      return packet;
    };
    function _reconstructPacket(data, buffers) {
      if (!data) return data;
      if (data && data._placeholder === true) {
        var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) {
          return buffers[data.num];
        } else {
          throw new Error("illegal attachments");
        }
      } else if (isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          data[i] = _reconstructPacket(data[i], buffers);
        }
      } else if (typeof data === "object") {
        for (var key2 in data) {
          data[key2] = _reconstructPacket(data[key2], buffers);
        }
      }
      return data;
    }
    exports2.removeBlobs = function(data, callback) {
      function _removeBlobs(obj, curKey, containingObject) {
        if (!obj) return obj;
        if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
          pendingBlobs++;
          var fileReader = new FileReader();
          fileReader.onload = function() {
            if (containingObject) {
              containingObject[curKey] = this.result;
            } else {
              bloblessData = this.result;
            }
            if (!--pendingBlobs) {
              callback(bloblessData);
            }
          };
          fileReader.readAsArrayBuffer(obj);
        } else if (isArray(obj)) {
          for (var i = 0; i < obj.length; i++) {
            _removeBlobs(obj[i], i, obj);
          }
        } else if (typeof obj === "object" && !isBuf(obj)) {
          for (var key2 in obj) {
            _removeBlobs(obj[key2], key2, obj);
          }
        }
      }
      var pendingBlobs = 0;
      var bloblessData = data;
      _removeBlobs(bloblessData);
      if (!pendingBlobs) {
        callback(bloblessData);
      }
    };
  }
});

// node_modules/socket.io-parser/index.js
var require_socket = __commonJS({
  "node_modules/socket.io-parser/index.js"(exports2) {
    var debug = require_src2()("socket.io-parser");
    var Emitter = require_component_emitter();
    var binary = require_binary();
    var isArray = require_isarray();
    var isBuf = require_is_buffer();
    exports2.protocol = 4;
    exports2.types = [
      "CONNECT",
      "DISCONNECT",
      "EVENT",
      "ACK",
      "ERROR",
      "BINARY_EVENT",
      "BINARY_ACK"
    ];
    exports2.CONNECT = 0;
    exports2.DISCONNECT = 1;
    exports2.EVENT = 2;
    exports2.ACK = 3;
    exports2.ERROR = 4;
    exports2.BINARY_EVENT = 5;
    exports2.BINARY_ACK = 6;
    exports2.Encoder = Encoder;
    exports2.Decoder = Decoder;
    function Encoder() {
    }
    var ERROR_PACKET = exports2.ERROR + '"encode error"';
    Encoder.prototype.encode = function(obj, callback) {
      debug("encoding packet %j", obj);
      if (exports2.BINARY_EVENT === obj.type || exports2.BINARY_ACK === obj.type) {
        encodeAsBinary(obj, callback);
      } else {
        var encoding = encodeAsString(obj);
        callback([encoding]);
      }
    };
    function encodeAsString(obj) {
      var str = "" + obj.type;
      if (exports2.BINARY_EVENT === obj.type || exports2.BINARY_ACK === obj.type) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        var payload = tryStringify(obj.data);
        if (payload !== false) {
          str += payload;
        } else {
          return ERROR_PACKET;
        }
      }
      debug("encoded %j as %s", obj, str);
      return str;
    }
    function tryStringify(str) {
      try {
        return JSON.stringify(str);
      } catch (e) {
        return false;
      }
    }
    function encodeAsBinary(obj, callback) {
      function writeEncoding(bloblessData) {
        var deconstruction = binary.deconstructPacket(bloblessData);
        var pack = encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack);
        callback(buffers);
      }
      binary.removeBlobs(obj, writeEncoding);
    }
    function Decoder() {
      this.reconstructor = null;
    }
    Emitter(Decoder.prototype);
    Decoder.prototype.add = function(obj) {
      var packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = decodeString(obj);
        if (exports2.BINARY_EVENT === packet.type || exports2.BINARY_ACK === packet.type) {
          this.reconstructor = new BinaryReconstructor(packet);
          if (this.reconstructor.reconPack.attachments === 0) {
            this.emit("decoded", packet);
          }
        } else {
          this.emit("decoded", packet);
        }
      } else if (isBuf(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            this.emit("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    };
    function isPayloadValid(type, payload) {
      switch (type) {
        case 0:
          return typeof payload === "object";
        case 1:
          return payload === void 0;
        case 4:
          return typeof payload === "string" || typeof payload === "object";
        case 2:
        case 5:
          return isArray(payload) && (typeof payload[0] === "string" || typeof payload[0] === "number");
        case 3:
        case 6:
          return isArray(payload);
      }
    }
    function decodeString(str) {
      var i = 0;
      var p = {
        type: Number(str.charAt(0))
      };
      if (null == exports2.types[p.type]) {
        return error("unknown packet type " + p.type);
      }
      if (exports2.BINARY_EVENT === p.type || exports2.BINARY_ACK === p.type) {
        var start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        var buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i + 1)) {
        var start = i + 1;
        while (++i) {
          var c = str.charAt(i);
          if ("," === c) break;
          if (i === str.length) break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      var next = str.charAt(i + 1);
      if ("" !== next && Number(next) == next) {
        var start = i + 1;
        while (++i) {
          var c = str.charAt(i);
          if (null == c || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length) break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        var payload = tryParse(str.substr(i));
        if (isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      debug("decoded %s as %j", str, p);
      return p;
    }
    function tryParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    Decoder.prototype.destroy = function() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
      }
    };
    function BinaryReconstructor(packet) {
      this.reconPack = packet;
      this.buffers = [];
    }
    BinaryReconstructor.prototype.takeBinaryData = function(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        var packet = binary.reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    };
    BinaryReconstructor.prototype.finishedReconstruction = function() {
      this.reconPack = null;
      this.buffers = [];
    };
    function error(msg) {
      return {
        type: exports2.ERROR,
        data: "parser error: " + msg
      };
    }
  }
});

// node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js
var require_XMLHttpRequest = __commonJS({
  "node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js"(exports2, module2) {
    var fs = require("fs");
    var Url = require("url");
    var spawn = require("child_process").spawn;
    module2.exports = XMLHttpRequest;
    XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
    function XMLHttpRequest(opts) {
      "use strict";
      opts = opts || {};
      var self2 = this;
      var http = require("http");
      var https = require("https");
      var request;
      var response;
      var settings = {};
      var disableHeaderCheck = false;
      var defaultHeaders = {
        "User-Agent": "node-XMLHttpRequest",
        "Accept": "*/*"
      };
      var headers = Object.assign({}, defaultHeaders);
      var forbiddenRequestHeaders = [
        "accept-charset",
        "accept-encoding",
        "access-control-request-headers",
        "access-control-request-method",
        "connection",
        "content-length",
        "content-transfer-encoding",
        "cookie",
        "cookie2",
        "date",
        "expect",
        "host",
        "keep-alive",
        "origin",
        "referer",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
        "via"
      ];
      var forbiddenRequestMethods = [
        "TRACE",
        "TRACK",
        "CONNECT"
      ];
      var sendFlag = false;
      var errorFlag = false;
      var abortedFlag = false;
      var listeners = {};
      this.UNSENT = 0;
      this.OPENED = 1;
      this.HEADERS_RECEIVED = 2;
      this.LOADING = 3;
      this.DONE = 4;
      this.readyState = this.UNSENT;
      this.onreadystatechange = null;
      this.responseText = "";
      this.responseXML = "";
      this.status = null;
      this.statusText = null;
      var isAllowedHttpHeader = function(header) {
        return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
      };
      var isAllowedHttpMethod = function(method) {
        return method && forbiddenRequestMethods.indexOf(method) === -1;
      };
      this.open = function(method, url, async, user, password) {
        this.abort();
        errorFlag = false;
        abortedFlag = false;
        if (!isAllowedHttpMethod(method)) {
          throw new Error("SecurityError: Request method not allowed");
        }
        settings = {
          "method": method,
          "url": url.toString(),
          "async": typeof async !== "boolean" ? true : async,
          "user": user || null,
          "password": password || null
        };
        setState(this.OPENED);
      };
      this.setDisableHeaderCheck = function(state) {
        disableHeaderCheck = state;
      };
      this.setRequestHeader = function(header, value) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
        }
        if (!isAllowedHttpHeader(header)) {
          console.warn('Refused to set unsafe header "' + header + '"');
          return false;
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send flag is true");
        }
        headers[header] = value;
        return true;
      };
      this.getResponseHeader = function(header) {
        if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
          return response.headers[header.toLowerCase()];
        }
        return null;
      };
      this.getAllResponseHeaders = function() {
        if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
          return "";
        }
        var result = "";
        for (var i in response.headers) {
          if (i !== "set-cookie" && i !== "set-cookie2") {
            result += i + ": " + response.headers[i] + "\r\n";
          }
        }
        return result.substr(0, result.length - 2);
      };
      this.getRequestHeader = function(name) {
        if (typeof name === "string" && headers[name]) {
          return headers[name];
        }
        return "";
      };
      this.send = function(data) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send has already been called");
        }
        var ssl = false, local = false;
        var url = Url.parse(settings.url);
        var host;
        switch (url.protocol) {
          case "https:":
            ssl = true;
          case "http:":
            host = url.hostname;
            break;
          case "file:":
            local = true;
            break;
          case void 0:
          case "":
            host = "localhost";
            break;
          default:
            throw new Error("Protocol not supported.");
        }
        if (local) {
          if (settings.method !== "GET") {
            throw new Error("XMLHttpRequest: Only GET method is supported");
          }
          if (settings.async) {
            fs.readFile(unescape(url.pathname), "utf8", function(error, data2) {
              if (error) {
                self2.handleError(error);
              } else {
                self2.status = 200;
                self2.responseText = data2;
                setState(self2.DONE);
              }
            });
          } else {
            try {
              this.responseText = fs.readFileSync(unescape(url.pathname), "utf8");
              this.status = 200;
              setState(self2.DONE);
            } catch (e) {
              this.handleError(e);
            }
          }
          return;
        }
        var port = url.port || (ssl ? 443 : 80);
        var uri = url.pathname + (url.search ? url.search : "");
        headers["Host"] = host;
        if (!(ssl && port === 443 || port === 80)) {
          headers["Host"] += ":" + url.port;
        }
        if (settings.user) {
          if (typeof settings.password == "undefined") {
            settings.password = "";
          }
          var authBuf = new Buffer(settings.user + ":" + settings.password);
          headers["Authorization"] = "Basic " + authBuf.toString("base64");
        }
        if (settings.method === "GET" || settings.method === "HEAD") {
          data = null;
        } else if (data) {
          headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
          if (!headers["Content-Type"]) {
            headers["Content-Type"] = "text/plain;charset=UTF-8";
          }
        } else if (settings.method === "POST") {
          headers["Content-Length"] = 0;
        }
        var agent = opts.agent || false;
        var options = {
          host,
          port,
          path: uri,
          method: settings.method,
          headers,
          agent
        };
        if (ssl) {
          options.pfx = opts.pfx;
          options.key = opts.key;
          options.passphrase = opts.passphrase;
          options.cert = opts.cert;
          options.ca = opts.ca;
          options.ciphers = opts.ciphers;
          options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
        }
        errorFlag = false;
        if (settings.async) {
          var doRequest = ssl ? https.request : http.request;
          sendFlag = true;
          self2.dispatchEvent("readystatechange");
          var responseHandler = function(resp) {
            response = resp;
            if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
              settings.url = response.headers.location;
              var url2 = Url.parse(settings.url);
              host = url2.hostname;
              var newOptions = {
                hostname: url2.hostname,
                port: url2.port,
                path: url2.path,
                method: response.statusCode === 303 ? "GET" : settings.method,
                headers
              };
              if (ssl) {
                newOptions.pfx = opts.pfx;
                newOptions.key = opts.key;
                newOptions.passphrase = opts.passphrase;
                newOptions.cert = opts.cert;
                newOptions.ca = opts.ca;
                newOptions.ciphers = opts.ciphers;
                newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
              }
              request = doRequest(newOptions, responseHandler).on("error", errorHandler);
              request.end();
              return;
            }
            if (response && response.setEncoding) {
              response.setEncoding("utf8");
            }
            setState(self2.HEADERS_RECEIVED);
            self2.status = response.statusCode;
            response.on("data", function(chunk) {
              if (chunk) {
                self2.responseText += chunk;
              }
              if (sendFlag) {
                setState(self2.LOADING);
              }
            });
            response.on("end", function() {
              if (sendFlag) {
                sendFlag = false;
                setState(self2.DONE);
              }
            });
            response.on("error", function(error) {
              self2.handleError(error);
            });
          };
          var errorHandler = function(error) {
            self2.handleError(error);
          };
          request = doRequest(options, responseHandler).on("error", errorHandler);
          if (data) {
            request.write(data);
          }
          request.end();
          self2.dispatchEvent("loadstart");
        } else {
          var contentFile = ".node-xmlhttprequest-content-" + process.pid;
          var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
          fs.writeFileSync(syncFile, "", "utf8");
          var execString = "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" + (ssl ? "s" : "") + ".request;var options = " + JSON.stringify(options) + ";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {  responseText += chunk;});response.on('end', function() {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');fs.unlinkSync('" + syncFile + "');});response.on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});}).on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
          var syncProc = spawn(process.argv[0], ["-e", execString]);
          var statusText;
          while (fs.existsSync(syncFile)) {
          }
          self2.responseText = fs.readFileSync(contentFile, "utf8");
          syncProc.stdin.end();
          fs.unlinkSync(contentFile);
          if (self2.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
            var errorObj = self2.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
            self2.handleError(errorObj, 503);
          } else {
            self2.status = self2.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
            self2.responseText = self2.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
            setState(self2.DONE);
          }
        }
      };
      this.handleError = function(error, status) {
        this.status = status || 0;
        this.statusText = error;
        this.responseText = error.stack;
        errorFlag = true;
        setState(this.DONE);
      };
      this.abort = function() {
        if (request) {
          request.abort();
          request = null;
        }
        headers = Object.assign({}, defaultHeaders);
        this.responseText = "";
        this.responseXML = "";
        errorFlag = abortedFlag = true;
        if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
          sendFlag = false;
          setState(this.DONE);
        }
        this.readyState = this.UNSENT;
      };
      this.addEventListener = function(event, callback) {
        if (!(event in listeners)) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      };
      this.removeEventListener = function(event, callback) {
        if (event in listeners) {
          listeners[event] = listeners[event].filter(function(ev) {
            return ev !== callback;
          });
        }
      };
      this.dispatchEvent = function(event) {
        if (typeof self2["on" + event] === "function") {
          if (this.readyState === this.DONE)
            setImmediate(function() {
              self2["on" + event]();
            });
          else
            self2["on" + event]();
        }
        if (event in listeners) {
          for (let i = 0, len = listeners[event].length; i < len; i++) {
            if (this.readyState === this.DONE)
              setImmediate(function() {
                listeners[event][i].call(self2);
              });
            else
              listeners[event][i].call(self2);
          }
        }
      };
      var setState = function(state) {
        if (self2.readyState === state || self2.readyState === self2.UNSENT && abortedFlag)
          return;
        self2.readyState = state;
        if (settings.async || self2.readyState < self2.OPENED || self2.readyState === self2.DONE) {
          self2.dispatchEvent("readystatechange");
        }
        if (self2.readyState === self2.DONE) {
          let fire;
          if (abortedFlag)
            fire = "abort";
          else if (errorFlag)
            fire = "error";
          else
            fire = "load";
          self2.dispatchEvent(fire);
          self2.dispatchEvent("loadend");
        }
      };
    }
  }
});

// node_modules/engine.io-client/lib/transports/xmlhttprequest.js
var require_xmlhttprequest = __commonJS({
  "node_modules/engine.io-client/lib/transports/xmlhttprequest.js"(exports2, module2) {
    module2.exports = require_XMLHttpRequest();
  }
});

// node_modules/engine.io-parser/lib/utf8.js
var require_utf8 = __commonJS({
  "node_modules/engine.io-parser/lib/utf8.js"(exports2, module2) {
    var stringFromCharCode = String.fromCharCode;
    function ucs2decode(string) {
      var output = [];
      var counter = 0;
      var length2 = string.length;
      var value;
      var extra;
      while (counter < length2) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length2) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      var length2 = array.length;
      var index = -1;
      var value;
      var output = "";
      while (++index < length2) {
        value = array[index];
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
      }
      return output;
    }
    function checkScalarValue(codePoint, strict) {
      if (codePoint >= 55296 && codePoint <= 57343) {
        if (strict) {
          throw Error(
            "Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value"
          );
        }
        return false;
      }
      return true;
    }
    function createByte(codePoint, shift) {
      return stringFromCharCode(codePoint >> shift & 63 | 128);
    }
    function encodeCodePoint(codePoint, strict) {
      if ((codePoint & 4294967168) == 0) {
        return stringFromCharCode(codePoint);
      }
      var symbol = "";
      if ((codePoint & 4294965248) == 0) {
        symbol = stringFromCharCode(codePoint >> 6 & 31 | 192);
      } else if ((codePoint & 4294901760) == 0) {
        if (!checkScalarValue(codePoint, strict)) {
          codePoint = 65533;
        }
        symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
        symbol += createByte(codePoint, 6);
      } else if ((codePoint & 4292870144) == 0) {
        symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
        symbol += createByte(codePoint, 12);
        symbol += createByte(codePoint, 6);
      }
      symbol += stringFromCharCode(codePoint & 63 | 128);
      return symbol;
    }
    function utf8encode(string, opts) {
      opts = opts || {};
      var strict = false !== opts.strict;
      var codePoints = ucs2decode(string);
      var length2 = codePoints.length;
      var index = -1;
      var codePoint;
      var byteString = "";
      while (++index < length2) {
        codePoint = codePoints[index];
        byteString += encodeCodePoint(codePoint, strict);
      }
      return byteString;
    }
    function readContinuationByte() {
      if (byteIndex >= byteCount) {
        throw Error("Invalid byte index");
      }
      var continuationByte = byteArray[byteIndex] & 255;
      byteIndex++;
      if ((continuationByte & 192) == 128) {
        return continuationByte & 63;
      }
      throw Error("Invalid continuation byte");
    }
    function decodeSymbol(strict) {
      var byte1;
      var byte2;
      var byte3;
      var byte4;
      var codePoint;
      if (byteIndex > byteCount) {
        throw Error("Invalid byte index");
      }
      if (byteIndex == byteCount) {
        return false;
      }
      byte1 = byteArray[byteIndex] & 255;
      byteIndex++;
      if ((byte1 & 128) == 0) {
        return byte1;
      }
      if ((byte1 & 224) == 192) {
        byte2 = readContinuationByte();
        codePoint = (byte1 & 31) << 6 | byte2;
        if (codePoint >= 128) {
          return codePoint;
        } else {
          throw Error("Invalid continuation byte");
        }
      }
      if ((byte1 & 240) == 224) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
        if (codePoint >= 2048) {
          return checkScalarValue(codePoint, strict) ? codePoint : 65533;
        } else {
          throw Error("Invalid continuation byte");
        }
      }
      if ((byte1 & 248) == 240) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        byte4 = readContinuationByte();
        codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
        if (codePoint >= 65536 && codePoint <= 1114111) {
          return codePoint;
        }
      }
      throw Error("Invalid UTF-8 detected");
    }
    var byteArray;
    var byteCount;
    var byteIndex;
    function utf8decode(byteString, opts) {
      opts = opts || {};
      var strict = false !== opts.strict;
      byteArray = ucs2decode(byteString);
      byteCount = byteArray.length;
      byteIndex = 0;
      var codePoints = [];
      var tmp;
      while ((tmp = decodeSymbol(strict)) !== false) {
        codePoints.push(tmp);
      }
      return ucs2encode(codePoints);
    }
    module2.exports = {
      version: "2.1.2",
      encode: utf8encode,
      decode: utf8decode
    };
  }
});

// node_modules/has-binary2/node_modules/isarray/index.js
var require_isarray2 = __commonJS({
  "node_modules/has-binary2/node_modules/isarray/index.js"(exports2, module2) {
    var toString = {}.toString;
    module2.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// node_modules/has-binary2/index.js
var require_has_binary2 = __commonJS({
  "node_modules/has-binary2/index.js"(exports2, module2) {
    var isArray = require_isarray2();
    var toString = Object.prototype.toString;
    var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    module2.exports = hasBinary;
    function hasBinary(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (hasBinary(obj[i])) {
            return true;
          }
        }
        return false;
      }
      if (typeof Buffer === "function" && Buffer.isBuffer && Buffer.isBuffer(obj) || typeof ArrayBuffer === "function" && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
        return true;
      }
      if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
      }
      for (var key2 in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key2) && hasBinary(obj[key2])) {
          return true;
        }
      }
      return false;
    }
  }
});

// node_modules/after/index.js
var require_after = __commonJS({
  "node_modules/after/index.js"(exports2, module2) {
    module2.exports = after;
    function after(count, callback, err_cb) {
      var bail = false;
      err_cb = err_cb || noop;
      proxy.count = count;
      return count === 0 ? callback() : proxy;
      function proxy(err, result) {
        if (proxy.count <= 0) {
          throw new Error("after called too many times");
        }
        --proxy.count;
        if (err) {
          bail = true;
          callback(err);
          callback = err_cb;
        } else if (proxy.count === 0 && !bail) {
          callback(null, result);
        }
      }
    }
    function noop() {
    }
  }
});

// node_modules/engine.io-parser/lib/keys.js
var require_keys = __commonJS({
  "node_modules/engine.io-parser/lib/keys.js"(exports2, module2) {
    module2.exports = Object.keys || function keys(obj) {
      var arr = [];
      var has = Object.prototype.hasOwnProperty;
      for (var i in obj) {
        if (has.call(obj, i)) {
          arr.push(i);
        }
      }
      return arr;
    };
  }
});

// node_modules/engine.io-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/engine.io-parser/lib/index.js"(exports2) {
    var utf8 = require_utf8();
    var hasBinary = require_has_binary2();
    var after = require_after();
    var keys = require_keys();
    exports2.protocol = 3;
    var packets = exports2.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var packetslist = keys(packets);
    var err = { type: "error", data: "parser error" };
    var EMPTY_BUFFER = Buffer.concat([]);
    exports2.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = null;
      }
      if (typeof utf8encode === "function") {
        callback = utf8encode;
        utf8encode = null;
      }
      if (Buffer.isBuffer(packet.data)) {
        return encodeBuffer(packet, supportsBinary, callback);
      } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
        return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
      }
      var encoded = packets[packet.type];
      if (void 0 !== packet.data) {
        encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
      }
      return callback("" + encoded);
    };
    function encodeBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports2.encodeBase64Packet(packet, callback);
      }
      var data = packet.data;
      var typeBuffer = Buffer.allocUnsafe(1);
      typeBuffer[0] = packets[packet.type];
      return callback(Buffer.concat([typeBuffer, data]));
    }
    exports2.encodeBase64Packet = function(packet, callback) {
      var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
      var message = "b" + packets[packet.type];
      message += data.toString("base64");
      return callback(message);
    };
    exports2.decodePacket = function(data, binaryType, utf8decode) {
      if (data === void 0) {
        return err;
      }
      var type;
      if (typeof data === "string") {
        type = data.charAt(0);
        if (type === "b") {
          return exports2.decodeBase64Packet(data.substr(1), binaryType);
        }
        if (utf8decode) {
          data = tryDecode(data);
          if (data === false) {
            return err;
          }
        }
        if (Number(type) != type || !packetslist[type]) {
          return err;
        }
        if (data.length > 1) {
          return { type: packetslist[type], data: data.substring(1) };
        } else {
          return { type: packetslist[type] };
        }
      }
      if (binaryType === "arraybuffer") {
        var intArray = new Uint8Array(data);
        type = intArray[0];
        return { type: packetslist[type], data: intArray.buffer.slice(1) };
      }
      if (data instanceof ArrayBuffer) {
        data = arrayBufferToBuffer(data);
      }
      type = data[0];
      return { type: packetslist[type], data: data.slice(1) };
    };
    function tryDecode(data) {
      try {
        data = utf8.decode(data, { strict: false });
      } catch (e) {
        return false;
      }
      return data;
    }
    exports2.decodeBase64Packet = function(msg, binaryType) {
      var type = packetslist[msg.charAt(0)];
      var data = Buffer.from(msg.substr(1), "base64");
      if (binaryType === "arraybuffer") {
        var abv = new Uint8Array(data.length);
        for (var i = 0; i < abv.length; i++) {
          abv[i] = data[i];
        }
        data = abv.buffer;
      }
      return { type, data };
    };
    exports2.encodePayload = function(packets2, supportsBinary, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = null;
      }
      if (supportsBinary && hasBinary(packets2)) {
        return exports2.encodePayloadAsBinary(packets2, callback);
      }
      if (!packets2.length) {
        return callback("0:");
      }
      function encodeOne(packet, doneCallback) {
        exports2.encodePacket(packet, supportsBinary, false, function(message) {
          doneCallback(null, setLengthHeader(message));
        });
      }
      map(packets2, encodeOne, function(err2, results) {
        return callback(results.join(""));
      });
    };
    function setLengthHeader(message) {
      return message.length + ":" + message;
    }
    function map(ary, each, done) {
      var result = new Array(ary.length);
      var next = after(ary.length, done);
      for (var i = 0; i < ary.length; i++) {
        each(ary[i], function(error, msg) {
          result[i] = msg;
          next(error, result);
        });
      }
    }
    exports2.decodePayload = function(data, binaryType, callback) {
      if (typeof data !== "string") {
        return exports2.decodePayloadAsBinary(data, binaryType, callback);
      }
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      if (data === "") {
        return callback(err, 0, 1);
      }
      var length2 = "", n, msg, packet;
      for (var i = 0, l = data.length; i < l; i++) {
        var chr = data.charAt(i);
        if (chr !== ":") {
          length2 += chr;
          continue;
        }
        if (length2 === "" || length2 != (n = Number(length2))) {
          return callback(err, 0, 1);
        }
        msg = data.substr(i + 1, n);
        if (length2 != msg.length) {
          return callback(err, 0, 1);
        }
        if (msg.length) {
          packet = exports2.decodePacket(msg, binaryType, false);
          if (err.type === packet.type && err.data === packet.data) {
            return callback(err, 0, 1);
          }
          var more = callback(packet, i + n, l);
          if (false === more) return;
        }
        i += n;
        length2 = "";
      }
      if (length2 !== "") {
        return callback(err, 0, 1);
      }
    };
    function bufferToString(buffer) {
      var str = "";
      for (var i = 0, l = buffer.length; i < l; i++) {
        str += String.fromCharCode(buffer[i]);
      }
      return str;
    }
    function stringToBuffer(string) {
      var buf = Buffer.allocUnsafe(string.length);
      for (var i = 0, l = string.length; i < l; i++) {
        buf.writeUInt8(string.charCodeAt(i), i);
      }
      return buf;
    }
    function arrayBufferToBuffer(data) {
      var length2 = data.byteLength || data.length;
      var offset = data.byteOffset || 0;
      return Buffer.from(data.buffer || data, offset, length2);
    }
    exports2.encodePayloadAsBinary = function(packets2, callback) {
      if (!packets2.length) {
        return callback(EMPTY_BUFFER);
      }
      map(packets2, encodeOneBinaryPacket, function(err2, results) {
        return callback(Buffer.concat(results));
      });
    };
    function encodeOneBinaryPacket(p, doneCallback) {
      function onBinaryPacketEncode(packet) {
        var encodingLength = "" + packet.length;
        var sizeBuffer;
        if (typeof packet === "string") {
          sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
          sizeBuffer[0] = 0;
          for (var i = 0; i < encodingLength.length; i++) {
            sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
          }
          sizeBuffer[sizeBuffer.length - 1] = 255;
          return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
        }
        sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
        sizeBuffer[0] = 1;
        for (var i = 0; i < encodingLength.length; i++) {
          sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
        }
        sizeBuffer[sizeBuffer.length - 1] = 255;
        doneCallback(null, Buffer.concat([sizeBuffer, packet]));
      }
      exports2.encodePacket(p, true, true, onBinaryPacketEncode);
    }
    exports2.decodePayloadAsBinary = function(data, binaryType, callback) {
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      var bufferTail = data;
      var buffers = [];
      var i;
      while (bufferTail.length > 0) {
        var strLen = "";
        var isString = bufferTail[0] === 0;
        for (i = 1; ; i++) {
          if (bufferTail[i] === 255) break;
          if (strLen.length > 310) {
            return callback(err, 0, 1);
          }
          strLen += "" + bufferTail[i];
        }
        bufferTail = bufferTail.slice(strLen.length + 1);
        var msgLength = parseInt(strLen, 10);
        var msg = bufferTail.slice(1, msgLength + 1);
        if (isString) msg = bufferToString(msg);
        buffers.push(msg);
        bufferTail = bufferTail.slice(msgLength + 1);
      }
      var total = buffers.length;
      for (i = 0; i < total; i++) {
        var buffer = buffers[i];
        callback(exports2.decodePacket(buffer, binaryType, true), i, total);
      }
    };
  }
});

// node_modules/engine.io-client/lib/transport.js
var require_transport = __commonJS({
  "node_modules/engine.io-client/lib/transport.js"(exports2, module2) {
    var parser = require_lib();
    var Emitter = require_component_emitter();
    module2.exports = Transport;
    function Transport(opts) {
      this.path = opts.path;
      this.hostname = opts.hostname;
      this.port = opts.port;
      this.secure = opts.secure;
      this.query = opts.query;
      this.timestampParam = opts.timestampParam;
      this.timestampRequests = opts.timestampRequests;
      this.readyState = "";
      this.agent = opts.agent || false;
      this.socket = opts.socket;
      this.enablesXDR = opts.enablesXDR;
      this.withCredentials = opts.withCredentials;
      this.pfx = opts.pfx;
      this.key = opts.key;
      this.passphrase = opts.passphrase;
      this.cert = opts.cert;
      this.ca = opts.ca;
      this.ciphers = opts.ciphers;
      this.rejectUnauthorized = opts.rejectUnauthorized;
      this.forceNode = opts.forceNode;
      this.isReactNative = opts.isReactNative;
      this.extraHeaders = opts.extraHeaders;
      this.localAddress = opts.localAddress;
    }
    Emitter(Transport.prototype);
    Transport.prototype.onError = function(msg, desc) {
      var err = new Error(msg);
      err.type = "TransportError";
      err.description = desc;
      this.emit("error", err);
      return this;
    };
    Transport.prototype.open = function() {
      if ("closed" === this.readyState || "" === this.readyState) {
        this.readyState = "opening";
        this.doOpen();
      }
      return this;
    };
    Transport.prototype.close = function() {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.doClose();
        this.onClose();
      }
      return this;
    };
    Transport.prototype.send = function(packets) {
      if ("open" === this.readyState) {
        this.write(packets);
      } else {
        throw new Error("Transport not open");
      }
    };
    Transport.prototype.onOpen = function() {
      this.readyState = "open";
      this.writable = true;
      this.emit("open");
    };
    Transport.prototype.onData = function(data) {
      var packet = parser.decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    };
    Transport.prototype.onPacket = function(packet) {
      this.emit("packet", packet);
    };
    Transport.prototype.onClose = function() {
      this.readyState = "closed";
      this.emit("close");
    };
  }
});

// node_modules/parseqs/index.js
var require_parseqs = __commonJS({
  "node_modules/parseqs/index.js"(exports2) {
    exports2.encode = function(obj) {
      var str = "";
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (str.length) str += "&";
          str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
        }
      }
      return str;
    };
    exports2.decode = function(qs) {
      var qry = {};
      var pairs = qs.split("&");
      for (var i = 0, l = pairs.length; i < l; i++) {
        var pair = pairs[i].split("=");
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return qry;
    };
  }
});

// node_modules/component-inherit/index.js
var require_component_inherit = __commonJS({
  "node_modules/component-inherit/index.js"(exports2, module2) {
    module2.exports = function(a, b) {
      var fn = function() {
      };
      fn.prototype = b.prototype;
      a.prototype = new fn();
      a.prototype.constructor = a;
    };
  }
});

// node_modules/yeast/index.js
var require_yeast = __commonJS({
  "node_modules/yeast/index.js"(exports2, module2) {
    "use strict";
    var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
    var length2 = 64;
    var map = {};
    var seed = 0;
    var i = 0;
    var prev;
    function encode(num) {
      var encoded = "";
      do {
        encoded = alphabet[num % length2] + encoded;
        num = Math.floor(num / length2);
      } while (num > 0);
      return encoded;
    }
    function decode(str) {
      var decoded = 0;
      for (i = 0; i < str.length; i++) {
        decoded = decoded * length2 + map[str.charAt(i)];
      }
      return decoded;
    }
    function yeast() {
      var now = encode(+/* @__PURE__ */ new Date());
      if (now !== prev) return seed = 0, prev = now;
      return now + "." + encode(seed++);
    }
    for (; i < length2; i++) map[alphabet[i]] = i;
    yeast.encode = encode;
    yeast.decode = decode;
    module2.exports = yeast;
  }
});

// node_modules/engine.io-client/node_modules/ms/index.js
var require_ms3 = __commonJS({
  "node_modules/engine.io-client/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/engine.io-client/node_modules/debug/src/debug.js
var require_debug3 = __commonJS({
  "node_modules/engine.io-client/node_modules/debug/src/debug.js"(exports2, module2) {
    exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports2.coerce = coerce;
    exports2.disable = disable;
    exports2.enable = enable;
    exports2.enabled = enabled;
    exports2.humanize = require_ms3();
    exports2.instances = [];
    exports2.names = [];
    exports2.skips = [];
    exports2.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports2.colors[Math.abs(hash) % exports2.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug() {
        if (!debug.enabled) return;
        var self2 = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args2 = new Array(arguments.length);
        for (var i = 0; i < args2.length; i++) {
          args2[i] = arguments[i];
        }
        args2[0] = exports2.coerce(args2[0]);
        if ("string" !== typeof args2[0]) {
          args2.unshift("%O");
        }
        var index = 0;
        args2[0] = args2[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports2.formatters[format];
          if ("function" === typeof formatter) {
            var val = args2[index];
            match = formatter.call(self2, val);
            args2.splice(index, 1);
            index--;
          }
          return match;
        });
        exports2.formatArgs.call(self2, args2);
        var logFn = debug.log || exports2.log || console.log.bind(console);
        logFn.apply(self2, args2);
      }
      debug.namespace = namespace;
      debug.enabled = exports2.enabled(namespace);
      debug.useColors = exports2.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      if ("function" === typeof exports2.init) {
        exports2.init(debug);
      }
      exports2.instances.push(debug);
      return debug;
    }
    function destroy() {
      var index = exports2.instances.indexOf(this);
      if (index !== -1) {
        exports2.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports2.save(namespaces);
      exports2.names = [];
      exports2.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports2.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports2.instances.length; i++) {
        var instance = exports2.instances[i];
        instance.enabled = exports2.enabled(instance.namespace);
      }
    }
    function disable() {
      exports2.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports2.skips.length; i < len; i++) {
        if (exports2.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports2.names.length; i < len; i++) {
        if (exports2.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/engine.io-client/node_modules/debug/src/browser.js
var require_browser3 = __commonJS({
  "node_modules/engine.io-client/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2 = module2.exports = require_debug3();
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports2.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args2) {
      var useColors2 = this.useColors;
      args2[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args2[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args2.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args2[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args2.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports2.storage.removeItem("debug");
        } else {
          exports2.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports2.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports2.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/engine.io-client/node_modules/debug/src/node.js
var require_node3 = __commonJS({
  "node_modules/engine.io-client/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2 = module2.exports = require_debug3();
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      supportsColor = require("supports-color");
      if (supportsColor && supportsColor.level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (err) {
    }
    var supportsColor;
    exports2.inspectOpts = Object.keys(process.env).filter(function(key2) {
      return /^debug_/i.test(key2);
    }).reduce(function(obj, key2) {
      var prop = key2.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key2];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    exports2.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports2.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args2) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
        args2[0] = prefix + args2[0].split("\n").join("\n" + prefix);
        args2.push(colorCode + "m+" + exports2.humanize(this.diff) + "\x1B[0m");
      } else {
        args2[0] = getDate() + name + " " + args2[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      } else {
        return (/* @__PURE__ */ new Date()).toISOString() + " ";
      }
    }
    function log() {
      return process.stderr.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports2.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    exports2.enable(load());
  }
});

// node_modules/engine.io-client/node_modules/debug/src/index.js
var require_src3 = __commonJS({
  "node_modules/engine.io-client/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer") {
      module2.exports = require_browser3();
    } else {
      module2.exports = require_node3();
    }
  }
});

// node_modules/engine.io-client/lib/transports/polling.js
var require_polling = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling.js"(exports2, module2) {
    var Transport = require_transport();
    var parseqs = require_parseqs();
    var parser = require_lib();
    var inherit = require_component_inherit();
    var yeast = require_yeast();
    var debug = require_src3()("engine.io-client:polling");
    module2.exports = Polling;
    var hasXHR2 = function() {
      var XMLHttpRequest = require_xmlhttprequest();
      var xhr = new XMLHttpRequest({ xdomain: false });
      return null != xhr.responseType;
    }();
    function Polling(opts) {
      var forceBase64 = opts && opts.forceBase64;
      if (!hasXHR2 || forceBase64) {
        this.supportsBinary = false;
      }
      Transport.call(this, opts);
    }
    inherit(Polling, Transport);
    Polling.prototype.name = "polling";
    Polling.prototype.doOpen = function() {
      this.poll();
    };
    Polling.prototype.pause = function(onPause) {
      var self2 = this;
      this.readyState = "pausing";
      function pause() {
        debug("paused");
        self2.readyState = "paused";
        onPause();
      }
      if (this.polling || !this.writable) {
        var total = 0;
        if (this.polling) {
          debug("we are currently polling - waiting to pause");
          total++;
          this.once("pollComplete", function() {
            debug("pre-pause polling complete");
            --total || pause();
          });
        }
        if (!this.writable) {
          debug("we are currently writing - waiting to pause");
          total++;
          this.once("drain", function() {
            debug("pre-pause writing complete");
            --total || pause();
          });
        }
      } else {
        pause();
      }
    };
    Polling.prototype.poll = function() {
      debug("polling");
      this.polling = true;
      this.doPoll();
      this.emit("poll");
    };
    Polling.prototype.onData = function(data) {
      var self2 = this;
      debug("polling got data %s", data);
      var callback = function(packet, index, total) {
        if ("opening" === self2.readyState && packet.type === "open") {
          self2.onOpen();
        }
        if ("close" === packet.type) {
          self2.onClose();
          return false;
        }
        self2.onPacket(packet);
      };
      parser.decodePayload(data, this.socket.binaryType, callback);
      if ("closed" !== this.readyState) {
        this.polling = false;
        this.emit("pollComplete");
        if ("open" === this.readyState) {
          this.poll();
        } else {
          debug('ignoring poll - transport state "%s"', this.readyState);
        }
      }
    };
    Polling.prototype.doClose = function() {
      var self2 = this;
      function close() {
        debug("writing close packet");
        self2.write([{ type: "close" }]);
      }
      if ("open" === this.readyState) {
        debug("transport open - closing");
        close();
      } else {
        debug("transport not open - deferring close");
        this.once("open", close);
      }
    };
    Polling.prototype.write = function(packets) {
      var self2 = this;
      this.writable = false;
      var callbackfn = function() {
        self2.writable = true;
        self2.emit("drain");
      };
      parser.encodePayload(packets, this.supportsBinary, function(data) {
        self2.doWrite(data, callbackfn);
      });
    };
    Polling.prototype.uri = function() {
      var query = this.query || {};
      var schema = this.secure ? "https" : "http";
      var port = "";
      if (false !== this.timestampRequests) {
        query[this.timestampParam] = yeast();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      query = parseqs.encode(query);
      if (this.port && ("https" === schema && Number(this.port) !== 443 || "http" === schema && Number(this.port) !== 80)) {
        port = ":" + this.port;
      }
      if (query.length) {
        query = "?" + query;
      }
      var ipv6 = this.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.hostname + "]" : this.hostname) + port + this.path + query;
    };
  }
});

// node_modules/engine.io-client/lib/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/engine.io-client/lib/globalThis.js"(exports2, module2) {
    module2.exports = global;
  }
});

// node_modules/engine.io-client/lib/transports/polling-xhr.js
var require_polling_xhr = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling-xhr.js"(exports2, module2) {
    var XMLHttpRequest = require_xmlhttprequest();
    var Polling = require_polling();
    var Emitter = require_component_emitter();
    var inherit = require_component_inherit();
    var debug = require_src3()("engine.io-client:polling-xhr");
    var globalThis = require_globalThis();
    module2.exports = XHR;
    module2.exports.Request = Request;
    function empty() {
    }
    function XHR(opts) {
      Polling.call(this, opts);
      this.requestTimeout = opts.requestTimeout;
      this.extraHeaders = opts.extraHeaders;
      if (typeof location !== "undefined") {
        var isSSL = "https:" === location.protocol;
        var port = location.port;
        if (!port) {
          port = isSSL ? 443 : 80;
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        this.xs = opts.secure !== isSSL;
      }
    }
    inherit(XHR, Polling);
    XHR.prototype.supportsBinary = true;
    XHR.prototype.request = function(opts) {
      opts = opts || {};
      opts.uri = this.uri();
      opts.xd = this.xd;
      opts.xs = this.xs;
      opts.agent = this.agent || false;
      opts.supportsBinary = this.supportsBinary;
      opts.enablesXDR = this.enablesXDR;
      opts.withCredentials = this.withCredentials;
      opts.pfx = this.pfx;
      opts.key = this.key;
      opts.passphrase = this.passphrase;
      opts.cert = this.cert;
      opts.ca = this.ca;
      opts.ciphers = this.ciphers;
      opts.rejectUnauthorized = this.rejectUnauthorized;
      opts.requestTimeout = this.requestTimeout;
      opts.extraHeaders = this.extraHeaders;
      return new Request(opts);
    };
    XHR.prototype.doWrite = function(data, fn) {
      var isBinary = typeof data !== "string" && data !== void 0;
      var req = this.request({ method: "POST", data, isBinary });
      var self2 = this;
      req.on("success", fn);
      req.on("error", function(err) {
        self2.onError("xhr post error", err);
      });
      this.sendXhr = req;
    };
    XHR.prototype.doPoll = function() {
      debug("xhr poll");
      var req = this.request();
      var self2 = this;
      req.on("data", function(data) {
        self2.onData(data);
      });
      req.on("error", function(err) {
        self2.onError("xhr poll error", err);
      });
      this.pollXhr = req;
    };
    function Request(opts) {
      this.method = opts.method || "GET";
      this.uri = opts.uri;
      this.xd = !!opts.xd;
      this.xs = !!opts.xs;
      this.async = false !== opts.async;
      this.data = void 0 !== opts.data ? opts.data : null;
      this.agent = opts.agent;
      this.isBinary = opts.isBinary;
      this.supportsBinary = opts.supportsBinary;
      this.enablesXDR = opts.enablesXDR;
      this.withCredentials = opts.withCredentials;
      this.requestTimeout = opts.requestTimeout;
      this.pfx = opts.pfx;
      this.key = opts.key;
      this.passphrase = opts.passphrase;
      this.cert = opts.cert;
      this.ca = opts.ca;
      this.ciphers = opts.ciphers;
      this.rejectUnauthorized = opts.rejectUnauthorized;
      this.extraHeaders = opts.extraHeaders;
      this.create();
    }
    Emitter(Request.prototype);
    Request.prototype.create = function() {
      var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
      opts.pfx = this.pfx;
      opts.key = this.key;
      opts.passphrase = this.passphrase;
      opts.cert = this.cert;
      opts.ca = this.ca;
      opts.ciphers = this.ciphers;
      opts.rejectUnauthorized = this.rejectUnauthorized;
      var xhr = this.xhr = new XMLHttpRequest(opts);
      var self2 = this;
      try {
        debug("xhr open %s: %s", this.method, this.uri);
        xhr.open(this.method, this.uri, this.async);
        try {
          if (this.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (var i in this.extraHeaders) {
              if (this.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this.extraHeaders[i]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this.method) {
          try {
            if (this.isBinary) {
              xhr.setRequestHeader("Content-type", "application/octet-stream");
            } else {
              xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            }
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this.withCredentials;
        }
        if (this.requestTimeout) {
          xhr.timeout = this.requestTimeout;
        }
        if (this.hasXDR()) {
          xhr.onload = function() {
            self2.onLoad();
          };
          xhr.onerror = function() {
            self2.onError(xhr.responseText);
          };
        } else {
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 2) {
              try {
                var contentType = xhr.getResponseHeader("Content-Type");
                if (self2.supportsBinary && contentType === "application/octet-stream" || contentType === "application/octet-stream; charset=UTF-8") {
                  xhr.responseType = "arraybuffer";
                }
              } catch (e) {
              }
            }
            if (4 !== xhr.readyState) return;
            if (200 === xhr.status || 1223 === xhr.status) {
              self2.onLoad();
            } else {
              setTimeout(function() {
                self2.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };
        }
        debug("xhr data %s", this.data);
        xhr.send(this.data);
      } catch (e) {
        setTimeout(function() {
          self2.onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this.index = Request.requestsCount++;
        Request.requests[this.index] = this;
      }
    };
    Request.prototype.onSuccess = function() {
      this.emit("success");
      this.cleanup();
    };
    Request.prototype.onData = function(data) {
      this.emit("data", data);
      this.onSuccess();
    };
    Request.prototype.onError = function(err) {
      this.emit("error", err);
      this.cleanup(true);
    };
    Request.prototype.cleanup = function(fromError) {
      if ("undefined" === typeof this.xhr || null === this.xhr) {
        return;
      }
      if (this.hasXDR()) {
        this.xhr.onload = this.xhr.onerror = empty;
      } else {
        this.xhr.onreadystatechange = empty;
      }
      if (fromError) {
        try {
          this.xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete Request.requests[this.index];
      }
      this.xhr = null;
    };
    Request.prototype.onLoad = function() {
      var data;
      try {
        var contentType;
        try {
          contentType = this.xhr.getResponseHeader("Content-Type");
        } catch (e) {
        }
        if (contentType === "application/octet-stream" || contentType === "application/octet-stream; charset=UTF-8") {
          data = this.xhr.response || this.xhr.responseText;
        } else {
          data = this.xhr.responseText;
        }
      } catch (e) {
        this.onError(e);
      }
      if (null != data) {
        this.onData(data);
      }
    };
    Request.prototype.hasXDR = function() {
      return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
    };
    Request.prototype.abort = function() {
      this.cleanup();
    };
    Request.requestsCount = 0;
    Request.requests = {};
    if (typeof document !== "undefined") {
      if (typeof attachEvent === "function") {
        attachEvent("onunload", unloadHandler);
      } else if (typeof addEventListener === "function") {
        terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
      }
    }
    var terminationEvent;
    function unloadHandler() {
      for (var i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
          Request.requests[i].abort();
        }
      }
    }
  }
});

// node_modules/engine.io-client/lib/transports/polling-jsonp.js
var require_polling_jsonp = __commonJS({
  "node_modules/engine.io-client/lib/transports/polling-jsonp.js"(exports2, module2) {
    var Polling = require_polling();
    var inherit = require_component_inherit();
    var globalThis = require_globalThis();
    module2.exports = JSONPPolling;
    var rNewline = /\n/g;
    var rEscapedNewline = /\\n/g;
    var callbacks;
    function empty() {
    }
    function JSONPPolling(opts) {
      Polling.call(this, opts);
      this.query = this.query || {};
      if (!callbacks) {
        callbacks = globalThis.___eio = globalThis.___eio || [];
      }
      this.index = callbacks.length;
      var self2 = this;
      callbacks.push(function(msg) {
        self2.onData(msg);
      });
      this.query.j = this.index;
      if (typeof addEventListener === "function") {
        addEventListener("beforeunload", function() {
          if (self2.script) self2.script.onerror = empty;
        }, false);
      }
    }
    inherit(JSONPPolling, Polling);
    JSONPPolling.prototype.supportsBinary = false;
    JSONPPolling.prototype.doClose = function() {
      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }
      if (this.form) {
        this.form.parentNode.removeChild(this.form);
        this.form = null;
        this.iframe = null;
      }
      Polling.prototype.doClose.call(this);
    };
    JSONPPolling.prototype.doPoll = function() {
      var self2 = this;
      var script = document.createElement("script");
      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }
      script.async = true;
      script.src = this.uri();
      script.onerror = function(e) {
        self2.onError("jsonp poll error", e);
      };
      var insertAt = document.getElementsByTagName("script")[0];
      if (insertAt) {
        insertAt.parentNode.insertBefore(script, insertAt);
      } else {
        (document.head || document.body).appendChild(script);
      }
      this.script = script;
      var isUAgecko = "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);
      if (isUAgecko) {
        setTimeout(function() {
          var iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          document.body.removeChild(iframe);
        }, 100);
      }
    };
    JSONPPolling.prototype.doWrite = function(data, fn) {
      var self2 = this;
      if (!this.form) {
        var form = document.createElement("form");
        var area = document.createElement("textarea");
        var id = this.iframeId = "eio_iframe_" + this.index;
        var iframe;
        form.className = "socketio";
        form.style.position = "absolute";
        form.style.top = "-1000px";
        form.style.left = "-1000px";
        form.target = id;
        form.method = "POST";
        form.setAttribute("accept-charset", "utf-8");
        area.name = "d";
        form.appendChild(area);
        document.body.appendChild(form);
        this.form = form;
        this.area = area;
      }
      this.form.action = this.uri();
      function complete() {
        initIframe();
        fn();
      }
      function initIframe() {
        if (self2.iframe) {
          try {
            self2.form.removeChild(self2.iframe);
          } catch (e) {
            self2.onError("jsonp polling iframe removal error", e);
          }
        }
        try {
          var html = '<iframe src="javascript:0" name="' + self2.iframeId + '">';
          iframe = document.createElement(html);
        } catch (e) {
          iframe = document.createElement("iframe");
          iframe.name = self2.iframeId;
          iframe.src = "javascript:0";
        }
        iframe.id = self2.iframeId;
        self2.form.appendChild(iframe);
        self2.iframe = iframe;
      }
      initIframe();
      data = data.replace(rEscapedNewline, "\\\n");
      this.area.value = data.replace(rNewline, "\\n");
      try {
        this.form.submit();
      } catch (e) {
      }
      if (this.iframe.attachEvent) {
        this.iframe.onreadystatechange = function() {
          if (self2.iframe.readyState === "complete") {
            complete();
          }
        };
      } else {
        this.iframe.onload = complete;
      }
    };
  }
});

// node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      EMPTY_BUFFER: Buffer.alloc(0),
      NOOP: () => {
      }
    };
  }
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length2) {
      for (let i = 0; i < length2; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      const length2 = buffer.length;
      for (let i = 0; i < length2; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    try {
      const bufferUtil = require("bufferutil");
      const bu = bufferUtil.BufferUtil || bufferUtil;
      module2.exports = {
        concat,
        mask(source, mask, output, offset, length2) {
          if (length2 < 48) _mask(source, mask, output, offset, length2);
          else bu.mask(source, mask, output, offset, length2);
        },
        toArrayBuffer,
        toBuffer,
        unmask(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bu.unmask(buffer, mask);
        }
      };
    } catch (e) {
      module2.exports = {
        concat,
        mask: _mask,
        toArrayBuffer,
        toBuffer,
        unmask: _unmask
      };
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode, NOOP } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key2) => {
            let value = params[key2];
            if (value.length > 1) {
              throw new Error(`Parameter "${key2}" must have only a single value`);
            }
            value = value[0];
            if (key2 === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key2}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
            } else if (key2 === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
              value = num;
            } else if (key2 === "client_no_context_takeover" || key2 === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key2}"`);
            }
            params[key2] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {Buffer} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {Buffer} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("error", NOOP);
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    try {
      let isValidUTF8 = require("utf-8-validate");
      if (typeof isValidUTF8 === "object") {
        isValidUTF8 = isValidUTF8.Validation.isValidUTF8;
      }
      module2.exports = {
        isValidStatusCode,
        isValidUTF8(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        }
      };
    } catch (e) {
      module2.exports = {
        isValidStatusCode,
        isValidUTF8: _isValidUTF8
      };
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {String} [binaryType=nodebuffer] The type for binary data
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Boolean} [isServer=false] Specifies whether to operate in client or
       *     server mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(binaryType, extensions, isServer, maxPayload) {
        super();
        this._binaryType = binaryType || BINARY_TYPES[0];
        this[kWebSocket] = void 0;
        this._extensions = extensions || {};
        this._isServer = !!isServer;
        this._maxPayload = maxPayload | 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
          }
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          }
        } else {
          this._loop = false;
          return error(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
          }
        } else if (this._masked) {
          this._loop = false;
          return error(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else return this.haveLength();
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      /**
       * Payload length has been read.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked) unmask(data, this._mask);
        }
        if (this._opcode > 7) return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(
                  RangeError,
                  "Max payload size exceeded",
                  false,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er) return cb(er);
          this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @return {(Error|undefined)} A possible error
       * @private
       */
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data);
          } else {
            const buf = concat(fragments, messageLength);
            if (!isValidUTF8(buf)) {
              this._loop = false;
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("message", buf.toString());
          }
        }
        this._state = GET_INFO;
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, "");
            this.end();
          } else if (data.length === 1) {
            return error(
              RangeError,
              "invalid payload length 1",
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
            }
            const buf = data.slice(2);
            if (!isValidUTF8(buf)) {
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("conclude", code, buf.toString());
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module2.exports = Receiver;
    function error(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
      );
      Error.captureStackTrace(err, error);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var mask = Buffer.alloc(4);
    var Sender = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {(net.Socket|tls.Socket)} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       */
      constructor(socket, extensions) {
        this._extensions = extensions || {};
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {Buffer} data The data to frame
       * @param {Object} options Options object
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {Buffer[]} The framed data as a list of `Buffer` instances
       * @public
       */
      static frame(data, options) {
        const merge = options.mask && options.readOnly;
        let offset = options.mask ? 6 : 2;
        let payloadLength = data.length;
        if (data.length >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (data.length > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(data.length, 2);
        } else if (payloadLength === 127) {
          target.writeUInt32BE(0, 2);
          target.writeUInt32BE(data.length, 6);
        }
        if (!options.mask) return [target, data];
        randomFillSync(mask, 0, 4);
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (merge) {
          applyMask(data, mask, target, offset, data.length);
          return [target];
        }
        applyMask(data, mask, data, 0, data.length);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {String} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask2, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || data === "") {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length2 = Buffer.byteLength(data);
          if (length2 > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length2);
          buf.writeUInt16BE(code, 0);
          buf.write(data, 2);
        }
        if (this._deflating) {
          this.enqueue([this.doClose, buf, mask2, cb]);
        } else {
          this.doClose(buf, mask2, cb);
        }
      }
      /**
       * Frames and sends a close message.
       *
       * @param {Buffer} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @private
       */
      doClose(data, mask2, cb) {
        this.sendFrame(
          _Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 8,
            mask: mask2,
            readOnly: false
          }),
          cb
        );
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPing, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPing(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      /**
       * Frames and sends a ping message.
       *
       * @param {Buffer} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
       * @param {Function} [cb] Callback
       * @private
       */
      doPing(data, mask2, readOnly, cb) {
        this.sendFrame(
          _Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 9,
            mask: mask2,
            readOnly
          }),
          cb
        );
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPong, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPong(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      /**
       * Frames and sends a pong message.
       *
       * @param {Buffer} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
       * @param {Function} [cb] Callback
       * @private
       */
      doPong(data, mask2, readOnly, cb) {
        this.sendFrame(
          _Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 10,
            mask: mask2,
            readOnly
          }),
          cb
        );
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const buf = toBuffer(data);
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate) {
            rsv1 = buf.length >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            fin: options.fin,
            rsv1,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
          } else {
            this.dispatch(buf, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            _Sender.frame(buf, {
              fin: options.fin,
              rsv1: false,
              opcode,
              mask: options.mask,
              readOnly: toBuffer.readOnly
            }),
            cb
          );
        }
      }
      /**
       * Dispatches a data message.
       *
       * @param {Buffer} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += data.length;
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            if (typeof cb === "function") cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const callback = this._queue[i][4];
              if (typeof callback === "function") callback(err);
            }
            return;
          }
          this._bufferedBytes -= data.length;
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[1].length;
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[1].length;
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {Buffer[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
  }
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @param {Object} target A reference to the target to which the event was
       *     dispatched
       */
      constructor(type, target) {
        this.target = target;
        this.type = type;
      }
    };
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
       * @param {WebSocket} target A reference to the target to which the event was
       *     dispatched
       */
      constructor(data, target) {
        super("message", target);
        this.data = data;
      }
    };
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {Number} code The status code explaining why the connection is being
       *     closed
       * @param {String} reason A human-readable string explaining why the
       *     connection is closing
       * @param {WebSocket} target A reference to the target to which the event was
       *     dispatched
       */
      constructor(code, reason, target) {
        super("close", target);
        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
      }
    };
    var OpenEvent = class extends Event {
      /**
       * Create a new `OpenEvent`.
       *
       * @param {WebSocket} target A reference to the target to which the event was
       *     dispatched
       */
      constructor(target) {
        super("open", target);
      }
    };
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {Object} error The error that generated this event
       * @param {WebSocket} target A reference to the target to which the event was
       *     dispatched
       */
      constructor(error, target) {
        super("error", target);
        this.message = error.message;
        this.error = error;
      }
    };
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {Function} listener The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean`` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, listener, options) {
        if (typeof listener !== "function") return;
        function onMessage(data) {
          listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
          listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error) {
          listener.call(this, new ErrorEvent(error, this));
        }
        function onOpen() {
          listener.call(this, new OpenEvent(this));
        }
        const method = options && options.once ? "once" : "on";
        if (type === "message") {
          onMessage._listener = listener;
          this[method](type, onMessage);
        } else if (type === "close") {
          onClose._listener = listener;
          this[method](type, onClose);
        } else if (type === "error") {
          onError._listener = listener;
          this[method](type, onError);
        } else if (type === "open") {
          onOpen._listener = listener;
          this[method](type, onOpen);
        } else {
          this[method](type, listener);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {Function} listener The listener to remove
       * @public
       */
      removeEventListener(type, listener) {
        const listeners = this.listeners(type);
        for (let i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener || listeners[i]._listener === listener) {
            this.removeListener(type, listeners[i]);
          }
        }
      }
    };
    module2.exports = EventTarget;
  }
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    function parse2(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      if (header === void 0 || header === "") return offers;
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse: parse2 };
  }
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Readable } = require("stream");
    var { URL: URL3 } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var { addEventListener: addEventListener2, removeEventListener } = require_event_target();
    var { format, parse: parse2 } = require_extension();
    var { toBuffer } = require_buffer_util();
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var protocolVersions = [8, 13];
    var closeTimeout = 30 * 1e3;
    var WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = "";
        this._closeTimer = null;
        this._extensions = {};
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (Array.isArray(protocols)) {
            protocols = protocols.join(", ");
          } else if (typeof protocols === "object" && protocols !== null) {
            options = protocols;
            protocols = void 0;
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      /**
       * This deviates from the WHATWG interface since ws doesn't support the
       * required default "blob" type (instead we define a custom "nodebuffer"
       * type).
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return void 0;
      }
      /* istanbul ignore next */
      set onclose(listener) {
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return void 0;
      }
      /* istanbul ignore next */
      set onerror(listener) {
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return void 0;
      }
      /* istanbul ignore next */
      set onopen(listener) {
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return void 0;
      }
      /* istanbul ignore next */
      set onmessage(listener) {
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Number} [maxPayload=0] The maximum allowed message size
       * @private
       */
      setSocket(socket, head, maxPayload) {
        const receiver = new Receiver(
          this.binaryType,
          this._extensions,
          this._isServer,
          maxPayload
        );
        this._sender = new Sender(socket, this._extensions);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {String} [data] A string explaining why the connection is closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          const listeners = this.listeners(method);
          for (let i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener) return listeners[i]._listener;
          }
          return void 0;
        },
        set(listener) {
          const listeners = this.listeners(method);
          for (let i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener) this.removeListener(method, listeners[i]);
          }
          this.addEventListener(method, listener);
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener2;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: void 0,
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL3) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        parsedUrl = new URL3(address);
        websocket._url = address;
      }
      const isUnixSocket = parsedUrl.protocol === "ws+unix:";
      if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
        const err = new Error(`Invalid URL: ${websocket.url}`);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const isSecure = parsedUrl.protocol === "wss:" || parsedUrl.protocol === "https:";
      const defaultPort = isSecure ? 443 : 80;
      const key2 = randomBytes(16).toString("base64");
      const get = isSecure ? https.get : http.get;
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key2,
        Connection: "Upgrade",
        Upgrade: "websocket",
        ...opts.headers
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols) {
        opts.headers["Sec-WebSocket-Protocol"] = protocols;
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isUnixSocket) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalUnixSocket = isUnixSocket;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isUnixSocket ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key3, value] of Object.entries(headers)) {
              options.headers[key3.toLowerCase()] = value;
            }
          }
        } else {
          const isSameHost = isUnixSocket ? websocket._originalUnixSocket ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalUnixSocket ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
      }
      let req = websocket._req = get(opts);
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req.aborted) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location2 = res.headers.location;
        const statusCode = res.statusCode;
        if (location2 && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL3(location2, address);
          } catch (err) {
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        const protList = (protocols || "").split(/, */);
        let protError;
        if (!protocols && serverProt) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (protocols && !serverProt) {
          protError = "Server sent no subprotocol";
        } else if (serverProt && !protList.includes(serverProt)) {
          protError = "Server sent an invalid subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse2(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length) {
            if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
              const message = "Server indicated an extension that was not requested";
              abortHandshake(websocket, socket, message);
              return;
            }
            try {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
            } catch (err) {
              const message = "Invalid Sec-WebSocket-Extensions header";
              abortHandshake(websocket, socket, message);
              return;
            }
            websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
          }
        }
        websocket.setSocket(socket, head, opts.maxPayload);
      });
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        stream.once("abort", websocket.emitClose.bind(websocket));
        websocket.emit("error", err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length2 = toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length2;
        else websocket._bufferedAmount += length2;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    function receiverOnDrain() {
      this[kWebSocket]._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data) {
      this[kWebSocket].emit("message", data);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let resumeOnReceiverDrain = true;
      let terminateOnDestroy = true;
      function receiverOnDrain() {
        if (resumeOnReceiverDrain) ws._socket.resume();
      }
      if (ws.readyState === ws.CONNECTING) {
        ws.once("open", function open() {
          ws._receiver.removeAllListeners("drain");
          ws._receiver.on("drain", receiverOnDrain);
        });
      } else {
        ws._receiver.removeAllListeners("drain");
        ws._receiver.on("drain", receiverOnDrain);
      }
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg) {
        if (!duplex.push(msg)) {
          resumeOnReceiverDrain = false;
          ws._socket.pause();
        }
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if ((ws.readyState === ws.OPEN || ws.readyState === ws.CLOSING) && !resumeOnReceiverDrain) {
          resumeOnReceiverDrain = true;
          if (!ws._receiver._writableState.needDrain) ws._socket.resume();
        }
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http = require("http");
    var https = require("https");
    var net = require("net");
    var tls = require("tls");
    var { createHash } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var WebSocket2 = require_websocket();
    var { format, parse: parse2 } = require_extension();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) this.clients = /* @__PURE__ */ new Set();
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Close the server.
       *
       * @param {Function} [cb] Callback
       * @public
       */
      close(cb) {
        if (cb) this.once("close", cb);
        if (this._state === CLOSED) {
          process.nextTick(emitClose, this);
          return;
        }
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.clients) {
          for (const client of this.clients) client.terminate();
        }
        const server = this._server;
        if (server) {
          this._removeListeners();
          this._removeListeners = this._server = null;
          if (this.options.port != null) {
            server.close(emitClose.bind(void 0, this));
            return;
          }
        }
        process.nextTick(emitClose, this);
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key2 = req.headers["sec-websocket-key"] !== void 0 ? req.headers["sec-websocket-key"].trim() : false;
        const upgrade = req.headers.upgrade;
        const version2 = +req.headers["sec-websocket-version"];
        const extensions = {};
        if (req.method !== "GET" || upgrade === void 0 || upgrade.toLowerCase() !== "websocket" || !key2 || !keyRegex.test(key2) || version2 !== 8 && version2 !== 13 || !this.shouldHandle(req)) {
          return abortHandshake(socket, 400);
        }
        if (this.options.perMessageDeflate) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = parse2(req.headers["sec-websocket-extensions"]);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            return abortHandshake(socket, 400);
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version2 === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(key2, extensions, req, socket, head, cb);
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(key2, extensions, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Object} extensions The accepted extensions
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(key2, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new WebSocket2(null);
        let protocol = req.headers["sec-websocket-protocol"];
        if (protocol) {
          protocol = protocol.split(",").map(trim);
          if (this.options.handleProtocols) {
            protocol = this.options.handleProtocols(protocol, req);
          } else {
            protocol = protocol[0];
          }
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, this.options.maxPayload);
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => this.clients.delete(ws));
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map)) server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      if (socket.writable) {
        message = message || http.STATUS_CODES[code];
        headers = {
          Connection: "close",
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(message),
          ...headers
        };
        socket.write(
          `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
        );
      }
      socket.removeListener("error", socketOnError);
      socket.destroy();
    }
    function trim(str) {
      return str.trim();
    }
  }
});

// node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/ws/index.js"(exports2, module2) {
    "use strict";
    var WebSocket2 = require_websocket();
    WebSocket2.createWebSocketStream = require_stream();
    WebSocket2.Server = require_websocket_server();
    WebSocket2.Receiver = require_receiver();
    WebSocket2.Sender = require_sender();
    module2.exports = WebSocket2;
  }
});

// node_modules/engine.io-client/lib/transports/websocket.js
var require_websocket2 = __commonJS({
  "node_modules/engine.io-client/lib/transports/websocket.js"(exports2, module2) {
    var Transport = require_transport();
    var parser = require_lib();
    var parseqs = require_parseqs();
    var inherit = require_component_inherit();
    var yeast = require_yeast();
    var debug = require_src3()("engine.io-client:websocket");
    var BrowserWebSocket;
    var NodeWebSocket;
    if (typeof WebSocket !== "undefined") {
      BrowserWebSocket = WebSocket;
    } else if (typeof self !== "undefined") {
      BrowserWebSocket = self.WebSocket || self.MozWebSocket;
    }
    if (typeof window === "undefined") {
      try {
        NodeWebSocket = require_ws();
      } catch (e) {
      }
    }
    var WebSocketImpl = BrowserWebSocket || NodeWebSocket;
    module2.exports = WS;
    function WS(opts) {
      var forceBase64 = opts && opts.forceBase64;
      if (forceBase64) {
        this.supportsBinary = false;
      }
      this.perMessageDeflate = opts.perMessageDeflate;
      this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
      this.protocols = opts.protocols;
      if (!this.usingBrowserWebSocket) {
        WebSocketImpl = NodeWebSocket;
      }
      Transport.call(this, opts);
    }
    inherit(WS, Transport);
    WS.prototype.name = "websocket";
    WS.prototype.supportsBinary = true;
    WS.prototype.doOpen = function() {
      if (!this.check()) {
        return;
      }
      var uri = this.uri();
      var protocols = this.protocols;
      var opts = {};
      if (!this.isReactNative) {
        opts.agent = this.agent;
        opts.perMessageDeflate = this.perMessageDeflate;
        opts.pfx = this.pfx;
        opts.key = this.key;
        opts.passphrase = this.passphrase;
        opts.cert = this.cert;
        opts.ca = this.ca;
        opts.ciphers = this.ciphers;
        opts.rejectUnauthorized = this.rejectUnauthorized;
      }
      if (this.extraHeaders) {
        opts.headers = this.extraHeaders;
      }
      if (this.localAddress) {
        opts.localAddress = this.localAddress;
      }
      try {
        this.ws = this.usingBrowserWebSocket && !this.isReactNative ? protocols ? new WebSocketImpl(uri, protocols) : new WebSocketImpl(uri) : new WebSocketImpl(uri, protocols, opts);
      } catch (err) {
        return this.emit("error", err);
      }
      if (this.ws.binaryType === void 0) {
        this.supportsBinary = false;
      }
      if (this.ws.supports && this.ws.supports.binary) {
        this.supportsBinary = true;
        this.ws.binaryType = "nodebuffer";
      } else {
        this.ws.binaryType = "arraybuffer";
      }
      this.addEventListeners();
    };
    WS.prototype.addEventListeners = function() {
      var self2 = this;
      this.ws.onopen = function() {
        self2.onOpen();
      };
      this.ws.onclose = function() {
        self2.onClose();
      };
      this.ws.onmessage = function(ev) {
        self2.onData(ev.data);
      };
      this.ws.onerror = function(e) {
        self2.onError("websocket error", e);
      };
    };
    WS.prototype.write = function(packets) {
      var self2 = this;
      this.writable = false;
      var total = packets.length;
      for (var i = 0, l = total; i < l; i++) {
        (function(packet) {
          parser.encodePacket(packet, self2.supportsBinary, function(data) {
            if (!self2.usingBrowserWebSocket) {
              var opts = {};
              if (packet.options) {
                opts.compress = packet.options.compress;
              }
              if (self2.perMessageDeflate) {
                var len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
                if (len < self2.perMessageDeflate.threshold) {
                  opts.compress = false;
                }
              }
            }
            try {
              if (self2.usingBrowserWebSocket) {
                self2.ws.send(data);
              } else {
                self2.ws.send(data, opts);
              }
            } catch (e) {
              debug("websocket closed before onclose event");
            }
            --total || done();
          });
        })(packets[i]);
      }
      function done() {
        self2.emit("flush");
        setTimeout(function() {
          self2.writable = true;
          self2.emit("drain");
        }, 0);
      }
    };
    WS.prototype.onClose = function() {
      Transport.prototype.onClose.call(this);
    };
    WS.prototype.doClose = function() {
      if (typeof this.ws !== "undefined") {
        this.ws.close();
      }
    };
    WS.prototype.uri = function() {
      var query = this.query || {};
      var schema = this.secure ? "wss" : "ws";
      var port = "";
      if (this.port && ("wss" === schema && Number(this.port) !== 443 || "ws" === schema && Number(this.port) !== 80)) {
        port = ":" + this.port;
      }
      if (this.timestampRequests) {
        query[this.timestampParam] = yeast();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      query = parseqs.encode(query);
      if (query.length) {
        query = "?" + query;
      }
      var ipv6 = this.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.hostname + "]" : this.hostname) + port + this.path + query;
    };
    WS.prototype.check = function() {
      return !!WebSocketImpl && !("__initialize" in WebSocketImpl && this.name === WS.prototype.name);
    };
  }
});

// node_modules/engine.io-client/lib/transports/index.js
var require_transports = __commonJS({
  "node_modules/engine.io-client/lib/transports/index.js"(exports2) {
    var XMLHttpRequest = require_xmlhttprequest();
    var XHR = require_polling_xhr();
    var JSONP = require_polling_jsonp();
    var websocket = require_websocket2();
    exports2.polling = polling;
    exports2.websocket = websocket;
    function polling(opts) {
      var xhr;
      var xd = false;
      var xs = false;
      var jsonp = false !== opts.jsonp;
      if (typeof location !== "undefined") {
        var isSSL = "https:" === location.protocol;
        var port = location.port;
        if (!port) {
          port = isSSL ? 443 : 80;
        }
        xd = opts.hostname !== location.hostname || port !== opts.port;
        xs = opts.secure !== isSSL;
      }
      opts.xdomain = xd;
      opts.xscheme = xs;
      xhr = new XMLHttpRequest(opts);
      if ("open" in xhr && !opts.forceJSONP) {
        return new XHR(opts);
      } else {
        if (!jsonp) throw new Error("JSONP disabled");
        return new JSONP(opts);
      }
    }
  }
});

// node_modules/indexof/index.js
var require_indexof = __commonJS({
  "node_modules/indexof/index.js"(exports2, module2) {
    var indexOf = [].indexOf;
    module2.exports = function(arr, obj) {
      if (indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }
      return -1;
    };
  }
});

// node_modules/engine.io-client/lib/socket.js
var require_socket2 = __commonJS({
  "node_modules/engine.io-client/lib/socket.js"(exports2, module2) {
    var transports = require_transports();
    var Emitter = require_component_emitter();
    var debug = require_src3()("engine.io-client:socket");
    var index = require_indexof();
    var parser = require_lib();
    var parseuri = require_parseuri();
    var parseqs = require_parseqs();
    module2.exports = Socket;
    function Socket(uri, opts) {
      if (!(this instanceof Socket)) return new Socket(uri, opts);
      opts = opts || {};
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        uri = parseuri(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query) opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parseuri(opts.host).host;
      }
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.agent = opts.agent || false;
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? 443 : 80);
      this.query = opts.query || {};
      if ("string" === typeof this.query) this.query = parseqs.decode(this.query);
      this.upgrade = false !== opts.upgrade;
      this.path = (opts.path || "/engine.io").replace(/\/$/, "") + "/";
      this.forceJSONP = !!opts.forceJSONP;
      this.jsonp = false !== opts.jsonp;
      this.forceBase64 = !!opts.forceBase64;
      this.enablesXDR = !!opts.enablesXDR;
      this.withCredentials = false !== opts.withCredentials;
      this.timestampParam = opts.timestampParam || "t";
      this.timestampRequests = opts.timestampRequests;
      this.transports = opts.transports || ["polling", "websocket"];
      this.transportOptions = opts.transportOptions || {};
      this.readyState = "";
      this.writeBuffer = [];
      this.prevBufferLen = 0;
      this.policyPort = opts.policyPort || 843;
      this.rememberUpgrade = opts.rememberUpgrade || false;
      this.binaryType = null;
      this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
      this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;
      if (true === this.perMessageDeflate) this.perMessageDeflate = {};
      if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
        this.perMessageDeflate.threshold = 1024;
      }
      this.pfx = opts.pfx || void 0;
      this.key = opts.key || void 0;
      this.passphrase = opts.passphrase || void 0;
      this.cert = opts.cert || void 0;
      this.ca = opts.ca || void 0;
      this.ciphers = opts.ciphers || void 0;
      this.rejectUnauthorized = opts.rejectUnauthorized === void 0 ? true : opts.rejectUnauthorized;
      this.forceNode = !!opts.forceNode;
      this.isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      if (typeof self === "undefined" || this.isReactNative) {
        if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
          this.extraHeaders = opts.extraHeaders;
        }
        if (opts.localAddress) {
          this.localAddress = opts.localAddress;
        }
      }
      this.id = null;
      this.upgrades = null;
      this.pingInterval = null;
      this.pingTimeout = null;
      this.pingIntervalTimer = null;
      this.pingTimeoutTimer = null;
      this.open();
    }
    Socket.priorWebsocketSuccess = false;
    Emitter(Socket.prototype);
    Socket.protocol = parser.protocol;
    Socket.Socket = Socket;
    Socket.Transport = require_transport();
    Socket.transports = require_transports();
    Socket.parser = require_lib();
    Socket.prototype.createTransport = function(name) {
      debug('creating transport "%s"', name);
      var query = clone(this.query);
      query.EIO = parser.protocol;
      query.transport = name;
      var options = this.transportOptions[name] || {};
      if (this.id) query.sid = this.id;
      var transport = new transports[name]({
        query,
        socket: this,
        agent: options.agent || this.agent,
        hostname: options.hostname || this.hostname,
        port: options.port || this.port,
        secure: options.secure || this.secure,
        path: options.path || this.path,
        forceJSONP: options.forceJSONP || this.forceJSONP,
        jsonp: options.jsonp || this.jsonp,
        forceBase64: options.forceBase64 || this.forceBase64,
        enablesXDR: options.enablesXDR || this.enablesXDR,
        withCredentials: options.withCredentials || this.withCredentials,
        timestampRequests: options.timestampRequests || this.timestampRequests,
        timestampParam: options.timestampParam || this.timestampParam,
        policyPort: options.policyPort || this.policyPort,
        pfx: options.pfx || this.pfx,
        key: options.key || this.key,
        passphrase: options.passphrase || this.passphrase,
        cert: options.cert || this.cert,
        ca: options.ca || this.ca,
        ciphers: options.ciphers || this.ciphers,
        rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
        perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
        extraHeaders: options.extraHeaders || this.extraHeaders,
        forceNode: options.forceNode || this.forceNode,
        localAddress: options.localAddress || this.localAddress,
        requestTimeout: options.requestTimeout || this.requestTimeout,
        protocols: options.protocols || void 0,
        isReactNative: this.isReactNative
      });
      return transport;
    };
    function clone(obj) {
      var o = {};
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          o[i] = obj[i];
        }
      }
      return o;
    }
    Socket.prototype.open = function() {
      var transport;
      if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
        transport = "websocket";
      } else if (0 === this.transports.length) {
        var self2 = this;
        setTimeout(function() {
          self2.emit("error", "No transports available");
        }, 0);
        return;
      } else {
        transport = this.transports[0];
      }
      this.readyState = "opening";
      try {
        transport = this.createTransport(transport);
      } catch (e) {
        this.transports.shift();
        this.open();
        return;
      }
      transport.open();
      this.setTransport(transport);
    };
    Socket.prototype.setTransport = function(transport) {
      debug("setting transport %s", transport.name);
      var self2 = this;
      if (this.transport) {
        debug("clearing existing transport %s", this.transport.name);
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", function() {
        self2.onDrain();
      }).on("packet", function(packet) {
        self2.onPacket(packet);
      }).on("error", function(e) {
        self2.onError(e);
      }).on("close", function() {
        self2.onClose("transport close");
      });
    };
    Socket.prototype.probe = function(name) {
      debug('probing transport "%s"', name);
      var transport = this.createTransport(name, { probe: 1 });
      var failed = false;
      var self2 = this;
      Socket.priorWebsocketSuccess = false;
      function onTransportOpen() {
        if (self2.onlyBinaryUpgrades) {
          var upgradeLosesBinary = !this.supportsBinary && self2.transport.supportsBinary;
          failed = failed || upgradeLosesBinary;
        }
        if (failed) return;
        debug('probe transport "%s" opened', name);
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", function(msg) {
          if (failed) return;
          if ("pong" === msg.type && "probe" === msg.data) {
            debug('probe transport "%s" pong', name);
            self2.upgrading = true;
            self2.emit("upgrading", transport);
            if (!transport) return;
            Socket.priorWebsocketSuccess = "websocket" === transport.name;
            debug('pausing current transport "%s"', self2.transport.name);
            self2.transport.pause(function() {
              if (failed) return;
              if ("closed" === self2.readyState) return;
              debug("changing transport and sending upgrade packet");
              cleanup();
              self2.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              self2.emit("upgrade", transport);
              transport = null;
              self2.upgrading = false;
              self2.flush();
            });
          } else {
            debug('probe transport "%s" failed', name);
            var err = new Error("probe error");
            err.transport = transport.name;
            self2.emit("upgradeError", err);
          }
        });
      }
      function freezeTransport() {
        if (failed) return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      function onerror(err) {
        var error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        debug('probe transport "%s" failed because of error: %s', name, err);
        self2.emit("upgradeError", error);
      }
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          debug('"%s" works - aborting "%s"', to.name, transport.name);
          freezeTransport();
        }
      }
      function cleanup() {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        self2.removeListener("close", onclose);
        self2.removeListener("upgrading", onupgrade);
      }
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      transport.open();
    };
    Socket.prototype.onOpen = function() {
      debug("socket open");
      this.readyState = "open";
      Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emit("open");
      this.flush();
      if ("open" === this.readyState && this.upgrade && this.transport.pause) {
        debug("starting upgrade probes");
        for (var i = 0, l = this.upgrades.length; i < l; i++) {
          this.probe(this.upgrades[i]);
        }
      }
    };
    Socket.prototype.onPacket = function(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
        this.emit("packet", packet);
        this.emit("heartbeat");
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "pong":
            this.setPing();
            this.emit("pong");
            break;
          case "error":
            var err = new Error("server error");
            err.code = packet.data;
            this.onError(err);
            break;
          case "message":
            this.emit("data", packet.data);
            this.emit("message", packet.data);
            break;
        }
      } else {
        debug('packet received with socket readyState "%s"', this.readyState);
      }
    };
    Socket.prototype.onHandshake = function(data) {
      this.emit("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this.upgrades = this.filterUpgrades(data.upgrades);
      this.pingInterval = data.pingInterval;
      this.pingTimeout = data.pingTimeout;
      this.onOpen();
      if ("closed" === this.readyState) return;
      this.setPing();
      this.removeListener("heartbeat", this.onHeartbeat);
      this.on("heartbeat", this.onHeartbeat);
    };
    Socket.prototype.onHeartbeat = function(timeout) {
      clearTimeout(this.pingTimeoutTimer);
      var self2 = this;
      self2.pingTimeoutTimer = setTimeout(function() {
        if ("closed" === self2.readyState) return;
        self2.onClose("ping timeout");
      }, timeout || self2.pingInterval + self2.pingTimeout);
    };
    Socket.prototype.setPing = function() {
      var self2 = this;
      clearTimeout(self2.pingIntervalTimer);
      self2.pingIntervalTimer = setTimeout(function() {
        debug("writing ping packet - expecting pong within %sms", self2.pingTimeout);
        self2.ping();
        self2.onHeartbeat(self2.pingTimeout);
      }, self2.pingInterval);
    };
    Socket.prototype.ping = function() {
      var self2 = this;
      this.sendPacket("ping", function() {
        self2.emit("ping");
      });
    };
    Socket.prototype.onDrain = function() {
      this.writeBuffer.splice(0, this.prevBufferLen);
      this.prevBufferLen = 0;
      if (0 === this.writeBuffer.length) {
        this.emit("drain");
      } else {
        this.flush();
      }
    };
    Socket.prototype.flush = function() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        debug("flushing %d packets in socket", this.writeBuffer.length);
        this.transport.send(this.writeBuffer);
        this.prevBufferLen = this.writeBuffer.length;
        this.emit("flush");
      }
    };
    Socket.prototype.write = Socket.prototype.send = function(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    };
    Socket.prototype.sendPacket = function(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
      var packet = {
        type,
        data,
        options
      };
      this.emit("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn) this.once("flush", fn);
      this.flush();
    };
    Socket.prototype.close = function() {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        var self2 = this;
        if (this.writeBuffer.length) {
          this.once("drain", function() {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      function close() {
        self2.onClose("forced close");
        debug("socket closing - telling transport to close");
        self2.transport.close();
      }
      function cleanupAndClose() {
        self2.removeListener("upgrade", cleanupAndClose);
        self2.removeListener("upgradeError", cleanupAndClose);
        close();
      }
      function waitForUpgrade() {
        self2.once("upgrade", cleanupAndClose);
        self2.once("upgradeError", cleanupAndClose);
      }
      return this;
    };
    Socket.prototype.onError = function(err) {
      debug("socket error %j", err);
      Socket.priorWebsocketSuccess = false;
      this.emit("error", err);
      this.onClose("transport error", err);
    };
    Socket.prototype.onClose = function(reason, desc) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        debug('socket close with reason: "%s"', reason);
        var self2 = this;
        clearTimeout(this.pingIntervalTimer);
        clearTimeout(this.pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        this.readyState = "closed";
        this.id = null;
        this.emit("close", reason, desc);
        self2.writeBuffer = [];
        self2.prevBufferLen = 0;
      }
    };
    Socket.prototype.filterUpgrades = function(upgrades) {
      var filteredUpgrades = [];
      for (var i = 0, j = upgrades.length; i < j; i++) {
        if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
      }
      return filteredUpgrades;
    };
  }
});

// node_modules/engine.io-client/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/engine.io-client/lib/index.js"(exports2, module2) {
    module2.exports = require_socket2();
    module2.exports.parser = require_lib();
  }
});

// node_modules/to-array/index.js
var require_to_array = __commonJS({
  "node_modules/to-array/index.js"(exports2, module2) {
    module2.exports = toArray;
    function toArray(list, index) {
      var array = [];
      index = index || 0;
      for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i];
      }
      return array;
    }
  }
});

// node_modules/socket.io-client/lib/on.js
var require_on = __commonJS({
  "node_modules/socket.io-client/lib/on.js"(exports2, module2) {
    module2.exports = on;
    function on(obj, ev, fn) {
      obj.on(ev, fn);
      return {
        destroy: function() {
          obj.removeListener(ev, fn);
        }
      };
    }
  }
});

// node_modules/component-bind/index.js
var require_component_bind = __commonJS({
  "node_modules/component-bind/index.js"(exports2, module2) {
    var slice = [].slice;
    module2.exports = function(obj, fn) {
      if ("string" == typeof fn) fn = obj[fn];
      if ("function" != typeof fn) throw new Error("bind() requires a function");
      var args2 = slice.call(arguments, 2);
      return function() {
        return fn.apply(obj, args2.concat(slice.call(arguments)));
      };
    };
  }
});

// node_modules/socket.io-client/lib/socket.js
var require_socket3 = __commonJS({
  "node_modules/socket.io-client/lib/socket.js"(exports2, module2) {
    var parser = require_socket();
    var Emitter = require_component_emitter();
    var toArray = require_to_array();
    var on = require_on();
    var bind = require_component_bind();
    var debug = require_src()("socket.io-client:socket");
    var parseqs = require_parseqs();
    var hasBin = require_has_binary2();
    module2.exports = exports2 = Socket;
    var events = {
      connect: 1,
      connect_error: 1,
      connect_timeout: 1,
      connecting: 1,
      disconnect: 1,
      error: 1,
      reconnect: 1,
      reconnect_attempt: 1,
      reconnect_failed: 1,
      reconnect_error: 1,
      reconnecting: 1,
      ping: 1,
      pong: 1
    };
    var emit = Emitter.prototype.emit;
    function Socket(io, nsp, opts) {
      this.io = io;
      this.nsp = nsp;
      this.json = this;
      this.ids = 0;
      this.acks = {};
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this.connected = false;
      this.disconnected = true;
      this.flags = {};
      if (opts && opts.query) {
        this.query = opts.query;
      }
      if (this.io.autoConnect) this.open();
    }
    Emitter(Socket.prototype);
    Socket.prototype.subEvents = function() {
      if (this.subs) return;
      var io = this.io;
      this.subs = [
        on(io, "open", bind(this, "onopen")),
        on(io, "packet", bind(this, "onpacket")),
        on(io, "close", bind(this, "onclose"))
      ];
    };
    Socket.prototype.open = Socket.prototype.connect = function() {
      if (this.connected) return this;
      this.subEvents();
      if (!this.io.reconnecting) this.io.open();
      if ("open" === this.io.readyState) this.onopen();
      this.emit("connecting");
      return this;
    };
    Socket.prototype.send = function() {
      var args2 = toArray(arguments);
      args2.unshift("message");
      this.emit.apply(this, args2);
      return this;
    };
    Socket.prototype.emit = function(ev) {
      if (events.hasOwnProperty(ev)) {
        emit.apply(this, arguments);
        return this;
      }
      var args2 = toArray(arguments);
      var packet = {
        type: (this.flags.binary !== void 0 ? this.flags.binary : hasBin(args2)) ? parser.BINARY_EVENT : parser.EVENT,
        data: args2
      };
      packet.options = {};
      packet.options.compress = !this.flags || false !== this.flags.compress;
      if ("function" === typeof args2[args2.length - 1]) {
        debug("emitting packet with ack id %d", this.ids);
        this.acks[this.ids] = args2.pop();
        packet.id = this.ids++;
      }
      if (this.connected) {
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    };
    Socket.prototype.packet = function(packet) {
      packet.nsp = this.nsp;
      this.io.packet(packet);
    };
    Socket.prototype.onopen = function() {
      debug("transport is open - connecting");
      if ("/" !== this.nsp) {
        if (this.query) {
          var query = typeof this.query === "object" ? parseqs.encode(this.query) : this.query;
          debug("sending connect packet with query %s", query);
          this.packet({ type: parser.CONNECT, query });
        } else {
          this.packet({ type: parser.CONNECT });
        }
      }
    };
    Socket.prototype.onclose = function(reason) {
      debug("close (%s)", reason);
      this.connected = false;
      this.disconnected = true;
      delete this.id;
      this.emit("disconnect", reason);
    };
    Socket.prototype.onpacket = function(packet) {
      var sameNamespace = packet.nsp === this.nsp;
      var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === "/";
      if (!sameNamespace && !rootNamespaceError) return;
      switch (packet.type) {
        case parser.CONNECT:
          this.onconnect();
          break;
        case parser.EVENT:
          this.onevent(packet);
          break;
        case parser.BINARY_EVENT:
          this.onevent(packet);
          break;
        case parser.ACK:
          this.onack(packet);
          break;
        case parser.BINARY_ACK:
          this.onack(packet);
          break;
        case parser.DISCONNECT:
          this.ondisconnect();
          break;
        case parser.ERROR:
          this.emit("error", packet.data);
          break;
      }
    };
    Socket.prototype.onevent = function(packet) {
      var args2 = packet.data || [];
      debug("emitting event %j", args2);
      if (null != packet.id) {
        debug("attaching ack callback to event");
        args2.push(this.ack(packet.id));
      }
      if (this.connected) {
        emit.apply(this, args2);
      } else {
        this.receiveBuffer.push(args2);
      }
    };
    Socket.prototype.ack = function(id) {
      var self2 = this;
      var sent = false;
      return function() {
        if (sent) return;
        sent = true;
        var args2 = toArray(arguments);
        debug("sending ack %j", args2);
        self2.packet({
          type: hasBin(args2) ? parser.BINARY_ACK : parser.ACK,
          id,
          data: args2
        });
      };
    };
    Socket.prototype.onack = function(packet) {
      var ack = this.acks[packet.id];
      if ("function" === typeof ack) {
        debug("calling ack %s with %j", packet.id, packet.data);
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      } else {
        debug("bad ack %s", packet.id);
      }
    };
    Socket.prototype.onconnect = function() {
      this.connected = true;
      this.disconnected = false;
      this.emitBuffered();
      this.emit("connect");
    };
    Socket.prototype.emitBuffered = function() {
      var i;
      for (i = 0; i < this.receiveBuffer.length; i++) {
        emit.apply(this, this.receiveBuffer[i]);
      }
      this.receiveBuffer = [];
      for (i = 0; i < this.sendBuffer.length; i++) {
        this.packet(this.sendBuffer[i]);
      }
      this.sendBuffer = [];
    };
    Socket.prototype.ondisconnect = function() {
      debug("server disconnect (%s)", this.nsp);
      this.destroy();
      this.onclose("io server disconnect");
    };
    Socket.prototype.destroy = function() {
      if (this.subs) {
        for (var i = 0; i < this.subs.length; i++) {
          this.subs[i].destroy();
        }
        this.subs = null;
      }
      this.io.destroy(this);
    };
    Socket.prototype.close = Socket.prototype.disconnect = function() {
      if (this.connected) {
        debug("performing disconnect (%s)", this.nsp);
        this.packet({ type: parser.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    };
    Socket.prototype.compress = function(compress) {
      this.flags.compress = compress;
      return this;
    };
    Socket.prototype.binary = function(binary) {
      this.flags.binary = binary;
      return this;
    };
  }
});

// node_modules/backo2/index.js
var require_backo2 = __commonJS({
  "node_modules/backo2/index.js"(exports2, module2) {
    module2.exports = Backoff;
    function Backoff(opts) {
      opts = opts || {};
      this.ms = opts.min || 100;
      this.max = opts.max || 1e4;
      this.factor = opts.factor || 2;
      this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
      this.attempts = 0;
    }
    Backoff.prototype.duration = function() {
      var ms = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
      }
      return Math.min(ms, this.max) | 0;
    };
    Backoff.prototype.reset = function() {
      this.attempts = 0;
    };
    Backoff.prototype.setMin = function(min) {
      this.ms = min;
    };
    Backoff.prototype.setMax = function(max) {
      this.max = max;
    };
    Backoff.prototype.setJitter = function(jitter) {
      this.jitter = jitter;
    };
  }
});

// node_modules/socket.io-client/lib/manager.js
var require_manager = __commonJS({
  "node_modules/socket.io-client/lib/manager.js"(exports2, module2) {
    var eio = require_lib2();
    var Socket = require_socket3();
    var Emitter = require_component_emitter();
    var parser = require_socket();
    var on = require_on();
    var bind = require_component_bind();
    var debug = require_src()("socket.io-client:manager");
    var indexOf = require_indexof();
    var Backoff = require_backo2();
    var has = Object.prototype.hasOwnProperty;
    module2.exports = Manager;
    function Manager(uri, opts) {
      if (!(this instanceof Manager)) return new Manager(uri, opts);
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.nsps = {};
      this.subs = [];
      this.opts = opts;
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor(opts.randomizationFactor || 0.5);
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
      this.readyState = "closed";
      this.uri = uri;
      this.connecting = [];
      this.lastPing = null;
      this.encoding = false;
      this.packetBuffer = [];
      var _parser = opts.parser || parser;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this.autoConnect = opts.autoConnect !== false;
      if (this.autoConnect) this.open();
    }
    Manager.prototype.emitAll = function() {
      this.emit.apply(this, arguments);
      for (var nsp in this.nsps) {
        if (has.call(this.nsps, nsp)) {
          this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
        }
      }
    };
    Manager.prototype.updateSocketIds = function() {
      for (var nsp in this.nsps) {
        if (has.call(this.nsps, nsp)) {
          this.nsps[nsp].id = this.generateId(nsp);
        }
      }
    };
    Manager.prototype.generateId = function(nsp) {
      return (nsp === "/" ? "" : nsp + "#") + this.engine.id;
    };
    Emitter(Manager.prototype);
    Manager.prototype.reconnection = function(v) {
      if (!arguments.length) return this._reconnection;
      this._reconnection = !!v;
      return this;
    };
    Manager.prototype.reconnectionAttempts = function(v) {
      if (!arguments.length) return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    };
    Manager.prototype.reconnectionDelay = function(v) {
      if (!arguments.length) return this._reconnectionDelay;
      this._reconnectionDelay = v;
      this.backoff && this.backoff.setMin(v);
      return this;
    };
    Manager.prototype.randomizationFactor = function(v) {
      if (!arguments.length) return this._randomizationFactor;
      this._randomizationFactor = v;
      this.backoff && this.backoff.setJitter(v);
      return this;
    };
    Manager.prototype.reconnectionDelayMax = function(v) {
      if (!arguments.length) return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      this.backoff && this.backoff.setMax(v);
      return this;
    };
    Manager.prototype.timeout = function(v) {
      if (!arguments.length) return this._timeout;
      this._timeout = v;
      return this;
    };
    Manager.prototype.maybeReconnectOnOpen = function() {
      if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    };
    Manager.prototype.open = Manager.prototype.connect = function(fn, opts) {
      debug("readyState %s", this.readyState);
      if (~this.readyState.indexOf("open")) return this;
      debug("opening %s", this.uri);
      this.engine = eio(this.uri, this.opts);
      var socket = this.engine;
      var self2 = this;
      this.readyState = "opening";
      this.skipReconnect = false;
      var openSub = on(socket, "open", function() {
        self2.onopen();
        fn && fn();
      });
      var errorSub = on(socket, "error", function(data) {
        debug("connect_error");
        self2.cleanup();
        self2.readyState = "closed";
        self2.emitAll("connect_error", data);
        if (fn) {
          var err = new Error("Connection error");
          err.data = data;
          fn(err);
        } else {
          self2.maybeReconnectOnOpen();
        }
      });
      if (false !== this._timeout) {
        var timeout = this._timeout;
        debug("connect attempt will timeout after %d", timeout);
        if (timeout === 0) {
          openSub.destroy();
        }
        var timer = setTimeout(function() {
          debug("connect attempt timed out after %d", timeout);
          openSub.destroy();
          socket.close();
          socket.emit("error", "timeout");
          self2.emitAll("connect_timeout", timeout);
        }, timeout);
        this.subs.push({
          destroy: function() {
            clearTimeout(timer);
          }
        });
      }
      this.subs.push(openSub);
      this.subs.push(errorSub);
      return this;
    };
    Manager.prototype.onopen = function() {
      debug("open");
      this.cleanup();
      this.readyState = "open";
      this.emit("open");
      var socket = this.engine;
      this.subs.push(on(socket, "data", bind(this, "ondata")));
      this.subs.push(on(socket, "ping", bind(this, "onping")));
      this.subs.push(on(socket, "pong", bind(this, "onpong")));
      this.subs.push(on(socket, "error", bind(this, "onerror")));
      this.subs.push(on(socket, "close", bind(this, "onclose")));
      this.subs.push(on(this.decoder, "decoded", bind(this, "ondecoded")));
    };
    Manager.prototype.onping = function() {
      this.lastPing = /* @__PURE__ */ new Date();
      this.emitAll("ping");
    };
    Manager.prototype.onpong = function() {
      this.emitAll("pong", /* @__PURE__ */ new Date() - this.lastPing);
    };
    Manager.prototype.ondata = function(data) {
      this.decoder.add(data);
    };
    Manager.prototype.ondecoded = function(packet) {
      this.emit("packet", packet);
    };
    Manager.prototype.onerror = function(err) {
      debug("error", err);
      this.emitAll("error", err);
    };
    Manager.prototype.socket = function(nsp, opts) {
      var socket = this.nsps[nsp];
      if (!socket) {
        socket = new Socket(this, nsp, opts);
        this.nsps[nsp] = socket;
        var self2 = this;
        socket.on("connecting", onConnecting);
        socket.on("connect", function() {
          socket.id = self2.generateId(nsp);
        });
        if (this.autoConnect) {
          onConnecting();
        }
      }
      function onConnecting() {
        if (!~indexOf(self2.connecting, socket)) {
          self2.connecting.push(socket);
        }
      }
      return socket;
    };
    Manager.prototype.destroy = function(socket) {
      var index = indexOf(this.connecting, socket);
      if (~index) this.connecting.splice(index, 1);
      if (this.connecting.length) return;
      this.close();
    };
    Manager.prototype.packet = function(packet) {
      debug("writing packet %j", packet);
      var self2 = this;
      if (packet.query && packet.type === 0) packet.nsp += "?" + packet.query;
      if (!self2.encoding) {
        self2.encoding = true;
        this.encoder.encode(packet, function(encodedPackets) {
          for (var i = 0; i < encodedPackets.length; i++) {
            self2.engine.write(encodedPackets[i], packet.options);
          }
          self2.encoding = false;
          self2.processPacketQueue();
        });
      } else {
        self2.packetBuffer.push(packet);
      }
    };
    Manager.prototype.processPacketQueue = function() {
      if (this.packetBuffer.length > 0 && !this.encoding) {
        var pack = this.packetBuffer.shift();
        this.packet(pack);
      }
    };
    Manager.prototype.cleanup = function() {
      debug("cleanup");
      var subsLength = this.subs.length;
      for (var i = 0; i < subsLength; i++) {
        var sub = this.subs.shift();
        sub.destroy();
      }
      this.packetBuffer = [];
      this.encoding = false;
      this.lastPing = null;
      this.decoder.destroy();
    };
    Manager.prototype.close = Manager.prototype.disconnect = function() {
      debug("disconnect");
      this.skipReconnect = true;
      this.reconnecting = false;
      if ("opening" === this.readyState) {
        this.cleanup();
      }
      this.backoff.reset();
      this.readyState = "closed";
      if (this.engine) this.engine.close();
    };
    Manager.prototype.onclose = function(reason) {
      debug("onclose");
      this.cleanup();
      this.backoff.reset();
      this.readyState = "closed";
      this.emit("close", reason);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    };
    Manager.prototype.reconnect = function() {
      if (this.reconnecting || this.skipReconnect) return this;
      var self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        debug("reconnect failed");
        this.backoff.reset();
        this.emitAll("reconnect_failed");
        this.reconnecting = false;
      } else {
        var delay = this.backoff.duration();
        debug("will wait %dms before reconnect attempt", delay);
        this.reconnecting = true;
        var timer = setTimeout(function() {
          if (self2.skipReconnect) return;
          debug("attempting reconnect");
          self2.emitAll("reconnect_attempt", self2.backoff.attempts);
          self2.emitAll("reconnecting", self2.backoff.attempts);
          if (self2.skipReconnect) return;
          self2.open(function(err) {
            if (err) {
              debug("reconnect attempt error");
              self2.reconnecting = false;
              self2.reconnect();
              self2.emitAll("reconnect_error", err.data);
            } else {
              debug("reconnect success");
              self2.onreconnect();
            }
          });
        }, delay);
        this.subs.push({
          destroy: function() {
            clearTimeout(timer);
          }
        });
      }
    };
    Manager.prototype.onreconnect = function() {
      var attempt = this.backoff.attempts;
      this.reconnecting = false;
      this.backoff.reset();
      this.updateSocketIds();
      this.emitAll("reconnect", attempt);
    };
  }
});

// node_modules/socket.io-client/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/socket.io-client/lib/index.js"(exports2, module2) {
    var url = require_url();
    var parser = require_socket();
    var Manager = require_manager();
    var debug = require_src()("socket.io-client");
    module2.exports = exports2 = lookup;
    var cache = exports2.managers = {};
    function lookup(uri, opts) {
      if (typeof uri === "object") {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      var parsed = url(uri);
      var source = parsed.source;
      var id = parsed.id;
      var path = parsed.path;
      var sameNamespace = cache[id] && path in cache[id].nsps;
      var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
      var io;
      if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = Manager(source, opts);
      } else {
        if (!cache[id]) {
          debug("new io instance for %s", source);
          cache[id] = Manager(source, opts);
        }
        io = cache[id];
      }
      if (parsed.query && !opts.query) {
        opts.query = parsed.query;
      }
      return io.socket(parsed.path, opts);
    }
    exports2.protocol = parser.protocol;
    exports2.connect = lookup;
    exports2.Manager = require_manager();
    exports2.Socket = require_socket3();
  }
});

// node_modules/ms/index.js
var require_ms4 = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms4();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key2) => {
        createDebug[key2] = env[key2];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args2) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args2[0] = createDebug.coerce(args2[0]);
          if (typeof args2[0] !== "string") {
            args2.unshift("%O");
          }
          let index = 0;
          args2[0] = args2[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args2[index];
              match = formatter.call(self2, val);
              args2.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args2);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args2);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser4 = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args2) {
      args2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args2[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args2.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args2[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args2.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node4 = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key2) => {
      return /^debug_/i.test(key2);
    }).reduce((obj, key2) => {
      const prop = key2.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key2];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args2) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args2[0] = prefix + args2[0].split("\n").join("\n" + prefix);
        args2.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args2[0] = getDate() + name + " " + args2[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args2) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args2) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src4 = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser4();
    } else {
      module2.exports = require_node4();
    }
  }
});

// node_modules/rfdc/index.js
var require_rfdc = __commonJS({
  "node_modules/rfdc/index.js"(exports2, module2) {
    "use strict";
    module2.exports = rfdc;
    function copyBuffer(cur) {
      if (cur instanceof Buffer) {
        return Buffer.from(cur);
      }
      return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
    }
    function rfdc(opts) {
      opts = opts || {};
      if (opts.circles) return rfdcCircles(opts);
      const constructorHandlers = /* @__PURE__ */ new Map();
      constructorHandlers.set(Date, (o) => new Date(o));
      constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
      constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
      if (opts.constructorHandlers) {
        for (const handler2 of opts.constructorHandlers) {
          constructorHandlers.set(handler2[0], handler2[1]);
        }
      }
      let handler = null;
      return opts.proto ? cloneProto : clone;
      function cloneArray(a, fn) {
        const keys = Object.keys(a);
        const a2 = new Array(keys.length);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            a2[k] = handler(cur, fn);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            a2[k] = fn(cur);
          }
        }
        return a2;
      }
      function clone(o) {
        if (typeof o !== "object" || o === null) return o;
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, clone);
        }
        const o2 = {};
        for (const k in o) {
          if (Object.hasOwnProperty.call(o, k) === false) continue;
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, clone);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = clone(cur);
          }
        }
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, cloneProto);
        }
        const o2 = {};
        for (const k in o) {
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, cloneProto);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = cloneProto(cur);
          }
        }
        return o2;
      }
    }
    function rfdcCircles(opts) {
      const refs = [];
      const refsNew = [];
      const constructorHandlers = /* @__PURE__ */ new Map();
      constructorHandlers.set(Date, (o) => new Date(o));
      constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
      constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
      if (opts.constructorHandlers) {
        for (const handler2 of opts.constructorHandlers) {
          constructorHandlers.set(handler2[0], handler2[1]);
        }
      }
      let handler = null;
      return opts.proto ? cloneProto : clone;
      function cloneArray(a, fn) {
        const keys = Object.keys(a);
        const a2 = new Array(keys.length);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            a2[k] = handler(cur, fn);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            const index = refs.indexOf(cur);
            if (index !== -1) {
              a2[k] = refsNew[index];
            } else {
              a2[k] = fn(cur);
            }
          }
        }
        return a2;
      }
      function clone(o) {
        if (typeof o !== "object" || o === null) return o;
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, clone);
        }
        const o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (const k in o) {
          if (Object.hasOwnProperty.call(o, k) === false) continue;
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, clone);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            const i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = clone(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, cloneProto);
        }
        const o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (const k in o) {
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, cloneProto);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            const i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = cloneProto(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
    }
  }
});

// node_modules/log4js/lib/configuration.js
var require_configuration = __commonJS({
  "node_modules/log4js/lib/configuration.js"(exports2, module2) {
    var util = require("util");
    var debug = require_src4()("log4js:configuration");
    var preProcessingListeners = [];
    var listeners = [];
    var not = (thing) => !thing;
    var anObject = (thing) => thing && typeof thing === "object" && !Array.isArray(thing);
    var validIdentifier = (thing) => /^[A-Za-z][A-Za-z0-9_]*$/g.test(thing);
    var anInteger = (thing) => thing && typeof thing === "number" && Number.isInteger(thing);
    var addListener = (fn) => {
      listeners.push(fn);
      debug(`Added listener, now ${listeners.length} listeners`);
    };
    var addPreProcessingListener = (fn) => {
      preProcessingListeners.push(fn);
      debug(
        `Added pre-processing listener, now ${preProcessingListeners.length} listeners`
      );
    };
    var throwExceptionIf = (config2, checks, message) => {
      const tests = Array.isArray(checks) ? checks : [checks];
      tests.forEach((test) => {
        if (test) {
          throw new Error(
            `Problem with log4js configuration: (${util.inspect(config2, {
              depth: 5
            })}) - ${message}`
          );
        }
      });
    };
    var configure = (candidate) => {
      debug("New configuration to be validated: ", candidate);
      throwExceptionIf(candidate, not(anObject(candidate)), "must be an object.");
      debug(`Calling pre-processing listeners (${preProcessingListeners.length})`);
      preProcessingListeners.forEach((listener) => listener(candidate));
      debug("Configuration pre-processing finished.");
      debug(`Calling configuration listeners (${listeners.length})`);
      listeners.forEach((listener) => listener(candidate));
      debug("Configuration finished.");
    };
    module2.exports = {
      configure,
      addListener,
      addPreProcessingListener,
      throwExceptionIf,
      anObject,
      anInteger,
      validIdentifier,
      not
    };
  }
});

// node_modules/date-format/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/date-format/lib/index.js"(exports2, module2) {
    "use strict";
    function padWithZeros(vNumber, width) {
      var numAsString = vNumber.toString();
      while (numAsString.length < width) {
        numAsString = "0" + numAsString;
      }
      return numAsString;
    }
    function addZero(vNumber) {
      return padWithZeros(vNumber, 2);
    }
    function offset(timezoneOffset) {
      var os = Math.abs(timezoneOffset);
      var h = String(Math.floor(os / 60));
      var m = String(os % 60);
      h = ("0" + h).slice(-2);
      m = ("0" + m).slice(-2);
      return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h + ":" + m;
    }
    function asString(format, date) {
      if (typeof format !== "string") {
        date = format;
        format = module2.exports.ISO8601_FORMAT;
      }
      if (!date) {
        date = module2.exports.now();
      }
      var vDay = addZero(date.getDate());
      var vMonth = addZero(date.getMonth() + 1);
      var vYearLong = addZero(date.getFullYear());
      var vYearShort = addZero(vYearLong.substring(2, 4));
      var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
      var vHour = addZero(date.getHours());
      var vMinute = addZero(date.getMinutes());
      var vSecond = addZero(date.getSeconds());
      var vMillisecond = padWithZeros(date.getMilliseconds(), 3);
      var vTimeZone = offset(date.getTimezoneOffset());
      var formatted = format.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear).replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond).replace(/SSS/g, vMillisecond).replace(/O/g, vTimeZone);
      return formatted;
    }
    function setDatePart(date, part, value, local) {
      date["set" + (local ? "" : "UTC") + part](value);
    }
    function extractDateParts(pattern, str, missingValuesDate) {
      var local = pattern.indexOf("O") < 0;
      var monthOverflow = false;
      var matchers = [
        {
          pattern: /y{1,4}/,
          regexp: "\\d{1,4}",
          fn: function(date2, value) {
            setDatePart(date2, "FullYear", value, local);
          }
        },
        {
          pattern: /MM/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            setDatePart(date2, "Month", value - 1, local);
            if (date2.getMonth() !== value - 1) {
              monthOverflow = true;
            }
          }
        },
        {
          pattern: /dd/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            if (monthOverflow) {
              setDatePart(date2, "Month", date2.getMonth() - 1, local);
            }
            setDatePart(date2, "Date", value, local);
          }
        },
        {
          pattern: /hh/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            setDatePart(date2, "Hours", value, local);
          }
        },
        {
          pattern: /mm/,
          regexp: "\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Minutes", value, local);
          }
        },
        {
          pattern: /ss/,
          regexp: "\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Seconds", value, local);
          }
        },
        {
          pattern: /SSS/,
          regexp: "\\d\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Milliseconds", value, local);
          }
        },
        {
          pattern: /O/,
          regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
          fn: function(date2, value) {
            if (value === "Z") {
              value = 0;
            } else {
              value = value.replace(":", "");
            }
            var offset2 = Math.abs(value);
            var timezoneOffset = (value > 0 ? -1 : 1) * (offset2 % 100 + Math.floor(offset2 / 100) * 60);
            date2.setUTCMinutes(date2.getUTCMinutes() + timezoneOffset);
          }
        }
      ];
      var parsedPattern = matchers.reduce(
        function(p, m) {
          if (m.pattern.test(p.regexp)) {
            m.index = p.regexp.match(m.pattern).index;
            p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
          } else {
            m.index = -1;
          }
          return p;
        },
        { regexp: pattern, index: [] }
      );
      var dateFns = matchers.filter(function(m) {
        return m.index > -1;
      });
      dateFns.sort(function(a, b) {
        return a.index - b.index;
      });
      var matcher = new RegExp(parsedPattern.regexp);
      var matches = matcher.exec(str);
      if (matches) {
        var date = missingValuesDate || module2.exports.now();
        dateFns.forEach(function(f, i) {
          f.fn(date, matches[i + 1]);
        });
        return date;
      }
      throw new Error(
        "String '" + str + "' could not be parsed as '" + pattern + "'"
      );
    }
    function parse2(pattern, str, missingValuesDate) {
      if (!pattern) {
        throw new Error("pattern must be supplied");
      }
      return extractDateParts(pattern, str, missingValuesDate);
    }
    function now() {
      return /* @__PURE__ */ new Date();
    }
    module2.exports = asString;
    module2.exports.asString = asString;
    module2.exports.parse = parse2;
    module2.exports.now = now;
    module2.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
    module2.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
    module2.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
    module2.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
  }
});

// node_modules/log4js/lib/layouts.js
var require_layouts = __commonJS({
  "node_modules/log4js/lib/layouts.js"(exports2, module2) {
    var dateFormat = require_lib4();
    var os = require("os");
    var util = require("util");
    var path = require("path");
    var url = require("url");
    var debug = require_src4()("log4js:layouts");
    var styles = {
      // styles
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      // grayscale
      white: [37, 39],
      grey: [90, 39],
      black: [90, 39],
      // colors
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [91, 39],
      yellow: [33, 39]
    };
    function colorizeStart(style) {
      return style ? `\x1B[${styles[style][0]}m` : "";
    }
    function colorizeEnd(style) {
      return style ? `\x1B[${styles[style][1]}m` : "";
    }
    function colorize(str, style) {
      return colorizeStart(style) + str + colorizeEnd(style);
    }
    function timestampLevelAndCategory(loggingEvent, colour) {
      return colorize(
        util.format(
          "[%s] [%s] %s - ",
          dateFormat.asString(loggingEvent.startTime),
          loggingEvent.level.toString(),
          loggingEvent.categoryName
        ),
        colour
      );
    }
    function basicLayout(loggingEvent) {
      return timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data);
    }
    function colouredLayout(loggingEvent) {
      return timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util.format(...loggingEvent.data);
    }
    function messagePassThroughLayout(loggingEvent) {
      return util.format(...loggingEvent.data);
    }
    function dummyLayout(loggingEvent) {
      return loggingEvent.data[0];
    }
    function patternLayout(pattern, tokens) {
      const TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
      const regex = /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;
      pattern = pattern || TTCC_CONVERSION_PATTERN;
      function categoryName(loggingEvent, specifier) {
        let loggerName = loggingEvent.categoryName;
        if (specifier) {
          const precision = parseInt(specifier, 10);
          const loggerNameBits = loggerName.split(".");
          if (precision < loggerNameBits.length) {
            loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
          }
        }
        return loggerName;
      }
      function formatAsDate(loggingEvent, specifier) {
        let format = dateFormat.ISO8601_FORMAT;
        if (specifier) {
          format = specifier;
          switch (format) {
            case "ISO8601":
            case "ISO8601_FORMAT":
              format = dateFormat.ISO8601_FORMAT;
              break;
            case "ISO8601_WITH_TZ_OFFSET":
            case "ISO8601_WITH_TZ_OFFSET_FORMAT":
              format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
              break;
            case "ABSOLUTE":
              process.emitWarning(
                "Pattern %d{ABSOLUTE} is deprecated in favor of %d{ABSOLUTETIME}. Please use %d{ABSOLUTETIME} instead.",
                "DeprecationWarning",
                "log4js-node-DEP0003"
              );
              debug(
                "[log4js-node-DEP0003]",
                "DEPRECATION: Pattern %d{ABSOLUTE} is deprecated and replaced by %d{ABSOLUTETIME}."
              );
            case "ABSOLUTETIME":
            case "ABSOLUTETIME_FORMAT":
              format = dateFormat.ABSOLUTETIME_FORMAT;
              break;
            case "DATE":
              process.emitWarning(
                "Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.",
                "DeprecationWarning",
                "log4js-node-DEP0004"
              );
              debug(
                "[log4js-node-DEP0004]",
                "DEPRECATION: Pattern %d{DATE} is deprecated and replaced by %d{DATETIME}."
              );
            case "DATETIME":
            case "DATETIME_FORMAT":
              format = dateFormat.DATETIME_FORMAT;
              break;
          }
        }
        return dateFormat.asString(format, loggingEvent.startTime);
      }
      function hostname() {
        return os.hostname().toString();
      }
      function formatMessage(loggingEvent, specifier) {
        let dataSlice = loggingEvent.data;
        if (specifier) {
          const [lowerBound, upperBound] = specifier.split(",");
          dataSlice = dataSlice.slice(lowerBound, upperBound);
        }
        return util.format(...dataSlice);
      }
      function endOfLine() {
        return os.EOL;
      }
      function logLevel(loggingEvent) {
        return loggingEvent.level.toString();
      }
      function startTime(loggingEvent) {
        return dateFormat.asString("hh:mm:ss", loggingEvent.startTime);
      }
      function startColour(loggingEvent) {
        return colorizeStart(loggingEvent.level.colour);
      }
      function endColour(loggingEvent) {
        return colorizeEnd(loggingEvent.level.colour);
      }
      function percent() {
        return "%";
      }
      function pid(loggingEvent) {
        return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
      }
      function clusterInfo() {
        return pid();
      }
      function userDefined(loggingEvent, specifier) {
        if (typeof tokens[specifier] !== "undefined") {
          return typeof tokens[specifier] === "function" ? tokens[specifier](loggingEvent) : tokens[specifier];
        }
        return null;
      }
      function contextDefined(loggingEvent, specifier) {
        const resolver = loggingEvent.context[specifier];
        if (typeof resolver !== "undefined") {
          return typeof resolver === "function" ? resolver(loggingEvent) : resolver;
        }
        return null;
      }
      function fileName(loggingEvent, specifier) {
        let filename = loggingEvent.fileName || "";
        const convertFileURLToPath = function(filepath) {
          const urlPrefix = "file://";
          if (filepath.startsWith(urlPrefix)) {
            if (typeof url.fileURLToPath === "function") {
              filepath = url.fileURLToPath(filepath);
            } else {
              filepath = path.normalize(
                filepath.replace(new RegExp(`^${urlPrefix}`), "")
              );
              if (process.platform === "win32") {
                if (filepath.startsWith("\\")) {
                  filepath = filepath.slice(1);
                } else {
                  filepath = path.sep + path.sep + filepath;
                }
              }
            }
          }
          return filepath;
        };
        filename = convertFileURLToPath(filename);
        if (specifier) {
          const fileDepth = parseInt(specifier, 10);
          const fileList = filename.split(path.sep);
          if (fileList.length > fileDepth) {
            filename = fileList.slice(-fileDepth).join(path.sep);
          }
        }
        return filename;
      }
      function lineNumber(loggingEvent) {
        return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : "";
      }
      function columnNumber(loggingEvent) {
        return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : "";
      }
      function callStack(loggingEvent) {
        return loggingEvent.callStack || "";
      }
      function className(loggingEvent) {
        return loggingEvent.className || "";
      }
      function functionName(loggingEvent) {
        return loggingEvent.functionName || "";
      }
      function functionAlias(loggingEvent) {
        return loggingEvent.functionAlias || "";
      }
      function callerName(loggingEvent) {
        return loggingEvent.callerName || "";
      }
      const replacers = {
        c: categoryName,
        d: formatAsDate,
        h: hostname,
        m: formatMessage,
        n: endOfLine,
        p: logLevel,
        r: startTime,
        "[": startColour,
        "]": endColour,
        y: clusterInfo,
        z: pid,
        "%": percent,
        x: userDefined,
        X: contextDefined,
        f: fileName,
        l: lineNumber,
        o: columnNumber,
        s: callStack,
        C: className,
        M: functionName,
        A: functionAlias,
        F: callerName
      };
      function replaceToken(conversionCharacter, loggingEvent, specifier) {
        return replacers[conversionCharacter](loggingEvent, specifier);
      }
      function truncate(truncation, toTruncate) {
        let len;
        if (truncation) {
          len = parseInt(truncation.slice(1), 10);
          return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
        }
        return toTruncate;
      }
      function pad(padding, toPad) {
        let len;
        if (padding) {
          if (padding.charAt(0) === "-") {
            len = parseInt(padding.slice(1), 10);
            while (toPad.length < len) {
              toPad += " ";
            }
          } else {
            len = parseInt(padding, 10);
            while (toPad.length < len) {
              toPad = ` ${toPad}`;
            }
          }
        }
        return toPad;
      }
      function truncateAndPad(toTruncAndPad, truncation, padding) {
        let replacement = toTruncAndPad;
        replacement = truncate(truncation, replacement);
        replacement = pad(padding, replacement);
        return replacement;
      }
      return function(loggingEvent) {
        let formattedString = "";
        let result;
        let searchString = pattern;
        while ((result = regex.exec(searchString)) !== null) {
          const padding = result[1];
          const truncation = result[2];
          const conversionCharacter = result[3];
          const specifier = result[5];
          const text = result[6];
          if (text) {
            formattedString += text.toString();
          } else {
            const replacement = replaceToken(
              conversionCharacter,
              loggingEvent,
              specifier
            );
            formattedString += truncateAndPad(replacement, truncation, padding);
          }
          searchString = searchString.slice(result.index + result[0].length);
        }
        return formattedString;
      };
    }
    var layoutMakers = {
      messagePassThrough() {
        return messagePassThroughLayout;
      },
      basic() {
        return basicLayout;
      },
      colored() {
        return colouredLayout;
      },
      coloured() {
        return colouredLayout;
      },
      pattern(config2) {
        return patternLayout(config2 && config2.pattern, config2 && config2.tokens);
      },
      dummy() {
        return dummyLayout;
      }
    };
    module2.exports = {
      basicLayout,
      messagePassThroughLayout,
      patternLayout,
      colouredLayout,
      coloredLayout: colouredLayout,
      dummyLayout,
      addLayout(name, serializerGenerator) {
        layoutMakers[name] = serializerGenerator;
      },
      layout(name, config2) {
        return layoutMakers[name] && layoutMakers[name](config2);
      }
    };
  }
});

// node_modules/log4js/lib/levels.js
var require_levels = __commonJS({
  "node_modules/log4js/lib/levels.js"(exports2, module2) {
    var configuration = require_configuration();
    var validColours = [
      "white",
      "grey",
      "black",
      "blue",
      "cyan",
      "green",
      "magenta",
      "red",
      "yellow"
    ];
    var Level = class _Level {
      constructor(level, levelStr, colour) {
        this.level = level;
        this.levelStr = levelStr;
        this.colour = colour;
      }
      toString() {
        return this.levelStr;
      }
      /**
       * converts given String to corresponding Level
       * @param {(Level|string)} sArg -- String value of Level OR Log4js.Level
       * @param {Level} [defaultLevel] -- default Level, if no String representation
       * @return {Level}
       */
      static getLevel(sArg, defaultLevel) {
        if (!sArg) {
          return defaultLevel;
        }
        if (sArg instanceof _Level) {
          return sArg;
        }
        if (sArg instanceof Object && sArg.levelStr) {
          sArg = sArg.levelStr;
        }
        return _Level[sArg.toString().toUpperCase()] || defaultLevel;
      }
      static addLevels(customLevels) {
        if (customLevels) {
          const levels = Object.keys(customLevels);
          levels.forEach((l) => {
            const levelStr = l.toUpperCase();
            _Level[levelStr] = new _Level(
              customLevels[l].value,
              levelStr,
              customLevels[l].colour
            );
            const existingLevelIndex = _Level.levels.findIndex(
              (lvl) => lvl.levelStr === levelStr
            );
            if (existingLevelIndex > -1) {
              _Level.levels[existingLevelIndex] = _Level[levelStr];
            } else {
              _Level.levels.push(_Level[levelStr]);
            }
          });
          _Level.levels.sort((a, b) => a.level - b.level);
        }
      }
      isLessThanOrEqualTo(otherLevel) {
        if (typeof otherLevel === "string") {
          otherLevel = _Level.getLevel(otherLevel);
        }
        return this.level <= otherLevel.level;
      }
      isGreaterThanOrEqualTo(otherLevel) {
        if (typeof otherLevel === "string") {
          otherLevel = _Level.getLevel(otherLevel);
        }
        return this.level >= otherLevel.level;
      }
      isEqualTo(otherLevel) {
        if (typeof otherLevel === "string") {
          otherLevel = _Level.getLevel(otherLevel);
        }
        return this.level === otherLevel.level;
      }
    };
    Level.levels = [];
    Level.addLevels({
      ALL: { value: Number.MIN_VALUE, colour: "grey" },
      TRACE: { value: 5e3, colour: "blue" },
      DEBUG: { value: 1e4, colour: "cyan" },
      INFO: { value: 2e4, colour: "green" },
      WARN: { value: 3e4, colour: "yellow" },
      ERROR: { value: 4e4, colour: "red" },
      FATAL: { value: 5e4, colour: "magenta" },
      MARK: { value: 9007199254740992, colour: "grey" },
      // 2^53
      OFF: { value: Number.MAX_VALUE, colour: "grey" }
    });
    configuration.addListener((config2) => {
      const levelConfig = config2.levels;
      if (levelConfig) {
        configuration.throwExceptionIf(
          config2,
          configuration.not(configuration.anObject(levelConfig)),
          "levels must be an object"
        );
        const newLevels = Object.keys(levelConfig);
        newLevels.forEach((l) => {
          configuration.throwExceptionIf(
            config2,
            configuration.not(configuration.validIdentifier(l)),
            `level name "${l}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`
          );
          configuration.throwExceptionIf(
            config2,
            configuration.not(configuration.anObject(levelConfig[l])),
            `level "${l}" must be an object`
          );
          configuration.throwExceptionIf(
            config2,
            configuration.not(levelConfig[l].value),
            `level "${l}" must have a 'value' property`
          );
          configuration.throwExceptionIf(
            config2,
            configuration.not(configuration.anInteger(levelConfig[l].value)),
            `level "${l}".value must have an integer value`
          );
          configuration.throwExceptionIf(
            config2,
            configuration.not(levelConfig[l].colour),
            `level "${l}" must have a 'colour' property`
          );
          configuration.throwExceptionIf(
            config2,
            configuration.not(validColours.indexOf(levelConfig[l].colour) > -1),
            `level "${l}".colour must be one of ${validColours.join(", ")}`
          );
        });
      }
    });
    configuration.addListener((config2) => {
      Level.addLevels(config2.levels);
    });
    module2.exports = Level;
  }
});

// node_modules/flatted/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/flatted/cjs/index.js"(exports2) {
    "use strict";
    var { parse: $parse, stringify: $stringify } = JSON;
    var { keys } = Object;
    var Primitive = String;
    var primitive = "string";
    var ignore = {};
    var object = "object";
    var noop = (_, value) => value;
    var primitives = (value) => value instanceof Primitive ? Primitive(value) : value;
    var Primitives = (_, value) => typeof value === primitive ? new Primitive(value) : value;
    var revive = (input, parsed, output, $) => {
      const lazy = [];
      for (let ke = keys(output), { length: length2 } = ke, y = 0; y < length2; y++) {
        const k = ke[y];
        const value = output[k];
        if (value instanceof Primitive) {
          const tmp = input[value];
          if (typeof tmp === object && !parsed.has(tmp)) {
            parsed.add(tmp);
            output[k] = ignore;
            lazy.push({ k, a: [input, parsed, tmp, $] });
          } else
            output[k] = $.call(output, k, tmp);
        } else if (output[k] !== ignore)
          output[k] = $.call(output, k, value);
      }
      for (let { length: length2 } = lazy, i = 0; i < length2; i++) {
        const { k, a } = lazy[i];
        output[k] = $.call(output, k, revive.apply(null, a));
      }
      return output;
    };
    var set = (known, input, value) => {
      const index = Primitive(input.push(value) - 1);
      known.set(value, index);
      return index;
    };
    var parse2 = (text, reviver) => {
      const input = $parse(text, Primitives).map(primitives);
      const value = input[0];
      const $ = reviver || noop;
      const tmp = typeof value === object && value ? revive(input, /* @__PURE__ */ new Set(), value, $) : value;
      return $.call({ "": tmp }, "", tmp);
    };
    exports2.parse = parse2;
    var stringify2 = (value, replacer, space) => {
      const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
      const known = /* @__PURE__ */ new Map();
      const input = [];
      const output = [];
      let i = +set(known, input, $.call({ "": value }, "", value));
      let firstRun = !i;
      while (i < input.length) {
        firstRun = true;
        output[i] = $stringify(input[i++], replace, space);
      }
      return "[" + output.join(",") + "]";
      function replace(key2, value2) {
        if (firstRun) {
          firstRun = !firstRun;
          return value2;
        }
        const after = $.call(this, key2, value2);
        switch (typeof after) {
          case object:
            if (after === null) return after;
          case primitive:
            return known.get(after) || set(known, input, after);
        }
        return after;
      }
    };
    exports2.stringify = stringify2;
    var toJSON = (value) => $parse(stringify2(value));
    exports2.toJSON = toJSON;
    var fromJSON = (value) => parse2($stringify(value));
    exports2.fromJSON = fromJSON;
  }
});

// node_modules/log4js/lib/LoggingEvent.js
var require_LoggingEvent = __commonJS({
  "node_modules/log4js/lib/LoggingEvent.js"(exports2, module2) {
    var flatted = require_cjs();
    var levels = require_levels();
    var SerDe = class {
      constructor() {
        const deserialise = {
          __LOG4JS_undefined__: void 0,
          __LOG4JS_NaN__: Number("abc"),
          __LOG4JS_Infinity__: 1 / 0,
          "__LOG4JS_-Infinity__": -1 / 0
        };
        this.deMap = deserialise;
        this.serMap = {};
        Object.keys(this.deMap).forEach((key2) => {
          const value = this.deMap[key2];
          this.serMap[value] = key2;
        });
      }
      canSerialise(key2) {
        if (typeof key2 === "string") return false;
        return key2 in this.serMap;
      }
      serialise(key2) {
        if (this.canSerialise(key2)) return this.serMap[key2];
        return key2;
      }
      canDeserialise(key2) {
        return key2 in this.deMap;
      }
      deserialise(key2) {
        if (this.canDeserialise(key2)) return this.deMap[key2];
        return key2;
      }
    };
    var serde = new SerDe();
    var LoggingEvent = class _LoggingEvent {
      /**
       * Models a logging event.
       * @constructor
       * @param {string} categoryName name of category
       * @param {Log4js.Level} level level of message
       * @param {Array} data objects to log
       * @param {Error} [error]
       * @author Seth Chisamore
       */
      constructor(categoryName, level, data, context, location2, error) {
        this.startTime = /* @__PURE__ */ new Date();
        this.categoryName = categoryName;
        this.data = data;
        this.level = level;
        this.context = Object.assign({}, context);
        this.pid = process.pid;
        this.error = error;
        if (typeof location2 !== "undefined") {
          if (!location2 || typeof location2 !== "object" || Array.isArray(location2))
            throw new TypeError(
              "Invalid location type passed to LoggingEvent constructor"
            );
          this.constructor._getLocationKeys().forEach((key2) => {
            if (typeof location2[key2] !== "undefined") this[key2] = location2[key2];
          });
        }
      }
      /** @private */
      static _getLocationKeys() {
        return [
          "fileName",
          "lineNumber",
          "columnNumber",
          "callStack",
          "className",
          "functionName",
          "functionAlias",
          "callerName"
        ];
      }
      serialise() {
        return flatted.stringify(this, (key2, value) => {
          if (value instanceof Error) {
            value = Object.assign(
              { message: value.message, stack: value.stack },
              value
            );
          }
          return serde.serialise(value);
        });
      }
      static deserialise(serialised) {
        let event;
        try {
          const rehydratedEvent = flatted.parse(serialised, (key2, value) => {
            if (value && value.message && value.stack) {
              const fakeError = new Error(value);
              Object.keys(value).forEach((k) => {
                fakeError[k] = value[k];
              });
              value = fakeError;
            }
            return serde.deserialise(value);
          });
          this._getLocationKeys().forEach((key2) => {
            if (typeof rehydratedEvent[key2] !== "undefined") {
              if (!rehydratedEvent.location) rehydratedEvent.location = {};
              rehydratedEvent.location[key2] = rehydratedEvent[key2];
            }
          });
          event = new _LoggingEvent(
            rehydratedEvent.categoryName,
            levels.getLevel(rehydratedEvent.level.levelStr),
            rehydratedEvent.data,
            rehydratedEvent.context,
            rehydratedEvent.location,
            rehydratedEvent.error
          );
          event.startTime = new Date(rehydratedEvent.startTime);
          event.pid = rehydratedEvent.pid;
          if (rehydratedEvent.cluster) {
            event.cluster = rehydratedEvent.cluster;
          }
        } catch (e) {
          event = new _LoggingEvent("log4js", levels.ERROR, [
            "Unable to parse log:",
            serialised,
            "because: ",
            e
          ]);
        }
        return event;
      }
    };
    module2.exports = LoggingEvent;
  }
});

// node_modules/log4js/lib/clustering.js
var require_clustering = __commonJS({
  "node_modules/log4js/lib/clustering.js"(exports2, module2) {
    var debug = require_src4()("log4js:clustering");
    var LoggingEvent = require_LoggingEvent();
    var configuration = require_configuration();
    var disabled = false;
    var cluster = null;
    try {
      cluster = require("cluster");
    } catch (e) {
      debug("cluster module not present");
      disabled = true;
    }
    var listeners = [];
    var pm2 = false;
    var pm2InstanceVar = "NODE_APP_INSTANCE";
    var isPM2Master = () => pm2 && process.env[pm2InstanceVar] === "0";
    var isMaster = () => disabled || cluster && cluster.isMaster || isPM2Master();
    var sendToListeners = (logEvent) => {
      listeners.forEach((l) => l(logEvent));
    };
    var receiver = (worker, message) => {
      debug("cluster message received from worker ", worker, ": ", message);
      if (worker.topic && worker.data) {
        message = worker;
        worker = void 0;
      }
      if (message && message.topic && message.topic === "log4js:message") {
        debug("received message: ", message.data);
        const logEvent = LoggingEvent.deserialise(message.data);
        sendToListeners(logEvent);
      }
    };
    if (!disabled) {
      configuration.addListener((config2) => {
        listeners.length = 0;
        ({
          pm2,
          disableClustering: disabled,
          pm2InstanceVar = "NODE_APP_INSTANCE"
        } = config2);
        debug(`clustering disabled ? ${disabled}`);
        debug(`cluster.isMaster ? ${cluster && cluster.isMaster}`);
        debug(`pm2 enabled ? ${pm2}`);
        debug(`pm2InstanceVar = ${pm2InstanceVar}`);
        debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);
        if (pm2) {
          process.removeListener("message", receiver);
        }
        if (cluster && cluster.removeListener) {
          cluster.removeListener("message", receiver);
        }
        if (disabled || config2.disableClustering) {
          debug("Not listening for cluster messages, because clustering disabled.");
        } else if (isPM2Master()) {
          debug("listening for PM2 broadcast messages");
          process.on("message", receiver);
        } else if (cluster && cluster.isMaster) {
          debug("listening for cluster messages");
          cluster.on("message", receiver);
        } else {
          debug("not listening for messages, because we are not a master process");
        }
      });
    }
    module2.exports = {
      onlyOnMaster: (fn, notMaster) => isMaster() ? fn() : notMaster,
      isMaster,
      send: (msg) => {
        if (isMaster()) {
          sendToListeners(msg);
        } else {
          if (!pm2) {
            msg.cluster = {
              workerId: cluster.worker.id,
              worker: process.pid
            };
          }
          process.send({ topic: "log4js:message", data: msg.serialise() });
        }
      },
      onMessage: (listener) => {
        listeners.push(listener);
      }
    };
  }
});

// node_modules/log4js/lib/appenders/adapters.js
var require_adapters = __commonJS({
  "node_modules/log4js/lib/appenders/adapters.js"(exports2, module2) {
    function maxFileSizeUnitTransform(maxLogSize) {
      if (typeof maxLogSize === "number" && Number.isInteger(maxLogSize)) {
        return maxLogSize;
      }
      const units = {
        K: 1024,
        M: 1024 * 1024,
        G: 1024 * 1024 * 1024
      };
      const validUnit = Object.keys(units);
      const unit = maxLogSize.slice(-1).toLocaleUpperCase();
      const value = maxLogSize.slice(0, -1).trim();
      if (validUnit.indexOf(unit) < 0 || !Number.isInteger(Number(value))) {
        throw Error(`maxLogSize: "${maxLogSize}" is invalid`);
      } else {
        return value * units[unit];
      }
    }
    function adapter(configAdapter, config2) {
      const newConfig = Object.assign({}, config2);
      Object.keys(configAdapter).forEach((key2) => {
        if (newConfig[key2]) {
          newConfig[key2] = configAdapter[key2](config2[key2]);
        }
      });
      return newConfig;
    }
    function fileAppenderAdapter(config2) {
      const configAdapter = {
        maxLogSize: maxFileSizeUnitTransform
      };
      return adapter(configAdapter, config2);
    }
    var adapters = {
      dateFile: fileAppenderAdapter,
      file: fileAppenderAdapter,
      fileSync: fileAppenderAdapter
    };
    module2.exports.modifyConfig = (config2) => adapters[config2.type] ? adapters[config2.type](config2) : config2;
  }
});

// node_modules/log4js/lib/appenders/console.js
var require_console = __commonJS({
  "node_modules/log4js/lib/appenders/console.js"(exports2, module2) {
    var consoleLog = console.log.bind(console);
    function consoleAppender(layout, timezoneOffset) {
      return (loggingEvent) => {
        consoleLog(layout(loggingEvent, timezoneOffset));
      };
    }
    function configure(config2, layouts) {
      let layout = layouts.colouredLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      return consoleAppender(layout, config2.timezoneOffset);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/stdout.js
var require_stdout = __commonJS({
  "node_modules/log4js/lib/appenders/stdout.js"(exports2) {
    function stdoutAppender(layout, timezoneOffset) {
      return (loggingEvent) => {
        process.stdout.write(`${layout(loggingEvent, timezoneOffset)}
`);
      };
    }
    function configure(config2, layouts) {
      let layout = layouts.colouredLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      return stdoutAppender(layout, config2.timezoneOffset);
    }
    exports2.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/stderr.js
var require_stderr = __commonJS({
  "node_modules/log4js/lib/appenders/stderr.js"(exports2, module2) {
    function stderrAppender(layout, timezoneOffset) {
      return (loggingEvent) => {
        process.stderr.write(`${layout(loggingEvent, timezoneOffset)}
`);
      };
    }
    function configure(config2, layouts) {
      let layout = layouts.colouredLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      return stderrAppender(layout, config2.timezoneOffset);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/logLevelFilter.js
var require_logLevelFilter = __commonJS({
  "node_modules/log4js/lib/appenders/logLevelFilter.js"(exports2, module2) {
    function logLevelFilter(minLevelString, maxLevelString, appender, levels) {
      const minLevel = levels.getLevel(minLevelString);
      const maxLevel = levels.getLevel(maxLevelString, levels.FATAL);
      return (logEvent) => {
        const eventLevel = logEvent.level;
        if (minLevel.isLessThanOrEqualTo(eventLevel) && maxLevel.isGreaterThanOrEqualTo(eventLevel)) {
          appender(logEvent);
        }
      };
    }
    function configure(config2, layouts, findAppender, levels) {
      const appender = findAppender(config2.appender);
      return logLevelFilter(config2.level, config2.maxLevel, appender, levels);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/categoryFilter.js
var require_categoryFilter = __commonJS({
  "node_modules/log4js/lib/appenders/categoryFilter.js"(exports2, module2) {
    var debug = require_src4()("log4js:categoryFilter");
    function categoryFilter(excludes, appender) {
      if (typeof excludes === "string") excludes = [excludes];
      return (logEvent) => {
        debug(`Checking ${logEvent.categoryName} against ${excludes}`);
        if (excludes.indexOf(logEvent.categoryName) === -1) {
          debug("Not excluded, sending to appender");
          appender(logEvent);
        }
      };
    }
    function configure(config2, layouts, findAppender) {
      const appender = findAppender(config2.appender);
      return categoryFilter(config2.exclude, appender);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/noLogFilter.js
var require_noLogFilter = __commonJS({
  "node_modules/log4js/lib/appenders/noLogFilter.js"(exports2, module2) {
    var debug = require_src4()("log4js:noLogFilter");
    function removeNullOrEmptyRegexp(regexp) {
      const filtered = regexp.filter((el) => el != null && el !== "");
      return filtered;
    }
    function noLogFilter(filters, appender) {
      return (logEvent) => {
        debug(`Checking data: ${logEvent.data} against filters: ${filters}`);
        if (typeof filters === "string") {
          filters = [filters];
        }
        filters = removeNullOrEmptyRegexp(filters);
        const regex = new RegExp(filters.join("|"), "i");
        if (filters.length === 0 || logEvent.data.findIndex((value) => regex.test(value)) < 0) {
          debug("Not excluded, sending to appender");
          appender(logEvent);
        }
      };
    }
    function configure(config2, layouts, findAppender) {
      const appender = findAppender(config2.appender);
      return noLogFilter(config2.exclude, appender);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports2) {
    "use strict";
    exports2.fromCallback = function(fn) {
      return Object.defineProperty(function() {
        if (typeof arguments[arguments.length - 1] === "function") fn.apply(this, arguments);
        else {
          return new Promise((resolve, reject) => {
            arguments[arguments.length] = (err, res) => {
              if (err) return reject(err);
              resolve(res);
            };
            arguments.length++;
            fn.apply(this, arguments);
          });
        }
      }, "name", { value: fn.name });
    };
    exports2.fromPromise = function(fn) {
      return Object.defineProperty(function() {
        const cb = arguments[arguments.length - 1];
        if (typeof cb !== "function") return fn.apply(this, arguments);
        else fn.apply(this, arguments).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports2, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (fs.chmod && !fs.lchmod) {
        fs.lchmod = function(path, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (fs.chown && !fs.lchown) {
        fs.lchown = function(path, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb) cb(er);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs.rename);
      }
      fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
        function read(fd, buffer, offset, length2, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length2, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length2, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs.read);
      fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length2, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length2, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path, mode, callback) {
          fs2.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs2.lchmodSync = function(path, mode) {
          var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
          fs2.lutimes = function(path, at, mt, cb) {
            fs2.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb) cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb) cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path, at, mt) {
            var fd = fs2.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs2.futimes) {
          fs2.lutimes = function(_a, _b, _c, cb) {
            if (cb) process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig) return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 4294967296;
              if (stats.gid < 0) stats.gid += 4294967296;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);
        Stream.call(this);
        var self2 = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length2 = keys.length; index < length2; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);
        Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length2 = keys.length; index < length2; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key2) {
        Object.defineProperty(copy, key2, Object.getOwnPropertyDescriptor(obj, key2));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports2, module2) {
    var fs = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs, queue);
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs[gracefulQueue]);
          require("assert").equal(fs[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs[gracefulQueue]);
    }
    module2.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module2.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs2.copyFile;
      if (fs$copyFile)
        fs2.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path, options) {
        return new fs2.ReadStream(path, options);
      }
      function createWriteStream(path, options) {
        return new fs2.WriteStream(path, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
      function open(path, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs[gracefulQueue].length; ++i) {
        if (fs[gracefulQueue][i].length > 2) {
          fs[gracefulQueue][i][3] = now;
          fs[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs[gracefulQueue].length === 0)
        return;
      var elem = fs[gracefulQueue].shift();
      var fn = elem[0];
      var args2 = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args2);
        fn.apply(null, args2);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args2);
        var cb = args2.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args2);
          fn.apply(null, args2.concat([startTime]));
        } else {
          fs[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchown",
      "lchmod",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "readFile",
      "readdir",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key2) => {
      return typeof fs[key2] === "function";
    });
    Object.keys(fs).forEach((key2) => {
      if (key2 === "promises") {
        return;
      }
      exports2[key2] = fs[key2];
    });
    api.forEach((method) => {
      exports2[method] = u(fs[method]);
    });
    exports2.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs.exists(filename, resolve);
      });
    };
    exports2.read = function(fd, buffer, offset, length2, position, callback) {
      if (typeof callback === "function") {
        return fs.read(fd, buffer, offset, length2, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs.read(fd, buffer, offset, length2, position, (err, bytesRead, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports2.write = function(fd, buffer, ...args2) {
      if (typeof args2[args2.length - 1] === "function") {
        return fs.write(fd, buffer, ...args2);
      }
      return new Promise((resolve, reject) => {
        fs.write(fd, buffer, ...args2, (err, bytesWritten, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    if (typeof fs.realpath.native === "function") {
      exports2.realpath.native = u(fs.realpath.native);
    }
  }
});

// node_modules/fs-extra/lib/mkdirs/win32.js
var require_win32 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/win32.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    function getRootPath(p) {
      p = path.normalize(path.resolve(p)).split(path.sep);
      if (p.length > 0) return p[0];
      return null;
    }
    var INVALID_PATH_CHARS = /[<>:"|?*]/;
    function invalidWin32Path(p) {
      const rp = getRootPath(p);
      p = p.replace(rp, "");
      return INVALID_PATH_CHARS.test(p);
    }
    module2.exports = {
      getRootPath,
      invalidWin32Path
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirs(p, opts, callback, made) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        return callback(errInval);
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made) made = null;
      callback = callback || function() {
      };
      p = path.resolve(p);
      xfs.mkdir(p, mode, (er) => {
        if (!er) {
          made = made || p;
          return callback(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path.dirname(p) === p) return callback(er);
            mkdirs(path.dirname(p), opts, (er2, made2) => {
              if (er2) callback(er2, made2);
              else mkdirs(p, opts, callback, made2);
            });
            break;
          default:
            xfs.stat(p, (er2, stat) => {
              if (er2 || !stat.isDirectory()) callback(er, made);
              else callback(null, made);
            });
            break;
        }
      });
    }
    module2.exports = mkdirs;
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js
var require_mkdirs_sync = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirsSync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        throw errInval;
      }
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made) made = null;
      p = path.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        if (err0.code === "ENOENT") {
          if (path.dirname(p) === p) throw err0;
          made = mkdirsSync(path.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
        } else {
          let stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0;
          }
          if (!stat.isDirectory()) throw err0;
        }
      }
      return made;
    }
    module2.exports = mkdirsSync;
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs2 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var mkdirs = u(require_mkdirs());
    var mkdirsSync = require_mkdirs_sync();
    module2.exports = {
      mkdirs,
      mkdirsSync,
      // alias
      mkdirp: mkdirs,
      mkdirpSync: mkdirsSync,
      ensureDir: mkdirs,
      ensureDirSync: mkdirsSync
    };
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var os = require("os");
    var path = require("path");
    function hasMillisResSync() {
      let tmpfile = path.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path.join(os.tmpdir(), tmpfile);
      const d = /* @__PURE__ */ new Date(1435410243862);
      fs.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
      const fd = fs.openSync(tmpfile, "r+");
      fs.futimesSync(fd, d, d);
      fs.closeSync(fd);
      return fs.statSync(tmpfile).mtime > 1435410243e3;
    }
    function hasMillisRes(callback) {
      let tmpfile = path.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path.join(os.tmpdir(), tmpfile);
      const d = /* @__PURE__ */ new Date(1435410243862);
      fs.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", (err) => {
        if (err) return callback(err);
        fs.open(tmpfile, "r+", (err2, fd) => {
          if (err2) return callback(err2);
          fs.futimes(fd, d, d, (err3) => {
            if (err3) return callback(err3);
            fs.close(fd, (err4) => {
              if (err4) return callback(err4);
              fs.stat(tmpfile, (err5, stats) => {
                if (err5) return callback(err5);
                callback(null, stats.mtime > 1435410243e3);
              });
            });
          });
        });
      });
    }
    function timeRemoveMillis(timestamp) {
      if (typeof timestamp === "number") {
        return Math.floor(timestamp / 1e3) * 1e3;
      } else if (timestamp instanceof Date) {
        return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
      } else {
        throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
      }
    }
    function utimesMillis(path2, atime, mtime, callback) {
      fs.open(path2, "r+", (err, fd) => {
        if (err) return callback(err);
        fs.futimes(fd, atime, mtime, (futimesErr) => {
          fs.close(fd, (closeErr) => {
            if (callback) callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path2, atime, mtime) {
      const fd = fs.openSync(path2, "r+");
      fs.futimesSync(fd, atime, mtime);
      return fs.closeSync(fd);
    }
    module2.exports = {
      hasMillisRes,
      hasMillisResSync,
      timeRemoveMillis,
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var NODE_VERSION_MAJOR_WITH_BIGINT = 10;
    var NODE_VERSION_MINOR_WITH_BIGINT = 5;
    var NODE_VERSION_PATCH_WITH_BIGINT = 0;
    var nodeVersion = process.versions.node.split(".");
    var nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
    var nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
    var nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);
    function nodeSupportsBigInt() {
      if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
        return true;
      } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
        if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
          return true;
        } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
          if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
            return true;
          }
        }
      }
      return false;
    }
    function getStats(src, dest, cb) {
      if (nodeSupportsBigInt()) {
        fs.stat(src, { bigint: true }, (err, srcStat) => {
          if (err) return cb(err);
          fs.stat(dest, { bigint: true }, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT") return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      } else {
        fs.stat(src, (err, srcStat) => {
          if (err) return cb(err);
          fs.stat(dest, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT") return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      }
    }
    function getStatsSync(src, dest) {
      let srcStat, destStat;
      if (nodeSupportsBigInt()) {
        srcStat = fs.statSync(src, { bigint: true });
      } else {
        srcStat = fs.statSync(src);
      }
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(dest, { bigint: true });
        } else {
          destStat = fs.statSync(dest);
        }
      } catch (err) {
        if (err.code === "ENOENT") return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, cb) {
      getStats(src, dest, (err, stats) => {
        if (err) return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error("Source and destination must not be the same."));
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName) {
      const { srcStat, destStat } = getStatsSync(src, dest);
      if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error("Source and destination must not be the same.");
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return cb();
      if (nodeSupportsBigInt()) {
        fs.stat(destParent, { bigint: true }, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT") return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      } else {
        fs.stat(destParent, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT") return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      }
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return;
      let destStat;
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(destParent, { bigint: true });
        } else {
          destStat = fs.statSync(destParent);
        }
      } catch (err) {
        if (err.code === "ENOENT") return;
        throw err;
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path.resolve(src).split(path.sep).filter((i) => i);
      const destArr = path.resolve(dest).split(path.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir
    };
  }
});

// node_modules/fs-extra/lib/util/buffer.js
var require_buffer = __commonJS({
  "node_modules/fs-extra/lib/util/buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = function(size) {
      if (typeof Buffer.allocUnsafe === "function") {
        try {
          return Buffer.allocUnsafe(size);
        } catch (e) {
          return new Buffer(size);
        }
      }
      return new Buffer(size);
    };
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var mkdirpSync = require_mkdirs2().mkdirsSync;
    var utimesSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy");
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      return handleFilterAndCopy(destStat, src, dest, opts);
    }
    function handleFilterAndCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return;
      const destParent = path.dirname(dest);
      if (!fs.existsSync(destParent)) mkdirpSync(destParent);
      return startCopy(destStat, src, dest, opts);
    }
    function startCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return;
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      if (typeof fs.copyFileSync === "function") {
        fs.copyFileSync(src, dest);
        fs.chmodSync(dest, srcStat.mode);
        if (opts.preserveTimestamps) {
          return utimesSync(dest, srcStat.atime, srcStat.mtime);
        }
        return;
      }
      return copyFileFallback(srcStat, src, dest, opts);
    }
    function copyFileFallback(srcStat, src, dest, opts) {
      const BUF_LENGTH = 64 * 1024;
      const _buff = require_buffer()(BUF_LENGTH);
      const fdr = fs.openSync(src, "r");
      const fdw = fs.openSync(dest, "w", srcStat.mode);
      let pos = 0;
      while (pos < srcStat.size) {
        const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, _buff, 0, bytesRead);
        pos += bytesRead;
      }
      if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime);
      fs.closeSync(fdr);
      fs.closeSync(fdw);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts);
      if (destStat && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcStat, src, dest, opts) {
      fs.mkdirSync(dest);
      copyDir(src, dest, opts);
      return fs.chmodSync(dest, srcStat.mode);
    }
    function copyDir(src, dest, opts) {
      fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy");
      return startCopy(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs.unlinkSync(dest);
      return fs.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy-sync/index.js
var require_copy_sync2 = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      copySync: require_copy_sync()
    };
  }
});

// node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    function pathExists(path) {
      return fs.access(path).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs.existsSync
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var mkdirp = require_mkdirs2().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimes = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      stat.checkPaths(src, dest, "copy", (err, stats) => {
        if (err) return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2) return cb(err2);
          if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
          return checkParentDir(destStat, src, dest, opts, cb);
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err) return cb(err);
        if (dirExists) return startCopy(destStat, src, dest, opts, cb);
        mkdirp(destParent, (err2) => {
          if (err2) return cb(err2);
          return startCopy(destStat, src, dest, opts, cb);
        });
      });
    }
    function handleFilter(onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then((include) => {
        if (include) return onInclude(destStat, src, dest, opts, cb);
        return cb();
      }, (error) => cb(error));
    }
    function startCopy(destStat, src, dest, opts, cb) {
      if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb);
      return getStats(destStat, src, dest, opts, cb);
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs.stat : fs.lstat;
      stat2(src, (err, srcStat) => {
        if (err) return cb(err);
        if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb);
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs.unlink(dest, (err) => {
          if (err) return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      if (typeof fs.copyFile === "function") {
        return fs.copyFile(src, dest, (err) => {
          if (err) return cb(err);
          return setDestModeAndTimestamps(srcStat, dest, opts, cb);
        });
      }
      return copyFileFallback(srcStat, src, dest, opts, cb);
    }
    function copyFileFallback(srcStat, src, dest, opts, cb) {
      const rs = fs.createReadStream(src);
      rs.on("error", (err) => cb(err)).once("open", () => {
        const ws = fs.createWriteStream(dest, { mode: srcStat.mode });
        ws.on("error", (err) => cb(err)).on("open", () => rs.pipe(ws)).once("close", () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
      });
    }
    function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
      fs.chmod(dest, srcStat.mode, (err) => {
        if (err) return cb(err);
        if (opts.preserveTimestamps) {
          return utimes(dest, srcStat.atime, srcStat.mtime, cb);
        }
        return cb();
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb);
      if (destStat && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
      }
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcStat, src, dest, opts, cb) {
      fs.mkdir(dest, (err) => {
        if (err) return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2) return cb(err2);
          return fs.chmod(dest, srcStat.mode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs.readdir(src, (err, items) => {
        if (err) return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item) return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      stat.checkPaths(srcItem, destItem, "copy", (err, stats) => {
        if (err) return cb(err);
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, (err2) => {
          if (err2) return cb(err2);
          return copyDirItems(items, src, dest, opts, cb);
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs.readlink(src, (err, resolvedSrc) => {
        if (err) return cb(err);
        if (opts.dereference) {
          resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs.symlink(resolvedSrc, dest, cb);
        } else {
          fs.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN") return fs.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs.unlink(dest, (err) => {
        if (err) return cb(err);
        return fs.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy())
    };
  }
});

// node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/fs-extra/lib/remove/rimraf.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var assert = require("assert");
    var isWindows = process.platform === "win32";
    function defaults(options) {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs[m];
        m = m + "Sync";
        options[m] = options[m] || fs[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
    }
    function rimraf(p, options, cb) {
      let busyTries = 0;
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      rimraf_(p, options, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            return setTimeout(() => rimraf_(p, options, CB), time);
          }
          if (er.code === "ENOENT") er = null;
        }
        cb(er);
      });
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT") {
          return cb(null);
        }
        if (er && er.code === "EPERM" && isWindows) {
          return fixWinEPERM(p, options, er, cb);
        }
        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb);
        }
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT") {
              return cb(null);
            }
            if (er2.code === "EPERM") {
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            }
            if (er2.code === "EISDIR") {
              return rmdir(p, options, er2, cb);
            }
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      if (er) {
        assert(er instanceof Error);
      }
      options.chmod(p, 438, (er2) => {
        if (er2) {
          cb(er2.code === "ENOENT" ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === "ENOENT" ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }
    function fixWinEPERMSync(p, options, er) {
      let stats;
      assert(p);
      assert(options);
      if (er) {
        assert(er instanceof Error);
      }
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      assert(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
          rmkids(p, options, cb);
        } else if (er && er.code === "ENOTDIR") {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er) return cb(er);
        let n = files.length;
        let errState;
        if (n === 0) return options.rmdir(p, cb);
        files.forEach((f) => {
          rimraf(path.join(p, f), options, (er2) => {
            if (errState) {
              return;
            }
            if (er2) return cb(errState = er2);
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }
    function rimrafSync(p, options) {
      let st;
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        }
        if (er.code === "EPERM" && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }
      try {
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        } else if (er.code === "EPERM") {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        } else if (er.code !== "EISDIR") {
          throw er;
        }
        rmdirSync(p, options, er);
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOTDIR") {
          throw originalEr;
        } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
          rmkidsSync(p, options);
        } else if (er.code !== "ENOENT") {
          throw er;
        }
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path.join(p, f), options));
      if (isWindows) {
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret;
          } catch (er) {
          }
        } while (Date.now() - startTime < 500);
      } else {
        const ret = options.rmdirSync(p, options);
        return ret;
      }
    }
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var rimraf = require_rimraf();
    module2.exports = {
      remove: u(rimraf),
      removeSync: rimraf.sync
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path = require("path");
    var mkdir = require_mkdirs2();
    var remove = require_remove();
    var emptyDir = u(function emptyDir2(dir, callback) {
      callback = callback || function() {
      };
      fs.readdir(dir, (err, items) => {
        if (err) return mkdir.mkdirs(dir, callback);
        items = items.map((item) => path.join(dir, item));
        deleteItem();
        function deleteItem() {
          const item = items.pop();
          if (!item) return callback();
          remove.remove(item, (err2) => {
            if (err2) return callback(err2);
            deleteItem();
          });
        }
      });
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs.readdirSync(dir);
      } catch (err) {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createFile(file, callback) {
      function makeFile() {
        fs.writeFile(file, "", (err) => {
          if (err) return callback(err);
          callback();
        });
      }
      fs.stat(file, (err, stats) => {
        if (!err && stats.isFile()) return callback();
        const dir = path.dirname(file);
        pathExists(dir, (err2, dirExists) => {
          if (err2) return callback(err2);
          if (dirExists) return makeFile();
          mkdir.mkdirs(dir, (err3) => {
            if (err3) return callback(err3);
            makeFile();
          });
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs.statSync(file);
      } catch (e) {
      }
      if (stats && stats.isFile()) return;
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs.link(srcpath2, dstpath2, (err) => {
          if (err) return callback(err);
          callback(null);
        });
      }
      pathExists(dstpath, (err, destinationExists) => {
        if (err) return callback(err);
        if (destinationExists) return callback(null);
        fs.lstat(srcpath, (err2) => {
          if (err2) {
            err2.message = err2.message.replace("lstat", "ensureLink");
            return callback(err2);
          }
          const dir = path.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3) return callback(err3);
            if (dirExists) return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err4) => {
              if (err4) return callback(err4);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists) return void 0;
      try {
        fs.lstatSync(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path.dirname(dstpath);
      const dirExists = fs.existsSync(dir);
      if (dirExists) return fs.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var fs = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path.isAbsolute(srcpath)) {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            "toCwd": srcpath,
            "toDst": srcpath
          });
        });
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err) return callback(err);
          if (exists) {
            return callback(null, {
              "toCwd": relativeToDst,
              "toDst": srcpath
            });
          } else {
            return fs.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                "toCwd": srcpath,
                "toDst": path.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path.isAbsolute(srcpath)) {
        exists = fs.existsSync(srcpath);
        if (!exists) throw new Error("absolute srcpath does not exist");
        return {
          "toCwd": srcpath,
          "toDst": srcpath
        };
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        exists = fs.existsSync(relativeToDst);
        if (exists) {
          return {
            "toCwd": relativeToDst,
            "toDst": srcpath
          };
        } else {
          exists = fs.existsSync(srcpath);
          if (!exists) throw new Error("relative srcpath does not exist");
          return {
            "toCwd": srcpath,
            "toDst": path.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type) return callback(null, type);
      fs.lstat(srcpath, (err, stats) => {
        if (err) return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type) return type;
      try {
        stats = fs.lstatSync(srcpath);
      } catch (e) {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path = require("path");
    var fs = require_graceful_fs();
    var _mkdirs = require_mkdirs2();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      pathExists(dstpath, (err, destinationExists) => {
        if (err) return callback(err);
        if (destinationExists) return callback(null);
        symlinkPaths(srcpath, dstpath, (err2, relative) => {
          if (err2) return callback(err2);
          srcpath = relative.toDst;
          symlinkType(relative.toCwd, type, (err3, type2) => {
            if (err3) return callback(err3);
            const dir = path.dirname(dstpath);
            pathExists(dir, (err4, dirExists) => {
              if (err4) return callback(err4);
              if (dirExists) return fs.symlink(srcpath, dstpath, type2, callback);
              mkdirs(dir, (err5) => {
                if (err5) return callback(err5);
                fs.symlink(srcpath, dstpath, type2, callback);
              });
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists) return void 0;
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path.dirname(dstpath);
      const exists = fs.existsSync(dir);
      if (exists) return fs.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports2, module2) {
    "use strict";
    var file = require_file();
    var link = require_link();
    var symlink = require_symlink();
    module2.exports = {
      // file
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      // link
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      // symlink
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports2, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    function readFile(file, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      if (typeof options === "string") {
        options = { encoding: options };
      }
      options = options || {};
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      fs.readFile(file, options, function(err, data) {
        if (err) return callback(err);
        data = stripBom(data);
        var obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err2) {
          if (shouldThrow) {
            err2.message = file + ": " + err2.message;
            return callback(err2);
          } else {
            return callback(null, null);
          }
        }
        callback(null, obj);
      });
    }
    function readFileSync(file, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { encoding: options };
      }
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      try {
        var content = fs.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = file + ": " + err.message;
          throw err;
        } else {
          return null;
        }
      }
    }
    function stringify2(obj, options) {
      var spaces;
      var EOL = "\n";
      if (typeof options === "object" && options !== null) {
        if (options.spaces) {
          spaces = options.spaces;
        }
        if (options.EOL) {
          EOL = options.EOL;
        }
      }
      var str = JSON.stringify(obj, options ? options.replacer : null, spaces);
      return str.replace(/\n/g, EOL) + EOL;
    }
    function writeFile(file, obj, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      options = options || {};
      var fs = options.fs || _fs;
      var str = "";
      try {
        str = stringify2(obj, options);
      } catch (err) {
        if (callback) callback(err, null);
        return;
      }
      fs.writeFile(file, str, options, callback);
    }
    function writeFileSync(file, obj, options) {
      options = options || {};
      var fs = options.fs || _fs;
      var str = stringify2(obj, options);
      return fs.writeFileSync(file, str, options);
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content)) content = content.toString("utf8");
      content = content.replace(/^\uFEFF/, "");
      return content;
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile();
    module2.exports = {
      // jsonfile exports
      readJson: u(jsonFile.readFile),
      readJsonSync: jsonFile.readFileSync,
      writeJson: u(jsonFile.writeFile),
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    var jsonFile = require_jsonfile2();
    function outputJson(file, data, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      const dir = path.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err) return callback(err);
        if (itDoes) return jsonFile.writeJson(file, data, options, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2) return callback(err2);
          jsonFile.writeJson(file, data, options, callback);
        });
      });
    }
    module2.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var mkdir = require_mkdirs2();
    var jsonFile = require_jsonfile2();
    function outputJsonSync(file, data, options) {
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      jsonFile.writeJsonSync(file, data, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/fs-extra/lib/move-sync/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move-sync/move-sync.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var copySync = require_copy_sync2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs2().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat } = stat.checkPathsSync(src, dest, "move");
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      mkdirpSync(path.dirname(dest));
      return doRename(src, dest, overwrite);
    }
    function doRename(src, dest, overwrite) {
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs.existsSync(dest)) throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/fs-extra/lib/move-sync/index.js
var require_move_sync2 = __commonJS({
  "node_modules/fs-extra/lib/move-sync/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      moveSync: require_move_sync()
    };
  }
});

// node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs2().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", (err, stats) => {
        if (err) return cb(err);
        const { srcStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2) return cb(err2);
          mkdirp(path.dirname(dest), (err3) => {
            if (err3) return cb(err3);
            return doRename(src, dest, overwrite, cb);
          });
        });
      });
    }
    function doRename(src, dest, overwrite, cb) {
      if (overwrite) {
        return remove(dest, (err) => {
          if (err) return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err) return cb(err);
        if (destExists) return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs.rename(src, dest, (err) => {
        if (!err) return cb();
        if (err.code !== "EXDEV") return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err) return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move())
    };
  }
});

// node_modules/fs-extra/lib/output/index.js
var require_output = __commonJS({
  "node_modules/fs-extra/lib/output/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err) return callback(err);
        if (itDoes) return fs.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2) return callback(err2);
          fs.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args2) {
      const dir = path.dirname(file);
      if (fs.existsSync(dir)) {
        return fs.writeFileSync(file, ...args2);
      }
      mkdir.mkdirsSync(dir);
      fs.writeFileSync(file, ...args2);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.assign(
      {},
      // Export promiseified graceful-fs:
      require_fs(),
      // Export extra methods:
      require_copy_sync2(),
      require_copy2(),
      require_empty(),
      require_ensure(),
      require_json(),
      require_mkdirs2(),
      require_move_sync2(),
      require_move2(),
      require_output(),
      require_path_exists(),
      require_remove()
    );
    var fs = require("fs");
    if (Object.getOwnPropertyDescriptor(fs, "promises")) {
      Object.defineProperty(module2.exports, "promises", {
        get() {
          return fs.promises;
        }
      });
    }
  }
});

// node_modules/streamroller/lib/now.js
var require_now = __commonJS({
  "node_modules/streamroller/lib/now.js"(exports2, module2) {
    module2.exports = () => /* @__PURE__ */ new Date();
  }
});

// node_modules/streamroller/lib/fileNameFormatter.js
var require_fileNameFormatter = __commonJS({
  "node_modules/streamroller/lib/fileNameFormatter.js"(exports2, module2) {
    var debug = require_src4()("streamroller:fileNameFormatter");
    var path = require("path");
    var ZIP_EXT = ".gz";
    var DEFAULT_FILENAME_SEP = ".";
    module2.exports = ({
      file,
      keepFileExt,
      needsIndex,
      alwaysIncludeDate,
      compress,
      fileNameSep
    }) => {
      let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
      const dirAndName = path.join(file.dir, file.name);
      const ext = (f) => f + file.ext;
      const index = (f, i, d) => (needsIndex || !d) && i ? f + FILENAME_SEP + i : f;
      const date = (f, i, d) => {
        return (i > 0 || alwaysIncludeDate) && d ? f + FILENAME_SEP + d : f;
      };
      const gzip = (f, i) => i && compress ? f + ZIP_EXT : f;
      const parts = keepFileExt ? [date, index, ext, gzip] : [ext, date, index, gzip];
      return ({ date: date2, index: index2 }) => {
        debug(`_formatFileName: date=${date2}, index=${index2}`);
        return parts.reduce(
          (filename, part) => part(filename, index2, date2),
          dirAndName
        );
      };
    };
  }
});

// node_modules/streamroller/lib/fileNameParser.js
var require_fileNameParser = __commonJS({
  "node_modules/streamroller/lib/fileNameParser.js"(exports2, module2) {
    var debug = require_src4()("streamroller:fileNameParser");
    var ZIP_EXT = ".gz";
    var format = require_lib4();
    var DEFAULT_FILENAME_SEP = ".";
    module2.exports = ({ file, keepFileExt, pattern, fileNameSep }) => {
      let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
      const zip = (f, p) => {
        if (f.endsWith(ZIP_EXT)) {
          debug("it is gzipped");
          p.isCompressed = true;
          return f.slice(0, -1 * ZIP_EXT.length);
        }
        return f;
      };
      const __NOT_MATCHING__ = "__NOT_MATCHING__";
      const extAtEnd = (f) => {
        if (f.startsWith(file.name) && f.endsWith(file.ext)) {
          debug("it starts and ends with the right things");
          return f.slice(file.name.length + 1, -1 * file.ext.length);
        }
        return __NOT_MATCHING__;
      };
      const extInMiddle = (f) => {
        if (f.startsWith(file.base)) {
          debug("it starts with the right things");
          return f.slice(file.base.length + 1);
        }
        return __NOT_MATCHING__;
      };
      const dateAndIndex = (f, p) => {
        const items = f.split(FILENAME_SEP);
        let indexStr = items[items.length - 1];
        debug("items: ", items, ", indexStr: ", indexStr);
        let dateStr = f;
        if (indexStr !== void 0 && indexStr.match(/^\d+$/)) {
          dateStr = f.slice(0, -1 * (indexStr.length + 1));
          debug(`dateStr is ${dateStr}`);
          if (pattern && !dateStr) {
            dateStr = indexStr;
            indexStr = "0";
          }
        } else {
          indexStr = "0";
        }
        try {
          const date = format.parse(pattern, dateStr, new Date(0, 0));
          if (format.asString(pattern, date) !== dateStr) return f;
          p.index = parseInt(indexStr, 10);
          p.date = dateStr;
          p.timestamp = date.getTime();
          return "";
        } catch (e) {
          debug(`Problem parsing ${dateStr} as ${pattern}, error was: `, e);
          return f;
        }
      };
      const index = (f, p) => {
        if (f.match(/^\d+$/)) {
          debug("it has an index");
          p.index = parseInt(f, 10);
          return "";
        }
        return f;
      };
      let parts = [
        zip,
        keepFileExt ? extAtEnd : extInMiddle,
        pattern ? dateAndIndex : index
      ];
      return (filename) => {
        let result = { filename, index: 0, isCompressed: false };
        let whatsLeftOver = parts.reduce(
          (remains, part) => part(remains, result),
          filename
        );
        return whatsLeftOver ? null : result;
      };
    };
  }
});

// node_modules/streamroller/lib/moveAndMaybeCompressFile.js
var require_moveAndMaybeCompressFile = __commonJS({
  "node_modules/streamroller/lib/moveAndMaybeCompressFile.js"(exports2, module2) {
    var debug = require_src4()("streamroller:moveAndMaybeCompressFile");
    var fs = require_lib5();
    var zlib = require("zlib");
    var _parseOption = function(rawOptions) {
      const defaultOptions = {
        mode: parseInt("0600", 8),
        compress: false
      };
      const options = Object.assign({}, defaultOptions, rawOptions);
      debug(`_parseOption: moveAndMaybeCompressFile called with option=${JSON.stringify(options)}`);
      return options;
    };
    var moveAndMaybeCompressFile = async (sourceFilePath, targetFilePath, options) => {
      options = _parseOption(options);
      if (sourceFilePath === targetFilePath) {
        debug(`moveAndMaybeCompressFile: source and target are the same, not doing anything`);
        return;
      }
      if (await fs.pathExists(sourceFilePath)) {
        debug(
          `moveAndMaybeCompressFile: moving file from ${sourceFilePath} to ${targetFilePath} ${options.compress ? "with" : "without"} compress`
        );
        if (options.compress) {
          await new Promise((resolve, reject) => {
            let isCreated = false;
            const writeStream = fs.createWriteStream(targetFilePath, { mode: options.mode, flags: "wx" }).on("open", () => {
              isCreated = true;
              const readStream = fs.createReadStream(sourceFilePath).on("open", () => {
                readStream.pipe(zlib.createGzip()).pipe(writeStream);
              }).on("error", (e) => {
                debug(`moveAndMaybeCompressFile: error reading ${sourceFilePath}`, e);
                writeStream.destroy(e);
              });
            }).on("finish", () => {
              debug(`moveAndMaybeCompressFile: finished compressing ${targetFilePath}, deleting ${sourceFilePath}`);
              fs.unlink(sourceFilePath).then(resolve).catch((e) => {
                debug(`moveAndMaybeCompressFile: error deleting ${sourceFilePath}, truncating instead`, e);
                fs.truncate(sourceFilePath).then(resolve).catch((e2) => {
                  debug(`moveAndMaybeCompressFile: error truncating ${sourceFilePath}`, e2);
                  reject(e2);
                });
              });
            }).on("error", (e) => {
              if (!isCreated) {
                debug(`moveAndMaybeCompressFile: error creating ${targetFilePath}`, e);
                reject(e);
              } else {
                debug(`moveAndMaybeCompressFile: error writing ${targetFilePath}, deleting`, e);
                fs.unlink(targetFilePath).then(() => {
                  reject(e);
                }).catch((e2) => {
                  debug(`moveAndMaybeCompressFile: error deleting ${targetFilePath}`, e2);
                  reject(e2);
                });
              }
            });
          }).catch(() => {
          });
        } else {
          debug(`moveAndMaybeCompressFile: renaming ${sourceFilePath} to ${targetFilePath}`);
          try {
            await fs.move(sourceFilePath, targetFilePath, { overwrite: true });
          } catch (e) {
            debug(`moveAndMaybeCompressFile: error renaming ${sourceFilePath} to ${targetFilePath}`, e);
            if (e.code !== "ENOENT") {
              debug(`moveAndMaybeCompressFile: trying copy+truncate instead`);
              try {
                await fs.copy(sourceFilePath, targetFilePath, { overwrite: true });
                await fs.truncate(sourceFilePath);
              } catch (e2) {
                debug(`moveAndMaybeCompressFile: error copy+truncate`, e2);
              }
            }
          }
        }
      }
    };
    module2.exports = moveAndMaybeCompressFile;
  }
});

// node_modules/streamroller/lib/RollingFileWriteStream.js
var require_RollingFileWriteStream = __commonJS({
  "node_modules/streamroller/lib/RollingFileWriteStream.js"(exports2, module2) {
    var debug = require_src4()("streamroller:RollingFileWriteStream");
    var fs = require_lib5();
    var path = require("path");
    var os = require("os");
    var newNow = require_now();
    var format = require_lib4();
    var { Writable } = require("stream");
    var fileNameFormatter = require_fileNameFormatter();
    var fileNameParser = require_fileNameParser();
    var moveAndMaybeCompressFile = require_moveAndMaybeCompressFile();
    var deleteFiles = (fileNames) => {
      debug(`deleteFiles: files to delete: ${fileNames}`);
      return Promise.all(fileNames.map((f) => fs.unlink(f).catch((e) => {
        debug(`deleteFiles: error when unlinking ${f}, ignoring. Error was ${e}`);
      })));
    };
    var RollingFileWriteStream = class extends Writable {
      /**
       * Create a RollingFileWriteStream
       * @constructor
       * @param {string} filePath - The file path to write.
       * @param {object} options - The extra options
       * @param {number} options.numToKeep - The max numbers of files to keep.
       * @param {number} options.maxSize - The maxSize one file can reach. Unit is Byte.
       *                                   This should be more than 1024. The default is 0.
       *                                   If not specified or 0, then no log rolling will happen.
       * @param {string} options.mode - The mode of the files. The default is '0600'. Refer to stream.writable for more.
       * @param {string} options.flags - The default is 'a'. Refer to stream.flags for more.
       * @param {boolean} options.compress - Whether to compress backup files.
       * @param {boolean} options.keepFileExt - Whether to keep the file extension.
       * @param {string} options.pattern - The date string pattern in the file name.
       * @param {boolean} options.alwaysIncludePattern - Whether to add date to the name of the first file.
       */
      constructor(filePath, options) {
        debug(`constructor: creating RollingFileWriteStream. path=${filePath}`);
        if (typeof filePath !== "string" || filePath.length === 0) {
          throw new Error(`Invalid filename: ${filePath}`);
        } else if (filePath.endsWith(path.sep)) {
          throw new Error(`Filename is a directory: ${filePath}`);
        } else if (filePath.indexOf(`~${path.sep}`) === 0) {
          filePath = filePath.replace("~", os.homedir());
        }
        super(options);
        this.options = this._parseOption(options);
        this.fileObject = path.parse(filePath);
        if (this.fileObject.dir === "") {
          this.fileObject = path.parse(path.join(process.cwd(), filePath));
        }
        this.fileFormatter = fileNameFormatter({
          file: this.fileObject,
          alwaysIncludeDate: this.options.alwaysIncludePattern,
          needsIndex: this.options.maxSize < Number.MAX_SAFE_INTEGER,
          compress: this.options.compress,
          keepFileExt: this.options.keepFileExt,
          fileNameSep: this.options.fileNameSep
        });
        this.fileNameParser = fileNameParser({
          file: this.fileObject,
          keepFileExt: this.options.keepFileExt,
          pattern: this.options.pattern,
          fileNameSep: this.options.fileNameSep
        });
        this.state = {
          currentSize: 0
        };
        if (this.options.pattern) {
          this.state.currentDate = format(this.options.pattern, newNow());
        }
        this.filename = this.fileFormatter({
          index: 0,
          date: this.state.currentDate
        });
        if (["a", "a+", "as", "as+"].includes(this.options.flags)) {
          this._setExistingSizeAndDate();
        }
        debug(
          `constructor: create new file ${this.filename}, state=${JSON.stringify(
            this.state
          )}`
        );
        this._renewWriteStream();
      }
      _setExistingSizeAndDate() {
        try {
          const stats = fs.statSync(this.filename);
          this.state.currentSize = stats.size;
          if (this.options.pattern) {
            this.state.currentDate = format(this.options.pattern, stats.mtime);
          }
        } catch (e) {
          return;
        }
      }
      _parseOption(rawOptions) {
        const defaultOptions = {
          maxSize: 0,
          numToKeep: Number.MAX_SAFE_INTEGER,
          encoding: "utf8",
          mode: parseInt("0600", 8),
          flags: "a",
          compress: false,
          keepFileExt: false,
          alwaysIncludePattern: false
        };
        const options = Object.assign({}, defaultOptions, rawOptions);
        if (!options.maxSize) {
          delete options.maxSize;
        } else if (options.maxSize <= 0) {
          throw new Error(`options.maxSize (${options.maxSize}) should be > 0`);
        }
        if (options.numBackups || options.numBackups === 0) {
          if (options.numBackups < 0) {
            throw new Error(`options.numBackups (${options.numBackups}) should be >= 0`);
          } else if (options.numBackups >= Number.MAX_SAFE_INTEGER) {
            throw new Error(`options.numBackups (${options.numBackups}) should be < Number.MAX_SAFE_INTEGER`);
          } else {
            options.numToKeep = options.numBackups + 1;
          }
        } else if (options.numToKeep <= 0) {
          throw new Error(`options.numToKeep (${options.numToKeep}) should be > 0`);
        }
        debug(
          `_parseOption: creating stream with option=${JSON.stringify(options)}`
        );
        return options;
      }
      _final(callback) {
        this.currentFileStream.end("", this.options.encoding, callback);
      }
      _write(chunk, encoding, callback) {
        this._shouldRoll().then(() => {
          debug(
            `_write: writing chunk. file=${this.currentFileStream.path} state=${JSON.stringify(this.state)} chunk=${chunk}`
          );
          this.currentFileStream.write(chunk, encoding, (e) => {
            this.state.currentSize += chunk.length;
            callback(e);
          });
        });
      }
      async _shouldRoll() {
        if (this._dateChanged() || this._tooBig()) {
          debug(
            `_shouldRoll: rolling because dateChanged? ${this._dateChanged()} or tooBig? ${this._tooBig()}`
          );
          await this._roll();
        }
      }
      _dateChanged() {
        return this.state.currentDate && this.state.currentDate !== format(this.options.pattern, newNow());
      }
      _tooBig() {
        return this.state.currentSize >= this.options.maxSize;
      }
      _roll() {
        debug(`_roll: closing the current stream`);
        return new Promise((resolve, reject) => {
          this.currentFileStream.end("", this.options.encoding, () => {
            this._moveOldFiles().then(resolve).catch(reject);
          });
        });
      }
      async _moveOldFiles() {
        const files = await this._getExistingFiles();
        const todaysFiles = this.state.currentDate ? files.filter((f) => f.date === this.state.currentDate) : files;
        for (let i = todaysFiles.length; i >= 0; i--) {
          debug(`_moveOldFiles: i = ${i}`);
          const sourceFilePath = this.fileFormatter({
            date: this.state.currentDate,
            index: i
          });
          const targetFilePath = this.fileFormatter({
            date: this.state.currentDate,
            index: i + 1
          });
          const moveAndCompressOptions = {
            compress: this.options.compress && i === 0,
            mode: this.options.mode
          };
          await moveAndMaybeCompressFile(
            sourceFilePath,
            targetFilePath,
            moveAndCompressOptions
          );
        }
        this.state.currentSize = 0;
        this.state.currentDate = this.state.currentDate ? format(this.options.pattern, newNow()) : null;
        debug(
          `_moveOldFiles: finished rolling files. state=${JSON.stringify(
            this.state
          )}`
        );
        this._renewWriteStream();
        await new Promise((resolve, reject) => {
          this.currentFileStream.write("", "utf8", () => {
            this._clean().then(resolve).catch(reject);
          });
        });
      }
      // Sorted from the oldest to the latest
      async _getExistingFiles() {
        const files = await fs.readdir(this.fileObject.dir).catch(
          /* istanbul ignore next: will not happen on windows */
          () => []
        );
        debug(`_getExistingFiles: files=${files}`);
        const existingFileDetails = files.map((n) => this.fileNameParser(n)).filter((n) => n);
        const getKey = (n) => (n.timestamp ? n.timestamp : newNow().getTime()) - n.index;
        existingFileDetails.sort((a, b) => getKey(a) - getKey(b));
        return existingFileDetails;
      }
      _renewWriteStream() {
        const filePath = this.fileFormatter({
          date: this.state.currentDate,
          index: 0
        });
        const mkdir = (dir) => {
          try {
            return fs.mkdirSync(dir, { recursive: true });
          } catch (e) {
            if (e.code === "ENOENT") {
              mkdir(path.dirname(dir));
              return mkdir(dir);
            }
            if (e.code !== "EEXIST" && e.code !== "EROFS") {
              throw e;
            } else {
              try {
                if (fs.statSync(dir).isDirectory()) {
                  return dir;
                }
                throw e;
              } catch (err) {
                throw e;
              }
            }
          }
        };
        mkdir(this.fileObject.dir);
        const ops = {
          flags: this.options.flags,
          encoding: this.options.encoding,
          mode: this.options.mode
        };
        const renameKey = function(obj, oldKey, newKey) {
          obj[newKey] = obj[oldKey];
          delete obj[oldKey];
          return obj;
        };
        fs.appendFileSync(filePath, "", renameKey({ ...ops }, "flags", "flag"));
        this.currentFileStream = fs.createWriteStream(filePath, ops);
        this.currentFileStream.on("error", (e) => {
          this.emit("error", e);
        });
      }
      async _clean() {
        const existingFileDetails = await this._getExistingFiles();
        debug(
          `_clean: numToKeep = ${this.options.numToKeep}, existingFiles = ${existingFileDetails.length}`
        );
        debug("_clean: existing files are: ", existingFileDetails);
        if (this._tooManyFiles(existingFileDetails.length)) {
          const fileNamesToRemove = existingFileDetails.slice(0, existingFileDetails.length - this.options.numToKeep).map((f) => path.format({ dir: this.fileObject.dir, base: f.filename }));
          await deleteFiles(fileNamesToRemove);
        }
      }
      _tooManyFiles(numFiles) {
        return this.options.numToKeep > 0 && numFiles > this.options.numToKeep;
      }
    };
    module2.exports = RollingFileWriteStream;
  }
});

// node_modules/streamroller/lib/RollingFileStream.js
var require_RollingFileStream = __commonJS({
  "node_modules/streamroller/lib/RollingFileStream.js"(exports2, module2) {
    var RollingFileWriteStream = require_RollingFileWriteStream();
    var RollingFileStream = class extends RollingFileWriteStream {
      constructor(filename, size, backups, options) {
        if (!options) {
          options = {};
        }
        if (size) {
          options.maxSize = size;
        }
        if (!options.numBackups && options.numBackups !== 0) {
          if (!backups && backups !== 0) {
            backups = 1;
          }
          options.numBackups = backups;
        }
        super(filename, options);
        this.backups = options.numBackups;
        this.size = this.options.maxSize;
      }
      get theStream() {
        return this.currentFileStream;
      }
    };
    module2.exports = RollingFileStream;
  }
});

// node_modules/streamroller/lib/DateRollingFileStream.js
var require_DateRollingFileStream = __commonJS({
  "node_modules/streamroller/lib/DateRollingFileStream.js"(exports2, module2) {
    var RollingFileWriteStream = require_RollingFileWriteStream();
    var DateRollingFileStream = class extends RollingFileWriteStream {
      constructor(filename, pattern, options) {
        if (pattern && typeof pattern === "object") {
          options = pattern;
          pattern = null;
        }
        if (!options) {
          options = {};
        }
        if (!pattern) {
          pattern = "yyyy-MM-dd";
        }
        options.pattern = pattern;
        if (!options.numBackups && options.numBackups !== 0) {
          if (!options.daysToKeep && options.daysToKeep !== 0) {
            options.daysToKeep = 1;
          } else {
            process.emitWarning(
              "options.daysToKeep is deprecated due to the confusion it causes when used together with file size rolling. Please use options.numBackups instead.",
              "DeprecationWarning",
              "streamroller-DEP0001"
            );
          }
          options.numBackups = options.daysToKeep;
        } else {
          options.daysToKeep = options.numBackups;
        }
        super(filename, options);
        this.mode = this.options.mode;
      }
      get theStream() {
        return this.currentFileStream;
      }
    };
    module2.exports = DateRollingFileStream;
  }
});

// node_modules/streamroller/lib/index.js
var require_lib6 = __commonJS({
  "node_modules/streamroller/lib/index.js"(exports2, module2) {
    module2.exports = {
      RollingFileWriteStream: require_RollingFileWriteStream(),
      RollingFileStream: require_RollingFileStream(),
      DateRollingFileStream: require_DateRollingFileStream()
    };
  }
});

// node_modules/log4js/lib/appenders/file.js
var require_file2 = __commonJS({
  "node_modules/log4js/lib/appenders/file.js"(exports2, module2) {
    var debug = require_src4()("log4js:file");
    var path = require("path");
    var streams = require_lib6();
    var os = require("os");
    var eol = os.EOL;
    var mainSighupListenerStarted = false;
    var sighupListeners = /* @__PURE__ */ new Set();
    function mainSighupHandler() {
      sighupListeners.forEach((app) => {
        app.sighupHandler();
      });
    }
    function fileAppender(file, layout, logSize, numBackups, options, timezoneOffset) {
      if (typeof file !== "string" || file.length === 0) {
        throw new Error(`Invalid filename: ${file}`);
      } else if (file.endsWith(path.sep)) {
        throw new Error(`Filename is a directory: ${file}`);
      } else if (file.indexOf(`~${path.sep}`) === 0) {
        file = file.replace("~", os.homedir());
      }
      file = path.normalize(file);
      numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;
      debug(
        "Creating file appender (",
        file,
        ", ",
        logSize,
        ", ",
        numBackups,
        ", ",
        options,
        ", ",
        timezoneOffset,
        ")"
      );
      function openTheStream(filePath, fileSize, numFiles, opt) {
        const stream = new streams.RollingFileStream(
          filePath,
          fileSize,
          numFiles,
          opt
        );
        stream.on("error", (err) => {
          console.error(
            "log4js.fileAppender - Writing to file %s, error happened ",
            filePath,
            err
          );
        });
        stream.on("drain", () => {
          process.emit("log4js:pause", false);
        });
        return stream;
      }
      let writer = openTheStream(file, logSize, numBackups, options);
      const app = function(loggingEvent) {
        if (!writer.writable) {
          return;
        }
        if (options.removeColor === true) {
          const regex = /\x1b[[0-9;]*m/g;
          loggingEvent.data = loggingEvent.data.map((d) => {
            if (typeof d === "string") return d.replace(regex, "");
            return d;
          });
        }
        if (!writer.write(layout(loggingEvent, timezoneOffset) + eol, "utf8")) {
          process.emit("log4js:pause", true);
        }
      };
      app.reopen = function() {
        writer.end(() => {
          writer = openTheStream(file, logSize, numBackups, options);
        });
      };
      app.sighupHandler = function() {
        debug("SIGHUP handler called.");
        app.reopen();
      };
      app.shutdown = function(complete) {
        sighupListeners.delete(app);
        if (sighupListeners.size === 0 && mainSighupListenerStarted) {
          process.removeListener("SIGHUP", mainSighupHandler);
          mainSighupListenerStarted = false;
        }
        writer.end("", "utf-8", complete);
      };
      sighupListeners.add(app);
      if (!mainSighupListenerStarted) {
        process.on("SIGHUP", mainSighupHandler);
        mainSighupListenerStarted = true;
      }
      return app;
    }
    function configure(config2, layouts) {
      let layout = layouts.basicLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      config2.mode = config2.mode || 384;
      return fileAppender(
        config2.filename,
        layout,
        config2.maxLogSize,
        config2.backups,
        config2,
        config2.timezoneOffset
      );
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/dateFile.js
var require_dateFile = __commonJS({
  "node_modules/log4js/lib/appenders/dateFile.js"(exports2, module2) {
    var streams = require_lib6();
    var os = require("os");
    var eol = os.EOL;
    function openTheStream(filename, pattern, options) {
      const stream = new streams.DateRollingFileStream(filename, pattern, options);
      stream.on("error", (err) => {
        console.error(
          "log4js.dateFileAppender - Writing to file %s, error happened ",
          filename,
          err
        );
      });
      stream.on("drain", () => {
        process.emit("log4js:pause", false);
      });
      return stream;
    }
    function appender(filename, pattern, layout, options, timezoneOffset) {
      options.maxSize = options.maxLogSize;
      const writer = openTheStream(filename, pattern, options);
      const app = function(logEvent) {
        if (!writer.writable) {
          return;
        }
        if (!writer.write(layout(logEvent, timezoneOffset) + eol, "utf8")) {
          process.emit("log4js:pause", true);
        }
      };
      app.shutdown = function(complete) {
        writer.end("", "utf-8", complete);
      };
      return app;
    }
    function configure(config2, layouts) {
      let layout = layouts.basicLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      if (!config2.alwaysIncludePattern) {
        config2.alwaysIncludePattern = false;
      }
      config2.mode = config2.mode || 384;
      return appender(
        config2.filename,
        config2.pattern,
        layout,
        config2,
        config2.timezoneOffset
      );
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/fileSync.js
var require_fileSync = __commonJS({
  "node_modules/log4js/lib/appenders/fileSync.js"(exports2, module2) {
    var debug = require_src4()("log4js:fileSync");
    var path = require("path");
    var fs = require("fs");
    var os = require("os");
    var eol = os.EOL;
    function touchFile(file, options) {
      const mkdir = (dir) => {
        try {
          return fs.mkdirSync(dir, { recursive: true });
        } catch (e) {
          if (e.code === "ENOENT") {
            mkdir(path.dirname(dir));
            return mkdir(dir);
          }
          if (e.code !== "EEXIST" && e.code !== "EROFS") {
            throw e;
          } else {
            try {
              if (fs.statSync(dir).isDirectory()) {
                return dir;
              }
              throw e;
            } catch (err) {
              throw e;
            }
          }
        }
      };
      mkdir(path.dirname(file));
      fs.appendFileSync(file, "", { mode: options.mode, flag: options.flags });
    }
    var RollingFileSync = class {
      constructor(filename, maxLogSize, backups, options) {
        debug("In RollingFileStream");
        if (maxLogSize < 0) {
          throw new Error(`maxLogSize (${maxLogSize}) should be > 0`);
        }
        this.filename = filename;
        this.size = maxLogSize;
        this.backups = backups;
        this.options = options;
        this.currentSize = 0;
        function currentFileSize(file) {
          let fileSize = 0;
          try {
            fileSize = fs.statSync(file).size;
          } catch (e) {
            touchFile(file, options);
          }
          return fileSize;
        }
        this.currentSize = currentFileSize(this.filename);
      }
      shouldRoll() {
        debug(
          "should roll with current size %d, and max size %d",
          this.currentSize,
          this.size
        );
        return this.currentSize >= this.size;
      }
      roll(filename) {
        const that = this;
        const nameMatcher = new RegExp(`^${path.basename(filename)}`);
        function justTheseFiles(item) {
          return nameMatcher.test(item);
        }
        function index(filename_) {
          return parseInt(filename_.slice(`${path.basename(filename)}.`.length), 10) || 0;
        }
        function byIndex(a, b) {
          return index(a) - index(b);
        }
        function increaseFileIndex(fileToRename) {
          const idx = index(fileToRename);
          debug(`Index of ${fileToRename} is ${idx}`);
          if (that.backups === 0) {
            fs.truncateSync(filename, 0);
          } else if (idx < that.backups) {
            try {
              fs.unlinkSync(`${filename}.${idx + 1}`);
            } catch (e) {
            }
            debug(`Renaming ${fileToRename} -> ${filename}.${idx + 1}`);
            fs.renameSync(
              path.join(path.dirname(filename), fileToRename),
              `${filename}.${idx + 1}`
            );
          }
        }
        function renameTheFiles() {
          debug("Renaming the old files");
          const files = fs.readdirSync(path.dirname(filename));
          files.filter(justTheseFiles).sort(byIndex).reverse().forEach(increaseFileIndex);
        }
        debug("Rolling, rolling, rolling");
        renameTheFiles();
      }
      // eslint-disable-next-line no-unused-vars
      write(chunk, encoding) {
        const that = this;
        function writeTheChunk() {
          debug("writing the chunk to the file");
          that.currentSize += chunk.length;
          fs.appendFileSync(that.filename, chunk);
        }
        debug("in write");
        if (this.shouldRoll()) {
          this.currentSize = 0;
          this.roll(this.filename);
        }
        writeTheChunk();
      }
    };
    function fileAppender(file, layout, logSize, numBackups, options, timezoneOffset) {
      if (typeof file !== "string" || file.length === 0) {
        throw new Error(`Invalid filename: ${file}`);
      } else if (file.endsWith(path.sep)) {
        throw new Error(`Filename is a directory: ${file}`);
      } else if (file.indexOf(`~${path.sep}`) === 0) {
        file = file.replace("~", os.homedir());
      }
      file = path.normalize(file);
      numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;
      debug(
        "Creating fileSync appender (",
        file,
        ", ",
        logSize,
        ", ",
        numBackups,
        ", ",
        options,
        ", ",
        timezoneOffset,
        ")"
      );
      function openTheStream(filePath, fileSize, numFiles) {
        let stream;
        if (fileSize) {
          stream = new RollingFileSync(filePath, fileSize, numFiles, options);
        } else {
          stream = ((f) => {
            touchFile(f, options);
            return {
              write(data) {
                fs.appendFileSync(f, data);
              }
            };
          })(filePath);
        }
        return stream;
      }
      const logFile = openTheStream(file, logSize, numBackups);
      return (loggingEvent) => {
        logFile.write(layout(loggingEvent, timezoneOffset) + eol);
      };
    }
    function configure(config2, layouts) {
      let layout = layouts.basicLayout;
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      const options = {
        flags: config2.flags || "a",
        encoding: config2.encoding || "utf8",
        mode: config2.mode || 384
      };
      return fileAppender(
        config2.filename,
        layout,
        config2.maxLogSize,
        config2.backups,
        options,
        config2.timezoneOffset
      );
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/tcp.js
var require_tcp = __commonJS({
  "node_modules/log4js/lib/appenders/tcp.js"(exports2, module2) {
    var debug = require_src4()("log4js:tcp");
    var net = require("net");
    function appender(config2, layout) {
      let canWrite = false;
      const buffer = [];
      let socket;
      let shutdownAttempts = 3;
      let endMsg = "__LOG4JS__";
      function write(loggingEvent) {
        debug("Writing log event to socket");
        canWrite = socket.write(`${layout(loggingEvent)}${endMsg}`, "utf8");
      }
      function emptyBuffer() {
        let evt;
        debug("emptying buffer");
        while (evt = buffer.shift()) {
          write(evt);
        }
      }
      function createSocket() {
        debug(
          `appender creating socket to ${config2.host || "localhost"}:${config2.port || 5e3}`
        );
        endMsg = `${config2.endMsg || "__LOG4JS__"}`;
        socket = net.createConnection(
          config2.port || 5e3,
          config2.host || "localhost"
        );
        socket.on("connect", () => {
          debug("socket connected");
          emptyBuffer();
          canWrite = true;
        });
        socket.on("drain", () => {
          debug("drain event received, emptying buffer");
          canWrite = true;
          emptyBuffer();
        });
        socket.on("timeout", socket.end.bind(socket));
        socket.on("error", (e) => {
          debug("connection error", e);
          canWrite = false;
          emptyBuffer();
        });
        socket.on("close", createSocket);
      }
      createSocket();
      function log(loggingEvent) {
        if (canWrite) {
          write(loggingEvent);
        } else {
          debug("buffering log event because it cannot write at the moment");
          buffer.push(loggingEvent);
        }
      }
      log.shutdown = function(cb) {
        debug("shutdown called");
        if (buffer.length && shutdownAttempts) {
          debug("buffer has items, waiting 100ms to empty");
          shutdownAttempts -= 1;
          setTimeout(() => {
            log.shutdown(cb);
          }, 100);
        } else {
          socket.removeAllListeners("close");
          socket.end(cb);
        }
      };
      return log;
    }
    function configure(config2, layouts) {
      debug(`configure with config = ${config2}`);
      let layout = function(loggingEvent) {
        return loggingEvent.serialise();
      };
      if (config2.layout) {
        layout = layouts.layout(config2.layout.type, config2.layout);
      }
      return appender(config2, layout);
    }
    module2.exports.configure = configure;
  }
});

// node_modules/log4js/lib/appenders/index.js
var require_appenders = __commonJS({
  "node_modules/log4js/lib/appenders/index.js"(exports2, module2) {
    var path = require("path");
    var debug = require_src4()("log4js:appenders");
    var configuration = require_configuration();
    var clustering = require_clustering();
    var levels = require_levels();
    var layouts = require_layouts();
    var adapters = require_adapters();
    var coreAppenders = /* @__PURE__ */ new Map();
    coreAppenders.set("console", require_console());
    coreAppenders.set("stdout", require_stdout());
    coreAppenders.set("stderr", require_stderr());
    coreAppenders.set("logLevelFilter", require_logLevelFilter());
    coreAppenders.set("categoryFilter", require_categoryFilter());
    coreAppenders.set("noLogFilter", require_noLogFilter());
    coreAppenders.set("file", require_file2());
    coreAppenders.set("dateFile", require_dateFile());
    coreAppenders.set("fileSync", require_fileSync());
    coreAppenders.set("tcp", require_tcp());
    var appenders = /* @__PURE__ */ new Map();
    var tryLoading = (modulePath, config2) => {
      let resolvedPath;
      try {
        const modulePathCJS = `${modulePath}.cjs`;
        resolvedPath = require.resolve(modulePathCJS);
        debug("Loading module from ", modulePathCJS);
      } catch (e) {
        resolvedPath = modulePath;
        debug("Loading module from ", modulePath);
      }
      try {
        return require(resolvedPath);
      } catch (e) {
        configuration.throwExceptionIf(
          config2,
          e.code !== "MODULE_NOT_FOUND",
          `appender "${modulePath}" could not be loaded (error was: ${e})`
        );
        return void 0;
      }
    };
    var loadAppenderModule = (type, config2) => coreAppenders.get(type) || tryLoading(`./${type}`, config2) || tryLoading(type, config2) || require.main && require.main.filename && tryLoading(path.join(path.dirname(require.main.filename), type), config2) || tryLoading(path.join(process.cwd(), type), config2);
    var appendersLoading = /* @__PURE__ */ new Set();
    var getAppender = (name, config2) => {
      if (appenders.has(name)) return appenders.get(name);
      if (!config2.appenders[name]) return false;
      if (appendersLoading.has(name))
        throw new Error(`Dependency loop detected for appender ${name}.`);
      appendersLoading.add(name);
      debug(`Creating appender ${name}`);
      const appender = createAppender(name, config2);
      appendersLoading.delete(name);
      appenders.set(name, appender);
      return appender;
    };
    var createAppender = (name, config2) => {
      const appenderConfig = config2.appenders[name];
      const appenderModule = appenderConfig.type.configure ? appenderConfig.type : loadAppenderModule(appenderConfig.type, config2);
      configuration.throwExceptionIf(
        config2,
        configuration.not(appenderModule),
        `appender "${name}" is not valid (type "${appenderConfig.type}" could not be found)`
      );
      if (appenderModule.appender) {
        process.emitWarning(
          `Appender ${appenderConfig.type} exports an appender function.`,
          "DeprecationWarning",
          "log4js-node-DEP0001"
        );
        debug(
          "[log4js-node-DEP0001]",
          `DEPRECATION: Appender ${appenderConfig.type} exports an appender function.`
        );
      }
      if (appenderModule.shutdown) {
        process.emitWarning(
          `Appender ${appenderConfig.type} exports a shutdown function.`,
          "DeprecationWarning",
          "log4js-node-DEP0002"
        );
        debug(
          "[log4js-node-DEP0002]",
          `DEPRECATION: Appender ${appenderConfig.type} exports a shutdown function.`
        );
      }
      debug(`${name}: clustering.isMaster ? ${clustering.isMaster()}`);
      debug(
        // eslint-disable-next-line global-require
        `${name}: appenderModule is ${require("util").inspect(appenderModule)}`
      );
      return clustering.onlyOnMaster(
        () => {
          debug(
            `calling appenderModule.configure for ${name} / ${appenderConfig.type}`
          );
          return appenderModule.configure(
            adapters.modifyConfig(appenderConfig),
            layouts,
            (appender) => getAppender(appender, config2),
            levels
          );
        },
        /* istanbul ignore next: fn never gets called by non-master yet needed to pass config validation */
        () => {
        }
      );
    };
    var setup = (config2) => {
      appenders.clear();
      appendersLoading.clear();
      if (!config2) {
        return;
      }
      const usedAppenders = [];
      Object.values(config2.categories).forEach((category) => {
        usedAppenders.push(...category.appenders);
      });
      Object.keys(config2.appenders).forEach((name) => {
        if (usedAppenders.includes(name) || config2.appenders[name].type === "tcp-server" || config2.appenders[name].type === "multiprocess") {
          getAppender(name, config2);
        }
      });
    };
    var init = () => {
      setup();
    };
    init();
    configuration.addListener((config2) => {
      configuration.throwExceptionIf(
        config2,
        configuration.not(configuration.anObject(config2.appenders)),
        'must have a property "appenders" of type object.'
      );
      const appenderNames = Object.keys(config2.appenders);
      configuration.throwExceptionIf(
        config2,
        configuration.not(appenderNames.length),
        "must define at least one appender."
      );
      appenderNames.forEach((name) => {
        configuration.throwExceptionIf(
          config2,
          configuration.not(config2.appenders[name].type),
          `appender "${name}" is not valid (must be an object with property "type")`
        );
      });
    });
    configuration.addListener(setup);
    module2.exports = appenders;
    module2.exports.init = init;
  }
});

// node_modules/log4js/lib/categories.js
var require_categories = __commonJS({
  "node_modules/log4js/lib/categories.js"(exports2, module2) {
    var debug = require_src4()("log4js:categories");
    var configuration = require_configuration();
    var levels = require_levels();
    var appenders = require_appenders();
    var categories = /* @__PURE__ */ new Map();
    function inheritFromParent(config2, category, categoryName) {
      if (category.inherit === false) return;
      const lastDotIndex = categoryName.lastIndexOf(".");
      if (lastDotIndex < 0) return;
      const parentCategoryName = categoryName.slice(0, lastDotIndex);
      let parentCategory = config2.categories[parentCategoryName];
      if (!parentCategory) {
        parentCategory = { inherit: true, appenders: [] };
      }
      inheritFromParent(config2, parentCategory, parentCategoryName);
      if (!config2.categories[parentCategoryName] && parentCategory.appenders && parentCategory.appenders.length && parentCategory.level) {
        config2.categories[parentCategoryName] = parentCategory;
      }
      category.appenders = category.appenders || [];
      category.level = category.level || parentCategory.level;
      parentCategory.appenders.forEach((ap) => {
        if (!category.appenders.includes(ap)) {
          category.appenders.push(ap);
        }
      });
      category.parent = parentCategory;
    }
    function addCategoryInheritance(config2) {
      if (!config2.categories) return;
      const categoryNames = Object.keys(config2.categories);
      categoryNames.forEach((name) => {
        const category = config2.categories[name];
        inheritFromParent(config2, category, name);
      });
    }
    configuration.addPreProcessingListener(
      (config2) => addCategoryInheritance(config2)
    );
    configuration.addListener((config2) => {
      configuration.throwExceptionIf(
        config2,
        configuration.not(configuration.anObject(config2.categories)),
        'must have a property "categories" of type object.'
      );
      const categoryNames = Object.keys(config2.categories);
      configuration.throwExceptionIf(
        config2,
        configuration.not(categoryNames.length),
        "must define at least one category."
      );
      categoryNames.forEach((name) => {
        const category = config2.categories[name];
        configuration.throwExceptionIf(
          config2,
          [
            configuration.not(category.appenders),
            configuration.not(category.level)
          ],
          `category "${name}" is not valid (must be an object with properties "appenders" and "level")`
        );
        configuration.throwExceptionIf(
          config2,
          configuration.not(Array.isArray(category.appenders)),
          `category "${name}" is not valid (appenders must be an array of appender names)`
        );
        configuration.throwExceptionIf(
          config2,
          configuration.not(category.appenders.length),
          `category "${name}" is not valid (appenders must contain at least one appender name)`
        );
        if (Object.prototype.hasOwnProperty.call(category, "enableCallStack")) {
          configuration.throwExceptionIf(
            config2,
            typeof category.enableCallStack !== "boolean",
            `category "${name}" is not valid (enableCallStack must be boolean type)`
          );
        }
        category.appenders.forEach((appender) => {
          configuration.throwExceptionIf(
            config2,
            configuration.not(appenders.get(appender)),
            `category "${name}" is not valid (appender "${appender}" is not defined)`
          );
        });
        configuration.throwExceptionIf(
          config2,
          configuration.not(levels.getLevel(category.level)),
          `category "${name}" is not valid (level "${category.level}" not recognised; valid levels are ${levels.levels.join(", ")})`
        );
      });
      configuration.throwExceptionIf(
        config2,
        configuration.not(config2.categories.default),
        'must define a "default" category.'
      );
    });
    var setup = (config2) => {
      categories.clear();
      if (!config2) {
        return;
      }
      const categoryNames = Object.keys(config2.categories);
      categoryNames.forEach((name) => {
        const category = config2.categories[name];
        const categoryAppenders = [];
        category.appenders.forEach((appender) => {
          categoryAppenders.push(appenders.get(appender));
          debug(`Creating category ${name}`);
          categories.set(name, {
            appenders: categoryAppenders,
            level: levels.getLevel(category.level),
            enableCallStack: category.enableCallStack || false
          });
        });
      });
    };
    var init = () => {
      setup();
    };
    init();
    configuration.addListener(setup);
    var configForCategory = (category) => {
      debug(`configForCategory: searching for config for ${category}`);
      if (categories.has(category)) {
        debug(`configForCategory: ${category} exists in config, returning it`);
        return categories.get(category);
      }
      let sourceCategoryConfig;
      if (category.indexOf(".") > 0) {
        debug(`configForCategory: ${category} has hierarchy, cloning from parents`);
        sourceCategoryConfig = {
          ...configForCategory(category.slice(0, category.lastIndexOf(".")))
        };
      } else {
        if (!categories.has("default")) {
          setup({ categories: { default: { appenders: ["out"], level: "OFF" } } });
        }
        debug("configForCategory: cloning default category");
        sourceCategoryConfig = { ...categories.get("default") };
      }
      categories.set(category, sourceCategoryConfig);
      return sourceCategoryConfig;
    };
    var appendersForCategory = (category) => configForCategory(category).appenders;
    var getLevelForCategory = (category) => configForCategory(category).level;
    var setLevelForCategory = (category, level) => {
      configForCategory(category).level = level;
    };
    var getEnableCallStackForCategory = (category) => configForCategory(category).enableCallStack === true;
    var setEnableCallStackForCategory = (category, useCallStack) => {
      configForCategory(category).enableCallStack = useCallStack;
    };
    module2.exports = categories;
    module2.exports = Object.assign(module2.exports, {
      appendersForCategory,
      getLevelForCategory,
      setLevelForCategory,
      getEnableCallStackForCategory,
      setEnableCallStackForCategory,
      init
    });
  }
});

// node_modules/log4js/lib/logger.js
var require_logger = __commonJS({
  "node_modules/log4js/lib/logger.js"(exports2, module2) {
    var debug = require_src4()("log4js:logger");
    var LoggingEvent = require_LoggingEvent();
    var levels = require_levels();
    var clustering = require_clustering();
    var categories = require_categories();
    var configuration = require_configuration();
    var stackReg = /^(?:\s*)at (?:(.+) \()?(?:([^(]+?):(\d+):(\d+))\)?$/;
    var baseCallStackSkip = 1;
    var defaultErrorCallStackSkip = 3;
    function defaultParseCallStack(data, skipIdx = defaultErrorCallStackSkip + baseCallStackSkip) {
      try {
        const stacklines = data.stack.split("\n").slice(skipIdx);
        if (!stacklines.length) {
          return null;
        }
        const lineMatch = stackReg.exec(stacklines[0]);
        if (lineMatch && lineMatch.length === 5) {
          let className = "";
          let functionName = "";
          let functionAlias = "";
          if (lineMatch[1] && lineMatch[1] !== "") {
            [functionName, functionAlias] = lineMatch[1].replace(/[[\]]/g, "").split(" as ");
            functionAlias = functionAlias || "";
            if (functionName.includes("."))
              [className, functionName] = functionName.split(".");
          }
          return {
            fileName: lineMatch[2],
            lineNumber: parseInt(lineMatch[3], 10),
            columnNumber: parseInt(lineMatch[4], 10),
            callStack: stacklines.join("\n"),
            className,
            functionName,
            functionAlias,
            callerName: lineMatch[1] || ""
          };
        } else {
          console.error("log4js.logger - defaultParseCallStack error");
        }
      } catch (err) {
        console.error("log4js.logger - defaultParseCallStack error", err);
      }
      return null;
    }
    var Logger = class {
      constructor(name) {
        if (!name) {
          throw new Error("No category provided.");
        }
        this.category = name;
        this.context = {};
        this.callStackSkipIndex = 0;
        this.parseCallStack = defaultParseCallStack;
        debug(`Logger created (${this.category}, ${this.level})`);
      }
      get level() {
        return levels.getLevel(
          categories.getLevelForCategory(this.category),
          levels.OFF
        );
      }
      set level(level) {
        categories.setLevelForCategory(
          this.category,
          levels.getLevel(level, this.level)
        );
      }
      get useCallStack() {
        return categories.getEnableCallStackForCategory(this.category);
      }
      set useCallStack(bool) {
        categories.setEnableCallStackForCategory(this.category, bool === true);
      }
      get callStackLinesToSkip() {
        return this.callStackSkipIndex;
      }
      set callStackLinesToSkip(number) {
        if (typeof number !== "number") {
          throw new TypeError("Must be a number");
        }
        if (number < 0) {
          throw new RangeError("Must be >= 0");
        }
        this.callStackSkipIndex = number;
      }
      log(level, ...args2) {
        const logLevel = levels.getLevel(level);
        if (!logLevel) {
          if (configuration.validIdentifier(level) && args2.length > 0) {
            this.log(
              levels.WARN,
              "log4js:logger.log: valid log-level not found as first parameter given:",
              level
            );
            this.log(levels.INFO, `[${level}]`, ...args2);
          } else {
            this.log(levels.INFO, level, ...args2);
          }
        } else if (this.isLevelEnabled(logLevel)) {
          this._log(logLevel, args2);
        }
      }
      isLevelEnabled(otherLevel) {
        return this.level.isLessThanOrEqualTo(otherLevel);
      }
      _log(level, data) {
        debug(`sending log data (${level}) to appenders`);
        const error = data.find((item) => item instanceof Error);
        let callStack;
        if (this.useCallStack) {
          try {
            if (error) {
              callStack = this.parseCallStack(
                error,
                this.callStackSkipIndex + baseCallStackSkip
              );
            }
          } catch (_err) {
          }
          callStack = callStack || this.parseCallStack(
            new Error(),
            this.callStackSkipIndex + defaultErrorCallStackSkip + baseCallStackSkip
          );
        }
        const loggingEvent = new LoggingEvent(
          this.category,
          level,
          data,
          this.context,
          callStack,
          error
        );
        clustering.send(loggingEvent);
      }
      addContext(key2, value) {
        this.context[key2] = value;
      }
      removeContext(key2) {
        delete this.context[key2];
      }
      clearContext() {
        this.context = {};
      }
      setParseCallStackFunction(parseFunction) {
        if (typeof parseFunction === "function") {
          this.parseCallStack = parseFunction;
        } else if (typeof parseFunction === "undefined") {
          this.parseCallStack = defaultParseCallStack;
        } else {
          throw new TypeError("Invalid type passed to setParseCallStackFunction");
        }
      }
    };
    function addLevelMethods(target) {
      const level = levels.getLevel(target);
      const levelStrLower = level.toString().toLowerCase();
      const levelMethod = levelStrLower.replace(
        /_([a-z])/g,
        (g) => g[1].toUpperCase()
      );
      const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);
      Logger.prototype[`is${isLevelMethod}Enabled`] = function() {
        return this.isLevelEnabled(level);
      };
      Logger.prototype[levelMethod] = function(...args2) {
        this.log(level, ...args2);
      };
    }
    levels.levels.forEach(addLevelMethods);
    configuration.addListener(() => {
      levels.levels.forEach(addLevelMethods);
    });
    module2.exports = Logger;
  }
});

// node_modules/log4js/lib/connect-logger.js
var require_connect_logger = __commonJS({
  "node_modules/log4js/lib/connect-logger.js"(exports2, module2) {
    var levels = require_levels();
    var DEFAULT_FORMAT = ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"';
    function getUrl(req) {
      return req.originalUrl || req.url;
    }
    function assembleTokens(req, res, customTokens) {
      const arrayUniqueTokens = (array) => {
        const a = array.concat();
        for (let i = 0; i < a.length; ++i) {
          for (let j = i + 1; j < a.length; ++j) {
            if (a[i].token == a[j].token) {
              a.splice(j--, 1);
            }
          }
        }
        return a;
      };
      const defaultTokens = [];
      defaultTokens.push({ token: ":url", replacement: getUrl(req) });
      defaultTokens.push({ token: ":protocol", replacement: req.protocol });
      defaultTokens.push({ token: ":hostname", replacement: req.hostname });
      defaultTokens.push({ token: ":method", replacement: req.method });
      defaultTokens.push({
        token: ":status",
        replacement: res.__statusCode || res.statusCode
      });
      defaultTokens.push({
        token: ":response-time",
        replacement: res.responseTime
      });
      defaultTokens.push({ token: ":date", replacement: (/* @__PURE__ */ new Date()).toUTCString() });
      defaultTokens.push({
        token: ":referrer",
        replacement: req.headers.referer || req.headers.referrer || ""
      });
      defaultTokens.push({
        token: ":http-version",
        replacement: `${req.httpVersionMajor}.${req.httpVersionMinor}`
      });
      defaultTokens.push({
        token: ":remote-addr",
        replacement: req.headers["x-forwarded-for"] || req.ip || req._remoteAddress || req.socket && (req.socket.remoteAddress || req.socket.socket && req.socket.socket.remoteAddress)
      });
      defaultTokens.push({
        token: ":user-agent",
        replacement: req.headers["user-agent"]
      });
      defaultTokens.push({
        token: ":content-length",
        replacement: res.getHeader("content-length") || res.__headers && res.__headers["Content-Length"] || "-"
      });
      defaultTokens.push({
        token: /:req\[([^\]]+)]/g,
        replacement(_, field) {
          return req.headers[field.toLowerCase()];
        }
      });
      defaultTokens.push({
        token: /:res\[([^\]]+)]/g,
        replacement(_, field) {
          return res.getHeader(field.toLowerCase()) || res.__headers && res.__headers[field];
        }
      });
      return arrayUniqueTokens(customTokens.concat(defaultTokens));
    }
    function format(str, tokens) {
      for (let i = 0; i < tokens.length; i++) {
        str = str.replace(tokens[i].token, tokens[i].replacement);
      }
      return str;
    }
    function createNoLogCondition(nolog) {
      let regexp = null;
      if (nolog instanceof RegExp) {
        regexp = nolog;
      }
      if (typeof nolog === "string") {
        regexp = new RegExp(nolog);
      }
      if (Array.isArray(nolog)) {
        const regexpsAsStrings = nolog.map(
          (reg) => reg.source ? reg.source : reg
        );
        regexp = new RegExp(regexpsAsStrings.join("|"));
      }
      return regexp;
    }
    function matchRules(statusCode, currentLevel, ruleSet) {
      let level = currentLevel;
      if (ruleSet) {
        const matchedRule = ruleSet.find((rule) => {
          let ruleMatched = false;
          if (rule.from && rule.to) {
            ruleMatched = statusCode >= rule.from && statusCode <= rule.to;
          } else {
            ruleMatched = rule.codes.indexOf(statusCode) !== -1;
          }
          return ruleMatched;
        });
        if (matchedRule) {
          level = levels.getLevel(matchedRule.level, level);
        }
      }
      return level;
    }
    module2.exports = function getLogger(logger4js, options) {
      if (typeof options === "string" || typeof options === "function") {
        options = { format: options };
      } else {
        options = options || {};
      }
      const thisLogger = logger4js;
      let level = levels.getLevel(options.level, levels.INFO);
      const fmt = options.format || DEFAULT_FORMAT;
      return (req, res, next) => {
        if (typeof req._logging !== "undefined") return next();
        if (typeof options.nolog !== "function") {
          const nolog = createNoLogCondition(options.nolog);
          if (nolog && nolog.test(req.originalUrl)) return next();
        }
        if (thisLogger.isLevelEnabled(level) || options.level === "auto") {
          const start = /* @__PURE__ */ new Date();
          const { writeHead } = res;
          req._logging = true;
          res.writeHead = (code, headers) => {
            res.writeHead = writeHead;
            res.writeHead(code, headers);
            res.__statusCode = code;
            res.__headers = headers || {};
          };
          let finished = false;
          const handler = () => {
            if (finished) {
              return;
            }
            finished = true;
            if (typeof options.nolog === "function") {
              if (options.nolog(req, res) === true) {
                req._logging = false;
                return;
              }
            }
            res.responseTime = /* @__PURE__ */ new Date() - start;
            if (res.statusCode && options.level === "auto") {
              level = levels.INFO;
              if (res.statusCode >= 300) level = levels.WARN;
              if (res.statusCode >= 400) level = levels.ERROR;
            }
            level = matchRules(res.statusCode, level, options.statusRules);
            const combinedTokens = assembleTokens(req, res, options.tokens || []);
            if (options.context) thisLogger.addContext("res", res);
            if (typeof fmt === "function") {
              const line = fmt(req, res, (str) => format(str, combinedTokens));
              if (line) thisLogger.log(level, line);
            } else {
              thisLogger.log(level, format(fmt, combinedTokens));
            }
            if (options.context) thisLogger.removeContext("res");
          };
          res.on("end", handler);
          res.on("finish", handler);
          res.on("error", handler);
          res.on("close", handler);
        }
        return next();
      };
    };
  }
});

// node_modules/log4js/lib/appenders/recording.js
var require_recording = __commonJS({
  "node_modules/log4js/lib/appenders/recording.js"(exports2, module2) {
    var debug = require_src4()("log4js:recording");
    var recordedEvents = [];
    function configure() {
      return function(logEvent) {
        debug(
          `received logEvent, number of events now ${recordedEvents.length + 1}`
        );
        debug("log event was ", logEvent);
        recordedEvents.push(logEvent);
      };
    }
    function replay() {
      return recordedEvents.slice();
    }
    function reset() {
      recordedEvents.length = 0;
    }
    module2.exports = {
      configure,
      replay,
      playback: replay,
      reset,
      erase: reset
    };
  }
});

// node_modules/log4js/lib/log4js.js
var require_log4js = __commonJS({
  "node_modules/log4js/lib/log4js.js"(exports2, module2) {
    var debug = require_src4()("log4js:main");
    var fs = require("fs");
    var deepClone = require_rfdc()({ proto: true });
    var configuration = require_configuration();
    var layouts = require_layouts();
    var levels = require_levels();
    var appenders = require_appenders();
    var categories = require_categories();
    var Logger = require_logger();
    var clustering = require_clustering();
    var connectLogger = require_connect_logger();
    var recordingModule = require_recording();
    var enabled = false;
    function sendLogEventToAppender(logEvent) {
      if (!enabled) return;
      debug("Received log event ", logEvent);
      const categoryAppenders = categories.appendersForCategory(
        logEvent.categoryName
      );
      categoryAppenders.forEach((appender) => {
        appender(logEvent);
      });
    }
    function loadConfigurationFile(filename) {
      debug(`Loading configuration from ${filename}`);
      try {
        return JSON.parse(fs.readFileSync(filename, "utf8"));
      } catch (e) {
        throw new Error(
          `Problem reading config from file "${filename}". Error was ${e.message}`,
          e
        );
      }
    }
    function configure(configurationFileOrObject) {
      if (enabled) {
        shutdown();
      }
      let configObject = configurationFileOrObject;
      if (typeof configObject === "string") {
        configObject = loadConfigurationFile(configurationFileOrObject);
      }
      debug(`Configuration is ${configObject}`);
      configuration.configure(deepClone(configObject));
      clustering.onMessage(sendLogEventToAppender);
      enabled = true;
      return log4js;
    }
    function isConfigured() {
      return enabled;
    }
    function recording() {
      return recordingModule;
    }
    function shutdown(callback = () => {
    }) {
      if (typeof callback !== "function") {
        throw new TypeError("Invalid callback passed to shutdown");
      }
      debug("Shutdown called. Disabling all log writing.");
      enabled = false;
      const appendersToCheck = Array.from(appenders.values());
      appenders.init();
      categories.init();
      const shutdownFunctions = appendersToCheck.reduce(
        (accum, next) => next.shutdown ? accum + 1 : accum,
        0
      );
      if (shutdownFunctions === 0) {
        debug("No appenders with shutdown functions found.");
        callback();
      }
      let completed = 0;
      let error;
      debug(`Found ${shutdownFunctions} appenders with shutdown functions.`);
      function complete(err) {
        error = error || err;
        completed += 1;
        debug(`Appender shutdowns complete: ${completed} / ${shutdownFunctions}`);
        if (completed >= shutdownFunctions) {
          debug("All shutdown functions completed.");
          callback(error);
        }
      }
      appendersToCheck.filter((a) => a.shutdown).forEach((a) => a.shutdown(complete));
    }
    function getLogger(category) {
      if (!enabled) {
        configure(
          process.env.LOG4JS_CONFIG || {
            appenders: { out: { type: "stdout" } },
            categories: { default: { appenders: ["out"], level: "OFF" } }
          }
        );
      }
      return new Logger(category || "default");
    }
    var log4js = {
      getLogger,
      configure,
      isConfigured,
      shutdown,
      connectLogger,
      levels,
      addLayout: layouts.addLayout,
      recording
    };
    module2.exports = log4js;
  }
});

// log/logger.js
var require_logger2 = __commonJS({
  "log/logger.js"(exports2, module2) {
    var log4js = require_log4js();
    log4js.configure({
      appenders: {
        console: { type: "console" },
        file: { type: "file", filename: "log/files/proxy.log", maxLogSize: 10485760, backups: 10 }
      },
      categories: { default: { appenders: ["console", "file"], level: "debug" } }
    });
    var logger = log4js.getLogger("console");
    module2.exports = logger;
  }
});

// node_modules/q/q.js
var require_q = __commonJS({
  "node_modules/q/q.js"(exports2, module2) {
    (function(definition) {
      "use strict";
      if (typeof bootstrap === "function") {
        bootstrap("promise", definition);
      } else if (typeof exports2 === "object" && typeof module2 === "object") {
        module2.exports = definition();
      } else if (typeof define === "function" && define.amd) {
        define(definition);
      } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
          return;
        } else {
          ses.makeQ = definition;
        }
      } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        var global2 = typeof window !== "undefined" ? window : self;
        var previousQ = global2.Q;
        global2.Q = definition();
        global2.Q.noConflict = function() {
          global2.Q = previousQ;
          return this;
        };
      } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
      }
    })(function() {
      "use strict";
      var hasStacks = false;
      try {
        throw new Error();
      } catch (e) {
        hasStacks = !!e.stack;
      }
      var qStartingLine = captureLine();
      var qFileName;
      var noop = function() {
      };
      var nextTick = function() {
        var head = { task: void 0, next: null };
        var tail = head;
        var flushing = false;
        var requestTick = void 0;
        var isNodeJS = false;
        var laterQueue = [];
        function flush() {
          var task, domain;
          while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;
            if (domain) {
              head.domain = void 0;
              domain.enter();
            }
            runSingle(task, domain);
          }
          while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
          }
          flushing = false;
        }
        function runSingle(task, domain) {
          try {
            task();
          } catch (e) {
            if (isNodeJS) {
              if (domain) {
                domain.exit();
              }
              setTimeout(flush, 0);
              if (domain) {
                domain.enter();
              }
              throw e;
            } else {
              setTimeout(function() {
                throw e;
              }, 0);
            }
          }
          if (domain) {
            domain.exit();
          }
        }
        nextTick = function(task) {
          tail = tail.next = {
            task,
            domain: isNodeJS && process.domain,
            next: null
          };
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
          isNodeJS = true;
          requestTick = function() {
            process.nextTick(flush);
          };
        } else if (typeof setImmediate === "function") {
          if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
          } else {
            requestTick = function() {
              setImmediate(flush);
            };
          }
        } else if (typeof MessageChannel !== "undefined") {
          var channel = new MessageChannel();
          channel.port1.onmessage = function() {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
          };
          var requestPortTick = function() {
            channel.port2.postMessage(0);
          };
          requestTick = function() {
            setTimeout(flush, 0);
            requestPortTick();
          };
        } else {
          requestTick = function() {
            setTimeout(flush, 0);
          };
        }
        nextTick.runAfter = function(task) {
          laterQueue.push(task);
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        return nextTick;
      }();
      var call = Function.call;
      function uncurryThis(f) {
        return function() {
          return call.apply(f, arguments);
        };
      }
      var array_slice = uncurryThis(Array.prototype.slice);
      var array_reduce = uncurryThis(
        Array.prototype.reduce || function(callback, basis) {
          var index = 0, length2 = this.length;
          if (arguments.length === 1) {
            do {
              if (index in this) {
                basis = this[index++];
                break;
              }
              if (++index >= length2) {
                throw new TypeError();
              }
            } while (1);
          }
          for (; index < length2; index++) {
            if (index in this) {
              basis = callback(basis, this[index], index);
            }
          }
          return basis;
        }
      );
      var array_indexOf = uncurryThis(
        Array.prototype.indexOf || function(value) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
              return i;
            }
          }
          return -1;
        }
      );
      var array_map = uncurryThis(
        Array.prototype.map || function(callback, thisp) {
          var self2 = this;
          var collect = [];
          array_reduce(self2, function(undefined2, value, index) {
            collect.push(callback.call(thisp, value, index, self2));
          }, void 0);
          return collect;
        }
      );
      var object_create = Object.create || function(prototype) {
        function Type() {
        }
        Type.prototype = prototype;
        return new Type();
      };
      var object_defineProperty = Object.defineProperty || function(obj, prop, descriptor) {
        obj[prop] = descriptor.value;
        return obj;
      };
      var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      var object_keys = Object.keys || function(object) {
        var keys = [];
        for (var key2 in object) {
          if (object_hasOwnProperty(object, key2)) {
            keys.push(key2);
          }
        }
        return keys;
      };
      var object_toString = uncurryThis(Object.prototype.toString);
      function isObject(value) {
        return value === Object(value);
      }
      function isStopIteration(exception) {
        return object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue;
      }
      var QReturnValue;
      if (typeof ReturnValue !== "undefined") {
        QReturnValue = ReturnValue;
      } else {
        QReturnValue = function(value) {
          this.value = value;
        };
      }
      var STACK_JUMP_SEPARATOR = "From previous event:";
      function makeStackTraceLong(error, promise2) {
        if (hasStacks && promise2.stack && typeof error === "object" && error !== null && error.stack) {
          var stacks = [];
          for (var p = promise2; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
              object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
              stacks.unshift(p.stack);
            }
          }
          stacks.unshift(error.stack);
          var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
          var stack = filterStackString(concatedStacks);
          object_defineProperty(error, "stack", { value: stack, configurable: true });
        }
      }
      function filterStackString(stackString) {
        var lines = stackString.split("\n");
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
          var line = lines[i];
          if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
          }
        }
        return desiredLines.join("\n");
      }
      function isNodeFrame(stackLine) {
        return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
      }
      function getFileNameAndLineNumber(stackLine) {
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
        }
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
          return [attempt2[1], Number(attempt2[2])];
        }
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          return [attempt3[1], Number(attempt3[2])];
        }
      }
      function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
          return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
      }
      function captureLine() {
        if (!hasStacks) {
          return;
        }
        try {
          throw new Error();
        } catch (e) {
          var lines = e.stack.split("\n");
          var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
          var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
          if (!fileNameAndLineNumber) {
            return;
          }
          qFileName = fileNameAndLineNumber[0];
          return fileNameAndLineNumber[1];
        }
      }
      function deprecate(callback, name, alternative) {
        return function() {
          if (typeof console !== "undefined" && typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
          }
          return callback.apply(callback, arguments);
        };
      }
      function Q(value) {
        if (value instanceof Promise2) {
          return value;
        }
        if (isPromiseAlike(value)) {
          return coerce(value);
        } else {
          return fulfill(value);
        }
      }
      Q.resolve = Q;
      Q.nextTick = nextTick;
      Q.longStackSupport = false;
      var longStackCounter = 1;
      if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
        Q.longStackSupport = true;
      }
      Q.defer = defer;
      function defer() {
        var messages = [], progressListeners = [], resolvedPromise;
        var deferred = object_create(defer.prototype);
        var promise2 = object_create(Promise2.prototype);
        promise2.promiseDispatch = function(resolve, op, operands) {
          var args2 = array_slice(arguments);
          if (messages) {
            messages.push(args2);
            if (op === "when" && operands[1]) {
              progressListeners.push(operands[1]);
            }
          } else {
            Q.nextTick(function() {
              resolvedPromise.promiseDispatch.apply(resolvedPromise, args2);
            });
          }
        };
        promise2.valueOf = function() {
          if (messages) {
            return promise2;
          }
          var nearerValue = nearer(resolvedPromise);
          if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue;
          }
          return nearerValue;
        };
        promise2.inspect = function() {
          if (!resolvedPromise) {
            return { state: "pending" };
          }
          return resolvedPromise.inspect();
        };
        if (Q.longStackSupport && hasStacks) {
          try {
            throw new Error();
          } catch (e) {
            promise2.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise2.stackCounter = longStackCounter++;
          }
        }
        function become(newPromise) {
          resolvedPromise = newPromise;
          if (Q.longStackSupport && hasStacks) {
            promise2.source = newPromise;
          }
          array_reduce(messages, function(undefined2, message) {
            Q.nextTick(function() {
              newPromise.promiseDispatch.apply(newPromise, message);
            });
          }, void 0);
          messages = void 0;
          progressListeners = void 0;
        }
        deferred.promise = promise2;
        deferred.resolve = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(Q(value));
        };
        deferred.fulfill = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(fulfill(value));
        };
        deferred.reject = function(reason) {
          if (resolvedPromise) {
            return;
          }
          become(reject(reason));
        };
        deferred.notify = function(progress2) {
          if (resolvedPromise) {
            return;
          }
          array_reduce(progressListeners, function(undefined2, progressListener) {
            Q.nextTick(function() {
              progressListener(progress2);
            });
          }, void 0);
        };
        return deferred;
      }
      defer.prototype.makeNodeResolver = function() {
        var self2 = this;
        return function(error, value) {
          if (error) {
            self2.reject(error);
          } else if (arguments.length > 2) {
            self2.resolve(array_slice(arguments, 1));
          } else {
            self2.resolve(value);
          }
        };
      };
      Q.Promise = promise;
      Q.promise = promise;
      function promise(resolver) {
        if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function.");
        }
        var deferred = defer();
        try {
          resolver(deferred.resolve, deferred.reject, deferred.notify);
        } catch (reason) {
          deferred.reject(reason);
        }
        return deferred.promise;
      }
      promise.race = race;
      promise.all = all;
      promise.reject = reject;
      promise.resolve = Q;
      Q.passByCopy = function(object) {
        return object;
      };
      Promise2.prototype.passByCopy = function() {
        return this;
      };
      Q.join = function(x, y) {
        return Q(x).join(y);
      };
      Promise2.prototype.join = function(that) {
        return Q([this, that]).spread(function(x, y) {
          if (x === y) {
            return x;
          } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
          }
        });
      };
      Q.race = race;
      function race(answerPs) {
        return promise(function(resolve, reject2) {
          for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject2);
          }
        });
      }
      Promise2.prototype.race = function() {
        return this.then(Q.race);
      };
      Q.makePromise = Promise2;
      function Promise2(descriptor, fallback, inspect) {
        if (fallback === void 0) {
          fallback = function(op) {
            return reject(new Error(
              "Promise does not support operation: " + op
            ));
          };
        }
        if (inspect === void 0) {
          inspect = function() {
            return { state: "unknown" };
          };
        }
        var promise2 = object_create(Promise2.prototype);
        promise2.promiseDispatch = function(resolve, op, args2) {
          var result;
          try {
            if (descriptor[op]) {
              result = descriptor[op].apply(promise2, args2);
            } else {
              result = fallback.call(promise2, op, args2);
            }
          } catch (exception) {
            result = reject(exception);
          }
          if (resolve) {
            resolve(result);
          }
        };
        promise2.inspect = inspect;
        if (inspect) {
          var inspected = inspect();
          if (inspected.state === "rejected") {
            promise2.exception = inspected.reason;
          }
          promise2.valueOf = function() {
            var inspected2 = inspect();
            if (inspected2.state === "pending" || inspected2.state === "rejected") {
              return promise2;
            }
            return inspected2.value;
          };
        }
        return promise2;
      }
      Promise2.prototype.toString = function() {
        return "[object Promise]";
      };
      Promise2.prototype.then = function(fulfilled, rejected, progressed) {
        var self2 = this;
        var deferred = defer();
        var done = false;
        function _fulfilled(value) {
          try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
          } catch (exception) {
            return reject(exception);
          }
        }
        function _rejected(exception) {
          if (typeof rejected === "function") {
            makeStackTraceLong(exception, self2);
            try {
              return rejected(exception);
            } catch (newException) {
              return reject(newException);
            }
          }
          return reject(exception);
        }
        function _progressed(value) {
          return typeof progressed === "function" ? progressed(value) : value;
        }
        Q.nextTick(function() {
          self2.promiseDispatch(function(value) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_fulfilled(value));
          }, "when", [function(exception) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_rejected(exception));
          }]);
        });
        self2.promiseDispatch(void 0, "when", [void 0, function(value) {
          var newValue;
          var threw = false;
          try {
            newValue = _progressed(value);
          } catch (e) {
            threw = true;
            if (Q.onerror) {
              Q.onerror(e);
            } else {
              throw e;
            }
          }
          if (!threw) {
            deferred.notify(newValue);
          }
        }]);
        return deferred.promise;
      };
      Q.tap = function(promise2, callback) {
        return Q(promise2).tap(callback);
      };
      Promise2.prototype.tap = function(callback) {
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall(value).thenResolve(value);
        });
      };
      Q.when = when;
      function when(value, fulfilled, rejected, progressed) {
        return Q(value).then(fulfilled, rejected, progressed);
      }
      Promise2.prototype.thenResolve = function(value) {
        return this.then(function() {
          return value;
        });
      };
      Q.thenResolve = function(promise2, value) {
        return Q(promise2).thenResolve(value);
      };
      Promise2.prototype.thenReject = function(reason) {
        return this.then(function() {
          throw reason;
        });
      };
      Q.thenReject = function(promise2, reason) {
        return Q(promise2).thenReject(reason);
      };
      Q.nearer = nearer;
      function nearer(value) {
        if (isPromise(value)) {
          var inspected = value.inspect();
          if (inspected.state === "fulfilled") {
            return inspected.value;
          }
        }
        return value;
      }
      Q.isPromise = isPromise;
      function isPromise(object) {
        return object instanceof Promise2;
      }
      Q.isPromiseAlike = isPromiseAlike;
      function isPromiseAlike(object) {
        return isObject(object) && typeof object.then === "function";
      }
      Q.isPending = isPending;
      function isPending(object) {
        return isPromise(object) && object.inspect().state === "pending";
      }
      Promise2.prototype.isPending = function() {
        return this.inspect().state === "pending";
      };
      Q.isFulfilled = isFulfilled;
      function isFulfilled(object) {
        return !isPromise(object) || object.inspect().state === "fulfilled";
      }
      Promise2.prototype.isFulfilled = function() {
        return this.inspect().state === "fulfilled";
      };
      Q.isRejected = isRejected;
      function isRejected(object) {
        return isPromise(object) && object.inspect().state === "rejected";
      }
      Promise2.prototype.isRejected = function() {
        return this.inspect().state === "rejected";
      };
      var unhandledReasons = [];
      var unhandledRejections = [];
      var reportedUnhandledRejections = [];
      var trackUnhandledRejections = true;
      function resetUnhandledRejections() {
        unhandledReasons.length = 0;
        unhandledRejections.length = 0;
        if (!trackUnhandledRejections) {
          trackUnhandledRejections = true;
        }
      }
      function trackRejection(promise2, reason) {
        if (!trackUnhandledRejections) {
          return;
        }
        if (typeof process === "object" && typeof process.emit === "function") {
          Q.nextTick.runAfter(function() {
            if (array_indexOf(unhandledRejections, promise2) !== -1) {
              process.emit("unhandledRejection", reason, promise2);
              reportedUnhandledRejections.push(promise2);
            }
          });
        }
        unhandledRejections.push(promise2);
        if (reason && typeof reason.stack !== "undefined") {
          unhandledReasons.push(reason.stack);
        } else {
          unhandledReasons.push("(no stack) " + reason);
        }
      }
      function untrackRejection(promise2) {
        if (!trackUnhandledRejections) {
          return;
        }
        var at = array_indexOf(unhandledRejections, promise2);
        if (at !== -1) {
          if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function() {
              var atReport = array_indexOf(reportedUnhandledRejections, promise2);
              if (atReport !== -1) {
                process.emit("rejectionHandled", unhandledReasons[at], promise2);
                reportedUnhandledRejections.splice(atReport, 1);
              }
            });
          }
          unhandledRejections.splice(at, 1);
          unhandledReasons.splice(at, 1);
        }
      }
      Q.resetUnhandledRejections = resetUnhandledRejections;
      Q.getUnhandledReasons = function() {
        return unhandledReasons.slice();
      };
      Q.stopUnhandledRejectionTracking = function() {
        resetUnhandledRejections();
        trackUnhandledRejections = false;
      };
      resetUnhandledRejections();
      Q.reject = reject;
      function reject(reason) {
        var rejection = Promise2({
          "when": function(rejected) {
            if (rejected) {
              untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
          }
        }, function fallback() {
          return this;
        }, function inspect() {
          return { state: "rejected", reason };
        });
        trackRejection(rejection, reason);
        return rejection;
      }
      Q.fulfill = fulfill;
      function fulfill(value) {
        return Promise2({
          "when": function() {
            return value;
          },
          "get": function(name) {
            return value[name];
          },
          "set": function(name, rhs) {
            value[name] = rhs;
          },
          "delete": function(name) {
            delete value[name];
          },
          "post": function(name, args2) {
            if (name === null || name === void 0) {
              return value.apply(void 0, args2);
            } else {
              return value[name].apply(value, args2);
            }
          },
          "apply": function(thisp, args2) {
            return value.apply(thisp, args2);
          },
          "keys": function() {
            return object_keys(value);
          }
        }, void 0, function inspect() {
          return { state: "fulfilled", value };
        });
      }
      function coerce(promise2) {
        var deferred = defer();
        Q.nextTick(function() {
          try {
            promise2.then(deferred.resolve, deferred.reject, deferred.notify);
          } catch (exception) {
            deferred.reject(exception);
          }
        });
        return deferred.promise;
      }
      Q.master = master;
      function master(object) {
        return Promise2({
          "isDef": function() {
          }
        }, function fallback(op, args2) {
          return dispatch(object, op, args2);
        }, function() {
          return Q(object).inspect();
        });
      }
      Q.spread = spread;
      function spread(value, fulfilled, rejected) {
        return Q(value).spread(fulfilled, rejected);
      }
      Promise2.prototype.spread = function(fulfilled, rejected) {
        return this.all().then(function(array) {
          return fulfilled.apply(void 0, array);
        }, rejected);
      };
      Q.async = async;
      function async(makeGenerator) {
        return function() {
          function continuer(verb, arg) {
            var result;
            if (typeof StopIteration === "undefined") {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                return reject(exception);
              }
              if (result.done) {
                return Q(result.value);
              } else {
                return when(result.value, callback, errback);
              }
            } else {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                if (isStopIteration(exception)) {
                  return Q(exception.value);
                } else {
                  return reject(exception);
                }
              }
              return when(result, callback, errback);
            }
          }
          var generator = makeGenerator.apply(this, arguments);
          var callback = continuer.bind(continuer, "next");
          var errback = continuer.bind(continuer, "throw");
          return callback();
        };
      }
      Q.spawn = spawn;
      function spawn(makeGenerator) {
        Q.done(Q.async(makeGenerator)());
      }
      Q["return"] = _return;
      function _return(value) {
        throw new QReturnValue(value);
      }
      Q.promised = promised;
      function promised(callback) {
        return function() {
          return spread([this, all(arguments)], function(self2, args2) {
            return callback.apply(self2, args2);
          });
        };
      }
      Q.dispatch = dispatch;
      function dispatch(object, op, args2) {
        return Q(object).dispatch(op, args2);
      }
      Promise2.prototype.dispatch = function(op, args2) {
        var self2 = this;
        var deferred = defer();
        Q.nextTick(function() {
          self2.promiseDispatch(deferred.resolve, op, args2);
        });
        return deferred.promise;
      };
      Q.get = function(object, key2) {
        return Q(object).dispatch("get", [key2]);
      };
      Promise2.prototype.get = function(key2) {
        return this.dispatch("get", [key2]);
      };
      Q.set = function(object, key2, value) {
        return Q(object).dispatch("set", [key2, value]);
      };
      Promise2.prototype.set = function(key2, value) {
        return this.dispatch("set", [key2, value]);
      };
      Q.del = // XXX legacy
      Q["delete"] = function(object, key2) {
        return Q(object).dispatch("delete", [key2]);
      };
      Promise2.prototype.del = // XXX legacy
      Promise2.prototype["delete"] = function(key2) {
        return this.dispatch("delete", [key2]);
      };
      Q.mapply = // XXX As proposed by "Redsandro"
      Q.post = function(object, name, args2) {
        return Q(object).dispatch("post", [name, args2]);
      };
      Promise2.prototype.mapply = // XXX As proposed by "Redsandro"
      Promise2.prototype.post = function(name, args2) {
        return this.dispatch("post", [name, args2]);
      };
      Q.send = // XXX Mark Miller's proposed parlance
      Q.mcall = // XXX As proposed by "Redsandro"
      Q.invoke = function(object, name) {
        return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
      };
      Promise2.prototype.send = // XXX Mark Miller's proposed parlance
      Promise2.prototype.mcall = // XXX As proposed by "Redsandro"
      Promise2.prototype.invoke = function(name) {
        return this.dispatch("post", [name, array_slice(arguments, 1)]);
      };
      Q.fapply = function(object, args2) {
        return Q(object).dispatch("apply", [void 0, args2]);
      };
      Promise2.prototype.fapply = function(args2) {
        return this.dispatch("apply", [void 0, args2]);
      };
      Q["try"] = Q.fcall = function(object) {
        return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
      };
      Promise2.prototype.fcall = function() {
        return this.dispatch("apply", [void 0, array_slice(arguments)]);
      };
      Q.fbind = function(object) {
        var promise2 = Q(object);
        var args2 = array_slice(arguments, 1);
        return function fbound() {
          return promise2.dispatch("apply", [
            this,
            args2.concat(array_slice(arguments))
          ]);
        };
      };
      Promise2.prototype.fbind = function() {
        var promise2 = this;
        var args2 = array_slice(arguments);
        return function fbound() {
          return promise2.dispatch("apply", [
            this,
            args2.concat(array_slice(arguments))
          ]);
        };
      };
      Q.keys = function(object) {
        return Q(object).dispatch("keys", []);
      };
      Promise2.prototype.keys = function() {
        return this.dispatch("keys", []);
      };
      Q.all = all;
      function all(promises) {
        return when(promises, function(promises2) {
          var pendingCount = 0;
          var deferred = defer();
          array_reduce(promises2, function(undefined2, promise2, index) {
            var snapshot;
            if (isPromise(promise2) && (snapshot = promise2.inspect()).state === "fulfilled") {
              promises2[index] = snapshot.value;
            } else {
              ++pendingCount;
              when(
                promise2,
                function(value) {
                  promises2[index] = value;
                  if (--pendingCount === 0) {
                    deferred.resolve(promises2);
                  }
                },
                deferred.reject,
                function(progress2) {
                  deferred.notify({ index, value: progress2 });
                }
              );
            }
          }, void 0);
          if (pendingCount === 0) {
            deferred.resolve(promises2);
          }
          return deferred.promise;
        });
      }
      Promise2.prototype.all = function() {
        return all(this);
      };
      Q.any = any;
      function any(promises) {
        if (promises.length === 0) {
          return Q.resolve();
        }
        var deferred = Q.defer();
        var pendingCount = 0;
        array_reduce(promises, function(prev, current, index) {
          var promise2 = promises[index];
          pendingCount++;
          when(promise2, onFulfilled, onRejected, onProgress);
          function onFulfilled(result) {
            deferred.resolve(result);
          }
          function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
              err.message = "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: " + err.message;
              deferred.reject(err);
            }
          }
          function onProgress(progress2) {
            deferred.notify({
              index,
              value: progress2
            });
          }
        }, void 0);
        return deferred.promise;
      }
      Promise2.prototype.any = function() {
        return any(this);
      };
      Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
      function allResolved(promises) {
        return when(promises, function(promises2) {
          promises2 = array_map(promises2, Q);
          return when(all(array_map(promises2, function(promise2) {
            return when(promise2, noop, noop);
          })), function() {
            return promises2;
          });
        });
      }
      Promise2.prototype.allResolved = function() {
        return allResolved(this);
      };
      Q.allSettled = allSettled;
      function allSettled(promises) {
        return Q(promises).allSettled();
      }
      Promise2.prototype.allSettled = function() {
        return this.then(function(promises) {
          return all(array_map(promises, function(promise2) {
            promise2 = Q(promise2);
            function regardless() {
              return promise2.inspect();
            }
            return promise2.then(regardless, regardless);
          }));
        });
      };
      Q.fail = // XXX legacy
      Q["catch"] = function(object, rejected) {
        return Q(object).then(void 0, rejected);
      };
      Promise2.prototype.fail = // XXX legacy
      Promise2.prototype["catch"] = function(rejected) {
        return this.then(void 0, rejected);
      };
      Q.progress = progress;
      function progress(object, progressed) {
        return Q(object).then(void 0, void 0, progressed);
      }
      Promise2.prototype.progress = function(progressed) {
        return this.then(void 0, void 0, progressed);
      };
      Q.fin = // XXX legacy
      Q["finally"] = function(object, callback) {
        return Q(object)["finally"](callback);
      };
      Promise2.prototype.fin = // XXX legacy
      Promise2.prototype["finally"] = function(callback) {
        if (!callback || typeof callback.apply !== "function") {
          throw new Error("Q can't apply finally callback");
        }
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall().then(function() {
            return value;
          });
        }, function(reason) {
          return callback.fcall().then(function() {
            throw reason;
          });
        });
      };
      Q.done = function(object, fulfilled, rejected, progress2) {
        return Q(object).done(fulfilled, rejected, progress2);
      };
      Promise2.prototype.done = function(fulfilled, rejected, progress2) {
        var onUnhandledError = function(error) {
          Q.nextTick(function() {
            makeStackTraceLong(error, promise2);
            if (Q.onerror) {
              Q.onerror(error);
            } else {
              throw error;
            }
          });
        };
        var promise2 = fulfilled || rejected || progress2 ? this.then(fulfilled, rejected, progress2) : this;
        if (typeof process === "object" && process && process.domain) {
          onUnhandledError = process.domain.bind(onUnhandledError);
        }
        promise2.then(void 0, onUnhandledError);
      };
      Q.timeout = function(object, ms, error) {
        return Q(object).timeout(ms, error);
      };
      Promise2.prototype.timeout = function(ms, error) {
        var deferred = defer();
        var timeoutId = setTimeout(function() {
          if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
          }
          deferred.reject(error);
        }, ms);
        this.then(function(value) {
          clearTimeout(timeoutId);
          deferred.resolve(value);
        }, function(exception) {
          clearTimeout(timeoutId);
          deferred.reject(exception);
        }, deferred.notify);
        return deferred.promise;
      };
      Q.delay = function(object, timeout) {
        if (timeout === void 0) {
          timeout = object;
          object = void 0;
        }
        return Q(object).delay(timeout);
      };
      Promise2.prototype.delay = function(timeout) {
        return this.then(function(value) {
          var deferred = defer();
          setTimeout(function() {
            deferred.resolve(value);
          }, timeout);
          return deferred.promise;
        });
      };
      Q.nfapply = function(callback, args2) {
        return Q(callback).nfapply(args2);
      };
      Promise2.prototype.nfapply = function(args2) {
        var deferred = defer();
        var nodeArgs = array_slice(args2);
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfcall = function(callback) {
        var args2 = array_slice(arguments, 1);
        return Q(callback).nfapply(args2);
      };
      Promise2.prototype.nfcall = function() {
        var nodeArgs = array_slice(arguments);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfbind = Q.denodeify = function(callback) {
        if (callback === void 0) {
          throw new Error("Q can't wrap an undefined function");
        }
        var baseArgs = array_slice(arguments, 1);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          Q(callback).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise2.prototype.nfbind = Promise2.prototype.denodeify = function() {
        var args2 = array_slice(arguments);
        args2.unshift(this);
        return Q.denodeify.apply(void 0, args2);
      };
      Q.nbind = function(callback, thisp) {
        var baseArgs = array_slice(arguments, 2);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          function bound() {
            return callback.apply(thisp, arguments);
          }
          Q(bound).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise2.prototype.nbind = function() {
        var args2 = array_slice(arguments, 0);
        args2.unshift(this);
        return Q.nbind.apply(void 0, args2);
      };
      Q.nmapply = // XXX As proposed by "Redsandro"
      Q.npost = function(object, name, args2) {
        return Q(object).npost(name, args2);
      };
      Promise2.prototype.nmapply = // XXX As proposed by "Redsandro"
      Promise2.prototype.npost = function(name, args2) {
        var nodeArgs = array_slice(args2 || []);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nsend = // XXX Based on Mark Miller's proposed "send"
      Q.nmcall = // XXX Based on "Redsandro's" proposal
      Q.ninvoke = function(object, name) {
        var nodeArgs = array_slice(arguments, 2);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Promise2.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
      Promise2.prototype.nmcall = // XXX Based on "Redsandro's" proposal
      Promise2.prototype.ninvoke = function(name) {
        var nodeArgs = array_slice(arguments, 1);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nodeify = nodeify;
      function nodeify(object, nodeback) {
        return Q(object).nodeify(nodeback);
      }
      Promise2.prototype.nodeify = function(nodeback) {
        if (nodeback) {
          this.then(function(value) {
            Q.nextTick(function() {
              nodeback(null, value);
            });
          }, function(error) {
            Q.nextTick(function() {
              nodeback(error);
            });
          });
        } else {
          return this;
        }
      };
      Q.noConflict = function() {
        throw new Error("Q.noConflict only works when Q is used as a global");
      };
      var qEndingLine = captureLine();
      return Q;
    });
  }
});

// node_modules/local-ipv4-address/detectors/windows.js
var require_windows = __commonJS({
  "node_modules/local-ipv4-address/detectors/windows.js"(exports2, module2) {
    var childProcess = require("child_process");
    var Q = require_q();
    var DEFAULT_GATEWAY_LINE_PATTERN = /\n(?:\s*0\.0\.0\.0\s*){2}(.*?)\r?\n=========/m;
    module2.exports.detectLocalIpV4Address = function() {
      return Q.nfcall(childProcess.execFile, "route", ["print", "-4", "0.0.0.0"]).spread(function(stdout, stderr) {
        var matches = stdout.match(DEFAULT_GATEWAY_LINE_PATTERN);
        if (matches) {
          var columns = matches[1].split(/\s+/);
          var ipAddress = columns[1];
          return ipAddress;
        } else {
          throw new Error("Could not find default gateway route in routing table.");
        }
      });
    };
  }
});

// node_modules/local-ipv4-address/detectors/ifconfig.js
var require_ifconfig = __commonJS({
  "node_modules/local-ipv4-address/detectors/ifconfig.js"(exports2, module2) {
    var os = require("os");
    module2.exports.getIpV4AddressForInterface = function(interfaceName) {
      var interface2 = os.networkInterfaces()[interfaceName];
      var ipv4Address = interface2.filter(function(address) {
        return address.family === "IPv4";
      })[0].address;
      return ipv4Address;
    };
  }
});

// node_modules/local-ipv4-address/detectors/linux.js
var require_linux = __commonJS({
  "node_modules/local-ipv4-address/detectors/linux.js"(exports2, module2) {
    var childProcess = require("child_process");
    var ifconfig = require_ifconfig();
    var Q = require_q();
    var DEFAULT_GATEWAY_LINE_PATTERN = /\n0\.0\.0\.0.*?\s*(\w+?)\n/m;
    module2.exports.detectLocalIpV4Address = function() {
      return Q.nfcall(childProcess.execFile, "netstat", [
        "-r",
        "-n",
        "-A",
        "inet"
      ]).spread(function(stdout, stderr) {
        var matches = stdout.match(DEFAULT_GATEWAY_LINE_PATTERN);
        if (matches) {
          var interfaceName = matches[1];
          return interfaceName;
        } else {
          throw new Error("Could not find default gateway route in routing table.");
        }
      }).then(ifconfig.getIpV4AddressForInterface);
    };
  }
});

// node_modules/local-ipv4-address/detectors/freebsd.js
var require_freebsd = __commonJS({
  "node_modules/local-ipv4-address/detectors/freebsd.js"(exports2, module2) {
    var childProcess = require("child_process");
    var ifconfig = require_ifconfig();
    var Q = require_q();
    var DEFAULT_GATEWAY_LINE_PATTERN = /Internet:[^]+?\n(default.*?\n)/m;
    module2.exports.detectLocalIpV4Address = function() {
      return Q.nfcall(childProcess.execFile, "netstat", [
        "-r",
        "-n",
        "-f",
        "inet"
      ]).spread(function(stdout, stderr) {
        var matches = stdout.match(DEFAULT_GATEWAY_LINE_PATTERN);
        if (matches) {
          var columns = matches[1].trim().split(/\s+/);
          var interfaceName = columns[columns.length - 1];
          return interfaceName;
        } else {
          throw new Error("Could not find default gateway route in routing table.");
        }
      }).then(ifconfig.getIpV4AddressForInterface);
    };
  }
});

// node_modules/local-ipv4-address/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/local-ipv4-address/detectors/index.js"(exports2, module2) {
    module2.exports = {
      win32: require_windows(),
      linux: require_linux(),
      freebsd: require_freebsd(),
      darwin: require_freebsd()
    };
  }
});

// node_modules/local-ipv4-address/index.js
var require_local_ipv4_address = __commonJS({
  "node_modules/local-ipv4-address/index.js"(exports2, module2) {
    var detectors = require_detectors();
    var os = require("os");
    var Q = require_q();
    var main = module2.exports = function() {
      return Q().then(function() {
        var detector = detectors[os.platform()];
        if (detector) {
          return detector.detectLocalIpV4Address();
        } else {
          throw new Error('Sorry, your operating system "' + os.platform() + '" is not supported. You are welcome to submit a pull request if you want.');
        }
      });
    };
    if (require.main === module2) {
      main().then(function(ipAddress) {
        console.log(ipAddress);
      }, function(err) {
        console.error(err.message);
        process.exit(1);
      });
    }
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "TEFIAgent",
      version: "2.2.2",
      description: "proxy for tefi",
      main: "server.js",
      author: "Fujitsu",
      license: "MIT",
      dependencies: {
        dotenv: "^16.3.1",
        extend: "^3.0.2",
        "local-ipv4-address": "^0.0.2",
        log4js: "^6.9.1",
        net: "^1.0.2",
        "socket.io-client": "^2.5.0",
        uuid: "^10.0.0",
        esbuild: "^0.23.0",
        express: "^4.18.2"
      },
      devDependencies: {
        "@types/express": "^4.17.17",
        "@types/node": "^20.14.12"
      },
      scripts: {
        build: "esbuild server.js --bundle --platform=node --outfile=server-out.js",
        "generate-blob": "node --experimental-sea-config sea-config.json",
        "copy-node": "mkdir release && cp -v '/c/Program Files/nodejs/node.exe' release/tefi-proxy.exe",
        "inject-blob": "npx postject release/tefi-proxy.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
        test: 'echo "Error: no test specified" && exit 1'
      },
      engines: {
        node: ">=20.0.0 < 21.0.0"
      }
    };
  }
});

// proxy/web/client.js
var require_client = __commonJS({
  "proxy/web/client.js"(exports2, module2) {
    var io = require_lib3();
    var extend = require_extend();
    var logger = require_logger2();
    var os = require("os");
    var localIpV4Address = require_local_ipv4_address();
    var pjson = require_package();
    var Client = class {
      constructor(proxy, config2) {
        this.connection = {};
        this.callbacks = {};
        this.config = config2;
        this.proxy = proxy;
      }
      open(url) {
        this.connection = io(url, { secure: true, rejectUnauthorized: false });
        this.connection.on("connect", this.onConnect.bind(this));
        this.connection.on("disconnect", this.onDisconnect.bind(this));
        this.connection.on("proxy.register", this.onRegister.bind(this));
        this.connection.on("proxy.data", this.onData.bind(this));
        this.connection.on("proxy.pair", this.onPair.bind(this));
        this.connection.on("proxy.configure", this.onConfigure.bind(this));
        try {
          logger.log("info", "TEFI Proxy version " + pjson.version);
        } catch {
          logger.log("error", "Failed to log TEFI Proxy version");
        }
        logger.log("info", "connecting to web harness at " + url);
      }
      async onConnect() {
        logger.log("debug", "web client connected");
        var ipAddress = await localIpV4Address();
        this.config.fingerprint = {
          hostname: os.hostname(),
          localIp: ipAddress,
          directory: this.config.cwd
        };
        this.connection.emit("proxy.register", this.config);
        if (this.callbacks.hasOwnProperty("connected")) {
          this.callbacks["connected"]();
        }
      }
      onDisconnect() {
        logger.log("debug", "web client disconnected");
      }
      onPair(data) {
        logger.log("debug", "web requests pairing");
        if (this.callbacks.hasOwnProperty("pair")) {
          this.callbacks["pair"](data);
        }
      }
      onRegister(data) {
        if (data.result == "success") {
          logger.log("info", 'PROXY IDENTIFIED AS "' + data.identity.human + '" (HASH ' + data.identity.hash + ")");
          this.proxy.identity = data.identity;
          if (this.callbacks.hasOwnProperty("register")) {
            this.callbacks["register"](data);
          }
        } else if (data.result == "error") {
          var message = data.message;
          logger.log("error", "web client register error: " + message);
          if (this.callbacks.hasOwnProperty("error")) {
            this.callbacks["error"](data);
          }
        }
      }
      onData(data) {
        logger.debug("web received data", data);
        if (this.callbacks.hasOwnProperty("data")) {
          this.callbacks["data"](data);
        }
      }
      onConfigure(config2) {
        logger.debug("web received configuration", JSON.stringify(config2, null, 2));
        logger.debug("Existing config", JSON.stringify(this.config, null, 2));
        logger.log("debug", 'proxy state "' + JSON.stringify(config2.state, null, 2) + '"');
        this.config = extend(true, this.config, config2);
        if (this.callbacks.hasOwnProperty("configure")) {
          this.callbacks["configure"](config2);
        }
      }
      emit(message) {
        this.connection.emit("proxy.data", message);
      }
      on(event, callback) {
        this.callbacks[event] = callback;
      }
    };
    module2.exports = Client;
  }
});

// proxy/cad/client.js
var require_client2 = __commonJS({
  "proxy/cad/client.js"(exports2, module2) {
    var net = require("net");
    var logger = require_logger2();
    var Client = class {
      constructor() {
      }
      static sendMessage(destination, message) {
        if (!destination.primary.host || destination.primary.host.length == 0) {
          logger.error("primary host not provided");
          return;
        }
        if (!destination.primary.port || destination.primary.port.length == 0) {
          logger.error("primary port not provided");
          return;
        }
        logger.debug("Trying to send a message to primary local cad on", destination.primary.host, destination.primary.port);
        var client = net.createConnection(destination.primary.port, destination.primary.host, () => {
          logger.log("debug", "cad client connected");
          client.write(message, "utf8", () => {
            logger.log("debug", "cad client disconnected");
            client.end();
          });
        }).on("error", function(error) {
          logger.error("Could not send message to CAD client on primary", error);
          if (!destination.secondary.host || destination.secondary.host.length == 0) {
            logger.error("secondary host not provided");
            return;
          }
          if (!destination.secondary.port || destination.secondary.port.length == 0) {
            logger.error("secondary port not provided");
            return;
          }
          logger.debug("Trying to send a message to secondary local cad on", destination.secondary.host, destination.secondary.port);
          var client2 = net.createConnection(destination.secondary.port, destination.secondary.host, () => {
            logger.log("debug", "cad client connected");
            client2.write(message, "utf8", () => {
              logger.log("debug", "cad client disconnected");
              client2.end();
            });
          }).on("error", function(error2) {
            logger.error("Could not send message to CAD client on secondary", error2);
          });
        });
      }
    };
    module2.exports = Client;
  }
});

// node_modules/uuid/dist/esm-node/max.js
var max_default;
var init_max = __esm({
  "node_modules/uuid/dist/esm-node/max.js"() {
    max_default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  }
});

// node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
  }
});

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-node/stringify.js
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_node_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_node_crypto, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-node/rng.js"() {
    import_node_crypto = __toESM(require("node:crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node;
  let clockseq = options.clockseq;
  if (!options._v6) {
    if (!node) {
      node = _nodeId;
    }
    if (clockseq == null) {
      clockseq = _clockseq;
    }
  }
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      if (!_nodeId && !options._v6) {
        node[0] |= 1;
        _nodeId = node;
      }
    }
    if (clockseq == null) {
      clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
      if (_clockseq === void 0 && !options._v6) {
        _clockseq = clockseq;
      }
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || unsafeStringify(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-node/v1ToV6.js
function v1ToV6(uuid) {
  const v1Bytes = typeof uuid === "string" ? parse_default(uuid) : uuid;
  const v6Bytes = _v1ToV6(v1Bytes);
  return typeof uuid === "string" ? unsafeStringify(v6Bytes) : v6Bytes;
}
function _v1ToV6(v1Bytes, randomize = false) {
  return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}
var init_v1ToV6 = __esm({
  "node_modules/uuid/dist/esm-node/v1ToV6.js"() {
    init_parse();
    init_stringify();
  }
});

// node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_node_crypto2.default.createHash("md5").update(bytes).digest();
}
var import_node_crypto2, md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-node/md5.js"() {
    import_node_crypto2 = __toESM(require("node:crypto"));
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-node/native.js
var import_node_crypto3, native_default;
var init_native = __esm({
  "node_modules/uuid/dist/esm-node/native.js"() {
    import_node_crypto3 = __toESM(require("node:crypto"));
    native_default = {
      randomUUID: import_node_crypto3.default.randomUUID
    };
  }
});

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-node/v4.js"() {
    init_native();
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_node_crypto4.default.createHash("sha1").update(bytes).digest();
}
var import_node_crypto4, sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-node/sha1.js"() {
    import_node_crypto4 = __toESM(require("node:crypto"));
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-node/v6.js
function v6(options = {}, buf, offset = 0) {
  let bytes = v1_default({
    ...options,
    _v6: true
  }, new Uint8Array(16));
  bytes = v1ToV6(bytes);
  if (buf) {
    for (let i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return unsafeStringify(bytes);
}
var init_v6 = __esm({
  "node_modules/uuid/dist/esm-node/v6.js"() {
    init_stringify();
    init_v1();
    init_v1ToV6();
  }
});

// node_modules/uuid/dist/esm-node/v6ToV1.js
function v6ToV1(uuid) {
  const v6Bytes = typeof uuid === "string" ? parse_default(uuid) : uuid;
  const v1Bytes = _v6ToV1(v6Bytes);
  return typeof uuid === "string" ? unsafeStringify(v1Bytes) : v1Bytes;
}
function _v6ToV1(v6Bytes) {
  return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}
var init_v6ToV1 = __esm({
  "node_modules/uuid/dist/esm-node/v6ToV1.js"() {
    init_parse();
    init_stringify();
  }
});

// node_modules/uuid/dist/esm-node/v7.js
function v7(options, buf, offset) {
  options = options || {};
  let i = buf && offset || 0;
  const b = buf || new Uint8Array(16);
  const rnds = options.random || (options.rng || rng)();
  const msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let seq = options.seq !== void 0 ? options.seq : null;
  let seqHigh = _seqHigh;
  let seqLow = _seqLow;
  if (msecs > _msecs && options.msecs === void 0) {
    _msecs = msecs;
    if (seq !== null) {
      seqHigh = null;
      seqLow = null;
    }
  }
  if (seq !== null) {
    if (seq > 2147483647) {
      seq = 2147483647;
    }
    seqHigh = seq >>> 19 & 4095;
    seqLow = seq & 524287;
  }
  if (seqHigh === null || seqLow === null) {
    seqHigh = rnds[6] & 127;
    seqHigh = seqHigh << 8 | rnds[7];
    seqLow = rnds[8] & 63;
    seqLow = seqLow << 8 | rnds[9];
    seqLow = seqLow << 5 | rnds[10] >>> 3;
  }
  if (msecs + 1e4 > _msecs && seq === null) {
    if (++seqLow > 524287) {
      seqLow = 0;
      if (++seqHigh > 4095) {
        seqHigh = 0;
        _msecs++;
      }
    }
  } else {
    _msecs = msecs;
  }
  _seqHigh = seqHigh;
  _seqLow = seqLow;
  b[i++] = _msecs / 1099511627776 & 255;
  b[i++] = _msecs / 4294967296 & 255;
  b[i++] = _msecs / 16777216 & 255;
  b[i++] = _msecs / 65536 & 255;
  b[i++] = _msecs / 256 & 255;
  b[i++] = _msecs & 255;
  b[i++] = seqHigh >>> 4 & 15 | 112;
  b[i++] = seqHigh & 255;
  b[i++] = seqLow >>> 13 & 63 | 128;
  b[i++] = seqLow >>> 5 & 255;
  b[i++] = seqLow << 3 & 255 | rnds[10] & 7;
  b[i++] = rnds[11];
  b[i++] = rnds[12];
  b[i++] = rnds[13];
  b[i++] = rnds[14];
  b[i++] = rnds[15];
  return buf || unsafeStringify(b);
}
var _seqLow, _seqHigh, _msecs, v7_default;
var init_v7 = __esm({
  "node_modules/uuid/dist/esm-node/v7.js"() {
    init_rng();
    init_stringify();
    _seqLow = null;
    _seqHigh = null;
    _msecs = 0;
    v7_default = v7;
  }
});

// node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.slice(14, 15), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  MAX: () => max_default,
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v1ToV6: () => v1ToV6,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  v6: () => v6,
  v6ToV1: () => v6ToV1,
  v7: () => v7_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/uuid/dist/esm-node/index.js"() {
    init_max();
    init_nil();
    init_parse();
    init_stringify();
    init_v1();
    init_v1ToV6();
    init_v3();
    init_v4();
    init_v5();
    init_v6();
    init_v6ToV1();
    init_v7();
    init_validate();
    init_version();
  }
});

// proxy/cad/server.js
var require_server = __commonJS({
  "proxy/cad/server.js"(exports2, module2) {
    var net = require("net");
    var { v1: uuidv1 } = (init_esm_node(), __toCommonJS(esm_node_exports));
    var logger = require_logger2();
    var Server = class {
      constructor(nodeGuid, config2) {
        this.nodeGuid = nodeGuid;
        this.cache = {};
        this.callbacks = {};
        this.config = config2;
        this.pool = null;
        this.connection = {
          primary: null,
          secondary: null
        };
      }
      create(pool) {
        this.pool = pool;
        this.connection.primary = net.createServer(this.onConnected.bind(this));
        this.connection.secondary = net.createServer(this.onConnected.bind(this));
      }
      async listen(toPrimary, toSecondary) {
        await this.setState("primary", toPrimary);
        await this.setState("secondary", toSecondary);
      }
      async shutdown() {
        await this.connection.primary.close(this.onShutdown.bind(this, "primary", this.config.local.primary.port));
        await this.connection.secondary.close(this.onShutdown.bind(this, "secondary", this.config.local.secondary.port));
      }
      async setState(type, toOn) {
        var connection = this.connection[type];
        var port = this.config.local.primary.port;
        if (type === "secondary") {
          port = this.config.local.secondary.port;
        }
        if (toOn) {
          if (connection && !connection.listening) {
            await connection.listen(port, this.onStart.bind(this, type, port));
          }
        } else {
          if (connection && connection.listening) {
            await connection.close(this.onShutdown.bind(this, type, port));
          }
        }
      }
      onStart(type, port) {
        logger.log(
          "debug",
          "started " + type + " cad server on port " + port
          /*+ " \"" + this.config.id + "-" + this.config.name + "-" + this.config.environment + "\""*/
        );
      }
      onConnected(socket) {
        socket.id = uuidv1();
        logger.log("debug", "client connected (" + socket.remoteAddress + ": " + socket.remotePort + " " + socket.remoteFamily + ") " + socket.id);
        var type = "primary";
        if (socket.localPort == this.config.local.secondary.port) {
          type = "secondary";
        }
        this.cache[socket.id] = {
          client: {
            address: socket.remoteAddress,
            port: socket.remotePort,
            family: socket.remoteFamily
          },
          server: {
            nodeGuid: this.nodeGuid,
            address: socket.localAddress,
            port: socket.localPort,
            type
          },
          config: this.config,
          payload: ""
        };
        socket.on("data", this.onData.bind(this, socket.id));
        socket.on("end", this.onEnd.bind(this, socket.id));
        if (this.callbacks.hasOwnProperty("connected")) {
          this.callbacks["connected"]();
        }
      }
      onData(id, data) {
        this.cache[id].payload += data.toString("utf8");
        if (this.callbacks.hasOwnProperty("data")) {
          this.callbacks["data"](data);
        }
      }
      onEnd(id) {
        logger.log("debug", "client disconnected");
        logger.debug("message received", this.cache[id]);
        if (this.callbacks.hasOwnProperty("end")) {
          this.callbacks["end"](this.cache[id]);
        }
        delete this.cache[id];
      }
      on(event, callback) {
        this.callbacks[event] = callback;
      }
      onShutdown(type, port) {
        logger.log(
          "debug",
          "shutdown " + type + " cad server on port " + port
          /*+ " \"" + this.config.id + "-" + this.config.name + "-" + this.config.environment + "\""*/
        );
      }
    };
    module2.exports = Server;
  }
});

// proxy/cad/pool.js
var require_pool = __commonJS({
  "proxy/cad/pool.js"(exports2, module2) {
    var logger = require_logger2();
    var Server = require_server();
    var Pool = class {
      constructor() {
        this.servers = {};
        this.callbacks = {};
        this.config = null;
      }
      async configure(open) {
        this.config = open;
        logger.debug("Pool about to configure", this.config);
        var configuredServers = [];
        if (this.config && this.config !== null) {
          for (const opener of this.config) {
            if (this.servers.hasOwnProperty(opener.from.node + opener.to.node)) {
              var server = this.servers[opener.from.node + opener.to.node];
              await server.listen(false, false);
              server.config = opener;
              await server.listen(opener.local.primary.status === "active", opener.local.secondary.status === "active");
            } else {
              var server = new Server(opener.to.node, opener);
              server.create(this);
              this.bindEvents(server);
              server.listen(opener.local.primary.status === "active", opener.local.secondary.status === "active");
              this.servers[opener.from.node + opener.to.node] = server;
            }
            configuredServers.push(opener.from.node + opener.to.node);
          }
        }
        var allServers = Object.keys(this.servers);
        var configuredServerSet = new Set(configuredServers);
        let difference = new Set([...allServers].filter((x) => !configuredServerSet.has(x)));
        for (let nodeGuid of difference) {
          var server = this.servers[nodeGuid];
          server.shutdown();
          delete this.servers[nodeGuid];
        }
      }
      bindEvents(server) {
        server.on("connected", this.onConnected.bind(this));
        server.on("data", this.onData.bind(this));
        server.on("end", this.onEnd.bind(this));
      }
      onConnected() {
        if (this.callbacks.hasOwnProperty("connected")) {
          this.callbacks["connected"]();
        }
      }
      onData(data) {
        if (this.callbacks.hasOwnProperty("data")) {
          this.callbacks["data"](data);
        }
      }
      onEnd(message) {
        if (this.callbacks.hasOwnProperty("end")) {
          this.callbacks["end"](message);
        }
      }
      on(event, callback) {
        this.callbacks[event] = callback;
      }
    };
    module2.exports = Pool;
  }
});

// proxy/proxy.js
var require_proxy = __commonJS({
  "proxy/proxy.js"(exports2, module2) {
    var extend = require_extend();
    var WebClient = require_client();
    var CadClient = require_client2();
    var Pool = require_pool();
    var logger = require_logger2();
    var Proxy3 = class {
      constructor(config2) {
        this.webClient = new WebClient(this, config2);
        this.pool = new Pool();
        this.config = config2;
        this.identity = null;
        this.init();
      }
      async init() {
        this.webClient.open(this.config.url + "/proxy");
        this.webClient.on("data", this.sendToCad.bind(this));
        this.webClient.on("pair", this.pairProxy.bind(this));
        this.webClient.on("configure", this.configureProxy.bind(this));
        this.pool.on("end", this.sendToHarness.bind(this));
      }
      async pairProxy(config2) {
        this.config = extend(true, this.config, config2);
        logger.log("info", 'PLEASE ENTER PAIRING CODE IN CLOUD SERVICE "' + this.config.pairingCode + '"');
      }
      async configureProxy(config2) {
        this.config = extend(true, this.config, config2);
        logger.debug("Proxy would be configuring with", JSON.stringify(this.config, null, 2));
        await this.pool.configure(config2.open);
      }
      sendToCad(message) {
        var payload = message.payload;
        CadClient.sendMessage(message.destination, payload);
      }
      sendToHarness(bundle) {
        bundle.identity = this.identity;
        logger.debug("Sending to harness..", JSON.stringify(bundle, null, 2));
        this.webClient.emit(bundle);
      }
    };
    module2.exports = Proxy3;
  }
});

// node_modules/dotenv/package.json
var require_package2 = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto5 = require("crypto");
    var packageJson = require_package2();
    var version2 = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key2 = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key2] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length2 = keys.length;
      let decrypted;
      for (let i = 0; i < length2; i++) {
        try {
          const key2 = keys[i].trim();
          const attrs = _instructions(result, key2);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length2) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version2}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version2}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version2}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key2 = uri.password;
      if (!key2) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key: key2 };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key2 = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto5.createDecipheriv("aes-256-gcm", key2, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key2 of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key2)) {
          if (override === true) {
            processEnv[key2] = parsed[key2];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key2}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key2}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key2] = parsed[key2];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse: parse2,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// server.js
var Proxy2 = require_proxy();
require_main().config();
var args = process.argv.slice(2);
var config = {
  url: process.env.URL || process.env.url,
  //url: "https://13.70.105.197:1337", // SandPit
  id: null
};
var length = args.length;
for (i = 0; i < length; i++) {
  item = args[i];
  keyValue = item.split("=");
  if (keyValue.length == 2) {
    key = keyValue[0].substr(2);
    config[key] = keyValue[1];
  }
}
var item;
var keyValue;
var i;
config.cwd = require("path").dirname(process.execPath);
var localProxy = new Proxy2(config);
/*! Bundled license information:

xmlhttprequest-ssl/lib/XMLHttpRequest.js:
  (**
   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
   *
   * This can be used with JS designed for browsers to improve reuse of code and
   * allow the use of existing libraries.
   *
   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
   *
   * @author Dan DeFelippi <dan@driverdan.com>
   * @contributor David Ellis <d.f.ellis@ieee.org>
   * @license MIT
   *)

engine.io-parser/lib/utf8.js:
  (*! https://mths.be/utf8js v2.1.2 by @mathias *)

q/q.js:
  (*!
   *
   * Copyright 2009-2017 Kris Kowal under the terms of the MIT
   * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
   *
   * With parts by Tyler Close
   * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
   * at http://www.opensource.org/licenses/mit-license.html
   * Forked at ref_send.js version: 2009-05-11
   *
   * With parts by Mark Miller
   * Copyright (C) 2011 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   *)
*/
