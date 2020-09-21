var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.editor = null;
            e.labelDes = null;
            e.labelTitle = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.editor.placeholder = i18n.t("COMMON_INPUT_TXT");
            "tran" == i.unionProxy.dialogParam.type ?
                (this.labelTitle.string = i18n.t("union_trans")) :
                "dismiss" == i.unionProxy.dialogParam.type &&
                (this.labelTitle.string = i18n.t("union_dimss"));

            this.labelDes.node.active = true;
            this.labelDes.string = i18n.t("UNION_JIE_SAN_BANG_HUI_JING_GAO");

            if ("cancelDismiss" == i.unionProxy.dialogParam.type) {
                this.labelTitle.string = i18n.t("union_cancel_dimss");
                this.labelDes.node.active = false;
            }
        };
        e.prototype.eventClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickOk = function () {
            "tran" == i.unionProxy.dialogParam.type ?
                i.unionProxy.sendTran(
                    this.editor.string,
                    i.unionProxy.dialogParam.id
                ) :
                "dismiss" == i.unionProxy.dialogParam.type &&
                i.unionProxy.sendJiesan(this.editor.string);

            if ("cancelDismiss" == i.unionProxy.dialogParam.type) {
                i.unionProxy.sendCancelDismiss();
            }
            this.eventClose();
        };
        __decorate([a(cc.EditBox)], e.prototype, "editor", void 0);
        __decorate([a(cc.Label)], e.prototype, "labelTitle", void 0);
        __decorate([a(cc.Label)], e.prototype, "labelDes", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;