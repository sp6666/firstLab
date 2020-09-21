var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../item/ItemSlotUI"),
    l = require("../../component/List"),
    r = require("../../utils/UIUtils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.lblName = null;
            e.lblEffect = null;
            e.lblTime = null;
            e.lblCount = null;
            e.list = null;
            e.nodeTime = null;
            e.nodeCount = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.onShowHe(t);
        };
        e.prototype.onShowHe = function(t) {
            this.node.active = null != t;
            this._curdata = t;
            if (t) {
                var e = localcache.getItem(localdb.table_item, t.itemid + "");
                if (e) {
                    this.lblName.string = e.name;
                    this.lblEffect.string = e.explain;
                }
                this.nodeTime.active = 0 != t.outtime;
                0 != t.outtime
                    ? r.uiUtils.countDown(t.outtime, this.lblTime)
                    : this.lblTime.unscheduleAllCallbacks();
                this.itemSlot.data = t;
                this.list.data = t.need;
                this.list.node.x = -this.list.node.width / 2;
                this.nodeCount.active = 0 != t.totonum;
                0 != t.totonum &&
                    (this.lblCount.string = i18n.t("COMMON_NUM", {
                        f: t.times,
                        s: t.totonum
                    }));
            }
        };
        e.prototype.onClickHe = function() {
            if (this._curdata) {
                if (0 != this._curdata.totonum && this._curdata.times <= 0) {
                    i.alertUtil.alert(i18n.t("BAG_COMPOSE_COUNT_LIMIT"));
                    return;
                }
                for (var t = 0; t < this._curdata.need.length; t++) {
                    var e = this._curdata.need[t];
                    if (a.bagProxy.getItemCount(e.id) < e.count) {
                        i.alertUtil.alertItemLimit(e.id);
                        return;
                    }
                }
                a.bagProxy.sendCompose(this._curdata.itemid);
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(l.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTime", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeCount", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
