var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var l = require("../../utils/Utils"),
    Config = require("../../Config"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNotice = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblNotice.string = Config.Config.welcome_message;
        };
        e.prototype.onClickClost = function() {
            Config.Config.welcome_message = "";
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblNotice", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
