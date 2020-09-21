var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = require("./DHShopItem"),
    a = require("../../Initializer"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.itemSlot1 = null;
            e.nodeItem1 = null;
            e.lblCount1 = null;
            e.lblCount = null;
            e.list = null;
            e.item = null;
            e.lblRemain = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                a.limitActivityProxy.UPDATE_DUIHUAN_SHOP,
                this.updateShow,
                this
            );
            facade.subscribe(
                a.bagProxy.UPDATE_BAG_ITEM,
                this.updateCount,
                this
            );
            a.limitActivityProxy.sendLookActivityData(
                a.limitActivityProxy.DUIHUANSHOP_ID
            );
            this.updateShow();
        };
        e.prototype.updateCount = function() {
            var t = a.limitActivityProxy.duihuanShop;
            if (null != t && null != t.rwd) {
                var e = t.rwd[0].items[0].id;
                this.lblCount.string = a.bagProxy.getItemCount(e) + "";
                var o = t.rwd.length > 2 ? t.rwd.length - 2 : 1,
                    i = t.rwd[o].items[0].id;
                e != i &&
                    (this.lblCount1.string = a.bagProxy.getItemCount(i) + "");
            }
        };
        e.prototype.updateShow = function() {
            var t = a.limitActivityProxy.duihuanShop;
            if (null != t && null != t.rwd) {
                var e = [];
                if (t.rwd)
                    for (var o = 1; o < t.rwd.length; o++) e.push(t.rwd[o]);
                e.sort(function(t, e) {
                    var o = t.count > t.buy || 0 == t.count;
                    return o != (e.count > e.buy || 0 == e.count)
                        ? o
                            ? -1
                            : 1
                        : t.id - e.id;
                });
                var i = t.rwd[0].items[0].id,
                    n = t.rwd.length > 2 ? t.rwd.length - 2 : 1,
                    r = t.rwd[n].items[0].id;
                this.nodeItem1.active = i != r;
                this.nodeItem1.active &&
                    (this.itemSlot1.data = t.rwd[n].items[0]);
                this.list.data = e;
                this.item.data = t.rwd[0];
                this.itemSlot.data = t.rwd[0].items[0];
                this.lblCount.string = a.bagProxy.getItemCount(i) + "";
                var c = this;
                null == t.info || t.info.eTime < l.timeUtil.second
                    ? (this.lblRemain.string = i18n.t("ACTHD_OVERDUE"))
                    : s.uiUtils.countDown(
                          t.info.eTime,
                          this.lblRemain,
                          function() {
                              c.lblRemain.string = i18n.t("ACTHD_OVERDUE");
                          },
                          !0,
                          "USER_REMAIN_TIME",
                          "d"
                      );
                this.updateCount();
            } else {
                this.list.data = null;
                this.itemSlot.data = this.itemSlot1.data = null;
                this.lblRemain.string = i18n.t("ACTHD_OVERDUE");
                this.item.data = null;
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([d(i.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(i.default)], e.prototype, "itemSlot1", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeItem1", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount1", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([d(n.default)], e.prototype, "list", void 0);
        __decorate([d(r.default)], e.prototype, "item", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRemain", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
