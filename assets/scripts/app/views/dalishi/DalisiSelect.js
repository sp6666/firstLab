var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../item/ItemSlotUI"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTip = null;
            e.itemSlot = null;
            e.lblCount = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam ? this.node.openParam.id : 0;
            facade.subscribe("DALISI_SERVANT_SELECT", this.onClickClost, this);
            this.lblTip.string = i18n.t("DALISI_ATTACK_SERVANT_LIMIT", {
                d: n.utils.getParamInt("gongdou_unlock_level")
            });
            var e = new l.ItemSlotData();
            e.id = t;
            e.count = r.bagProxy.getItemCount(t);
            this.itemSlot.data = e;
            this.lblCount.string = "*" + e.count;
            this.list.data = this.getList();
        };
        e.prototype.getList = function() {
            for (
                var t = [],
                    e = n.utils.getParamInt("gongdou_unlock_level"),
                    o = 0;
                o < r.servantProxy.getServantList().length;
                o++
            ) {
                var i = r.servantProxy.getServantList()[o];
                if(i && i.level >= e){
                    t.push(i);
                } 
            }
            t.sort(function(t, e) {
                return (
                    e.aep.e1 +
                    e.aep.e2 +
                    e.aep.e3 +
                    e.aep.e4 -
                    t.aep.e1 -
                    t.aep.e2 -
                    t.aep.e3 -
                    t.aep.e4
                );
            });
            return t;
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([_(a.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
