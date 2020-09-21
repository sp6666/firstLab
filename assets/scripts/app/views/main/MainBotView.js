var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../models/TimeProxy"),
    r = require("../../Config"),
    a = require("../../component/LabelShadow"),
    s = require("../../utils/ApiUtils"),
    c = require("../../component/RedDot"),
    _ = require("../../utils/UIUtils"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTask = null;
            e.lblChat = null;
            e.lblName = null;
            e.lblUnlock = null;
            e.nodeUnlock = null;
            e.effect = null;
            e.btnGuangGao = null;
            e.btnAdvert = null;
            e.videoTime = null;
            e.guanggaoNameNode = null;
            e.lblGuangGaoCd = null;
            e.curMsg = null;
            e.lblAdvCount = null;
            e.advExcessSecond = 0; //广告cd时间
            e._index = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.taskProxy.MAIN_TASK_REFESH,
                this.updateMainTask,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_NOR_MSG,
                this.updateNorChat,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_CLUB_MSG,
                this.updateClubChat,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_SYS_MSG,
                this.updateSysChat,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_LABA_MSG,
                this.updateLaba,
                this
            );
            facade.subscribe(
                n.playerProxy.GUANG_GAO_UPDATE,
                this.onUpdateGuangGao,
                this
            );
            this.updateMainTask();
            this.updateNorChat(!1);
            n.chatProxy.addHelloMsg();
            this.updateSysChat(!0);
            this.updateUnlock();
            this.schedule(this.sendChatAdok, 0.1);
            this.onUpdateGuangGao();

            this.showAdTimer = false;
            //更新广告状态
            this.onAdvertiseUpdate();

            //监听广告结束后的返回数据
            facade.subscribe("ADVERTISE_UPDATE", this.onAdvertiseUpdate, this);
        };

        e.prototype.update   = function(dt) {
            this.onAdUpdate();
        };

        e.prototype.onAdUpdate = function () {
            if(this.showAdTimer) {
                //计算cd时间
                this.advExcessSecond = (n.advertProxy.curTime + n.advertProxy.cd) - i.timeUtil.second;
                if (this.advExcessSecond > 0) {
                    this.videoTime.node.active = true;
                    this.videoTime.string = i.timeUtil.format(this.advExcessSecond, "mm:ss");
                } else {
                    //剩余时间为0的时候停止，并且刷新状态
                    this.videoTime.node.active = false;
                    this.onAdvertiseUpdate();
                }
            }
        };

        //广告
        //刷新广告的显示
        e.prototype.onAdvertiseUpdate = function () {
            var advCanUse = true;
            var show = false;
            this.showAdTimer = false;
            //if(r.Config.DEBUG || (cc.sys.os === cc.sys.OS_IOS && r.Config.pf === "epiosxianyu_gtmz"))
            if(r.Config.DEBUG || (cc.sys.os == cc.sys.OS_IOS && r.Config.zone == "china"))
            {
                show = n.advertProxy.max > n.advertProxy.count; //所有次数用完之后隐藏
                if(n.advertProxy.count > 0){
                    if(show){
                        //计算cd时间
                        this.advExcessSecond = (n.advertProxy.curTime + n.advertProxy.cd) - i.timeUtil.second;
                        if (this.advExcessSecond > 0) {
                            //cd时间未过，不可用
                            //this.schedule(this.countDownExcess, 1);
                            //this.videoTime.node.active = true;
                            advCanUse = false;
                            this.showAdTimer = true;
                        }
                    } else {
                        //已经用完次数了，不可用
                        advCanUse = false;
                    }
                }
            }


            //这里设置是否可以点击
            this.btnAdvert.interactable = advCanUse;
            this.btnAdvert.node.active = show;

            //次数
            this.lblAdvCount.string = i18n.t("COMMON_NUM",{f:n.advertProxy.count, s:n.advertProxy.max});
        };

        e.prototype.countDownExcess = function () {
            //倒数cd时间
            if (this.advExcessSecond > 0) {
                this.advExcessSecond--;
                this.videoTime.string = i.timeUtil.format(this.advExcessSecond, "mm:ss");
            }
            else {
                //剩余时间为0的时候停止，并且刷新状态
                this.videoTime.node.active = false;
                this.unschedule(this.countDownExcess);
                this.onAdvertiseUpdate();
            }
        };

        e.prototype.onUpdateGuangGao = function() {
            var t = cc.sys.localStorage.getItem("GUANGGAO_CD");
            this.btnGuangGao.node.active =
                null != n.playerProxy.guanggao &&
                n.playerProxy.guanggao.get < n.playerProxy.guanggao.max &&
                l.funUtils.isOpenFun(l.funUtils.guanggao);
            if (this.btnGuangGao.node.active) {
                var e = i.timeUtil.second - (t ? parseInt(t) : 0);
                if (e >= 60) {
                    this.lblGuangGaoCd.node.active = !1;
                    this.guanggaoNameNode.active = !0;
                    this.btnGuangGao.interactable = !0;
                } else {
                    this.btnGuangGao.interactable = !1;
                    var o = this;
                    this.lblGuangGaoCd.node.active = !0;
                    this.guanggaoNameNode.active = !1;
                    _.uiUtils.countDown(
                        e,
                        this.lblGuangGaoCd,
                        function() {
                            o.btnGuangGao.interactable = !0;
                            o.lblGuangGaoCd.node.active = !1;
                            o.guanggaoNameNode.active = !0;
                        },
                        !0,
                        null,
                        "d",
                        "mm:ss"
                    );
                }
            }
        };
        e.prototype.onClickGuangGao = function() {
            cc.sys.localStorage.setItem("GUANGGAO_CD", i.timeUtil.second);
            n.playerProxy.guanggao &&
                s.apiUtils.showRewarededVideo(
                    r.Config.serId.toString(),
                    n.playerProxy.userData.uid.toString(),
                    n.playerProxy.guanggao.Aid
                );
        };
        e.prototype.sendChatAdok = function() {
            this._index++;
            this._index %= 300;
            if (0 == this._index) {
                n.chatProxy.sendChatAdok();
                n.jingyingProxy.sendAdok();
                n.sonProxy.sendChildLilianAdok();
                s.apiUtils.heartFlash();
                i.timeUtil.getTodaySecond(18) < i.timeUtil.second &&
                    i.timeUtil.second < i.timeUtil.getTodaySecond(23) &&
                    facade.send(n.bossPorxy.UPDAYE_BOSS_CD_DOWN);
                i.timeUtil.second > i.timeUtil.getTodaySecond(23.5) &&
                    i.timeUtil.second < i.timeUtil.getTodaySecond(24) &&
                    c.default.change("unionCopy", !1);
                n.timeProxy.sendFlushZero();
            }
        };
        e.prototype.updateNorChat = function(t) {
            void 0 === t && (t = !0);
            this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.norMsg));
            t && this.updateLaba();
        };
        e.prototype.updateClubChat = function(t) {
            void 0 === t && (t = !0);
            this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.clubMsg));
            t && this.updateLaba();
        };
        e.prototype.updateSysChat = function(t) {
            void 0 === t && (t = !0);
            n.chatProxy.sysMsg &&
                this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.sysMsg));
            t && this.updateLaba();
        };
        e.prototype.updateLaba = function() {
            n.chatProxy.laba &&
                n.chatProxy.laba.length > 0 &&
                n.chatProxy.laba[0].time + 3600 > i.timeUtil.second &&
                this.setShowChat(n.chatProxy.laba[0]);
        };
        e.prototype.onClickChat = function() {
            l.funUtils.isOpenFun(l.funUtils.chatView)
                ? (this.curMsg && this.curMsg.type,
                  i.utils.openPrefabView("chat/ChatView"))
                : l.funUtils.openView(l.funUtils.chatView.id);
        };
        e.prototype.setShowChat = function(t) {
            this.curMsg = t;
            this.lblName.string = t
                ? i18n.t("chat_home_show", {
                      name: t.user ? t.user.name : i18n.t("CHAT_SYS_TIP")
                  })
                : "";
            this.lblChat.string = t ? n.chatProxy.getSpMsg(t.msg) : "";
        };
        e.prototype.updateMainTask = function() {
            var t = n.taskProxy.mainTask,
                e = localcache.getItem(localdb.table_mainTask, t.id + "");
            e && n.taskProxy.isFiltTaskType(e.type)
                ? (this.lblTask.string = e
                      ? i18n.t(
                            r.Config.DEBUG
                                ? "MAIN_TASK_SHOW"
                                : "MAIN_TASK_UNID_SHOW",
                            {
                                id: t.id,
                                t: e.name,
                                c: t.num < t.max ? 0 : 1,
                                m: 1
                            }
                        )
                      : i18n.t("MAIN_TASK_OVER"))
                : (this.lblTask.string = e
                      ? i18n.t(
                            r.Config.DEBUG
                                ? "MAIN_TASK_SHOW"
                                : "MAIN_TASK_UNID_SHOW",
                            {
                                id: t.id,
                                t: e.name,
                                c: t.num,
                                m: t.max
                            }
                        )
                      : i18n.t("MAIN_TASK_OVER"));
            this.effect.active = t.num >= t.max;
            this.lblTask.color =
                t.num < t.max
                    ? i.utils.WHITE
                    : cc.Color.WHITE.fromHEX("#e4fba4");
        };
        e.prototype.updateUnlock = function() {
            var t = l.funUtils.getWillOpen();
            if (t) {
                var e = localcache.getItem(localdb.table_iconOpen, t.id);
                e &&
                    (this.lblUnlock.string = i18n.t("FUN_UNLOCK", {
                        n: e.title
                    }));
            }
        };
        e.prototype.onClickMainTask = function() {
            l.funUtils.openView(l.funUtils.mainTask.id);
        };
        e.prototype.sendAdolHdList = function() {
            n.limitActivityProxy.sendHdList();
        };
        //广告按钮
        e.prototype.onGuangGaoClick = function(){
            //根据状态显示
            i.utils.showConfirmItem(
                i18n.t("WATCH_VIDEO_TO_GET_REWARD",{num:n.advertProxy.reward.count}),
                n.advertProxy.reward.id,
                n.playerProxy.userData.cash,
                function () {
                    //选中回调
                    //目前直接调用广告结束回调作为测试
                    // cc.watchAdRewarded(); //测试接口
                    s.apiUtils.watchAdvertise();  //这里调用广告sdk接口
                },   //handler
                "WATCH_VIDEO_TO_GET_REWARD",
                null,   //target
                null,   //color
                "",     //left
                "",     //right
            );
        };
        __decorate([p(a.default)], e.prototype, "lblTask", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblChat", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblUnlock", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([p(cc.Node)], e.prototype, "effect", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnGuangGao", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnAdvert", void 0);
        __decorate([p(cc.Label)], e.prototype, "videoTime", void 0);
        __decorate([p(cc.Node)], e.prototype, "guanggaoNameNode", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblGuangGaoCd", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblAdvCount", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
