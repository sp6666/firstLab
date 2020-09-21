var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.editAccount = null;
            e.editPs = null;
            e.editRegAccount = null;
            e.editRegPs = null;
            e.nodeReg = null;
            e.nodeLogin = null;
            e.list = null;
            e.nodeAct = null;
            e.actToggle = null;
            e.psToggle = null;
            e.psRegToggle = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editAccount.placeholder = this.editPs.placeholder = this.editRegAccount.placeholder = this.editRegPs.placeholder = i18n.t(
                "COMMON_INPUT_TXT"
            );
            this.nodeReg.active = !1;
            var t = i.loginProxy.accountList,
                e = t.length > 0 ? t[0] : null;
            this.editAccount.string =
                null != e ? e.account : "test" + Math.ceil(1e6 * Math.random());
            this.editPs.string = null != e ? e.password : "123456";
            this.actToggle.node.active = t.length > 1;
            this.list.data = t;
            facade.subscribe(
                i.loginProxy.LOGIN_CLOST_LOGIN,
                this.closeBtn,
                this
            );
        };
        e.prototype.onClickLogin = function() {
            null != i.loginProxy.quList &&
            0 != i.loginProxy.quList.length &&
            null != i.loginProxy.pickServer
                ? i.loginProxy.login(
                      this.editAccount.string,
                      this.editPs.string
                  )
                : n.alertUtil.alert(i18n.t("LOGIN_SERVER_DELAY"));
        };
        e.prototype.onClickRegist = function() {
            this.nodeReg.active = !0;
            this.nodeLogin.active = !1;
            this.editRegAccount.string =
                "test" + Math.ceil(1e6 * Math.random());
            this.editRegPs.string = "123456";
        };
        e.prototype.onClickBack = function() {
            this.nodeReg.active = !1;
            this.nodeLogin.active = !0;
        };
        e.prototype.onClickRegOk = function() {
            i.loginProxy.sendRegister(
                this.editRegAccount.string,
                this.editRegPs.string
            );
            this.editAccount.string = this.editRegAccount.string;
            this.editPs.string = this.editRegPs.string;
            this.closeBtn();
        };
        e.prototype.closeBtn = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickActTol = function() {
            this.nodeAct.active = this.actToggle.isChecked;
        };
        e.prototype.onClickAct = function(t, e) {
            var o = e.data;
            if (o) {
                this.editAccount.string =
                    null != o
                        ? o.account
                        : "test" + Math.ceil(1e6 * Math.random());
                this.editPs.string = null != o ? o.password : "123456";
            }
            this.nodeAct.active = !1;
            this.actToggle.isChecked = !1;
        };
        e.prototype.onClickPs = function() {
            this.editPs.inputFlag = this.psToggle.isChecked
                ? cc.EditBox.InputFlag.PASSWORD
                : cc.EditBox.InputFlag.SENSITIVE;
            this.editPs.string = this.editPs.string;
        };
        e.prototype.onClickPsReg = function() {
            this.editRegPs.inputFlag = this.psRegToggle.isChecked
                ? cc.EditBox.InputFlag.PASSWORD
                : cc.EditBox.InputFlag.SENSITIVE;
            this.editRegPs.string = this.editRegPs.string;
        };
        __decorate([s(cc.EditBox)], e.prototype, "editAccount", void 0);
        __decorate([s(cc.EditBox)], e.prototype, "editPs", void 0);
        __decorate([s(cc.EditBox)], e.prototype, "editRegAccount", void 0);
        __decorate([s(cc.EditBox)], e.prototype, "editRegPs", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeReg", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLogin", void 0);
        __decorate([s(l.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeAct", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "actToggle", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "psToggle", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "psRegToggle", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
