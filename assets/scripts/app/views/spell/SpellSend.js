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
            e.lblInput = null;
            e.itemId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.itemId = parseInt(t.itemId);
            this.lblInput.placeholder = i18n.t("SPELL_CLICK_INPUT");
        };
        e.prototype.onClickSend = function() {
            var t = parseInt(this.lblInput.string);
            if (t != n.playerProxy.userData.uid) {
                n.spellProxy.sendGive(t, this.itemId);
                i.utils.closeView(this);
            } else i.alertUtil.alert18n("SPEL_CAN_NOT_SELF");
        };
        e.prototype.onClickClsoe = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.EditBox)], e.prototype, "lblInput", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
