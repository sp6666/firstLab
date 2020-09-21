var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../models/TimeProxy"),
    a = require("../../Config"),
    s = require("./ActivityItem"),
    c = require("../../models/LimitActivityProxy"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeStoryBg = null;
            e.topNode = null;
            e.leftNode = null;
            e.mainNode = null;
            e.setNode = null;
            e.nodeQuest = null;
            e.nodeJingYi = null;
            e.nodeLingLang = null;
            e.nodeSeven = null;
            //add by cjf 
            e.nodeSevenHappy = null;
            e.nodeFirstRecharge = null;
            e.nodeMergeFirstRecharge = null;
            e.nodeXianli = null;
            e.nodeMonthCard = null;
            e.nodeRecharge = null;
            e.arrowNode = null;
            e.activityNode = null;
            e.maskNode = null;
            e.rightNode = null;
            e.rightArrow = null;
            e.rightMaskNode = null;
            e.activitItemNode = null;
            e.btnJiJin = null;
            e.isFirst = !1;
            e._startPos = null;
            e._endPos = null;
            e._isMove = !1;
            e._isDown = !1;
            e._isShow = !1;
            e._isTopShow = !1;
            e._isRightShow = !1;
            e._isSendMove = !0;
            e._actMaps = new Map();
            e._curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            this.activitItemNode.active = !1;
            i.utils.setCanvas();
            facade.subscribe("SHOW_OPEN_EFFECT", this.onShowOpenEffect, this);
            facade.subscribe("SHOW_CLOSE_EFFECT", this.onShowCloseEffect, this);
            facade.subscribe("STORY_END", this.onStoryEnd, this);
            facade.subscribe("STORY_FIRST_START", this.onStoryFirtst, this);
            facade.subscribe("CLOSE_NOTICE", this.openNotice, this);
            facade.subscribe("SHOW_RETRY_SEND", this.onRetrySend, this);
            facade.subscribe("CLOSE_SEND_MOVE", this.sendCloseMove, this);
            facade.subscribe("CLOSE_BANNER", this.openFengHou, this);
            facade.subscribe(
                "FIRST_RECHARGE_UPDATE",
                this.onHuodongUpdata,
                this
            );
            facade.subscribe("TIME_RUN_FUN", this.onTimeRun, this);
            facade.subscribe(
                n.playerProxy.PLAYER_USER_UPDATE,
                this.onHuodongUpdata,
                this
            );
            facade.subscribe(
                n.bossPorxy.UPDAYE_BOSS_CD_DOWN,
                this.onUpdateBossBtn,
                this
            );
            facade.subscribe(
                n.limitActivityProxy.LIMIT_ACTIVITY_HUO_DONG_LIST,
                this.onHuodongUpdata,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_LEVEL_UPDATE,
                this.onLevelUpdate,
                this
            );

            facade.subscribe(
                n.jiJinChengZhangProxy.JIJIN_OPENINFO,
                this.onHuodongUpdata,
                this
            );
            facade.subscribe(
                n.achievementProxy.UPDATE_SCORE,
                this.onUpdateHyd,
                this
            );
            facade.subscribe(
                n.taskProxy.MAIN_TASK_REFESH,
                () => {
                    n.jiJinChengZhangProxy.openInfo()
                },
                this
            )
            facade.subscribe(
                n.welfareProxy.RECHARGE_SUCCESS,
                this.onUpdateHyd,
                this
            )
            this.scheduleOnce(this.delayCreateWait, 0.1);
            if (n.playerProxy.storyIds && n.playerProxy.storyIds.length > 0) {
                this.nodeStoryBg.active = !0;
                i.utils.openPrefabView("StoryView");
            } else this.openNotice(!0);
            if (cc.sys.isMobile) {
                this.node.parent.on(
                    cc.Node.EventType.TOUCH_START,
                    this.onClick,
                    this,
                    !0
                );
                this.node.parent.on(
                    cc.Node.EventType.TOUCH_MOVE,
                    this.onClickMove,
                    this
                );
                this.node.parent.on(
                    cc.Node.EventType.TOUCH_END,
                    this.onClickEnd,
                    this
                );
                this.node.parent.on(
                    cc.Node.EventType.TOUCH_CANCEL,
                    this.onClickEnd,
                    this
                );
                cc.sys.os == cc.sys.OS_ANDROID &&
                    cc.systemEvent.on(
                        cc.SystemEvent.EventType.KEY_UP,
                        this.onKeyUp,
                        this
                    );
            } else {
                this.node.parent.on(
                    cc.Node.EventType.MOUSE_DOWN,
                    this.onClick,
                    this,
                    !0
                );
                this.node.parent.on(
                    cc.Node.EventType.MOUSE_MOVE,
                    this.onClickMove,
                    this
                );
                this.node.parent.on(
                    cc.Node.EventType.MOUSE_UP,
                    this.onClickEnd,
                    this
                );
                cc.systemEvent.on(
                    cc.SystemEvent.EventType.KEY_UP,
                    this.onKeyUp,
                    this
                );
            }
            this.loadMainScene();
            this.updateNodeQuest();
            this.updateRed(!1);
            this.onHuodongUpdata();
            this.onUpdateBossBtn();
            this.leftNode.active = this.rightNode.active =
                a.Config.isShowMonthCard;
            this._curIndex = 0;
            this.schedule(this.createActive, 0.05);

            this.checkAddicted();
            this.nodeSevenHappy.active = false;
            this.updateSevenDayHappy();
            this.checkOnLineTime();
        };
        e.prototype.playFlowerEffect = function () {
            this.flowerEffectNode.active = true;
        };
        e.prototype.onKeyUp = function (t) {
            cc.sys.isMobile ?
                t.keyCode == cc.KEY.back && facade.send("UI_TOUCH_MOVE_LEFT") :
                t.keyCode == cc.KEY.escape &&
                facade.send("UI_TOUCH_MOVE_LEFT");
        };
        e.prototype.updateNodeQuest = function () {
            var t = n.timeProxy.getLoacalValue("QUEST_TIME"),
                e = i.stringUtil.isBlank(t) ? {} : JSON.parse(t),
                o = e[a.Config.questUrl] ?
                e[a.Config.questUrl] :
                i.timeUtil.second;
            this.nodeQuest.active =
                i.timeUtil.second - o < 86400 &&
                (i.timeUtil.second - n.playerProxy.userData.regtime > 43200 ||
                    (n.limitActivityProxy.sevenSign &&
                        0 != n.limitActivityProxy.sevenSign.level[1].type)) &&
                !i.stringUtil.isBlank(a.Config.questUrl);
        };
        e.prototype.delayCreateWait = function () {
            i.utils.setWaitUI();
            this.arrowNode.active = !1;
            this.rightArrow.active = !1;
        };
        e.prototype.createActive = function () {
            var t = c.activityUtils.activityList,
                e = t[this._curIndex];
            this._curIndex++;
            if (this._curIndex >= t.length) {
                this.unschedule(this.createActive);
                this.scheduleOnce(this.onClickArrow, 0.1);
                this.scheduleOnce(this.onClickRightArrow, 0.1);
                this.arrowNode.active = !0;
                this.rightArrow.active = !0;
                l.uiUtils.scaleRepeat(this.arrowNode, 0.9, 1.2);
                l.uiUtils.scaleRepeat(this.rightArrow, 0.9, 1.2);

            }
            if (e && e.type > 0) {
                var o = cc.instantiate(this.activitItemNode);
                o.active = !0;
                var i = o.getComponent(s.default);
                if (i) {
                    this._actMaps[e.id] = i;
                    o.x = o.y = 0;
                    if (1 == e.type) {
                        this.activityNode.addChild(o)
                    } else if (2 == e.type) {
                        this.rightNode.addChild(o);
                    } else {
                        this.rightNode.addChild(o);
                    }
                    i.data = e;
                }
            }
        };
        e.prototype.sendCloseMove = function (t) {
            this._isSendMove = t;
        };
        e.prototype.loadMainScene = function () {
            var t = this,
                e = l.uiHelps.getUIPrefab("main/MainScene");
            cc.loader.loadRes(e, function (e, o) {
                if (null == e && o) {
                    var n = cc.instantiate(o);
                    if (n) {
                        t.mainNode.addChild(n);
                        i.utils.showNodeEffect(n);
                        n.setSiblingIndex(0);
                    }
                } else cc.warn(e + " name load error!!!");
            });
        };
        e.prototype.updateRed = function (t) {
            void 0 === t && (t = !0);
            n.feigeProxy.updateRed();
            n.jibanProxy.updateRed();
            n.jingyingProxy.updateJY();
            n.jingyingProxy.updateZW();
            n.playerProxy.updateRoleLvupRed();
            if (
                t &&
                (null == n.firstRechargeProxy.data ||
                    0 == n.firstRechargeProxy.data.type) &&
                n.playerProxy.userData.bmap >
                i.utils.getParamInt("FIRST_RECHARGE_SHOW") &&
                null == n.timeProxy.getLoacalValue("FIRST_RECHARGE_SHOW")
            ) {
                r.funUtils.openView(r.funUtils.firstRecharge.id);
                n.timeProxy.saveLocalValue("FIRST_RECHARGE_SHOW", "1");
            }
        };
        e.prototype.onShowOpenEffect = function () {
            this.updateRed();
            facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                type: 3,
                value: n.taskProxy.mainTask.id
            });
            var t = this;
            i.utils.showEffect(this, 0, function () {
                t.scheduleOnce(t.releaseCollect, 0.2);
            });
            this.showRoleUpEffect();
        };
        e.prototype.releaseCollect = function () {
            i.utils.releaseCollect();
        };
        e.prototype.showRoleUpEffect = function () {
            var t = n.timeProxy.getLoacalValue("USER_UP_LEVEL_STORY"),
                e = i.stringUtil.isBlank(t) ? 0 : parseInt(t);
            if (0 == e && e < n.playerProxy.userData.level) {
                var o = localcache.getItem(
                    localdb.table_officer,
                    n.playerProxy.userData.level
                );
                if (
                    o &&
                    !i.stringUtil.isBlank(o.storyid) &&
                    n.playerProxy.getStoryData(o.storyid)
                ) {
                    n.playerProxy.addStoryId(o.storyid);
                    i.utils.openPrefabView("StoryView");
                    n.timeProxy.saveLocalValue(
                        "USER_UP_LEVEL_STORY",
                        n.playerProxy.userData.level + ""
                    );
                }
            }
        };
        e.prototype.onShowCloseEffect = function (t) {
            this.onClickOpen(null, t);
        };
        e.prototype.onClickShop = function () {
            n.shopProxy.sendList();
        };
        e.prototype.onClickOpenUnEffect = function (t, e) {
            r.funUtils.openViewUrl(e + "");
        };
        e.prototype.onOpenActivity = function (t, e) {
            r.funUtils.isCanOpenViewUrl(e + "") &&
                r.funUtils.openViewUrl(e + "");
        };
        e.prototype.onOpenLinglang = function (t, e) {
            n.lingLangProxy.sendOpenActivity(() => {
                this.onOpenActivity(t, e);
            })
        };
        e.prototype.onOpenJingYi = function (t, e) {
            n.jingYiHuaShangProxy.getInfo(() => {
                this.onOpenActivity(t, e);
            })
        };
        e.prototype.onClickOpenServant = function (t, e) {
            if (i.stringUtil.isBlank(e))
                i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            else if (r.funUtils.isCanOpenViewUrl(e) || a.Config.DEBUG) {

                if (n.taskProxy.mainTask.id < 60) { //时来运转
                    var s = localcache.getItem(localdb.table_mainTask, 60);
                    i.alertUtil.alert(i18n.t("FIGHT_TASK_LIMIT", {
                        n: s.name
                    }));
                } else {
                    i.utils.showEffect(this, 1, function () {
                        r.funUtils.openViewUrl(e + "", !0);
                    });
                }

            }
        };
        e.prototype.onClickOpen = function (t, e) {
            if (i.stringUtil.isBlank(e))
                i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            else if (r.funUtils.isCanOpenViewUrl(e) || a.Config.DEBUG) {
                //facade.send("MAIN_TOP_HIDE_PAO_MA");
                i.utils.showEffect(this, 1, function () {
                    r.funUtils.openViewUrl(e + "", !0);
                });
            }
        };
        e.prototype.onClick = function (t) {
            l.clickEffectUtils.showEffect(t);
            this._startPos = t.getLocation();
            this._isDown = !0;
            i.audioManager.playClickSound();
        };
        e.prototype.onClickMove = function (t) {
            this._isMove = this._isDown;
        };
        e.prototype.onClickEnd = function (t) {
            if (cc.sys.isMobile && t.getTouches().length > 1)
                this._isMove = this._isDown = !1;
            else {
                this._endPos = t.getLocation();
                this._isDown = !1;
                if (this._isMove && this._startPos.x < 80) {
                    this._isMove = !1;
                    if (
                        n.guideProxy.guideUI &&
                        !n.guideProxy.guideUI.isHideShow()
                    )
                        return;
                    var e = this._endPos.x - this._startPos.x,
                        o = this._endPos.y - this._startPos.y;
                    Math.abs(e) > 100 &&
                        Math.abs(e) > Math.abs(o) &&
                        this._isSendMove ?
                        facade.send(
                            e < 0 ?
                            "UI_TOUCH_MOVE_RIGHT" :
                            "UI_TOUCH_MOVE_LEFT",
                            this._endPos.y,
                            !0
                        ) :
                        Math.abs(o) > 100 &&
                        Math.abs(o) > Math.abs(e) &&
                        this._isSendMove &&
                        facade.send(
                            o > 0 ? "UI_TOUCH_MOVE_UP" : "UI_TOUCH_MOVE_DOWN",
                            null,
                            !0
                        );
                }
            }
        };
        e.prototype.onStoryEnd = function () {
            if (this.isFirst) {
                i.audioManager.stopBGM(!0);
                this.isFirst = !1;
                this.openNotice(!0);
            }
        };
        e.prototype.openNotice = function (t) {
            void 0 === t && (t = !1);
            n.timeProxy.noticeMsg &&
                n.timeProxy.noticeMsg.length > 0 &&
                t &&
                n.playerProxy.guide.gnew > 1 ?
                i.utils.openPrefabView("NoticeView") :
                n.taskProxy.mainTask.id >
                i.utils.getParamInt("SHOW_GUAN_TASK_ID") &&
                (n.jingyingProxy.exp.cd.num > 0 || (n.jingyingProxy.coin.num > 0 && n.jingyingProxy.army.num) || n.jingyingProxy.food.num > 0 || n.lookProxy.xfinfo.num > 0) ?
                i.utils.openPrefabView("GuanView") : t && this.onShowOpenEffect();
        };
        e.prototype.openFengHou = function (t) {
            var showFengHou = false;
            var t = n.limitActivityProxy.huodongList;
            if (t != null) {
                for (var idx = 0; idx < t.length; idx++) {
                    if (t[idx].id == n.limitActivityProxy.FENGHOU_ID) {
                        showFengHou = true;
                        break;
                    }
                }
            }
            //弹出封后大典
            if (showFengHou) {
                i.utils.openPrefabView("liugong/FengHouView");
            }
        };
        e.prototype.onStoryFirtst = function () {
            this.nodeStoryBg.active = !1;
            this.isFirst = !0;
        };
        e.prototype.onClickQuest = function () {
            var t = n.timeProxy.getLoacalValue("QUEST_TIME"),
                e = i.stringUtil.isBlank(t) ? {} : JSON.parse(t);
            null == (e = null == e ? {} : e)[a.Config.questUrl] &&
                (e[a.Config.questUrl] = i.timeUtil.second);
            i.utils.openPrefabView("Web", !1, {
                url: a.Config.questUrl
            });
            n.timeProxy.saveLocalValue("QUEST_TIME", JSON.stringify(e));
            this.nodeQuest.active = !1;
        };

        e.prototype.onClickArrow = function () {
            var t = this.activityNode.getContentSize().height,
                e = t > 675 ? 690 : t + 15;
            if (this._isShow) {
                this.activityNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, t)));
                this.arrowNode.rotation = 180;
                this.arrowNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, -120)));
                this._isShow = !1;
                this.scheduleOnce(this.onTimer, 0.1);
            } else {
                var o = -(e + 100);
                this.activityNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, 0)));
                this.arrowNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, o)));
                this.arrowNode.rotation = 0;
                this._isShow = !0;
                this.maskNode.height = 675;
            }
        };
        e.prototype.onHeightChange = function () {
            var t =
                this.activityNode.getContentSize().height > 675 ?
                690 :
                this.activityNode.getContentSize().height + 15;
            this._isShow ?
                (this.arrowNode.y = -(t + 100)) :
                (this.arrowNode.y = -120);
        };
        e.prototype.onClickRightArrow = function () {
            var t = this.rightNode.getContentSize().height,
                e = t > 675 ? 690 : t + 15;
            if (this._isRightShow) {
                this.rightNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, t)));
                this.rightArrow.rotation = 180;
                this.rightArrow.runAction(cc.moveTo(0.1, new cc.Vec2(0, -150)));
                this._isRightShow = !1;
                this.scheduleOnce(this.onTimer2, 0.1);
            } else {
                var o = -(e + 130);
                this.rightNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, 0)));
                this.rightArrow.runAction(cc.moveTo(0.1, new cc.Vec2(0, o)));
                this.rightArrow.rotation = 0;
                this._isRightShow = !0;
                this.rightMaskNode.height = 675;
            }
        };
        e.prototype.onRightHeightChange = function () {
            var t =
                this.rightNode.getContentSize().height > 675 ?
                690 :
                this.rightNode.getContentSize().height + 15;
            this._isRightShow ?
                (this.rightArrow.y = -(t + 130)) :
                (this.rightArrow.y = -150);
        };
        e.prototype.onRetrySend = function () {
            i.utils.showSingeConfirm(
                i18n.t("LOGIN_SERVER_DELAY"),
                function () {
                    JsonHttp.sendLast();
                },
                null,
                null,
                i18n.t("COMMON_RETRY")
            );
        };
        e.prototype.onHuodongUpdata = function () {
            var t = n.limitActivityProxy.huodongList;
            if (t != null) {
                var showNodeJingYi = false;
                for (var idx = 0; idx < t.length; idx++) {
                    if (t[idx].id == n.limitActivityProxy.JINGYI_ID) {
                        showNodeJingYi = true;
                        break;
                    }
                }
                this.nodeJingYi.active = showNodeJingYi;
                var showNodeLingLang = false;
                for (var idx = 0; idx < t.length; idx++) {
                    if (t[idx].id == n.limitActivityProxy.LINGLANG_ID) {
                        var funitem = {
                            id: 131,
                        }
                        showNodeLingLang = r.funUtils.isOpenFun(funitem);
                        break;
                    }
                }
                this.nodeLingLang.active = showNodeLingLang;
            } else {
                this.nodeJingYi.active = false;
                this.nodeLingLang.active = false;
            }

            if (r.funUtils.isOpenFun(r.funUtils.mergeTTCZ) && n.limitActivityProxy.isHaveTypeActive(r.funUtils.mergeTTCZ.activityid)) {
                this.nodeMergeFirstRecharge.active =
                    null == n.mergeFirstRechargeProxy.data ||
                    (2 != n.mergeFirstRechargeProxy.data.type &&
                        r.funUtils.isOpenFun(r.funUtils.mergeFirstRecharge));
            } else {
                this.nodeMergeFirstRecharge.active = false;
            }


            this.nodeFirstRecharge.active =
                null == n.firstRechargeProxy.data ||
                (2 != n.firstRechargeProxy.data.type &&
                    r.funUtils.isOpenFun(r.funUtils.firstRecharge));
            this.nodeSeven.active =
                null != n.limitActivityProxy.sevenSign &&
                r.funUtils.isOpenFun(r.funUtils.servanDay);
            this.nodeRecharge.active =
                n.firstRechargeProxy.data &&
                2 == n.firstRechargeProxy.data.type &&
                r.funUtils.isOpenFun(r.funUtils.firstRecharge);
            //基金成长显示规则 如果该活动玩家全部达成则不显示  
            // this.btnJiJin.active =true;
            let JijinAct = n.jiJinChengZhangProxy.complete();
            this.btnJiJin.active = JijinAct;

            for (var t in this._actMaps) {
                var e = this._actMaps[t];
                e && e.updateShow();
            }
            this.scheduleOnce(this.onHeightChange, 0.4);
            this.scheduleOnce(this.onRightHeightChange, 0.4);
        };
        e.prototype.onClickServantDuihuan = function () {
            n.limitActivityProxy.sendLookActivityData(
                n.limitActivityProxy.DUIHUAN_ID,
                function () {
                    null != n.limitActivityProxy.duihuan &&
                        null != n.limitActivityProxy.duihuan.info ?
                        i.utils.openPrefabView("limitactivity/ServantRecruit") :
                        i.alertUtil.alert18n("GAME_LEVER_UNOPENED");
                }
            );
        };
        e.prototype.onTimer = function () {
            this.maskNode.height = 0;
        };
        e.prototype.onTimer2 = function () {
            this.rightMaskNode.height = 0;
        };
        e.prototype.onUpdateBossBtn = function () {
            var t = i.utils.getParamInt("world_boss_start_hour"),
                e = i.timeUtil.getTodaySecond(t),
                o = i.utils.getParamInt("world_boss_end_hour"),
                n = i.timeUtil.getTodaySecond(o);
            this.nodeXianli.active =
                e <= i.timeUtil.second &&
                i.timeUtil.second <= n &&
                r.funUtils.isOpenFun(r.funUtils.xianli);
        };
        e.prototype.onClickStronger = function () {
            i.utils.openPrefabView("stronger/StrongerView");
        };
        e.prototype.onLevelUpdate = function () {
            n.limitActivityProxy.sendHdList();
        };
        e.prototype.onClickRehcarge = function () {
            r.funUtils.openView(r.funUtils.recharge.id);
        };
        e.prototype.onTimeRun = function (t) {
            var e = t.time,
                o = t.fun;
            null != o && (0 == e || e < 0.05 ? o() : this.scheduleOnce(o, e));
        };

        e.prototype.onClickDemo = function (t, e) {
            i.utils.openPrefabView("chuidiao/ChuiDiaoFishingView");
        };

        e.prototype.checkAddicted = function () {
            if (n.playerProxy.userData.end_time != null && n.playerProxy.userData.end_time != 0) {
                //进入倒计时
                i.utils.showSingeConfirm(i18n.t("ADDICTED_TIP"));
                this.schedule(this.onSendOnLineAdok, 60);
            }
        };

        e.prototype.onSendOnLineAdok = function () {
            n.playerProxy.sendAdok("addicted");
        };

        e.prototype.checkOnLineTime = function () {
            this.sendOnlineInfo();
            this.schedule(this.sendOnlineInfo, 60);
        };
        e.prototype.sendOnlineInfo = function () {
            n.welfareProxy.getOnLineInfo();
        };

        e.prototype.updateSevenDayHappy = function () {
            if (!n.limitActivityProxy.sevenDayHappy || n.limitActivityProxy.sevenDayHappy == [] || !n.limitActivityProxy.sevenDayHappy.day || n.limitActivityProxy.sevenDayHappy.day > 8) {
                this.nodeSevenHappy.active = false;
                return;
            }
            this.nodeSevenHappy.active = true;
        };

        e.prototype.onUpdateHyd = function () {
            n.jiJinChengZhangProxy.openInfo();
            this.scheduleOnce(() => {
                n.jinZhuProxy.sendOpenActivity()
            }, 0.2);
        }

        __decorate([u(cc.Node)], e.prototype, "nodeStoryBg", void 0);
        __decorate([u(cc.Node)], e.prototype, "topNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "leftNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "mainNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "setNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeQuest", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeSeven", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeSevenHappy", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeFirstRecharge", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeMergeFirstRecharge", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeXianli", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeMonthCard", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeRecharge", void 0);
        __decorate([u(cc.Node)], e.prototype, "arrowNode", void 0);


        __decorate([u(cc.Node)], e.prototype, "activityNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "maskNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "rightNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "rightArrow", void 0);
        __decorate([u(cc.Node)], e.prototype, "rightMaskNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "activitItemNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeJingYi", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeLingLang", void 0);
        __decorate([u(cc.Node)], e.prototype, "btnJiJin", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;