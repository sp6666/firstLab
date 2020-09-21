var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/RenderListItem"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTxt = null;
            e.ylqButton = null;
            e.getButton = null;
            e.btn = null;
            e.list = null;
            e.scroll = null;
            e.bgNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = r.continuityRechargeProxy.data;
            this._curData = t;
            var e = this._data;
            if (e) {
                this.lblTxt.string = i18n.t("CONTINUITY_RECHARGE_XU_ZONG", {
                    d: e.day,
                    num: l.utils.formatMoney(e.need)
                });
                this.list.data = e.items;
                this.ylqButton.active = 1 == e.get;
                this.btn.interactable = t.day >= e.day && t.total >= e.need;
                this.getButton.active = !(1 == e.get);
            }
        };
        e.prototype.onClickGetItem = function() {
            var t = this.data,
                e = this._curData;
            t &&
                (e.day >= t.day && e.total >= t.need
                    ? r.continuityRechargeProxy.sendGetTotalReward(t.dc)
                    : l.utils.openPrefabView(
                          "continuityrecharge/ContinuityRechargeItemView",
                          !1,
                          t
                      ));
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.getButton.y = this.ylqButton.y = 10 - (this.node.height - 58);
            this.bgNode.height = e;
        };
        __decorate([c(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([c(cc.Node)], e.prototype, "ylqButton", void 0);
        __decorate([c(cc.Node)], e.prototype, "getButton", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([c(cc.Node)], e.prototype, "bgNode", void 0);
        return (e = __decorate([s], e));
    })(n.default);
o.default = _;
