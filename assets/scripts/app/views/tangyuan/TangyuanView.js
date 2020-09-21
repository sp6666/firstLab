var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNext = null;
            e.lblNum = null;
            e.lblTime = null;
            e.nextNode = null;
            e.btnQiang = null;
            e.lblNode = null;
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
            e.btnFRee = null;
            e.textValue = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                n.tangyuanProxy.TANG_YUAN_INFO_UPDATE,
                this.onInfo,
                this
            );
            facade.subscribe(
                n.tangyuanProxy.TANG_YUAN_BASE_UPDATE,
                this.onInfo,
                this
            );
            facade.subscribe(
                n.tangyuanProxy.TANG_YUAN_CHANGE,
                this.onInfo,
                this
            )
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            n.tangyuanProxy.sendOpenActivity();
            r.shaderUtils.setBlur(this.bg);
            this.btnQiang.interactable = !1; 
        };
        e.prototype.onInfo = function () {
            var t = this;
            t.textValue.string = n.bagProxy.getItemCount(1089);//汤勺
            n.tangyuanProxy.info &&
                l.uiUtils.countDown(
                    n.tangyuanProxy.info.info.eTime,
                    this.lblTime,
                    function () {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            var e = n.tangyuanProxy.getCurTangyuanTime(!0);
            this.btnFRee.node.active = false;
            if (null == e)
                this.lblNext.string = i18n.t("TANG_YUAN_YI_QIANG_WAN");
            else {
                var o = i.timeUtil.getTodaySecond(e.need);
                l.uiUtils.countDown(
                    o,
                    this.lblNext,
                    function () {
                        n.tangyuanProxy.sendOpenActivity();
                    },
                    !0,
                    "TANG_YUAN_XIA_YI_CI",
                    "d"
                );
            }
            if (i.timeUtil.second > n.tangyuanProxy.info.info.eTime) {
                this.nextNode.active = !1;
                this.lblNum.string = "";
                this.btnFRee.node.active = false;
            } else {
                var r = n.tangyuanProxy.getCurTangyuanTime();
                if (r) {
                    var a = n.tangyuanProxy.getCurRemain(r.need);
                    // this.btnQiang.interactable = !1;
                    this.lblNum.string = i18n.t("TANG_YUAN_BEN_LUN_SHENG_YU", {
                        num: s
                    });
                    this.nextNode.active = null != e; // 如果tip是常显示 那么 next 不为空 则显示
                    this.lblNode.active = !0;
                    // this.btnFRee.node.active = !n.tangyuanProxy.base.getSpoonTimeId || n.tangyuanProxy.base.getSpoonTimeId < r.need;
                    this.btnFRee.node.active = !n.tangyuanProxy.base.getSpoonTimeId ;
                } else {
                    this.nextNode.active = null != e &&
                        i.timeUtil.second < n.tangyuanProxy.info.info.eTime;
                    this.lblNum.string = i18n.t("ACTHD_ACTIVITY_UNOPEN");
                    this.btnFRee.node.active = false;
                }
            }
            this.scope_count = 0; //勺子 参数
        };
        e.prototype.onClickQiang = function () {
            var t = n.tangyuanProxy.getCurTangyuanTime();
            if (t) {
                if (this.flag) {
                    this.count++;
                    for (var o = 0; o < this.tyArr.length; o++) {
                        var l = Math.floor(3 * Math.random());
                        this.tyArr[o].spriteFrame = this.spriteArr[l];
                    }
                }
            }
        };
        e.prototype.onTimer = function () {
            this.tipNode.active=!1;
            this.flag = !1;
            this.btnQiang.interactable = !1;
            this.zhezhao.active = !1;
            this.cdAnie.node.active = !1;
            this.barNode.active = !1;
            this.tyFly.node.active = !1;
            this.btnQiang.node.height =444;
            this.tipNode.scaleX=1;
            this.tipNode.scaleY=1;
            n.tangyuanProxy.sendQiang(this.count, this.scope_count);
            this.count = 0;
            this.isClicking =false;
        };
        e.prototype.onClickRank = function () {
            i.utils.openPrefabView("tangyuan/TangyuanReward");
        };
        e.prototype.onClickShop = function () {
            i.utils.openPrefabView(
                "ActivityShopView",
                null,
                n.tangyuanProxy.dhShop
            );
        };
        e.prototype.onClickAdd = function () {
            i.utils.openPrefabView(
                "ActivitySpecialBuy", null,
                {
                    data: n.tangyuanProxy.shop[0],
                    activityId: n.tangyuanProxy.info.info.id
                })
        };

        e.prototype.onClickLeiji = function () {
            i.utils.openPrefabView("tangyuan/TangyuanLeiJi");

        };
        e.prototype.onCLickActLimitTime = function () {
            var o = n.limitActivityProxy.TANG_YUAN_TYPE;
            i.utils.openPrefabView(
                "limitactivity/LimitActivityView",
                null, {
                type: o
            }
            );
        };
        e.prototype.onBtnFree = function () {
            var t = n.tangyuanProxy.getCurTangyuanTime();
            if (t) {
                // if (!n.tangyuanProxy.base.getSpoonTimeId || n.tangyuanProxy.base.getSpoonTimeId < t.need) {
                    if (!n.tangyuanProxy.base.getSpoonTimeId) {
                        n.tangyuanProxy.getSpoon();
                } else {
                    i.alertUtil.alert18n("ACT67_HAVE_RECEIVE");
                }
            }
        };
        e.prototype.onItemUpdate = function () {
            this.textValue.string = n.bagProxy.getItemCount(1089);
        }
        e.prototype.onClickRob = function (e, t) {
            if (n.tangyuanProxy.info.info.eTime <= i.timeUtil.second)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                var count = t
                var has = n.bagProxy.getItemCount(1089);
                var t = n.tangyuanProxy.getCurTangyuanTime();
                if (has >= count) {
                    if (!t) {
                        i.alertUtil.alert18n("TANG_YUAN_WEI_KAI_QI");//还未开启 时 用这个
                        return;
                    }
                    if(this.isClicking){
                        i.alertUtil.alert18n("TANG_YUAN_ROBING")//正在点击中 不可以 再请求
                        return;
                    }
                    this.btnQiang.interactable = !0;
                    this.flag = true;
                    this.zhezhao.active = !0;
                    this.cdAnie.node.active = !0;
                    this.cdAnie.play();
                    this.barNode.active = !0;
                    this.barAnie.play();
                    this.tyFly.node.active = !0;
                    this.tyFly.play();
                    this.scope_count = count;
                    this.isClicking =true;
                    this.btnQiang.node.height =1280
                    this.tipNode.active =!0;
                    l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
                    this.scheduleOnce(this.onTimer, 5);

                } else {
                    i.utils.openPrefabView(
                        "ActivitySpecialBuy", null,
                        {
                            data: n.tangyuanProxy.shop[0],
                            activityId: n.tangyuanProxy.info.info.id
                        })

                }
            }
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Node)], e.prototype, "nextNode", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnQiang", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "zhezhao", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c([cc.Sprite])], e.prototype, "tyArr", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "spriteArr", void 0);
        __decorate([c(cc.Animation)], e.prototype, "cdAnie", void 0);
        __decorate([c(cc.Animation)], e.prototype, "barAnie", void 0);
        __decorate([c(cc.Animation)], e.prototype, "tyFly", void 0);
        __decorate([c(cc.Node)], e.prototype, "barNode", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnFRee", void 0);
        __decorate([c(cc.Label)], e.prototype, "textValue", void 0)
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
