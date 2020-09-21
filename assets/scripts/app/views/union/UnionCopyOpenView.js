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
            e.lblName = null;
            e.lblRich1 = null;
            e.lblRich2 = null;
            e.lblNeedRich1 = null;
            e.lblNeedRich2 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblRich1.string = i.unionProxy.clubInfo.fund + "";
            this.lblRich2.string = i.playerProxy.userData.cash + "";
            this.lblNeedRich1.string = i.unionProxy.openCopyParam.payFund;
            this.lblNeedRich2.string = i.unionProxy.openCopyParam.payDia;
            this.lblName.string = i.unionProxy.openCopyParam.name;
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickOpen = function(t, e) {
            var o = parseInt(e);
            if (2 == o) {
                if (
                    i.unionProxy.clubInfo.fund <
                    i.unionProxy.openCopyParam.payFund
                ) {
                    n.alertUtil.alert(i18n.t("union_nofund"));
                    return;
                }
            } else if (
                1 == o &&
                i.playerProxy.userData.cash < i.unionProxy.openCopyParam.payDia
            ) {
                n.alertUtil.alertItemLimit(1);
                return;
            }
            i.unionProxy.sendReqOpen(i.unionProxy.openCopyParam.id, o);
            this.eventClose();
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRich1", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRich2", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNeedRich1", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNeedRich2", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
