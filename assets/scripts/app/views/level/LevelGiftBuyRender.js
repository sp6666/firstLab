var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblMoney = null;
            e.lblBuy = null;
            e.lblLimit = null;
            e.lblNow = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_officer, t.lv);
                this.lblBuy.string = i18n.t("LEVEL_GIFT_KE_GOU_MAI_2", {
                    name: e.name
                });
                this.lblMoney.string = t.prime + "";
                this.lblLimit.string = i18n.t("LEVEL_GIFT_XIAN_TXT", {
                    num: t.limit
                });
                this.lblNow.string = t.need + "";
            }
        };
        e.prototype.onClickItem = function() {
            n.utils.openPrefabView("levelgift/LevelGiftShow", null, this.data);
        };
        __decorate([a(cc.Label)], e.prototype, "lblMoney", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblBuy", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNow", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
