var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblDes = null;
            e.lblCost = null;
            e.iconLoad = null;
            e.nodeGold = null;
            e.nodeScore = null;
            e.btn = null;
            e.buyedNode = null;
            return e;
        }
        e.prototype.onClickItem = function(t, e) {
            var o = this._data;
            if (o && 0 == o.type) {
                var i = localcache.getItem(localdb.table_yamenShop, o.id).need;
                if (1 == i.id && a.playerProxy.userData.cash < i.count) {
                    r.alertUtil.alertItemLimit(1);
                    return;
                }
                if (1 != i.id && a.dalishiProxy.fight.money < i.count) {
                    r.alertUtil.alert18n("DALISI_SCORE_LIMIT");
                    return;
                }
                a.dalishiProxy.sendSelectadd(o.id);
            }
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_yamenShop, t.id),
                    o = e.need;
                this.btn.node.active = !a.dalishiProxy.isSelected();
                this.buyedNode.active = 1 == t.type;
                this.nodeGold.active = 1 == o.id;
                this.nodeScore.active = 1 != o.id;
                this.lblName.string = e.name;
                this.lblDes.string = i18n.t("DALISI_SHOP_DES", {
                    des: e.desc,
                    d: t.add
                });
                this.lblCost.string = o.count + "";
                this.iconLoad.url = l.uiHelps.getItemSlot(e.icon);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(n.default)], e.prototype, "iconLoad", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGold", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeScore", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Node)], e.prototype, "buyedNode", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
