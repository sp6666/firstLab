var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lbl = null;
            e.bg = null;
            e.bg1 = null;
            e.effect = null;
            e.anima = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = n.achievementProxy.getDailyRwd(t.id);
                this.lbl.string =
                    null == e || 0 == e.rwd
                        ? t.need + ""
                        : i18n.t("ACHIEVE_GETED");
                this.bg.interactable = this.bg1.interactable =
                    null != e && 1 != e.rwd;
                this.effect.active =
                    n.achievementProxy.score >= t.need && this.bg.interactable;
                this.anima.play(this.effect.active ? "shake" : "");
            }
        };
        e.prototype.onClickShow = function() {
            var t = this._data;
            if (t) {
                var e = n.achievementProxy.getDailyRwd(t.id);
                n.achievementProxy.score >= t.need && (null == e || 1 != e.rwd)
                    ? n.achievementProxy.sendGetDalyRwd(t.id)
                    : l.utils.openPrefabView(
                          "achieve/TaskDayRwdView",
                          !1,
                          this.data
                      );
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lbl", void 0);
        __decorate([s(cc.Button)], e.prototype, "bg", void 0);
        __decorate([s(cc.Button)], e.prototype, "bg1", void 0);
        __decorate([s(cc.Node)], e.prototype, "effect", void 0);
        __decorate([s(cc.Animation)], e.prototype, "anima", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
