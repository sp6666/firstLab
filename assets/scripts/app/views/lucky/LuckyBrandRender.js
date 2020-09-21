var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.nodeItem = null;
            e.nodeSelect = null;
            e.openBg = null;
            e.bgArr = [];
            e.openNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = t.data;
                if (e) {
                    this.itemSlot.data = e.items;
                    this.openNode.active = !0;
                    if (!r.luckyBrandProxy.isPalyed(e)) {
                        l.utils.showNodeEffect(this.nodeItem, 0);
                        r.luckyBrandProxy.playList.push(e);
                    }
                } else
                    1 == r.luckyBrandProxy.data.reset &&
                        l.utils.showNodeEffect(this.nodeItem, 1);
                this.nodeSelect.active = e && 1 == e.get;
                var o = e && 1 == e.top ? 1 : 0;
                this.openBg.spriteFrame = this.bgArr[o];
            }
        };
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeSelect", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "openBg", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "bgArr", void 0);
        __decorate([c(cc.Node)], e.prototype, "openNode", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
