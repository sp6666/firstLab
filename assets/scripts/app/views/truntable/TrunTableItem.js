var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.selectBg = null;
            e.itemSlot = null;
            e.lblCount = null;
            e.eff = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectBg.active = t;
                if (this.eff) {
                    this.eff.node.active = t;
                    t && (this.eff.animation = "animation");
                }
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = new l.ItemSlotData();
                e.itemid = t.id;
                e.count = t.count;
                this.itemSlot.data = e;
                this.lblCount &&
                    (this.lblCount.string = t.count > 1 ? t.count + "" : "");
            }
        };
        __decorate([s(cc.Node)], e.prototype, "selectBg", void 0);
        __decorate([s(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "eff", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
