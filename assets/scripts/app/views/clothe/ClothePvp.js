var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/RoleSpine"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.role = null;
            e.lblTitle = null;
            e.lblTime = null;
            e.lblScore = null;
            e.imgBg = null;
            e.imgGuang = null;
            e.btn = null;
            e.lblPingTime = null;
            e.nodeOvered = null;
            e.nodeFlower = null;
            return e;
        }
        e.prototype.onLoad = function() {
            null == l.clothePveProxy.pvpinfo && l.clothePveProxy.sendPvpInfo();
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_PVP_INFO,
                this.updateShow,
                this
            );
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_PVP_BASE,
                this.updateScore,
                this
            );
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_PVP_CLOTHE,
                this.updateClothe,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            r.uiUtils.scaleRepeat(this.imgGuang.node, 0.95, 1.05);
            r.uiUtils.fadeRepeat(this.imgGuang.node, 127, 255);
            this.updateShow();
            this.updateClothe();
        };
        e.prototype.updateOver = function() {
            if (null != l.clothePveProxy.pvpinfo) {
                var t = l.clothePveProxy.pvpinfo;
                this.nodeOvered.active = t.info.eTime < i.timeUtil.second;
            }
        };
        e.prototype.updateShow = function() {
            var t = this;
            if (null != l.clothePveProxy.pvpinfo) {
                var e = this,
                    o = l.clothePveProxy.pvpinfo,
                    n = o.info.sTime + 3600 * o.start_time;
                this.nodeFlower.active = this.btn.interactable =
                    i.timeUtil.second >= n;
                e.lblPingTime.string = "";
                0 == this.btn.interactable &&
                    r.uiUtils.countDown(n, this.lblPingTime, function() {
                        e.lblPingTime.string = "";
                        t.nodeFlower.active = t.btn.interactable = !0;
                    });
                r.uiUtils.countDown(
                    o.info.eTime,
                    this.lblTime,
                    function() {
                        e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                        e.updateOver();
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                this.lblTitle.string = o.msg;
            }
        };
        e.prototype.updateScore = function() {
            var t =
                null == l.clothePveProxy.pvpClothe ||
                0 == l.clothePveProxy.pvpClothe.body;
            a.shaderUtils.setImageGray(this.imgBg, t);
            a.shaderUtils.setImageGray(this.imgGuang, t);
            this.lblScore.string = i18n.t("CLOTHE_PVP_UNENTER");
            t
                ? this.imgGuang.node.pauseAllActions()
                : this.imgGuang.node.resumeAllActions();
            l.clothePveProxy.pvpbase &&
                !t &&
                (this.lblScore.string = this.btn.interactable
                    ? l.clothePveProxy.pvpbase.score + ""
                    : "0");
        };
        e.prototype.updateClothe = function() {
            this.role.node.active = !1;
            if (
                l.clothePveProxy.pvpClothe &&
                0 != l.clothePveProxy.pvpClothe.body
            ) {
                this.role.node.active = !0;
                var t = l.playerProxy.userData;
                this.role.setClothes(
                    t.sex,
                    t.job,
                    t.level,
                    l.clothePveProxy.pvpClothe
                );
            }
            this.updateScore();
        };
        e.prototype.onClickClothe = function() {
            l.clothePveProxy.pvpinfo &&
            l.clothePveProxy.pvpinfo.info.eTime < i.timeUtil.second
                ? i.alertUtil.alert18n("ACTHD_OVERDUE")
                : i.utils.openPrefabView("clothe/ClothePvpChange");
        };
        e.prototype.onClickZan = function() {
            i.timeUtil.second <
            l.clothePveProxy.pvpinfo.info.sTime +
                3600 * l.clothePveProxy.pvpinfo.start_time
                ? i.alertUtil.alert18n("CLOTHE_PVP_ZAN_TIME_LIMIT")
                : i.utils.openPrefabView("clothe/ClothePvpZan");
        };
        e.prototype.onClickRank = function() {
            l.clothePveProxy.sendPvpRank();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(n.default)], e.prototype, "role", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "imgBg", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "imgGuang", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPingTime", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeOvered", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFlower", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
