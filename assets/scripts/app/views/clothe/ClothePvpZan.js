var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore1 = null;
            e.lblName1 = null;
            e.nodeZan1 = null;
            e.nodeInfo1 = null;
            e.spine1 = null;
            e.nodeName1 = null;
            e.nodeLeft = null;
            e.nodeLeftBtn = null;
            e.nodeLeftAddEffect = null;
            e.lblScore2 = null;
            e.lblName2 = null;
            e.nodeZan2 = null;
            e.nodeInfo2 = null;
            e.spine2 = null;
            e.nodeName2 = null;
            e.nodeRight = null;
            e.nodeRightBtn = null;
            e.nodeRightAddEffect = null;
            e.lblZan = null;
            e.lblCount = null;
            e.lblTime = null;
            e.btnRwd = null;
            e.lblTitle = null;
            e.effNode = null;
            e._curIndex = -1;
            e._index = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            l.clothePveProxy.pvpMath = null;
            l.clothePveProxy.sendPvpMath();
            r.uiUtils.scaleRepeat(this.btnRwd.node, 0.9, 1.1);
            this.lblTitle.string = l.clothePveProxy.pvpinfo.msg;
            this.nodeLeft.active = this.nodeRight.active = !1;
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_PVP_BASE,
                this.updateCount,
                this
            );
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_PVP_MATH,
                this.onMath,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            r.uiUtils.scaleRepeat(this.nodeLeftBtn, 0.9, 1.1);
            r.uiUtils.scaleRepeat(this.nodeRightBtn, 0.9, 1.1);
            //this.updateCount();
            //this.onMath();
        };
        e.prototype.updateCount = function() {
            if(l.clothePveProxy.pvpbase == null) return;
            var t = l.clothePveProxy.pvpbase,
                e = n.utils.getParamInt("clothepvp_count"),
                o = l.clothePveProxy.pvpinfo.rwd[0].need;
            this.lblCount.string = i18n.t("CLOTHE_PVP_COUNT", {
                d: t.count.num,
                s: e
            });
            this.lblZan.string = i18n.t("CLOTHE_PVP_RWD", {
                d: t.ping,
                s: o
            });
            this.btnRwd.interactable = l.clothePveProxy.pvpbase.ping >= o;
            this.btnRwd.interactable
                ? this.btnRwd.node.resumeAllActions()
                : this.btnRwd.node.pauseAllActions();
            if (e > t.count.num)
                r.uiUtils.countDown(
                    t.count.next,
                    this.lblTime,
                    function() {
                        l.playerProxy.sendAdok(t.count.label);
                    },
                    !0,
                    null,
                    null,
                    "mm:ss"
                );
            else {
                this.lblTime.string = "";
                this.lblTime.unscheduleAllCallbacks();
            }
        };
        e.prototype.onMath = function() {
            var t = l.clothePveProxy.pvpMath;
            if (
                null != t &&
                !(
                    l.clothePveProxy.pvpinfo &&
                    l.clothePveProxy.pvpinfo.info.eTime < n.timeUtil.second
                )
            ) {
                this._index = 10 * Math.random() < 5 ? 0 : 1;
                this.nodeLeft.active = null != t.user;
                this.nodeRight.active = null != t.fuser;
                this.onClickBg();
                this.nodeName1.active = this.nodeName2.active = !0;
                this.nodeLeftAddEffect.active = this.nodeRightAddEffect.active = !1;
                n.utils.showNodeEffect(this.effNode, 0);
                this.lblName1.string = t.user.name;
                this.lblScore1.string = t.score1 + "";
                this.nodeZan1.active = this.nodeInfo1.active = this.nodeZan2.active = this.nodeInfo2.active = !1;
                this.lblName2.string = t.fuser.name;
                this.lblScore2.string = t.score2 + "";
                this.spine1.setClothes(
                    t.user.sex,
                    t.user.job,
                    t.user.level,
                    t.user.clothe
                );
                this.spine2.setClothes(
                    t.fuser.sex,
                    t.fuser.job,
                    t.fuser.level,
                    t.fuser.clothe
                );
            }
            this.updateCount();
        };
        e.prototype.onClickBg = function() {
            if (0 == this._index) {
                this.nodeLeft.setSiblingIndex(0);
                this._index = 1;
            } else {
                this.nodeRight.setSiblingIndex(0);
                this._index = 0;
            }
        };
        e.prototype.onClickZan = function(t, e) {
            if (
                l.clothePveProxy.pvpinfo &&
                l.clothePveProxy.pvpinfo.info.eTime < n.timeUtil.second
            )
                n.alertUtil.alert18n("ACTHD_OVERDUE");
            else if (l.clothePveProxy.pvpbase.count.num <= 0)
                n.alertUtil.alert18n("CLOTHE_PVP_COUNT_LIMIT");
            else {
                this.nodeName1.active = this.nodeName2.active = !1;
                var o = parseInt(e);
                this._curIndex = o;
                1 == this._curIndex
                    ? n.utils.showNodeEffect(this.nodeLeftAddEffect)
                    : n.utils.showNodeEffect(this.nodeRightAddEffect);
                this.nodeInfo1.active = this.nodeInfo2.active = !0;
                this.nodeLeftAddEffect.active = this.nodeZan1.active = 1 == o;
                this.nodeRightAddEffect.active = this.nodeZan2.active = 2 == o;
                this.scheduleOnce(this.showChange, 1);
                this.scheduleOnce(this.sendZan, 2);
            }
        };
        e.prototype.showChange = function() {
            var t = this._curIndex,
                e = l.clothePveProxy.pvpMath;
            this.lblScore1.string = e.score1 + (1 == t ? 1 : 0) + "";
            this.lblScore2.string = e.score2 + (1 == t ? 0 : 1) + "";
        };
        e.prototype.sendZan = function() {
            n.utils.showNodeEffect(this.effNode, 1);
            if (-1 != this._curIndex) {
                l.clothePveProxy.sendPvpZan(
                    1 == this._curIndex
                        ? l.clothePveProxy.pvpMath.user.uid
                        : l.clothePveProxy.pvpMath.fuser.uid
                );
                this._curIndex = -1;
            }
        };
        e.prototype.onClickRwd = function() {
            l.clothePveProxy.pvpbase.ping < l.clothePveProxy.pvpinfo.rwd[0].need
                ? n.alertUtil.alert18n("CLOTHE_PVP_COUNT_LIMIT")
                : l.clothePveProxy.sendPvpRwd();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickAllClost = function() {
            n.utils.closeView(this);
            n.utils.closeNameView("clothe/ClothePvp");
        };
        __decorate([c(cc.Label)], e.prototype, "lblScore1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName1", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeZan1", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeInfo1", void 0);
        __decorate([c(i.default)], e.prototype, "spine1", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeName1", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLeftBtn", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLeftAddEffect", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblScore2", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeZan2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeInfo2", void 0);
        __decorate([c(i.default)], e.prototype, "spine2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeName2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRight", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRightBtn", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRightAddEffect", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblZan", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnRwd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Node)], e.prototype, "effNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
