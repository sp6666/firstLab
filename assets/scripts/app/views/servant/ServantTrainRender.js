var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = require("../../component/SelectMax"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.slot = null;
            e.lblName = null;
            e.bar = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data,
                e = localcache.getItem(localdb.table_item, t);
            if (e) {
                var o = new l.ItemSlotData();
                o.id = e.id;
                this.slot.data = o;
                var i = r.bagProxy.getItemCount(e.id),
                    n = a.utils.getParamInt("show_slider_count");
                this.bar.node.active = i >= n;
                this.bar.max = i;
                this.bar.curValue = 1;
                this.lblName.string =
                    e.name +
                    i18n.t("SERVANT_ITEM_HAVE", {
                        value: i
                    });
            }
        };
        e.prototype.onClickUse = function() {
            if (r.bagProxy.getItemCount(parseInt(this._data + "")) <= 0)
                a.alertUtil.alertItemLimit(this._data);
            else if(this.bar.curValue > r.bagProxy.getItemCount(parseInt(this._data + ""))) {
                a.alertUtil.alertItemLimit(this._data);
            }
            else {
                r.bagProxy.sendUseItemHero(
                    parseInt(this._data + ""),
                    this.bar.curValue ? this.bar.curValue : 1,
                    r.servantProxy.curSelectId
                );
                a.alertUtil.alert(i18n.t("SERVANT_TRAIN_SUCCESS"));
            }
        };
        __decorate([d(n.default)], e.prototype, "slot", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(s.default)], e.prototype, "bar", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
