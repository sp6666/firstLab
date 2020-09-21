var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblShiJian = null;
            e.lblFuQi = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.hedengProxy.HEDENG_OPEN_PAIHANG,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(r.hedengProxy.data.total[0].items.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.updateMyScore();
        };
        e.prototype.onClickRank = function() {
            n.utils.openPrefabView("hedeng/HeDengView");
        };
        e.prototype.sortHuoDong = function(t, e) {
            return t.get != e.get ? t.get - e.get : t.id - e.id;
        };
        e.prototype.updateMyScore = function() {
            r.hedengProxy.data.total.sort(this.sortHuoDong);
            this.list.data = r.hedengProxy.data.total;
            var t = this;
            l.uiUtils.countDown(
                r.hedengProxy.data.info.eTime,
                this.lblShiJian,
                function() {
                    t.lblShiJian.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
            this.lblFuQi.string =
                i18n.t("HEDENG_LEI_JI_FU_LI") + ":" + r.hedengProxy.data.cons;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShiJian", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFuQi", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
