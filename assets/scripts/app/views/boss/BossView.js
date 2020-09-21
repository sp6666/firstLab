var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.battleBtn = null;
            e.timeNode = null;
            e.lblOpen = null;
            e.lblClose = null;
            e.lblcd = null;
            e.xianliImg = null;
            e.roleUrl = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_BOSS_MENGGU", this.onMenggu, this);
            facade.subscribe("UPDATE_BOSS_GE2DAN", this.onGe2Dan, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            i.bossPorxy.sendWordBoss();
            n.timeUtil.second < n.timeUtil.getTodaySecond(14, 0, 0) &&
            n.timeUtil.second > n.timeUtil.getTodaySecond(0, 0, 0)
                ? this.onMenggu()
                : n.timeUtil.second < n.timeUtil.getTodaySecond(24, 0, 0) &&
                  n.timeUtil.second > n.timeUtil.getTodaySecond(14, 0, 0) &&
                  this.onGe2Dan();
            var t = n.timeUtil.getTodaySecond(
                    n.utils.getParamInt("world_boss_start_hour")
                ),
                e = n.timeUtil.getTodaySecond(
                    n.utils.getParamInt("world_boss_end_hour")
                );
            this.lblOpen.string = n.timeUtil.format(t, "HH:mm:ss");
            this.lblClose.string = n.timeUtil.format(e, "HH:mm:ss");
        };
        e.prototype.onMenggu = function() {};
        e.prototype.onGe2Dan = function() {
            this.battleBtn.interactable = 2 == i.bossPorxy.ge2dan.state;
            r.shaderUtils.setImageGray(
                this.xianliImg,
                2 != i.bossPorxy.ge2dan.state
            );
            this.roleUrl.url = l.uiHelps.getServantSpine(
                i.bossPorxy.ge2dan.heroId
            );
            this.showTime();
            this.schedule(this.showTime, 1);
        };
        e.prototype.showTime = function() {
            var t = n.timeUtil.getTodaySecond(
                    n.utils.getParamInt("world_boss_start_hour")
                ),
                e = n.timeUtil.getTodaySecond(
                    n.utils.getParamInt("world_boss_end_hour")
                );
            if (1 == i.bossPorxy.ge2dan.state) {
                var o = t - n.timeUtil.second > 0 ? t - n.timeUtil.second : 0;
                0 == o && i.bossPorxy.sendWordBoss();
                this.lblcd.string = i18n.t("BOSS_TIME_COUNT_DOWN_1", {
                    time: n.timeUtil.second2hms(o, "HH:mm:ss")
                });
            } else if (2 == i.bossPorxy.ge2dan.state) {
                var l = e - n.timeUtil.second;
                0 == l && i.bossPorxy.sendWordBoss();
                this.lblcd.string = i18n.t("BOSS_TIME_COUNT_DOWN_2", {
                    time: n.timeUtil.second2hms(l, "HH:mm:ss")
                });
            } else
                n.timeUtil.second >= n.timeUtil.getTodaySecond(23)
                    ? (this.lblcd.string = i18n.t("BOSS_IS_OVER_2"))
                    : (this.lblcd.string = i18n.t("BOSS_IS_OVER"));
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickBattle = function() {
            i.bossPorxy.sendGoFightG2D();
        };
        e.prototype.onClickRank = function() {
            i.bossPorxy.sendG2dHitRank(!0);
        };
        e.prototype.onClickScore = function() {
            n.utils.openPrefabView("boss/BossChange");
        };
        __decorate([_(cc.Button)], e.prototype, "battleBtn", void 0);
        __decorate([_(cc.Node)], e.prototype, "timeNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblOpen", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblClose", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "xianliImg", void 0);
        __decorate([_(a.default)], e.prototype, "roleUrl", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
