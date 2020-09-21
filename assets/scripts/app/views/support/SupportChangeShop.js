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
            e.lblScore = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "SUPPORT_YY_SCORE_UPDATE",
                this.onYyScoreUpdate,
                this
            );
            facade.subscribe(
                "SUPPORT_CHANGE_SHOP_UPDATE",
                this.onChangeShopUpdate,
                this
            );
            this.onYyScoreUpdate();
            this.onChangeShopUpdate();
        };
        e.prototype.onYyScoreUpdate = function() {
            this.lblScore.string =
                i18n.t("RANK_MY_JIULOU") + l.supportProxy.myChangeScore;
        };
        e.prototype.onChangeShopUpdate = function() {
            this.list.data = l.supportProxy.changeShop.list;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
