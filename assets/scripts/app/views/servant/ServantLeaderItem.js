var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../models/BagProxy"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTxt = null;
            e.itemSlot = null;
            e.button = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = new n.ItemSlotData();
                e.id = t.heroid;
                e.kind = r.DataType.HERO;
                this.itemSlot.data = e;
                var o = a.servantProxy.getHeroData(t.heroid);
                this.lblTxt.string =
                    null == o
                        ? i18n.t("SERVANT_WEI_ZHAO_MU")
                        : i18n.t("SERVANT_YI_ZHAO_MU");
                this.button.active = null != o;
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([_(l.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Node)], e.prototype, "button", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
