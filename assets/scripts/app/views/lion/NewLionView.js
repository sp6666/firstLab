var list = require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var time = require("../../models/TimeProxy");
var rwdItem = require("../lion/NewLionRwdItem");
var api = require("../../utils/ApiUtils");
var config = require("../../Config");
const UrlLoad = require('../../component/UrlLoad');
cc.Class({
    extends: cc.Component,

    properties: {
        //奖励列表
        scrollRwd: {
            default: null,
            type: cc.ScrollView
        },
        //面板时间
        lblTaskTime: {
            default: null,
            type: cc.Label
        },

        //奖励按钮(选中)
        nodeRwdBtn: {
            default: null,
            type: cc.Node
        },
        //任务按钮(选中)
        nodeTaskBtn: {
            default: null,
            type: cc.Node
        },

        //奖励面板
        nodeRwdPanel: {
            default: null,
            type: cc.Node
        },
        //任务面板
        nodeTaskPanel: {
            default: null,
            type: cc.Node
        },

        //奖励列表
        lstRwd: {
            default: null,
            type: list.default
        },
        //任务列表
        lstTask: {
            default: null,
            type: list.default
        },

        //大关奖励项
        itemBigRwd: {
            default: null,
            type: rwdItem.default
        },

        //更换按钮 
        lblChange: {
            default: null,
            type: cc.Label
        },
        //欢迎界面
        nodeWelcome: {
            default: null,
            type: cc.Node
        },
        //进度条
        proExp: {
            default: null,
            type: cc.ProgressBar
        },
        //经验 
        lblExp: {
            default: null,
            type: cc.Label
        },
        //等级 
        lblGrade: {
            default: null,
            type: cc.Label
        },
        //舞狮兑换按钮
        nodeExchange: {
            default: null,
            type: cc.Node
        },
        //舞狮兑换按钮 繁体
        nodeExchangeFt: {
            default: null,
            type: cc.Node
        },
        //开启金狮按钮
        nodeGold: {
            default: null,
            type: cc.Node
        },
        //开启金狮繁体按钮
        nodeGoldFt: {
            default: null,
            type: cc.Node
        },
        //快速提升按钮
        nodeFast: {
            default: null,
            type: cc.Node
        },
        //task特效
        nodeEff: {
            //特效面板
            default: null,
            type: cc.Node
        },
        nodeEffTAsk: {
            //特效节点
            default: null,
            type: sp.Skeleton
        },
        nodeEffUpLv: {
            //升级特效节点
            default: null,
            type: sp.Skeleton
        },
        nodeEffUpLvFt: {
            //升级特效节点 繁体
            default: null,
            type: sp.Skeleton
        },
        nodeEffTAskEnd: {
            //领取任务奖励结束爆一下
            default: null,
            type: sp.Skeleton
        },

        spBg : UrlLoad.default,
        spAd : UrlLoad.default,
        spRole : UrlLoad.default,
        spCharge : UrlLoad.default,
        //end task特效
    },

    onLoad() {
        facade.subscribe(init.lionProxy.LION_DATA_UPDATE, this.onLionData, this);
        facade.subscribe(init.lionProxy.LION_GOLD_LOCK, this.onLionData, this);
        facade.subscribe(init.lionProxy.LION_VIEW_CLOSE, this.onClickClose, this);
        //facade.subscribe(init.lionProxy.LION_EXCHANGE_UPDATE, this.onExchange, this);

        //购买解锁回调
        init.lionProxy.isUnlocking = false;
        facade.subscribe("MOON_CARD_BUY_UPDATE", this.onUnlockSuccess, this);
        facade.subscribe("RECHARGE_FAIL", this.onUnlockFail, this);

        //
        this.nodeEff.active = false;
        this.nodeEffTAsk.node.active = false;
        this.nodeEffUpLv.node.active = false;
        this.nodeEffUpLvFt.node.active = false;
        this.nodeEffTAskEnd.node.active = false;

        init.lionProxy.init = false;

        //this.nodeWelcome.active = init.lionProxy.isFirst;
        this.nodeWelcome.active = false;
        init.lionProxy.isFirst && (init.lionProxy.isFirst = !1);

        init.purchaseProxy.sendOpenPrince();
        init.lionProxy.sendOpenActivity();

        if (init.lionProxy.cfg) {
            //初始打开rwd
            this.onClickTab(null, 2);
        }

        init.lionProxy.oldLv = -1;
        this.loadImgs();
    },

    // start () {
    // },

    // update (dt) {},
    onLionData() {
        var cfg = init.lionProxy.cfg;
        if (null != cfg) {
            //


            if (init.lionProxy.init == false) {
                //初始打开rwd
                this.onClickTab(null, 2);

                init.lionProxy.init = true;
            }

            //按钮显示 //非活动时间隐藏解锁金狮和快速提升按钮
            //兑换按钮
            this.nodeExchange.active = config.Config.lang == "zh-ch"; //简体
            this.nodeExchangeFt.active = config.Config.lang == "tw"; //海外

            //金狮按钮
            this.nodeGold.active =
                (cfg.isGold == 0 && config.Config.zone == "china" && cfg.activityInfo.status == 1) ||
                (cfg.isGold == 0 && config.Config.pf == "epandxianyu_fuse" && cfg.activityInfo.status == 1); //简体(是否yyw)

            this.nodeGoldFt.active = cfg.isGold == 0 && config.Config.zone != "china" && cfg.activityInfo.status == 1; //海外

            //快速提升
            this.nodeFast.active = cfg.isGold == 1 && cfg.activityInfo.status == 1 && cfg.grade < cfg.exp[cfg.exp.length - 1].id; //快速提升简繁体一样
            //end按钮显示

            1 == cfg.isGold && (init.lionProxy.isLockGold = !0);
            var t = this;
            //时间
            var time = cfg.activityInfo.status == 1 ? cfg.activityInfo.endTime : cfg.info.showTime;//(utils.timeUtil.second + cfg.info.showTime - cfg.activityInfo.endTime);
            var secondStr = cfg.activityInfo.status == 1 ? "USER_ACTIVITY_TIME" : "USER_EXCHANGE_TIME";
            uiUtils.uiUtils.countDown(time, this.lblTaskTime,
                function () {
                    t.lblTaskTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                secondStr,
                "d"
            );

            var allsGet = 1;

            /*
            cfg.rwd.sort(function(t, e) {
                if(!t.sGet || !e.sGet) allsGet = 0;

                if (init.lionProxy.isLockGold) {
                    var o = 1 == t.sGet && 1 == t.gGet ? 1 : 0,
                        i = 1 == e.sGet && 1 == e.gGet ? 1 : 0;
                    if (o != i) return o - i;
                } else {
                    var n = 1 == t.sGet ? 1 : 0,
                        r = 2 == e.sGet ? 1 : 0;
                    if (n != r) return n - r;
                }
                
                return t.id - e.id;
            });
            */
            for (var key in cfg.rwd) {
                if (!cfg.rwd[key].sGet) {
                    allsGet = 0;
                }
            }


            //如果全部领取完
            if (allsGet) {
                var btnChange = this.lblChange.node.parent.getComponent(cc.Button);
                btnChange.enableAutoGrayEffect = true;
                btnChange.interactable = false;
                this.lblChange.string = i18n.t("LION_ALL_FINISHED");

                for (var i = 0; i < init.lionProxy.cfg.task.length; ++i) {
                    init.lionProxy.cfg.task[i].get = 1;
                }
            }


            this.lstRwd.data = init.lionProxy.cfg.rwd;
            init.lionProxy.cfg.task.sort(function (t, e) {
                var o = localcache.getItem(localdb.table_lion_task, t.id),
                    i = localcache.getItem(localdb.table_lion_task, e.id),
                    n = t.num >= o.num ? 0 : 1,
                    l = e.num >= i.num ? 0 : 1;
                return t.get != e.get ? t.get - e.get : n - l;
            });

            this.lstTask.data = init.lionProxy.cfg.task;

            //向上取5的倍数
            var bigceil = Math.ceil((cfg.grade + 1) / 5);
            var bigGrade = bigceil * 5;

            //取大奖励的数据
            var bigData = null;
            for (var key in cfg.rwd) {
                if (cfg.rwd[key].coin == bigGrade) {
                    bigData = cfg.rwd[key];
                    break;
                }
            }

            if (!bigData) {
                bigData = cfg.rwd[cfg.rwd.length - 1];

            }

            //跳转
            this.updateScroll(cfg.grade);

            //bigData.noOpen = true;
            this.itemBigRwd.data = bigData;
            //end等级

            //非第一次执行
            if (init.lionProxy.cfg.rwd_cons) {
                //用完清掉这个值
                init.lionProxy.cfg.rwd_cons = null;

                this.showEff();
            } else {
                //如果没有获得经验的情况下，直接设置经验条
                this.updataExpProgress();
                this.updateUpLv();
            }

            //提示刷新成功
            if (init.lionProxy.isChangeTask) {
                init.lionProxy.isChangeTask = !1;

                utils.alertUtil.alert18n("RANK_REFRESH_SUCCESS");
            }


        }
    },

    loadImgs : function() {
        var e = init.limitActivityProxy.getActivityData(init.limitActivityProxy.LION_ID);
        if(e != null) {
            //换图
            if(e.bgName != null) {
                this.spBg.url = uiUtils.uiHelps.getCommonImg("lionNew/" + e.bgName);
            }
            if(e.roleName != null) {
                this.spRole.url = uiUtils.uiHelps.getCommonImg("lionNew/" + e.roleName);
            }
            if(e.adName != null) {
                this.spAd.url = uiUtils.uiHelps.getCommonLangImg("lionNew", e.adName);
            }
            if(e.adChargeName != null) {
                this.spCharge.url = uiUtils.uiHelps.getCommonLangImg("lionNew", e.adChargeName);
            }
        }
    },

    updateScroll(lv) {
        var tmpLv = 0;
        if (lv > 0) {
            tmpLv = lv - 1;
        } else {
            tmpLv = lv;
        }
        //
        var cfg = init.lionProxy.cfg;
        var pt = tmpLv / cfg.exp.length;

        //var sz = this.lstRwd.node.getContentSize();

        this.lstRwd.node.setPosition(this.lstRwd.node.getPosition().x, this.lstRwd.node.getContentSize().height * pt);
        //this.scrollRwd.scrollToPercentVertical(pt, 1);
    },
    updataExpProgress() {
        var cfg = init.lionProxy.cfg;

        //等级
        this.lblGrade.string = cfg.grade;

        //经验条
        var exp = null;
        for (var key in cfg.exp) {
            if (key == cfg.grade) {
                exp = cfg.exp[key];
                break;
            }
        }

        if (init.lionProxy.curLvExp < 0) {
            init.lionProxy.curLvExp = 0;
        }

        if (!exp) {
            //没有找到就取最后一档
            exp = cfg.exp[cfg.exp.length - 1];
            init.lionProxy.curLvExp = exp.need;
        }
        this.lblExp.string = i18n.t("COMMON_NUM", {
            f: init.lionProxy.curLvExp,
            s: exp.need
        });
        this.proExp.progress = init.lionProxy.curLvExp / exp.need;
        //end经验条
    },
    updateUpLv() {
        var cfg = init.lionProxy.cfg;
        //
        if (-1 != init.lionProxy.oldLv && this.nodeEff.active == false) {
            var e = cfg.grade - init.lionProxy.oldLv;
            if (e > 0) {
                var self = this;
                this.nodeEff.active = true;

                if (config.Config.lang == "zh-ch") {
                    //简体 其它
                    this.nodeEffUpLv.node.active = true;
                    utils.utils.showSpine(this.nodeEffUpLv, "animation", false, function () {
                        self.nodeEff.active = false;
                        self.nodeEffUpLv.node.active = false;
                    });
                } else {
                    this.nodeEffUpLvFt.node.active = true;
                    utils.utils.showSpine(this.nodeEffUpLvFt, "animation", false, function () {
                        self.nodeEff.active = false;
                        self.nodeEffUpLvFt.node.active = false;
                    });
                }

            }
        }
        init.lionProxy.oldLv = cfg.grade;
    },

    //show eff
    showEff() {
        var cur = null;
        for (var idx = 0; idx < this.lstTask._renders.length; idx++) {
            if (this.lstTask._renders[idx]._data) {
                if (this.lstTask._renders[idx]._data.id == init.lionProxy.curData.id) {
                    cur = this.lstTask._renders[idx];
                }
            }

        }
        if (cur) {
            var self = this;

            var nodePt = new cc.Vec2(this.node.x - this.node.width * 0.5 + cur.node.width * 0.5, this.node.y - this.node.x - this.node.height * 0.5 - cur.node.height * 0.5);
            var tmpPt = cur.node.convertToWorldSpaceAR(nodePt);
            var startPt = new cc.Vec2(tmpPt.x * -1, tmpPt.y * -1);

            var nodePt = new cc.Vec2(this.node.x - this.node.width * 0.5, this.node.y - this.node.x - this.node.height * 0.5);
            var endPt = this.proExp.node.convertToWorldSpaceAR(nodePt);

            this.nodeEff.active = true;
            this.nodeEffTAsk.node.setPosition(startPt.x, startPt.y);
            this.nodeEffTAsk.node.active = true;
            this.nodeEffTAsk.node.runAction(
                cc.sequence(
                    cc.jumpTo(1.3, endPt, 200, 1),
                    cc.callFunc(function () {
                        self.nodeEffTAskEnd.node.active = true;
                        utils.utils.showSpine(self.nodeEffTAskEnd, "animation", false, function () {
                            self.nodeEffTAskEnd.node.active = false;
                        });
                        self.updataExpProgress();

                        self.nodeEff.active = false;
                        self.nodeEffTAsk.node.active = false;

                        init.lionProxy.startX = 9999;
                        init.lionProxy.startY = 9999;
                        init.lionProxy.endX = 9999;
                        init.lionProxy.endY = 9999;

                        self.updateUpLv();
                    })
                )
            );
        }

        /*
        if(init.lionProxy.startX == 9999 || init.lionProxy.startY == 9999 || init.lionProxy.endX == 9999 || init.lionProxy.endY == 9999)
        {
            return;
        }

        var self = this;
        var startPt = new cc.Vec2(init.lionProxy.startX, init.lionProxy.startY);
        var endPt = new cc.Vec2(init.lionProxy.endX, init.lionProxy.endY);

        this.nodeEff.active = true;
        cc.log("startPt");
        cc.log("~!~!~!~! startPt x:" + startPt.x);
        this.nodeEffTAsk.setPosition(startPt.x, startPt.y);
        this.nodeEffTAsk.active = true;

        
        this.nodeEffTAsk.runAction( 
            cc.sequence(
                cc.jumpTo(1.3, endPt, 200, 1),
                cc.callFunc(function(){
                    self.nodeEffTAskEnd.active = true;
                    utils.utils.showSpine(self.nodeEffTAskEnd,"animation", false, function(){
                        self.nodeEffTAskEnd.active = false;
                    });
                    self.updataExpProgress();

                    self.nodeEff.active = false;
                    self.nodeEffTAsk.active = false;

                    init.lionProxy.startX = 9999;
                    init.lionProxy.startY = 9999;
                    init.lionProxy.endX = 9999;
                    init.lionProxy.endY = 9999;

                    self.updateUpLv();
                })
            )
        );
        */
    },
    //点击任务
    onClickTaskItem(e, t) {
        /*
        if(e._touches.length > 0)
        {
            //起点坐标
            cc.log("_touches");
            cc.log("~!~!~!~! _touches x:" + e._touches[0]._startPoint.x);
            init.lionProxy.startX = e._touches[0]._startPoint.x - this.node.width * 0.5;
            init.lionProxy.startY = e._touches[0]._startPoint.y - this.node.height * 0.5;

            //终点坐标
            cc.log("node");
            cc.log("~!~!~!~! node x:" + this.node.x);
            var nodePt = new cc.Vec2(this.node.x - this.node.width * 0.5, this.node.y - this.node.x - this.node.height * 0.5);
            var endPt = this.proExp.node.convertToWorldSpaceAR(nodePt);

            cc.log("endPt");
            cc.log("~!~!~!~! endPt x:" + endPt.x);
            init.lionProxy.endX = endPt.x;
            init.lionProxy.endY = endPt.y;
        }
        */

        return;

    },

    //点击更换
    onClickChange() {
        var self = this;

        var checkResult = this.checkTaskList();
        var isClaimExist = checkResult[0],
            isProcessExist = checkResult[1];

        function showConfirmChange() {
            //防止点击太快
            var openTime = cc.sys.now();

            utils.utils.showConfirmItem(
                i18n.t("LION_GENG_HUAN_TASK"),
                1,
                init.playerProxy.userData.cash,
                function (t) {
                    if (cc.sys.now() - openTime > 500 && init.playerProxy.userData.cash >= 50) {
                        init.lionProxy.sendChangeTask();
                        self.isChangeTask = true;
                    }
                }
            );
        }

        if (isClaimExist) {
            //提示有未领取
            utils.utils.showConfirm(i18n.t("LION_CLAIM_TASK_TIP"), showConfirmChange);
        } else if (isProcessExist) {
            utils.utils.showConfirm(i18n.t("LION_PROCESS_TASK_TIP"), showConfirmChange);
        } else {
            showConfirmChange();
        }

    },

    onClickClose() {
        init.lionProxy.cfg && 1 != init.lionProxy.cfg.isGold && (init.lionProxy.isLockGold = !1);
        utils.utils.closeView(this, true);
    },

    onClickStart() {
        this.nodeWelcome.active = !1;
    },

    onUnlockSuccess() {
        if (init.lionProxy.isUnlocking) {
            init.lionProxy.isUnlocking = 0;
            init.lionProxy.cfg.isGold = 1;

            utils.alertUtil.alert18n("LION_UNLOCK_SUCCESS");
            //解锁成功,刷新
            this.onLionData();
        }
    },

    onUnlockFail() {
        if (init.lionProxy.isUnlocking) {
            init.lionProxy.isUnlocking = 0;
            //提示解锁失败
            utils.alertUtil.alert18n("LION_UNLOCK_FAIL");
        }
    },

    checkTaskList() {
        //判断是否有未领取完成的任务
        var isClaimExist = false;
        var isProcessExist = false;
        for (var i = 0; i < this.lstTask.data.length; ++i) {
            var taskItem = this.lstTask.data[i];
            var taskItemCfg = localcache.getItem(localdb.table_lion_task, taskItem.id);
            if (taskItem.get != null && taskItem.get == 0) {
                //是否有未完成
                if (taskItem.num > 0) isProcessExist = true;

                //是否有未领取
                if (taskItem.num >= taskItemCfg.num) {
                    isClaimExist = true;
                    break;
                }
            }
        }

        return [isClaimExist, isProcessExist];
    },

    updateTab(t) {
        //切页 2为rwd，1为task
        this.nodeTaskBtn.active = t == 1;
        this.nodeRwdBtn.active = t == 2;
        this.nodeTaskPanel.active = t == 1;
        this.nodeRwdPanel.active = t == 2;
    },

    onClickShop() {
        utils.utils.openPrefabView(
            "ActivityShopView",
            null,
            init.lionProxy.hdShop //数据
        );
    },

    onClickTab(e, t) {
        var cfg = init.lionProxy.cfg;
        if (cfg.activityInfo.status != 1 && t == 1) {
            utils.alertUtil.alert(i18n.t("LION_ACTHD_OVERDUE"));
            return;
        }
        if (cfg.grade >= cfg.exp[cfg.exp.length - 1].id && t == 1) {
            //如果当前等级达到exp表最大值
            utils.alertUtil.alert(i18n.t("LION_EXP_LIMIT"));
            return;
        }

        //切页
        this.updateTab(t);
    },

    onClickLock() {
        var cfg = init.lionProxy.cfg;
        if (cfg.activityInfo.status != 1 && t == 1) {
            return;
        }

        //解锁金狮
        for (var t = null, e = 0; e < init.purchaseProxy.gift.length; e++)
            if (init.purchaseProxy.gift[e].type == init.limitActivityProxy.LION_ID) {
                t = init.purchaseProxy.gift[e];
                break;
            }
        if (t) {
            //开始解锁标志
            init.lionProxy.isUnlocking = true;

            //test
            // facade.send("MOON_CARD_BUY_UPDATE");
            // facade.send("RECHARGE_FAIL");

            var o = 10 * t.grade + 1e6 + 1e4 * t.id;
            api.apiUtils.recharge(
                init.playerProxy.userData.uid,
                config.Config.serId,
                o,
                t.grade,
                i18n.t("LION_GOLD_RWD"),
                0
            );
        }
    },

    onClickAll() {
        //一键领取,和顾涛商量好这里传6224表示一键领取
        init.lionProxy.sendGetRwd(6224);
    },
    onClickFast() {
        //快速提升
        utils.utils.openPrefabView("lion/LionPushView");
    },

    onClickYulan : function() {
        utils.utils.openPrefabView("lion/LionRwdYulan");
    },
});