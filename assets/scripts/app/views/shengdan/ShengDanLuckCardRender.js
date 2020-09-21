var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    UIUtils = require("../../utils/UIUtils"),
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
        e.prototype.onLoad = function() {
            cc.log("onload");
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = t.data;
                if (e) {
                    var it = new UIUtils.ItemSlotData();
                    it.itemid = e.id;
                    it.count = e.count;
                    it.kind = e.kind;
                    this.itemSlot.data = it;
                    this.openNode.active = true;
                    //l.utils.showNodeEffect(this.nodeItem, 0);
                    if (!r.shengDanProxy.isPalyed(e)) {
                        l.utils.showNodeEffect(this.nodeItem, 0);
                        r.shengDanProxy.playList.push(e);
                    }
                } else {
                    if(r.shengDanProxy.reset) {
                        l.utils.showNodeEffect(this.nodeItem, 1);
                    }
                    
                }
                    // 1 == r.luckyBrandProxy.data.reset &&
                    //     l.utils.showNodeEffect(this.nodeItem, 1);
                this.nodeSelect.active = true;
                //var o = e && 1 == e.top ? 1 : 0;
                this.openBg.spriteFrame = this.bgArr[0];
            }else {
                this.nodeSelect.active = false
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
