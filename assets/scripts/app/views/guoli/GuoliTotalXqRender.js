var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblToday = null;
            e.lblTotal = null;
            e.iconUrl = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblTitle.string = i18n.t("GUO_LI_TITLE_" + t.id);
                this.lblToday.string = i18n.t("GUO_LI_JIN_RI_GUO_LI") + t.day;
                this.lblTotal.string =
                    i18n.t("GUO_LI_TOTAL_VALUE_TXT") + t.total;
                this.lblToday.node.color = this.lblTotal.node.color = r.guoliPorxy.getFontColor(
                    t.id
                );
                this.iconUrl.url = l.uiHelps.getGuoliIcon(t.id);
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblToday", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([c(n.default)], e.prototype, "iconUrl", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
