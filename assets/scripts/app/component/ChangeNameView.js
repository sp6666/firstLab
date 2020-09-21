var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnRan = null;
            e.editName = null;
            e.lblTitle = null;
            e._type = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.createProxy.CREATE_RANDOM_NAME,
                this.update_Name,
                this
            );
            this._type = this.node.openParam.type;
            1 == this._type && this.onClickRandom();
            this.btnRan.active = 1 == this._type;
            this.lblTitle.string =
                1 == this._type
                    ? i18n.t("USER_QING_SHE_DING_NEW_NAME")
                    : i18n.t("USER_QING_SHE_DING_CLUB_NAME");
        };
        e.prototype.onClickRandom = function() {
            i.createProxy.sendRandomName();
        };
        e.prototype.update_Name = function() {
            this.editName.string = i.createProxy.randomName;
        };
        e.prototype.onClickOk = function() {
            if (1 == this._type) {
                if (
                    n.stringUtil.isBlank(this.editName.string) ||
                    i.playerProxy.userData.name == this.editName.string
                ) {
                    n.alertUtil.alert18n("USER_NAME_LIMIT_NULL");
                    return;
                }
                i.playerProxy.sendResetName(this.editName.string, 2);
            } else if (2 == this._type) {
                if (null == i.unionProxy.clubInfo) {
                    n.alertUtil.alert18n("CLUB_MEI_YOU_GONG_DIAN");
                    return;
                }
                if (1 != i.unionProxy.memberInfo.post) {
                    n.alertUtil.alert18n("CLUB_MODIFY_ONLY_LEADER");
                    return;
                }
                if (n.stringUtil.isBlank(this.editName.string)) {
                    n.alertUtil.alert18n("CLUB_NAME_NOT_NULL");
                    return;
                }
                if (i.unionProxy.clubInfo.name == this.editName.string) {
                    n.alertUtil.alert18n("CLUB_SHU_RU_QI_TA");
                    return;
                }
                i.unionProxy.sendModifyName(this.editName.string, 1);
            }
            this.onClickClose();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([a(cc.Node)], e.prototype, "btnRan", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "editName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTitle", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
