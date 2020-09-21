var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/RedDot"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.mergePurchaseProxy.MERGE_PURCHASE_DATA_UPDATA,
                this.onShowData,
                this
            );
            facade.subscribe("RECHARGE_FAIL", this.resetLimitBuy, this);
            l.mergePurchaseProxy.sendOpenPrince();
        };
        e.prototype.onShowData = function () {
            for (var t = [], e = 0; e < l.mergePurchaseProxy.gift.length; e++)
                null == l.mergePurchaseProxy.gift[e].type &&
                t.push(l.mergePurchaseProxy.gift[e]);
            t.sort(function (t, e) {
                var o = t.limit > 0;
                if (o != e.limit > 0) return o ? -1 : 1;
                var i = t.end - n.timeUtil.second <= 31536e3;
                return i != e.end - n.timeUtil.second <= 31536e3 ?
                    i ?
                    -1 :
                    1 :
                    t.id - e.id;
            });
            this.list.data = t;
        };
        e.prototype.resetLimitBuy = function () {
            l.mergePurchaseProxy.setGiftNum(0, 1);
            l.mergePurchaseProxy.limitBuy = !1;
        };
        e.prototype.onclickClose = function () {
            r.default.change("mergepurchase", !1);
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;