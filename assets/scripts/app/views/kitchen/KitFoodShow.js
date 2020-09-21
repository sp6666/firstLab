var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.list = null;
            e.lblName = null;
            e.lblPer = null;
            e.nodeNull = null;
            return e;
        }
        o = e;
        e.prototype.onShow = function(t) {
            this.item.data = {
                id: t.itemid
            };
            this.list.node.active = !1;
            this.nodeNull.active = !1;
            if (0 != t.fooditemid.length) {
                this.list.node.active = !0;
                for (var e = [], o = 0; o < t.fooditemid.length; o++)
                    e.push({
                        id: t.fooditemid[o]
                    });
                this.list.data = e;
                this.list.node.x = -this.list.node.width / 2;
            } else this.nodeNull.active = !0;
            var i = localcache.getItem(localdb.table_item, t.itemid);
            this.lblName.string = i18n.t("KIT_COST_TIME", {
                t: l.timeUtil.second2hms(t.time, "HH:mm:ss")
            });
            this.lblPer.string = i.explain;
        };
        e.prototype.getPer = function(t) {
            if (null == o.pers[t.id]) {
                for (
                    var e = localcache.getGroup(
                            localdb.table_kitchen,
                            "fooditemid",
                            t.fooditemid
                        ),
                        i = 0,
                        n = 0;
                    n < e.length;
                    n++
                )
                    i += e[n].weight;
                for (n = 0; n < e.length; n++) {
                    var l = Math.floor((e[n].weight / i) * 10);
                    l = l < 1 ? 1 : l > 5 ? 5 : l;
                    o.pers[e[n].id] = l;
                }
            }
            return o.pers[t.id];
        };
        e.prototype.onClickClost = function() {
            this.node.active = !1;
        };
        e.pers = {};
        __decorate([s(i.default)], e.prototype, "item", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeNull", void 0);
        return (e = o = __decorate([a], e));
        var o;
    })(cc.Component);
o.default = c;
