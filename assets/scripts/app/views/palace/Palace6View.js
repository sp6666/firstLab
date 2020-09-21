var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.input = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.curData = this.node.param;
        };
        e.prototype.onClickYes = function() {
            var t = this.input.string;
            if ("" != t && null != t) {
                n.palaceProxy.sendQianMing(
                    this.curData.chenghao,
                    this.input.string
                );
                i.utils.closeView(this);
            } else i.alertUtil.alert(i18n.t("PALACE_INPUT_TEXT"));
        };
        e.prototype.onClickNo = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.EditBox)], e.prototype, "input", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
