var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../item/ItemSlotUI"),
    a = require("../../utils/UIUtils"),
    s = require("../../component/SelectMax"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCount = null;
            e.lblInfo = null;
            e.icon = null;
            e.silderCount = null;
            e.itemSlot = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = localcache.getItem(localdb.table_item, this._data.id);
            if (t) {
                this.itemId = parseInt(this._data.id);
                this.lblInfo.string = t.explain;
                this.lblName.string = t.name;
                this.lblCount.string = i18n.t("COMMON_COUNT", {
                    c: l.bagProxy.getItemCount(t.id)
                });
                var e = l.bagProxy.getItemCount(this._data.id),
                    o = n.utils.getParamInt("show_slider_count");
                this.silderCount.max = e;
                this.silderCount.node.active = e >= o;
                this.silderCount.curValue = 1;
                var i = new a.ItemSlotData();
                i.id = this.itemId;
                this.itemSlot.data = i;
            }
        };
        e.prototype.onClickUse = function(t, e) {
            if (l.bagProxy.getItemCount(this._data.id) <= 0)
                n.alertUtil.alertItemLimit(this._data.id);
            else if(this.silderCount.curValue > l.bagProxy.getItemCount(this._data.id)) {
                n.alertUtil.alertItemLimit(this._data.id);
            }
            else if ("1" == e) {
                var o = localcache.getItem(localdb.table_item, this.itemId);
                3 == o.type.length
                    ? l.wifeProxy.sendReward(
                          l.wifeProxy.wifeGiftId,
                          this.itemId,
                          this.silderCount.curValue
                              ? this.silderCount.curValue
                              : 1
                      )
                    : 4 == o.type.length &&
                      l.wifeProxy.sendJbGift(
                          l.wifeProxy.wifeGiftId,
                          this.itemId,
                          this.silderCount.curValue
                              ? this.silderCount.curValue
                              : 1
                      );
            } 
            else if ("3" == e){
                //蓝颜
                l.confidanteProxy.sendGift(this._data.id, this.silderCount.curValue ? this.silderCount.curValue : 1);
            }
            else
                "2" == e &&
                    l.servantProxy.sendHeroGift(
                        l.servantProxy.curSelectId,
                        this._data.id,
                        this.silderCount.curValue
                            ? this.silderCount.curValue
                            : 1
                    );
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblInfo", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "icon", void 0);
        __decorate([d(s.default)], e.prototype, "silderCount", void 0);
        __decorate([d(r.default)], e.prototype, "itemSlot", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
