var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../component/SliderCount"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblEffect = null;
            e.itemSlot = null;
            e.silderCount = null;
            e.btnUse = null;
            e.btnHecheng = null;
            e.btnShangchi = null;
            e.curData = null;
            return e;
        }
        e.prototype.showInfo = function(t) {
            if (t) {
                this.curData = t;
                var e = localcache.getItem(localdb.table_item, t.id);
                this.lblName.string = e.name;
                this.lblEffect.string = e.explain;
                this.itemSlot.data = t;
                this.btnUse.active = "item" == e.type[0];
                this.btnShangchi.active = "hero" == e.type[0];
                this.btnHecheng.active = !1;
                this.silderCount.node.active =
                    this.btnUse.active &&
                    t.count > l.utils.getParamInt("show_slider_count");
                if (this.silderCount.node.active) {
                    this.silderCount.max = t.count;
                    this.silderCount.onSildeEvent();
                }
            }
        };
        e.prototype.onClickHecheng = function() {};
        e.prototype.onClickShangci = function() {
            l.utils.openPrefabView("bag/BagServantSelect", !1, this.curData);
        };
        e.prototype.onClickUse = function() {
            var t = this.silderCount.node.active
                ? this.silderCount.curValue
                : 1;
            r.bagProxy.getItemCount(this.curData.id) < t
                ? l.alertUtil.alertItemLimit(this.curData.id)
                : r.bagProxy.sendUse(this.curData.id, t);
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([c(i.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(n.default)], e.prototype, "silderCount", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnUse", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnHecheng", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnShangchi", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
