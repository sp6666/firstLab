var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.day = null;
            e.item = null;
            e.yiqiandao = null;
            e.weiqiandao = null;
            e.eff = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.day.string = i18n.t("THIRTY_DAY_NUM_DAY", {
                    num: t.id
                });
                this.item.data = t.items[0];
                var e = l.thirtyDaysProxy.data.rwd[t.id - 1];
                this.weiqiandao.node.active = !(this.yiqiandao.node.active =
                    1 == e.get);
                this.eff.node.active =
                    0 == t.get && t.id == l.thirtyDaysProxy.data.days;
            }
        };
        __decorate([s(cc.Label)], e.prototype, "day", void 0);
        __decorate([s(n.default)], e.prototype, "item", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "yiqiandao", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "weiqiandao", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "eff", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
