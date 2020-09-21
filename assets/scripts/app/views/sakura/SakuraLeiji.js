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
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblShiJian = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(//TODO
                r.sakuraProxy.SAKURA_LEVELDATA,
                this.updateMyScore,
                this
            );
            var t = Math.ceil(r.sakuraProxy.level_data.total[0].items.length / 6),
                e = 80 * t + 10 * (t - 1) + 65;
            this.list.setWidthHeight(550, e);
            this.updateMyScore();
        };
        e.prototype.sortHuoDong = function (t, e) {
            return t.get != e.get ? t.get - e.get : t.id - e.id;
            // return e.get-t.get;
        };
        e.prototype.updateMyScore = function () {
            var arr =r.sakuraProxy.level_data.total;
            arr.sort(this.sortHuoDong)
            this.list.data = arr;
            var t = this;
            l.uiUtils.countDown(
                r.sakuraProxy.data.info.eTime,
                this.lblShiJian,
                function () {
                    t.lblShiJian.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShiJian", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;