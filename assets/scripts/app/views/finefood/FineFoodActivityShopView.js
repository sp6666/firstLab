var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../views/item/ItemSlotUI"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = require("../../component/ActivityShopItem"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.itemSlot1 = null;
            e.itemSlot2 = null;
            e.itemSlot3 = null;
            e.nodeItem1 = null;
            e.lblCount1 = null;
            e.nodeItem2 = null;
            e.lblCount2 = null;
            e.nodeItem3 = null;
            e.lblCount3 = null;
            e.lblCount = null;
            e.list = null;
            e.item = null;
            e.lblRemain = null;
            e.lblShopName = null;
            e.shopData = {};
            e.sortList = [];
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(l.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.onDataUpdate, this);
            facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.updateCount, this);

            this.shopData = l.fineFoodProxy.exchange;
            l.limitActivityProxy.curExchangeId = this.shopData.hid;
            // var t = "LIMIT_ACTIVITY_SHOP_NAME_" + this.shopData.hid;
            this.lblShopName.string = i18n.t("FINE_FOOD_SHOP_PROPS_TITLE") + i18n.t("FINE_FOOD_SHOP_PROCESS_TITLE"); //i18n.t(t);
            this.updateShow();
        };
        e.prototype.onDataUpdate = function (t) {
            this.shopData = t;
            this.updateShow();
        };
        e.prototype.updateCount = function () {
            if (null != this.shopData && null != this.shopData.rwd) {
                var t = this.shopData.rwd[0].items[0].id,
                    e = this.shopData.rwd[1].items[0].id,
                    o = this.shopData.rwd[2].items[0].id,
                    i = this.shopData.rwd[3].items[0].id;
                this.lblCount.string = l.bagProxy.getItemCount(t) + "";
                this.lblCount1.string = l.bagProxy.getItemCount(e) + "";
                this.lblCount2.string = l.bagProxy.getItemCount(o) + "";
                this.lblCount3.string = l.bagProxy.getItemCount(i) + "";
                t != e &&
                    (this.lblCount1.string = l.bagProxy.getItemCount(e) + "");
                t != e &&
                    e != o &&
                    (this.lblCount2.string = l.bagProxy.getItemCount(o) + "");
                t != e &&
                    e != o &&
                    o != i &&
                    (this.lblCount3.string = l.bagProxy.getItemCount(i) + "");
            }
        };
        e.prototype.updateShow = function () {
            if (null != this.shopData && null != this.shopData.rwd) {
                var t = [];
                var firstItem = null;
                if (this.shopData.rwd) {
                    for (var e = 0; e < this.shopData.rwd.length; e++) {
                        t.push(this.shopData.rwd[e]);
                    }

                    t.sort(function (t, e) {
                        var o = t.count > t.buy || 0 == t.count;
                        return o != (e.count > e.buy || 0 == e.count) ?
                            o ?
                            -1 :
                            1 :
                            t.id - e.id;
                    });

                    this.queuingShowList(t, 0);
                    if (this.sortList.length > 0) {
                        firstItem = this.sortList.shift();
                    }
                }

                var o = this.shopData.rwd[0].items[0].id,
                    i = this.shopData.rwd[1].items[0].id,
                    n = this.shopData.rwd[2].items[0].id,
                    s = this.shopData.rwd[3].items[0].id;
                this.nodeItem1.active = o != i;
                this.nodeItem2.active = o != i && i != n;
                this.nodeItem3.active = o != i && i != n && n != s;
                this.nodeItem1.active &&
                    (this.itemSlot1.data = this.shopData.rwd[1].items[0]);
                this.nodeItem2.active &&
                    (this.itemSlot2.data = this.shopData.rwd[2].items[0]);
                this.nodeItem3.active &&
                    (this.itemSlot3.data = this.shopData.rwd[3].items[0]);
                this.list.data = this.sortList;
                this.item.data = firstItem != null ? firstItem : this.shopData.rwd[0];
                this.itemSlot.data = this.shopData.rwd[0].items[0];
                this.lblCount.string = l.bagProxy.getItemCount(o) + "";
                this.lblCount1.string = l.bagProxy.getItemCount(i) + "";
                this.lblCount2.string = l.bagProxy.getItemCount(n) + "";
                this.lblCount3.string = l.bagProxy.getItemCount(s) + "";
                var c = this;
                if (
                    null == this.shopData.stime ||
                    this.shopData.stime < r.timeUtil.second
                ) {
                    this.lblRemain.string = i18n.t("ACTHD_OVERDUE");
                    6240 == l.limitActivityProxy.curExchangeId &&
                        (this.lblRemain.string = "");
                } else
                    a.uiUtils.countDown(
                        this.shopData.stime,
                        this.lblRemain,
                        function () {
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
        e.prototype.queuingShowList = function (list, index) {
            //排序条件数组，按倒序，最后面的kind值的showlist会排到最前面
            var kindLst = [95];
            this.sortList = [];
            if (index >= kindLst.length) {
                this.sortList = list;
                return;
            }

            var listkind = [];
            var listnormal = [];
            for (var idx = 0; idx < list.length; idx++) {
                var item = list[idx];
                if (!r.stringUtil.isBlank(list[idx].items[1].kind)) {
                    //如果找到这个kind 把它放到前面， 但是卖完的话就不移动它的位置
                    if (list[idx].items[1].kind == kindLst[index] && list[idx].count > list[idx].buy) {
                        listkind.push(list[idx]);
                    } else {
                        listnormal.push(list[idx]);
                    }
                } else {
                    listnormal.push(list[idx]);
                }
            }


            if (listkind.length > 0) {
                listnormal.reverse();
                listkind.sort(function (t, e) {
                    return t.id > e.id ? 1 : -1;
                });
                for (var idx = listkind.length - 1; idx >= 0; idx--) {
                    listnormal.push(listkind[idx]);
                }

                listnormal.reverse();
            }
            list = listnormal;

            index++;
            this.queuingShowList(list, index);
        };
        e.prototype.logList = function (list) {
            for (var idx = 0; idx < list.length; idx++) {
                cc.log("--------" + list[idx].id);
            }
        };
        e.prototype.onClickClost = function () {
            r.utils.closeView(this);
        };
        __decorate([d(i.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(i.default)], e.prototype, "itemSlot1", void 0);
        __decorate([d(i.default)], e.prototype, "itemSlot2", void 0);
        __decorate([d(i.default)], e.prototype, "itemSlot3", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeItem1", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount1", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeItem2", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount2", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeItem3", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount3", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([d(n.default)], e.prototype, "list", void 0);
        __decorate([d(s.default)], e.prototype, "item", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRemain", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblShopName", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;