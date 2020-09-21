var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UserUpEffectItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/RoleSpine"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.leftItem = null;
            e.rightItem = null;
            e.spine = null;
            e.leftSpine = null;
            e.rightSpine = null;
            e.showSpine = null;
            e.nodeBg = null;
            e.nodeInfo = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.nodeInfo.active = !1;
            this.onShowEffect();
        };
        e.prototype.onShowEffect = function() {
            var t = l.playerProxy.userData.level;
            this.showSpine.setRoleLevel(t - 1);
            this.scheduleOnce(this.delayShow, 0.6);
        };
        e.prototype.delayShow = function() {
            var t = l.playerProxy.userData.level;
            this.showSpine.setRoleLevel(t);
            this.scheduleOnce(this.onHideSpine, 2.4);
        };
        e.prototype.onHideSpine = function() {
            this.nodeInfo.active = !0;
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            l.timeProxy.floatReward();
            null != l.playerProxy.userClothe &&
                0 != l.playerProxy.userClothe.body &&
                n.utils.showConfirm(i18n.t("USER_CHANGE_CLOTHE"), function() {
                    var t = l.playerProxy.userClothe;
                    l.playerProxy.sendCloth(
                        0,
                        0,
                        t.ear,
                        t.background,
                        t.effect,
                        t.animal,
                        !1
                    );
                });
        };
        __decorate([c(i.default)], e.prototype, "leftItem", void 0);
        __decorate([c(i.default)], e.prototype, "rightItem", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "spine", void 0);
        __decorate([c(r.default)], e.prototype, "leftSpine", void 0);
        __decorate([c(r.default)], e.prototype, "rightSpine", void 0);
        __decorate([c(r.default)], e.prototype, "showSpine", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBg", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeInfo", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
