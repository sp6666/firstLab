var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../../component/List"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.curShengFen = null;
            e.curLvMax = null;
            e.nextShengFen = null;
            e.nextMax = null;
            e.itemList = null;
            e.btnTiBa = null;
            e.curData = null;
            e.isEnough = !1;
            e.itemId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.showData, this);
            this.curData = this.node.openParam;
            l.shopProxy.sendList(!1);
            this.showData();
        };
        e.prototype.showData = function() {
            if (this.curData) {
                var t = localcache.getItem(
                        localdb.table_nobility,
                        this.curData.senior
                    ),
                    e = localcache.getItem(
                        localdb.table_nobility,
                        parseInt(this.curData.senior + "") + 1
                    );
                this.curShengFen.string = i18n.t("SERVANT_CUR_SHENG_FEN", {
                    str: t.name
                });
                this.curLvMax.string = i18n.t("SERVANT_LEVEL_MAX", {
                    lv: t.max_level
                });
                this.nextShengFen.string = i18n.t("SERVANT_Next_SHENG_FEN", {
                    str: e ? e.name : ""
                });
                this.nextMax.string = i18n.t("SERVANT_LEVEL_MAX", {
                    lv: e ? e.max_level : 0
                });
                l.servantProxy.nobility = t;
                var o = [];
                this.itemId = 0;
                for (var i = 0; i < t.need.length; i++) {
                    l.bagProxy.getItemCount(t.need[i]) < t.need_count[i] &&
                        0 == this.itemId &&
                        (this.itemId = t.need[i]);
                    if (1 == t.need.length) {
                        new n.ItemSlotData().id = t.need[0];
                        this.isEnough =
                            l.bagProxy.getItemCount(t.need[0]) >=
                            t.need_count[0];
                    } else if (2 == t.need.length) {
                        new n.ItemSlotData().id = t.need[1];
                        this.isEnough =
                            l.bagProxy.getItemCount(t.need[0]) >=
                                t.need_count[0] &&
                            l.bagProxy.getItemCount(t.need[1]) >
                                t.need_count[1];
                    } else if (3 == t.need.length) {
                        new n.ItemSlotData().id = t.need[2];
                        var r = l.bagProxy.getItemCount(t.need[0]),
                            a = l.bagProxy.getItemCount(t.need[1]),
                            s = l.bagProxy.getItemCount(t.need[2]),
                            c = t.need_count[0],
                            _ = t.need_count[1],
                            d = t.need_count[2];
                        this.isEnough = r >= c && a >= _ && s >= d;
                    }
                    var u = new n.ItemSlotData();
                    u.id = t.need[i];
                    o.push(u);
                }
                this.itemList.data = o;
                this.itemList.node.x = -this.itemList.node.width / 2;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickTiBa = function() {
            if (this.isEnough) {
                this.btnTiBa.interactable = !1;
                l.servantProxy.sendUpSenior(this.curData.id);
                i.utils.closeView(this);
            } else if (0 != this.itemId) {
                for (
                    var t = null, e = l.shopProxy.list.length, o = 0;
                    o < e;
                    o++
                )
                    if (l.shopProxy.list[o].item.id == this.itemId) {
                        t = l.shopProxy.list[o];
                        break;
                    }
                if (t) i.utils.openPrefabView("shopping/ShopBuy", !1, t);
                else {
                    var n = l.bagProxy.getCanHechengItem(this.itemId);
                    null != n
                        ? i.utils.openPrefabView("bag/BagHecheng", !1, n)
                        : i.alertUtil.alertItemLimit(this.itemId);
                }
            }
        };
        __decorate([c(cc.Label)], e.prototype, "curShengFen", void 0);
        __decorate([c(cc.Label)], e.prototype, "curLvMax", void 0);
        __decorate([c(cc.Label)], e.prototype, "nextShengFen", void 0);
        __decorate([c(cc.Label)], e.prototype, "nextMax", void 0);
        __decorate([c(r.default)], e.prototype, "itemList", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnTiBa", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
