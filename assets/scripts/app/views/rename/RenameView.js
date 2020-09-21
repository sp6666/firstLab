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
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.editBox = null;
            e.lblCount = null;
            e.lblCost = null;
            e.nodeCost = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editBox.placeholder = i18n.t("COMMON_INPUT_TXT");
            facade.subscribe(
                i.createProxy.CREATE_RANDOM_NAME,
                this.upName,
                this
            );
            var t = i.sonProxy.getSon(i.sonProxy.renameId);
            this.nodeCost.active = t.state != proto_sc.SomState.tName;
            this.lblCost.string = n.utils.getParamStr("child_cost_gold");
            this.onTextChange();
            this.onClickRandom();
        };
        e.prototype.upName = function(t) {
            this.editBox.string = t || i.createProxy.randomName;
            this.onTextChange();
        };
        e.prototype.onClickOk = function() {
            var t = i.sonProxy.getSon(i.sonProxy.renameId);
            if (
                t &&
                t.state != proto_sc.SomState.tName &&
                i.playerProxy.userData.cash <
                    n.utils.getParamInt("child_cost_gold")
            )
                n.alertUtil.alertItemLimit(1);
            else {
                t.state != proto_sc.SomState.tName
                    ? i.sonProxy.sendRname(t.id, this.editBox.string)
                    : i.sonProxy.sendSonName(t.id, this.editBox.string);
                this.onClickCancel();
            }
        };
        e.prototype.onClickCancel = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickRandom = function() {
            i.createProxy.sendRandomName();
        };
        e.prototype.onTextChange = function() {
            this.lblCount.string = i18n.t("COMMON_NUM", {
                f: this.editBox.string.length,
                s: 6
            });
        };
        __decorate([a(cc.EditBox)], e.prototype, "editBox", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeCost", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
