var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/ShaderUtils"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTxt = null;
            e.bg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            i.shaderUtils.setBlur(this.bg);
            this.scheduleOnce(this.onOpen, 1.5);
            var t = this.node.openParam;
            t &&
                (this.lblTxt.string = i18n.t("JIU_LOU_GO_TOYAN_HUI", {
                    n: t.name
                }));
        };
        e.prototype.onOpen = function() {
            n.utils.openPrefabView("jiulou/JiulouDinnce");
            this.scheduleOnce(this.onClickClose, 0.5);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([a(cc.RichText)], e.prototype, "lblTxt", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "bg", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
