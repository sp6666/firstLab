var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../utils/Utils"),
    l = require("../Config"),
    r = require("../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urllogo = null;
            return e;
        }
        e.prototype.onLoad = function() {
            n.stringUtil.isBlank(l.Config.logo) ||
                (this.urllogo.url = r.uiHelps.getLogo());
        };
        __decorate([c(i.default)], e.prototype, "urllogo", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
