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
            e.editor = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editor.placeholder = i18n.t("COMMON_INPUT_TXT");
            this.editor.string = n.unionProxy.clubInfo.name;
        };
        e.prototype.eventClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickOk = function() {
            if (n.playerProxy.userData.cash < 500)
                i.alertUtil.alertItemLimit(1);
            else if (i.stringUtil.isBlank(this.editor.string))
                i.alertUtil.alert18n("CLUB_NAME_NOT_NULL");
            else if (n.unionProxy.clubInfo.name != this.editor.string) {
                n.unionProxy.sendModifyName(this.editor.string, 0);
                this.eventClose();
            } else i.alertUtil.alert18n("CLUB_SHU_RU_QI_TA");
        };
        __decorate([a(cc.EditBox)], e.prototype, "editor", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
