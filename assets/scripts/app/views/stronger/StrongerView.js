var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblShili = null;
            e.lblScore = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.servantProxy.servantList,
                e = l.taskProxy.getCurPower(),
                o =
                    l.playerProxy.userEp.e1 +
                    l.playerProxy.userEp.e2 +
                    l.playerProxy.userEp.e3 +
                    l.playerProxy.userEp.e4;
            this.list.data = t;
            this.lblShili.string = i.utils.formatMoney(o);
            e &&
                (this.lblScore.string =
                    i18n.t("STRONG_ZONG_HE_SHI_LI") +
                    (o >= e.power
                        ? i18n.t("STRONGER_YOU_XIU")
                        : i18n.t("STRONG_PU_TONG")));
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
