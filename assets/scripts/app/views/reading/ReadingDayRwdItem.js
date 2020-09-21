var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../models/BagProxy"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.xdNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.xdNode.active = !1;
                if (t.kind == l.DataType.JB_ITEM) {
                    var e = localcache.getItem(localdb.table_heropve, t.id);
                    this.xdNode.active = 6 == e.unlocktype;
                }
                this.itemSlot.data = t;
            }
        };
        __decorate([s(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([s(cc.Node)], e.prototype, "xdNode", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
