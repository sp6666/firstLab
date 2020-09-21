var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("./KitFoodShow"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblCount = null;
            e.foodShow = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = localcache.getList(localdb.table_kitchen);
            this.lblCount.string = i18n.t("KITCHEN_BOOK_TIP", {
                f: n.kitchenProxy.foods ? n.kitchenProxy.foods.length : 0,
                s: t.length
            });
            this.list.data = t;
            this.foodShow.node.active = !1;
        };
        e.prototype.onClickFood = function(t, e) {
            var o = e.data;
            if (o) {
                if (n.kitchenProxy.hasFood(o.id)) {
                    this.foodShow.node.active = !0;
                    this.foodShow.onShow(o);
                } else l.alertUtil.alert18n("KITCHEN_UNLOCK_UNLOOK");
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(r.default)], e.prototype, "foodShow", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
