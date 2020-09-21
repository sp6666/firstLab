var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../Initializer"),
    s = require("../../utils/Utils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblMeili = null;
            e.servantUrl = null;
            e.itemNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblMeili.string =
                    i18n.t("WIFE_MEI_LI") + s.utils.formatMoney(t.aep.e4);
                this.servantUrl.url = l.uiHelps.getServantSmallSpine(t.id);
                r.shaderUtils.setImageGray(
                    this.itemNode,
                    0 == a.bossPorxy.getServantHitCount(t.id)
                );
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblMeili", void 0);
        __decorate([d(n.default)], e.prototype, "servantUrl", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "itemNode", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
