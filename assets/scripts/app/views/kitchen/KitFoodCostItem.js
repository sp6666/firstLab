var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.ico = null;
            e.color = null;
            e.nodeAdd = null;
            return e;
        }
        e.prototype.onDestroy = function() {
            this._data = null;
            facade.remove(this);
        };
        e.prototype.onClickItem = function() {
            var t = this._data;
            if (t) {
                if (l.bagProxy.getItemCount(t.id) < 1) {
                    var e = this.getItemShop(t.id);
                    e
                        ? a.utils.openPrefabView("kitchen/KitBuyConfirm", !1, e)
                        : a.utils.openPrefabView("ItemInfo", !1, t);
                } else a.utils.openPrefabView("ItemInfo", !1, t);
            }
        };
        e.prototype.getItemShop = function(t) {
            for (
                var e = localcache.getList(localdb.table_kitshop), o = 0;
                o < e.length;
                o++
            )
                if (e[o].itemid == t) return e[o];
            return null;
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.item.data = t;
                var e = l.bagProxy.getItemCount(t.id);
                r.shaderUtils.setImageGray(this.ico, e < 1);
                r.shaderUtils.setImageGray(this.color, e < 1);
                this.nodeAdd.active = e < 1 && null != this.getItemShop(t.id);
                if (this.nodeAdd.active) {
                    facade.remove(this);
                    facade.subscribe(
                        l.bagProxy.UPDATE_BAG_ITEM,
                        this.showData,
                        this
                    );
                }
            }
        };
        __decorate([_(n.default)], e.prototype, "item", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "ico", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "color", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAdd", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
