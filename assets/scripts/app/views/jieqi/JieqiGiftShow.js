var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.price = [];
            e.lblLimit = null;
            e.priceNode = [];
            e.btnBuy = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            this._curData = t;
            if (t) {
                this.lblTitle.string = t.name;
                this.lblLimit.string =
                    0 != t.islimit ?
                    i18n.t("LEVEL_GIFT_XIAN_TXT_2", {
                        num: t.limit
                    }) :
                    "";
                this.list.data = t.items;
                for (var e = 0; e < this.priceNode.length; e++)
                    this.priceNode[e].active = e == t.type;
                if (1 == t.type) {
                    this.price[0].string = t.present + "";
                    this.btnBuy.interactable =
                        t.limit > 0 && n.playerProxy.userData.cash > t.present;
                } else {
                    this.price[1].string = t.sign + t.present + "";
                    this.btnBuy.interactable = t.limit > 0;
                }
            }
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        e.prototype.onClickBuy = function () {
            var t = this._curData;
            if (t) {
                if (t.isMerge) {
                    1 == t.type &&
                        t.limit > 0 &&
                        n.playerProxy.userData.cash > t.present &&
                        n.mergeDailyGiftProxy.senBuyCase(t.id, 1);
                } else {
                    1 == t.type &&
                        t.limit > 0 &&
                        n.playerProxy.userData.cash > t.present &&
                        n.jieqiProxy.senBuyCase(t.id, 1);
                }

                this.onClickClose();
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s([cc.Label])], e.prototype, "price", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([s([cc.Node])], e.prototype, "priceNode", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnBuy", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;