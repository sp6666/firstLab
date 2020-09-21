var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.lblCount = null;
            e.lblTime = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            if (l.jiulouProxy.shop) {
                this.updateShop();
                this.updateShopFresh();
            }
            facade.subscribe("JIU_LOU_SHOP_LIST", this.updateShop, this);
        };
        e.prototype.updateShop = function() {
            var t = localcache.getList(localdb.table_feastShop);
            this.list.data = t;
            this.lblScore.string =
                i18n.t("JIULOU_SCORE") + " " + l.jiulouProxy.shop.score;
        };
        e.prototype.updateShopFresh = function() {};
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickFresh = function() {};
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
