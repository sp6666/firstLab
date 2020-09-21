var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.nodeList = null;
            e.autoBuy = null;
            e.lblCost = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.playerProxy.PLAYER_USER_UPDATE,
                this.updateFood,
                this
            );
            this.updateFood();
            for (
                var t = this.node.openParam,
                    e = localcache.getItem(localdb.table_kitwife, t.id),
                    o = [],
                    i = 0;
                i < e.kitchenid.length;
                i++
            )
                o.push({
                    id: e.kitchenid[i],
                    wid: t.id
                });
            this.list.data = o;
            this.nodeList.active = 0 == o.length;
            this.updateFood();
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = e.data;
            if (o) {
                for (
                    var i = localcache.getItem(localdb.table_kitchen, o.id),
                        r = [],
                        a = 0;
                    a < i.fooditemid.length;
                    a++
                ) {
                    l.bagProxy.getItemCount(i.fooditemid[a]) < 1 &&
                        r.push(i.fooditemid[a]);
                }
                if (r.length > 0) {
                    if (this.autoBuy.isChecked) {
                        var s = 0,
                            c = [];
                        for (a = 0; a < r.length; a++) {
                            var _ = localcache.getGroup(
                                localdb.table_kitshop,
                                "itemid",
                                r[a]
                            );
                            if (_[0].level > l.playerProxy.userData.level) {
                                var d = localcache.getItem(
                                    localdb.table_officer,
                                    _[0].level
                                );
                                n.alertUtil.alert("KITCHEN_BUY_LEVEL_LIMIT", {
                                    n: d ? d.name : ""
                                });
                                break;
                            }
                            c.push(_[0].id);
                            s += _[0].cost;
                        }
                        if (l.playerProxy.userData.food > s) {
                            var u = localcache.getItem(localdb.table_item, 3);
                            n.alertUtil.alert("CELL_COST", {
                                n: u.name,
                                v: s
                            });
                            facade.send("KITCHEN_SELECT_ITEM", o.id);
                            this.onClickClost();
                        } else n.alertUtil.alertItemLimit(3);
                    } else
                        n.alertUtil.alert18n("KITCHEN_SELECT_ITEM_COUNR_LIMIT");
                    return;
                }
                facade.send("KITCHEN_SELECT_ITEM", o.id);
            }
            this.onClickClost();
        };
        e.prototype.updateFood = function() {
            this.lblCost.string = l.playerProxy.userData.food + "";
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeList", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "autoBuy", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
