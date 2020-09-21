var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCash = null;
            e.list = null;
            e.lblCoin = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("PLAYER_USER_UPDATE", this.onUserUpdate, this);
            facade.subscribe(
                "SUPPORT_BUY_SHOP_UPDATE",
                this.onItemUpdatem,
                this
            );
            this.onUserUpdate();
            this.onItemUpdatem();
        };
        e.prototype.onUserUpdate = function() {
            this.lblCash.string = n.utils.formatMoney(
                l.playerProxy.userData.cash
            );
            this.lblCoin.string = n.utils.formatMoney(
                l.playerProxy.userData.food
            );
        };
        e.prototype.onItemUpdatem = function() {
            this.list.data = l.supportProxy.yyShop;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblCash", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCoin", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
