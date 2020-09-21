var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/SelectMax"),
    l = require("./DHShopItem"),
    r = require("../../Initializer"),
    a = require("../../models/BagProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.item = null;
            e.select = null;
            e.lblCost = null;
            e.btnBuy = null;
            e.info = null;
            e._curItem = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this._curItem = t;
            this.item.data = t;
            var e = localcache.getItem(localdb.table_item, t.items[1].id),
                o = e ? e.explain.split("|") : "";
            this.select.node.active = t.count - t.buy > 1 || 0 == t.count;
            var i = r.bagProxy.getItemCount(this._curItem.items[0].id),
                n = this._curItem.items[0].count;
            this.select.max =
                0 == t.count || t.count - t.buy > Math.floor(i / n)
                    ? Math.floor(i / n)
                    : t.count - t.buy;
            this.btnBuy.node.active = 0 == t.count || t.count - t.buy > 0;
            var l = this;
            this.lblCost.string = 1 * n + "";
            this.select.changeHandler = function() {
                l.lblCost.string =
                    l._curItem.items[0].count * l.select.curValue + "";
            };
            this.info.node.active = !1;
            switch (t.items[1].kind) {
                case a.DataType.HEAD_BLANK:
                    var s = localcache.getItem(
                        localdb.table_userblank,
                        t.items[1].id
                    );
                    this.lblDes.string = s.des;
                    break;

                case a.DataType.CLOTHE:
                    var c = localcache.getItem(
                        localdb.table_userClothe,
                        t.items[1].id
                    );
                    this.lblDes.string = c.des;
                    break;

                case a.DataType.HERO:
                    var _ = localcache.getItem(
                        localdb.table_hero,
                        t.items[1].id
                    );
                    this.lblDes.string = _.txt;
                    this.info.node.active = !0;
                    break;

                default:
                    this.lblDes.string =
                        o.length > 1 ? o[1] : e ? e.explain : "";
            }
        };
        e.prototype.onClickInfo = function() {
            if (this._curItem) {
                var t = this._curItem.items[1].id;
                if (null == r.servantProxy.getHeroData(t))
                    i.utils.openPrefabView(
                        "servant/ServantInfo",
                        !1,
                        localcache.getItem(localdb.table_hero, t)
                    );
                else {
                    var e = localcache.getItem(localdb.table_hero, t);
                    i.utils.openPrefabView("servant/ServantView", !1, {
                        hero: e,
                        tab: 4
                    });
                }
            }
        };
        e.prototype.onClickBuy = function() {
            if (this._curItem) {
                var t = this.select.node.active ? this.select.curValue : 1,
                    e = r.bagProxy.getItemCount(this._curItem.items[0].id);
                if (t * this._curItem.items[0].count > e) {
                    i.alertUtil.alertItemLimit(this._curItem.items[0].id);
                    return;
                }
                r.limitActivityProxy.sendGetActivityReward(
                    r.limitActivityProxy.DUIHUANSHOP_ID,
                    1e4 * t + this._curItem.id
                );
            }
            this.onClickClost();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(l.default)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "select", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnBuy", void 0);
        __decorate([_(cc.Button)], e.prototype, "info", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
