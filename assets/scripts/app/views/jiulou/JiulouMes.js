var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.list = null;
            e.lblAdd = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = n.jiulouProxy.win.yhnew;
            this.list.data = t.list;
            this.lblCount.string = i18n.t("JIU_LOU_MES_TXT", {
                num: n.jiulouProxy.win.yhnew.list.length
            });
            this.lblAdd.string = "+" + n.jiulouProxy.win.yhnew.allep;
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            n.jiulouProxy.win = null;
        };
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(l.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblAdd", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
