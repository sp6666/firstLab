var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNext = null;
            e.lblNum = null;
            e.lblTime = null;
            e.nextNode = null;
            e.btnQiang = null;
            e.lblNode = null;
            e.startNode = null;
            e.tipNode = null;
            e.zhezhao = null;
            e.bg = null;
            e.tyArr = [];
            e.spriteArr = [];
            e.cdAnie = null;
            e.barAnie = null;
            e.tyFly = null;
            e.barNode = null;
            e.flag = !1;
            e.count = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.gaodianProxy.GAO_DIAN_INFO_UPDATE,
                this.onInfo,
                this
            );
            facade.subscribe(
                r.gaodianProxy.GAO_DIAN_BASE_UPDATE,
                this.onInfo,
                this
            );
            r.gaodianProxy.sendOpenActivity();
            l.shaderUtils.setBlur(this.bg);
            n.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
        };
        e.prototype.onInfo = function() {
            var t = this;
            r.gaodianProxy.info &&
                n.uiUtils.countDown(
                    r.gaodianProxy.info.info.eTime,
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            var e = r.gaodianProxy.getCurGaodianTime(!0);
            if (null == e)
                this.lblNext.string = i18n.t("GAO_DIAN_YI_QIANG_WAN");
            else {
                var o = i.timeUtil.getTodaySecond(e.need);
                n.uiUtils.countDown(
                    o,
                    this.lblNext,
                    function() {
                        t.lblNum.string = e.all + "";
                        r.gaodianProxy.sendOpenActivity();
                    },
                    !0,
                    "GAO_DIAN_XIA_YI_CI",
                    "d"
                );
            }
            if (i.timeUtil.second > r.gaodianProxy.info.info.eTime) {
                this.nextNode.active = !1;
                this.tipNode.active = this.startNode.active = !1;
                this.lblNum.string = "";
            } else {
                var l = r.gaodianProxy.getCurGaodianTime();
                if (l) {
                    var a = r.gaodianProxy.getCurRemain(l.need);
                    this.btnQiang.interactable = !0;
                    var s = l.all - (a ? a.count : 0);
                    this.lblNum.string = i18n.t("GAO_DIAN_BEN_LUN_SHENG_YU", {
                        num: s
                    });
                    this.startNode.active = this.tipNode.active =
                        r.gaodianProxy.base.rwd != l.need &&
                        s > 0 &&
                        i.timeUtil.getTodaySecond(l.need) < i.timeUtil.second;
                    this.nextNode.active = !this.startNode.active;
                    n.uiUtils.scaleRepeat(this.startNode, 0.9, 1.1);
                    this.lblNode.active = !0;
                } else {
                    this.tipNode.active = this.startNode.active = !1;
                    this.nextNode.active =
                        i.timeUtil.second < r.gaodianProxy.info.info.eTime;
                    this.lblNum.string = i18n.t("ACTHD_ACTIVITY_UNOPEN");
                }
            }
        };
        e.prototype.onClickQiang = function() {
            if (r.gaodianProxy.info.info.eTime <= i.timeUtil.second)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                var t = r.gaodianProxy.getCurGaodianTime();
                if (t) {
                    var e = r.gaodianProxy.getCurRemain(t.need);
                    if (e && t.all == e.count) {
                        i.alertUtil.alert18n("GAO_DIAN_QIANG_WAN");
                        return;
                    }
                    if (r.gaodianProxy.base.rwd == t.need) {
                        i.alertUtil.alert18n("GAO_DIAN_JIN_RI_YI_QIANG");
                        return;
                    }
                    if (this.flag) {
                        this.count++;
                        for (var o = 0; o < this.tyArr.length; o++) {
                            var n = Math.floor(3 * Math.random());
                            this.tyArr[o].spriteFrame = this.spriteArr[n];
                        }
                    } else {
                        this.flag = !0;
                        this.startNode.active = !1;
                        this.zhezhao.active = !0;
                        this.cdAnie.node.active = !0;
                        this.cdAnie.play();
                        this.barNode.active = !0;
                        this.barAnie.play();
                        this.tyFly.node.active = !0;
                        this.tyFly.play();
                        this.scheduleOnce(this.onTimer, 5);
                    }
                } else i.alertUtil.alert18n("GAO_DIAN_WEI_KAI_QI");
            }
        };
        e.prototype.onTimer = function() {
            this.flag = !1;
            this.btnQiang.interactable = !1;
            this.zhezhao.active = !1;
            this.cdAnie.node.active = !1;
            this.barNode.active = !1;
            r.gaodianProxy.sendQiang(this.count);
            this.count = 0;
        };
        e.prototype.onClickRank = function() {
            i.utils.openPrefabView("tangyuan/GaodianReward");
        };
        e.prototype.onClickShop = function() {
            i.utils.openPrefabView(
                "ActivityShopView",
                null,
                r.gaodianProxy.dhShop
            );
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Node)], e.prototype, "nextNode", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnQiang", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "startNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "zhezhao", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c([cc.Sprite])], e.prototype, "tyArr", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "spriteArr", void 0);
        __decorate([c(cc.Animation)], e.prototype, "cdAnie", void 0);
        __decorate([c(cc.Animation)], e.prototype, "barAnie", void 0);
        __decorate([c(cc.Animation)], e.prototype, "tyFly", void 0);
        __decorate([c(cc.Node)], e.prototype, "barNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
