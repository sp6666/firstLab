/**
 * 抢红包活动
 */
const Utils = require("../../utils/Utils");
const UIUtils = require("../../utils/UIUtils");
const ShaderUtils = require("../../utils/ShaderUtils");
const Initializer = require("../../Initializer");
const Config = require("../../Config");

cc.Class({
    extends: cc.Component,

    properties: {
        lblTime: cc.Label,
        btnQiang: cc.Button,
        lblTip: cc.Label,
        lblNode: cc.Node,
        bg: cc.Sprite,
        btnFinish: cc.Button,
        lblFinish: cc.Label,
        flyNode: cc.Node,
        flyItem: cc.Node,
        flyPoint: cc.Label,
        startEffzh: sp.Skeleton,
        startEfftw: sp.Skeleton,
        resultChoice: cc.Node,
        lblResult: cc.Label,
        lblCountDown: cc.Label,
        btnGet: cc.Button,
        btnGetTen: cc.Button,
        sfLingquZh: cc.SpriteFrame,
        sfShibeiLingquZh: cc.SpriteFrame,
        sfLingquTw: cc.SpriteFrame,
        sfShibeiLingquTw: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS: 

    onLoad() {
        this.flyItemList = []; //保存掉落月饼列表
        this.doCheckTime = 0; //多少帧算一次
        this.pointCount = 0; //命中次数
        this.point = 0; //按命中次数计算分数
        this.pointTen = 0; //十连的分数
        this.allCount = 0;
        this.countDown = 0; //玩法倒计时
        this.onGetNormalReward = false;
        this.onGetTenReward = false;

        facade.subscribe(Initializer.hongbaoProxy.HONGBAO_INFO_UPDATE, this.onInfo, this);
        facade.subscribe(Initializer.hongbaoProxy.HONGBAO_ITEM_CLICK, this.finishPlay, this);
        Initializer.hongbaoProxy.sendOpenActivity();
        //ShaderUtils.shaderUtils.setBlur(this.bg);
        this.lblTip.string = i18n.t("HONG_BAO_WAN_FA");
        this.showStartEff(false);
        this.initStartBtn();
        this.resultChoice.active = false;
        this.btnGet.node.on(cc.Node.EventType.TOUCH_START, this.onBtnGetTouch, this);
        // this.btnGet.node.on(cc.Node.EventType.TOUCH_END, this.onBtnGetEnd, this);
        // this.btnGet.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnGetEnd, this);
        this.btnGetTen.node.on(cc.Node.EventType.TOUCH_START, this.onBtnGetTouchTen, this);
        // this.btnGetTen.node.on(cc.Node.EventType.TOUCH_END, this.onBtnGetEndTen, this);
        // this.btnGetTen.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnGetEndTen, this);

        if (Config.Config.lang == "zh-ch") {
            //简体
            this.btnGet.getComponent(cc.Sprite).spriteFrame = this.sfLingquZh;
            this.btnGetTen.getComponent(cc.Sprite).spriteFrame = this.sfShibeiLingquZh;
        } else {
            //繁体
            this.btnGet.getComponent(cc.Sprite).spriteFrame = this.sfLingquTw;
            this.btnGetTen.getComponent(cc.Sprite).spriteFrame = this.sfShibeiLingquTw;
        }

    },

    showStartEff: function (show) {
        if (show) {
            //隐藏分数
            // this.flyPoint.node.active = false;
            // this.flyPoint.node.setScale(1.0, 1.0);
            if (Config.Config.lang == "zh-ch") {
                //简体
                this.startEffzh.node.active = true;
                this.startEfftw.node.active = false;

                Utils.utils.showSpine(this.startEffzh, "animation", false, () => {
                    //隐藏按钮
                    this.showStartEff(false);
                    this.startFall();
                });
            } else {
                //繁体
                this.startEfftw.node.active = true;
                this.startEffzh.node.active = false;

                Utils.utils.showSpine(this.startEfftw, "animation", false, () => {
                    //隐藏按钮
                    this.showStartEff(false);
                    this.startFall();
                });
            }
        } else {
            this.startEffzh.node.active = show;
            this.startEfftw.node.active = show;
        }
    },

    startBtnShow: function (show) {
        this.lblNode.active = show;
        this.btnQiang.interactable = show;
        this.btnQiang.node.active = show;
        this.flyNode.active = !show;
        //this.lblCountDown.node.active = !show;

    },

    onInfo: function () {
        if (Initializer.hongbaoProxy.info) {
            UIUtils.uiUtils.countDown(
                Initializer.hongbaoProxy.info.info.eTime,
                this.lblTime,
                () => {
                    this.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                true,
                "USER_REMAIN_TIME",
                "d"
            );
        }

        if (Utils.timeUtil.second > Initializer.hongbaoProxy.info.info.eTime) {
            //如果活动已结束
            this.startBtnShow(false);
            this.flyNode.active = false;
            this.lblCountDown.node.active = false;
        }
    },

    onClickQiang: function () {
        this.onGetNormalReward = false;
        this.onGetTenReward = false;
        if (Initializer.hongbaoProxy.info == null) {
            this.startEff();
            return;
        }

        if (Initializer.hongbaoProxy.info.info.eTime <= Utils.timeUtil.second) {
            //检查活动是否已结束
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
        } else {
            var time = Initializer.hongbaoProxy.getCurPay();
            if (time < 0) {
                //开始
                this.startEff();
            } else {
                //检测是否已经到达购买抢红包机会上限
                if (Initializer.hongbaoProxy.limitBuyBum <= 0) {
                    Utils.alertUtil.alert18n("BUY_LIMIT");
                    return;
                }

                Utils.utils.showConfirmItem(
                    i18n.t("HONG_BAO_PAY", {
                        num: time
                    }),
                    1,
                    Initializer.playerProxy.userData.cash,
                    () => {
                        Initializer.playerProxy.userData.cash < time ?
                            Utils.alertUtil.alertItemLimit(1) :
                            this.startEff();
                    }
                );
            }
        }
    },

    startEff: function () {
        //去掉开始文本
        this.startBtnShow(false);
        //重置游戏
        this.initFall();

        //显示开始动画
        this.showStartEff(true);
    },

    onTimer: function () {


        //隐藏掉落面板
        this.flyNode.active = false;
        this.lblCountDown.node.active = false;

        if (this.point < Initializer.hongbaoProxy.minimum) {
            this.point = Initializer.hongbaoProxy.minimum;
        } else if (this.point > Initializer.hongbaoProxy.maxmum) {
            this.point = Initializer.hongbaoProxy.maxmum;
        }

        //显示奖励面板
        this.showResultChoice();
    },

    showResultChoice: function () {
        this.resultChoice.active = true;
        this.lblResult.string = i18n.t("HONG_BAO_OVER", {
            num: this.point
        });
    },

    initStartBtn: function () {
        this.initFall();
        this.startBtnShow(true);
        this.btnFinish.node.active = false;
        this.lblFinish.node.stopAllActions();
    },

    onClickRank: function () {
        Utils.utils.openPrefabView("hongbao/HongBaoReward");
    },

    onClickShop: function () {
        Utils.utils.openPrefabView(
            "ActivityShopView",
            null,
            Initializer.hongbaoProxy.dhShop
        );
    },


    onClickClose: function () {
        Utils.utils.closeView(this);
    },

    onClickFinished: function () {
        this.initStartBtn();
    },

    onBtnGetTouch: function () {
        cc.log("touch ==================");
        if (this.onGetTenReward) return;
        this.onGetNormalReward = true;
    },

    onBtnGetEnd: function () {
        cc.log("touch ==================End");
        this.onGetNormalReward = false;
    },

    onBtnGetTouchTen: function () {
        cc.log("touch ==================");
        if (this.onGetNormalReward) return;
        this.onGetTenReward = true;
    },

    onBtnGetEndTen: function () {
        cc.log("touch ==================");
        this.onGetTenReward = false;
    },

    onClickGet: function () {
        //直接获取
        if (!this.onGetNormalReward) return;
        this.onGetNormalReward = false;
        this.getReward(1);
    },

    onClickGetTen: function () {
        //十倍获取
        if (!this.onGetTenReward) return;
        //this.onGetTenReward = false;
        this.scheduleOnce(this.resetTenReward, 0.5);
        if (Initializer.hongbaoProxy.limitTenCost <= 0) {
            Utils.alertUtil.alert18n("BUY_LIMIT");
            return;
        }
        var cost = Initializer.hongbaoProxy.getTenCost;
        this.costTenCallBackClick = false;
        Utils.utils.showConfirmItem(
            i18n.t("HONG_BAO_TEN_TIP", {
                num: cost
            }),
            1,
            Initializer.playerProxy.userData.cash,
            () => {
                if (Initializer.playerProxy.userData.cash < cost) {
                    Utils.alertUtil.alertItemLimit(1);
                } else {
                    if (!this.costTenCallBackClick) {
                        this.costTenCallBackClick = true;
                        this.getReward(10);
                    }

                }
            }
        );

    },

    resetTenReward: function (dt) {
        this.onGetTenReward = false;
    },

    getReward: function (beishu) {
        var realPoint = 0;
        if (beishu != 1) {
            realPoint = this.pointTen;
        } else {
            realPoint = this.point;
        }
        Initializer.hongbaoProxy.sendQiang(realPoint, beishu);
        Initializer.hongbaoProxy.sendOpenActivity(); //刷新数据
        //隐藏掉落面板
        this.flyNode.active = false;
        this.lblCountDown.node.active = false;

        this.resultChoice.active = false;

        //弹出提示文本
        //Utils.alertUtil.alert(i18n.t("HONG_BAO_OVER",{ num: this.point}));
        this.lblFinish.node.runAction(
            cc.sequence(
                cc.delayTime(0.5), //2秒后消失
                cc.callFunc(() => {
                    if (beishu != 1) {
                        this.pointTen = 0;
                    }
                    this.initStartBtn();
                })
            )
        );
    },


    initFall: function () {
        //初始化
        this.pointCount = 0;
        this.point = 0;
        //this.addPoint();
        this.stopFly();

        this.flyNode.active = true;

    },

    startFall: function () {
        this.initFall();
        //设定计时器
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.onTimer, Initializer.hongbaoProxy.timeRemain + 1);
        cc.log("--------------" + Initializer.hongbaoProxy.timeRemain);

        //开始游戏倒计时
        this.lblCountDown.node.active = true;
        this.lblCountDown.string = Initializer.hongbaoProxy.timeRemain;
        this.countDown = Initializer.hongbaoProxy.timeRemain;
        this.schedule(this.showCountDown, 1, Initializer.hongbaoProxy.timeRemain);

        if (this.flyItemList.length > 0) {
            //如果已经创建就重新开始一遍
            for (var idx = 0; idx < this.flyItemList.length; idx++) {
                this.rePlay(this.flyItemList[idx]);
            }
            return;
        }

        for (var idx = 0; idx < Initializer.hongbaoProxy.startCount; idx++) {
            //创建
            this.createItem(idx);
        }
    },

    createItem: function (index) {
        var it = cc.instantiate(this.flyItem);
        if (it) {
            it.openParam = index;
            it.id = index;
            it.active = true;
            this.flyNode.addChild(it);
            this.flyItemList.push(it);
            this.rePlay(it);
        }
    },

    oncePlay: function (item) {
        if (item) {
            var random = UIUtils.uiUtils.randomNum(Initializer.hongbaoProxy.delay[0], Initializer.hongbaoProxy.delay[1]);
            var speed = UIUtils.uiUtils.randomNum(Initializer.hongbaoProxy.speed[0], Initializer.hongbaoProxy.speed[1]);
            var itPt = item.getPosition();
            item.runAction(
                cc.sequence(
                    cc.delayTime(random),
                    cc.moveTo(speed, new cc.Vec2(itPt.x, 0.0)),
                    cc.callFunc(() => {
                        this.rePlay(item);
                    })
                )
            );
        }
    },

    stopFly: function () {
        //停止掉落
        if (this.flyItemList.length > 0) {
            for (var idx = 0; idx < this.flyItemList.length; idx++) {
                this.flyItemList[idx].setPosition(this.flyItemList[idx].getPosition().x, 0);
                this.flyItemList[idx].stopAllActions();
            }
        }
    },

    rePlay: function (item) {
        if (item) {
            this.allCount++;
            item.stopAllActions();
            //高度坐标就是flyNode的高度
            var height = this.flyNode.getContentSize().height + 100;
            var width = this.flyNode.getContentSize().width;
            var pot = UIUtils.uiUtils.getRandomPosInRect(new cc.Vec2(width / 2.0, height), width, 50.0);
            item.setPosition(pot);
            this.oncePlay(item);
        }
    },

    //点击月饼回调
    finishPlay: function (idx) {
        if (idx < this.flyItemList.length) {
            this.pointCount++;
            this.addPoint();
            this.rePlay(this.flyItemList[idx]);
        }
    },

    addPoint: function () {
        // if(this.flyPoint.node.active == false)
        // {
        //     this.flyPoint.node.active = true;
        // }

        //这里可以按公式做一个换算,最低8个
        this.point = 1 * this.pointCount;
        this.pointTen = this.point;
        // this.flyPoint.string = this.point;
        // UIUtils.uiUtils.scaleOnce(this.flyPoint.node, 0.9, 1.2, 0.05);
    },

    showCountDown: function () {
        this.countDown--;
        this.lblCountDown.string = this.countDown;
        if (this.countDown <= 0) {
            this.unschedule(this.showCountDown);
        }
    }

});