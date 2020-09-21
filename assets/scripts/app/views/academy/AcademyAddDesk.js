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
            e.lblLv = null;
            e.lblExp = null;
            e.lblNum = null;
            e.hasCount = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblLv.string = i18n.t("COMMON_PALACE", {
                lv: n.playerProxy.userData.level
            });
            var t = localcache.getItem(
                localdb.table_governmentIncome,
                n.playerProxy.userData.level
            );
            t &&
                (this.lblExp.string = i18n.t("ACADEMY_EXP_ADD", {
                    value: t.exp
                }));
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickCreate = function() {
            this.hasCount > 1 && n.academyProxy.sendCreate();
        };
        __decorate([a(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
