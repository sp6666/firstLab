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
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblPrice = null;
            e.lblLimit = null;
            e.lblBuy = null;
            e.buyNode = null;
            e.btnBuy = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.list.data = t.items;
                this.lblPrice.string = t.need + "";
                this.buyNode.active = t.lv <= n.playerProxy.userData.level;
                var e = localcache.getItem(localdb.table_officer, t.lv);
                this.lblBuy.string = i18n.t("LEVEL_GIFT_KE_GOU_MAI_2", {
                    name: e.name
                });
                this.lblBuy.node.active = t.lv > n.playerProxy.userData.level;
                this.lblLimit.string = i18n.t("LEVEL_GIFT_XIAN_TXT_2", {
                    num: t.limit
                });
                this.btnBuy.interactable = t.limit > 0;
                this.lblTitle.string = i18n.t("LEVEL_GIFT_CHAO_ZHI_LI_BAO");
            }
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickBuy = function() {
            var t = this.node.openParam;
            if (n.playerProxy.userData.cash < t.need)
                l.alertUtil.alertItemLimit(1);
            else {
                n.levelGiftProxy.sendBuyReward(t.lv);
                l.utils.closeView(this);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblBuy", void 0);
        __decorate([s(cc.Node)], e.prototype, "buyNode", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnBuy", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
