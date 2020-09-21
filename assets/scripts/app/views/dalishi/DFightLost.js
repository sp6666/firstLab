var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = n.dalishiProxy.win.fight;
            t &&
                (this.lblCount.string = i18n.t("DALISI_SCORE_MUL", {
                    d: t.items[0].count
                }));
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            (null != n.dalishiProxy.fight && 0 != n.dalishiProxy.fight.hid) ||
                i.utils.closeNameView("dalishi/DalishiServant");
        };
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
