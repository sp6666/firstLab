var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTime = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.singleRechargeProxy.SINGLE_RECHARGE_DATA_UPDATE,
                this.onCfg,
                this
            );
            l.singleRechargeProxy.sendOpenActivity();
        };
        e.prototype.onCfg = function () {
            this.list.data = l.singleRechargeProxy.getMainList();
            var t = this;
            r.uiUtils.countDown(
                l.singleRechargeProxy.cfg.info.eTime,
                this.lblTime,
                function () {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;