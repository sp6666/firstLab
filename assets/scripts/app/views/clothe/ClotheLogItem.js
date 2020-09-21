var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblText = null;
            return e;
        }
        e.prototype.onClick = function() {
            var t = this.data;
            t && n.utils.openPrefabView("clothe/ClothePveInfo", !1, t);
        };
        e.prototype.showData = function() {
            var t = this.data;
            t &&
                (this.lblText.string = i18n.t("CLOTHE_PVE_LOG", {
                    n: t.fuser.name,
                    s: t.score,
                    f: t.gate
                }));
        };
        __decorate([a(cc.RichText)], e.prototype, "lblText", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
