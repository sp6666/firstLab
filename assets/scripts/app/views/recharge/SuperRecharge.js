var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("./SuperRechargeDailyItem"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.dailyItem = null;
            e.lblTime = null;
            e.isFirst = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.limitActivityProxy.SUPER_RECHARGE_UPDATE,
                this.onDataUpdata,
                this
            );
            n.limitActivityProxy.sendOpenSuperRecharge();
        };
        e.prototype.onDataUpdata = function() {
            var t = this;
            a.uiUtils.countDown(
                n.limitActivityProxy.superRecharge.cfg.info.eTime,
                this.lblTime,
                function() {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
            if (this.isFirst) {
                for (
                    var e = n.limitActivityProxy.superRecharge.cfg.continuity,
                        o = 0,
                        i = 0;
                    i < e.length;
                    i++
                )
                    e[i].items.length > o && (o = e[i].items.length);
                var l = Math.ceil(o / 7),
                    r = 80 * l + 5 * (l - 1) + 140;
                this.list.setWidthHeight(630, r);
                this.isFirst = !1;
            }
            n.limitActivityProxy.superRecharge.cfg.continuity.sort(function(
                t,
                e
            ) {
                var o =
                        n.limitActivityProxy.superRecharge.day >= t.need
                            ? 0
                            : 1,
                    i =
                        n.limitActivityProxy.superRecharge.day >= e.need
                            ? 0
                            : 1;
                return t.get != e.get ? t.get - e.get : o - i;
            });
            this.list.data = n.limitActivityProxy.superRecharge.cfg.continuity;
            this.dailyItem.data = n.limitActivityProxy.superRecharge.cfg.rwd;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(r.default)], e.prototype, "dailyItem", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
