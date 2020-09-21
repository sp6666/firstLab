var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
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
            e.btnSelect = null;
            e.nameNode = null;
            e.lblPrice = null;
            e.priceNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblname.string = t.name;
                this.priceNode.active = 0 == t.itemid;
                this.lblCost.node.active = 0 != t.itemid;
                if (0 == t.itemid) {
                    var e = r.sonProxy.getSon(r.sonProxy.lilianData.sid),
                        o = Math.ceil(
                            ((30 * t.max) /
                                Math.ceil(r.playerProxy.userEp.e2 / 800)) *
                                0.5 *
                                r.playerProxy.userEp.e2 *
                                e.talent *
                                0.3
                        );
                    this.lblPrice.string = "" + o;
                    this.btnSelect.interactable =
                        r.playerProxy.userData.food >= o;
                    this.icon.url = a.uiHelps.getXingLiIcon(t.id);
                } else {
                    this.lblCost.string =
                        r.bagProxy.getItemCount(t.itemid) + "/" + t.num;
                    this.btnSelect.interactable =
                        r.bagProxy.getItemCount(t.itemid) >= t.num;
                    this.icon.url = a.uiHelps.getItemSlot(t.itemid);
                }
            }
        };
        e.prototype.onClickRender = function() {
            var t = this._data;
            r.sonProxy.lilianData.luggage = t.id;
            l.utils.closeNameView("child/ChildLilianXingliSelect");
            facade.send("CHILD_LI_LIAN_SELECT_UPDATE");
        };
        __decorate([_(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(n.default)], e.prototype, "icon", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnSelect", void 0);
        __decorate([_(cc.Node)], e.prototype, "nameNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([_(cc.Node)], e.prototype, "priceNode", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
