var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/ChildSpine"),
    a = require("../servant/ServantStarShow"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lblCost = null;
            e.icon = null;
            e.iconSmall = null;
            e.stars = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblname.string = t.name;
                var e = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
                this.lblCost.string = i18n.t("COMMON_PROP5") + " " + e;
                t.state > 3
                    ? this.icon.setKid(t.id, t.sex)
                    : this.iconSmall.setKid(t.id, t.sex, !1);
                this.icon.node.active = t.state > 3;
                this.iconSmall.node.active = t.state <= 3;
                this.stars.setValue(t.talent);
            }
        };
        e.prototype.onClickRender = function() {
            var t = this._data,
                e = n.timeProxy.getLoacalValue("CHILD_LI_LIAN_DATA"),
                o = null;
            if (null != e) {
                var i = JSON.parse(e + "");
                for (var r in i)
                    if (r == t.id.toString()) {
                        o = i[r];
                        break;
                    }
            }
            if (o) {
                n.sonProxy.lilianData.luggage = o.luggage;
                n.sonProxy.lilianData.travel = o.travel;
                n.sonProxy.lilianData.sid = o.sid;
                var a = localcache.getItem(
                        localdb.table_practiceTravel,
                        o.travel
                    ),
                    s = !1;
                1 == a.type
                    ? (s = n.playerProxy.userData.cash >= a.money)
                    : 2 == a.type &&
                      (s = n.playerProxy.userData.food >= a.money);
                s || (n.sonProxy.lilianData.travel = 0);
                var c = localcache.getItem(
                        localdb.table_practiceItem,
                        o.luggage
                    ),
                    _ = !1;
                if (0 == c.itemid) {
                    var d = n.sonProxy.getSon(n.sonProxy.lilianData.sid),
                        u = Math.ceil(
                            ((30 * c.max) /
                                Math.ceil(n.playerProxy.userEp.e2 / 800)) *
                                0.5 *
                                n.playerProxy.userEp.e2 *
                                d.talent *
                                0.3
                        );
                    _ = n.playerProxy.userData.food >= u;
                } else {
                    _ = n.bagProxy.getItemCount(c.itemid) >= c.num;
                }
                _ || (n.sonProxy.lilianData.luggage = 0);
            } else n.sonProxy.lilianData.sid = t.id;
            n.sonProxy.lilianSonData = t;
            facade.send("CHILD_LI_LIAN_SELECT_UPDATE");
            l.utils.closeNameView("child/ChildLilianSonSelect");
        };
        __decorate([_(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(r.default)], e.prototype, "icon", void 0);
        __decorate([_(r.default)], e.prototype, "iconSmall", void 0);
        __decorate([_(a.default)], e.prototype, "stars", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
