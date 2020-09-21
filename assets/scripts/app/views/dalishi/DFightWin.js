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
            e.lblCount = null;
            e.lblExp = null;
            e.lblNum = null;
            e.lblWinCount = null;
            e.lblRemainCount = null;
            e.flag = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = n.dalishiProxy.win.fight;
            if (t) {
                this.lblNum.string = i18n.t("DALISI_SCORE_ADD", {
                    d: t.items[0].count
                });
                this.lblExp.string = i18n.t("DALISI_SKILL_ADD_RWD", {
                    d: t.items[1].count
                });
                this.lblCount.string = t.items[2].count + "";
                this.lblWinCount.string = i18n.t("DALISI_LIAN_WIN", {
                    d: t.winnum
                });
                this.lblRemainCount.string = i18n.t("DALISI_WIN_RWD", {
                    d: t.nrwd
                });
            }
            this.scheduleOnce(this.onTimer, 0.5);
        };
        e.prototype.onClost = function() {
            if (!this.flag) {
                if( 2 == n.dalishiProxy.fight.fstate){
                    facade.send("DALISHI_MASK_ACTIVE", true);
                    i.utils.openPrefabView("dalishi/AwardDView")
                }else{
                    n.dalishiProxy.openShop()
                }
                i.utils.closeView(this);
            }
        };
        e.prototype.onTimer = function() {
            this.flag = !1;
        };
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblWinCount", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRemainCount", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
