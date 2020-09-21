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
            e.editorName = null;
            e.editorPs = null;
            e.editorDes = null;
            e.lblCost = null;
            e.toggle = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editorName.placeholder = this.editorPs.placeholder = this.editorDes.placeholder = i18n.t(
                "COMMON_INPUT_TXT"
            );
            facade.subscribe("UNION_CREATE_SUCCESS", this.eventClose, this);
            var t = i.utils.getParamInt("union_build_cost");
            this.lblCost.string = t + "";
        };
        e.prototype.eventClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.eventCreate = function() {
            n.unionProxy.sendCreateUnion(
                this.editorName.string,
                "",
                "",
                this.editorPs.string,
                this.editorDes.string,
                this.toggle.isChecked
            );
        };
        __decorate([a(cc.EditBox)], e.prototype, "editorName", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "editorPs", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "editorDes", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([a(cc.Toggle)], e.prototype, "toggle", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
