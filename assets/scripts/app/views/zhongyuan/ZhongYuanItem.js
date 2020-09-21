var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.selectBg = null;
            e.yilinqu = null;
            e.itemSlot = null;
            e.lblCount = null;
            e.countNode = null;
            e.eff = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.zhongyuanProxy.ZHONGYUAN_ITEM_LINQU,
                this.onItemLinQu,
                this
            );
        };
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
                e.itemid = t.kind;
                e.count = t.count;
                r.zhongyuanProxy.isTrun || (this.yilinqu.active = 1 == t.get);
                this.itemSlot.data = e;
                this.lblCount &&
                    (this.lblCount.string = t.count > 1 ? t.count + "" : "");
                this.countNode.active = t.count > 1;
            }
        };
        e.prototype.onItemLinQu = function() {
            var t = this._data;
            this.yilinqu.active = 1 == t.get;
        };
        __decorate([c(cc.Node)], e.prototype, "selectBg", void 0);
        __decorate([c(cc.Node)], e.prototype, "yilinqu", void 0);
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "countNode", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "eff", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
