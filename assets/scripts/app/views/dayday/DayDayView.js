var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.listBuy = null;
            e.listRwd = null;
            e.lblTime = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.limitActivityProxy.UPDATE_DAYDAY_HUODONG,
                this.updateShow,
                this
            );
            l.limitActivityProxy.sendLookActivityData(
                l.limitActivityProxy.DAYDAY_ID
            );
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            var t = l.limitActivityProxy.dayday;
            if (null != t) {
                t.rwd &&
                    t.rwd.sort(function(t, e) {
                        return t.buy != e.buy ? t.buy - e.buy : t.id - e.id;
                    });
                this.listBuy.data = t.rwd;
                t.miaosha &&
                    t.miaosha.sort(function(t, e) {
                        return t.isrwd != e.isrwd
                            ? t.isrwd - e.isrwd
                            : t.id - e.id;
                    });
                this.listRwd.data = t.miaosha;
                var e = this;
                null == t.info || t.info.eTime < n.timeUtil.second
                    ? (this.lblTime.string = i18n.t("ACTHD_OVERDUE"))
                    : r.uiUtils.countDown(
                          t.info.eTime,
                          this.lblTime,
                          function() {
                              e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                          },
                          !0,
                          "USER_REMAIN_TIME",
                          "d"
                      );
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "listBuy", void 0);
        __decorate([c(i.default)], e.prototype, "listRwd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
