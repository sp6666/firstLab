var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.title = null;
            e.lblday = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = [],
                e = this.data.dayRwd;
            if (e) {
                for (var o = 0; o < e.length; o++) {
                    var i = e[o];
                    if (null != i.itemid) {
                        i.id = i.itemid;
                        t.push(i);
                    }
                }
                this.list.data = t;
                var n = r.timeUtil.getCurData(),
                    a = this.data.dayid;
                if (1 == l.welfareProxy.zhouqian.isrwd && n == a)
                    this.lblday.string = i18n.t("WELFARE_CAN_GET");
                else if (2 == l.welfareProxy.zhouqian.isrwd && n == a)
                    this.lblday.string = i18n.t("WELFARE_CANT_GET");
                else {
                    var s = a - n;
                    s < 0 && (s += 7);
                    this.lblday.string = i18n.t("WELFARE_TIME_WEAK", {
                        day: s
                    });
                }
                this.title.string = i18n.t("WELFARE_RWD_WEAK", {
                    day: this.getWeekly(a)
                });
            }
        };
        e.prototype.onClickItem = function() {
            var t = this.data,
                e = r.timeUtil.getCurData(),
                o = this.data.dayid;
            if (t && 1 == l.welfareProxy.zhouqian.isrwd && e == o)
                l.welfareProxy.senMonday();
            else if (2 == l.welfareProxy.zhouqian.isrwd && e == o) {
                var i = i18n.t("WELFARE_WEEK_LIMIT", {
                    day: this.getWeekly(o)
                });
                r.alertUtil.alert18n(i);
            } else {
                i = i18n.t("WELFARE_LIMIT_WEAK", {
                    day: this.getWeekly(o)
                });
                r.alertUtil.alert18n(i);
            }
        };
        e.prototype.getWeekly = function(t) {
            return i18n.t("WELFARE_WEEK").split("|")[t - 1];
        };
        __decorate([c(cc.Label)], e.prototype, "title", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblday", void 0);
        __decorate([c(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
