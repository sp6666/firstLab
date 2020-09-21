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
            e.list = null;
            e.nodeGeted = null;
            e.nodeGet = null;
            e.lblBuy = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.nodeGet.node.active = 0 == t.isrwd;
                this.nodeGet.interactable =
                    t.need <= l.limitActivityProxy.dayday.buyCount;
                this.nodeGeted.active = 0 != t.isrwd;
                this.list.data = t.items;
                this.lblBuy.string = i18n.t("LIMIT_DAY_DAY_RWD", {
                    f: l.limitActivityProxy.dayday.buyCount,
                    s: t.need
                });
            }
        };
        e.prototype.onClickRwd = function() {
            var t = this._data;
            if (t) {
                if (0 != t.isrwd) return;
                if (t.need > l.limitActivityProxy.dayday.buyCount) {
                    r.alertUtil.alert18n("LIMIT_DAY_DAY_LIMIT");
                    return;
                }
                l.limitActivityProxy.sendGetActivityReward(
                    l.limitActivityProxy.DAYDAY_ID,
                    t.id + 1e4
                );
            }
        };
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeGeted", void 0);
        __decorate([c(cc.Button)], e.prototype, "nodeGet", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblBuy", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
