var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.memberInfo = null;
            this.clubInfo = null;
            this.clubList = null;
            this.lookClubInfo = null;
            this.applyList = null;
            this.transList = null;
            this.shopList = null;
            this.bossInfo = null;
            this.fightRank = null;
            this.myFightRankInfo = null;
            this.myClubRank = null;
            this.bossFtList = null;
            this.heroLog = null;
            this.clubLog = null;
            this.dialogParam = null;
            this.changePosParam = null;
            this.openCopyParam = null;
            this.curSelectId = 0;
            this.fighting = !1;

            this.gifts = null;
            this.envelopes = null;
            this.investLists = null;
            this.invest = null;
            this.dismiss = null;

            this.UNION_GIFTS_DATA_UPDATE = 'UNION_GIFTS_DATA_UPDATE';
            this.UNION_Envelopes_DATA_UPDATE = 'UNION_Envelopes_DATA_UPDATE';
            this.UNION_DRAW_DATA_UPDATE = 'UNION_DRAW_DATA_UPDATE';

            this.UNION_ON_GET_FRIEND_LIST = 'UNION_ON_GET_FRIEND_LIST';
            this.UNION_UPDATE_DISMISS_MSG = 'UNION_UPDATE_DISMISS_MSG';
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.club.clubList, this.onClubList, this);
            JsonHttp.subscribe(proto_sc.club.clubInfo, this.onClubInfo, this);
            JsonHttp.subscribe(proto_sc.club.shopList, this.onShopList, this);
            JsonHttp.subscribe(proto_sc.club.applyList, this.onApplyList, this);
            JsonHttp.subscribe(proto_sc.club.bossInfo, this.onBossInfo, this);
            JsonHttp.subscribe(proto_sc.club.bossft, this.onBossFg, this);
            JsonHttp.subscribe(proto_sc.club.clubLog, this.onClubLog, this);
            JsonHttp.subscribe(proto_sc.club.transInfo, this.onTransInfo, this);
            JsonHttp.subscribe(
                proto_sc.club.memberInfo,
                this.onMemberInfo,
                this
            );
            JsonHttp.subscribe(proto_sc.club.win, this.onWin, this);
            JsonHttp.subscribe(proto_sc.club.uidLog, this.onUidLog, this);
            JsonHttp.subscribe(proto_sc.club.myClubRid, this.onClubRank, this);
            JsonHttp.subscribe(proto_sc.club.heroLog, this.onHeroLog, this);

            JsonHttp.subscribe(proto_sc.club.gifts, this.onGifts, this);
            JsonHttp.subscribe(proto_sc.club.envelopes, this.onEnvelopes, this);
            JsonHttp.subscribe(proto_sc.club.investLists, this.onInvestLists, this);
            JsonHttp.subscribe(proto_sc.club.invest, this.onInvest, this);
            JsonHttp.subscribe(proto_sc.club.draw, this.onDraw, this);

            JsonHttp.subscribe(proto_sc.club.dismiss, this.onDismiss, this);



        };
        t.prototype.clearData = function () {
            this.memberInfo = null;
            this.clubInfo = null;
            this.clubList = null;
            this.lookClubInfo = null;
            this.applyList = null;
            this.transList = null;
            this.shopList = null;
            this.bossInfo = null;
            this.fightRank = null;
            this.myFightRankInfo = null;
            this.myClubRank = null;
            this.dialogParam = null;
            this.changePosParam = null;
            this.openCopyParam = null;
            this.bossFtList = null;
            this.curSelectId = 0;
            this.heroLog = null;
            this.clubLog = null;
            this.gifts = null;
            this.envelopes = null;
            this.dismiss = null;
            this.investLists = null;
            this.invest = null;
            l.default.change("unionCopy", !1);
            l.default.change("unionApply", !1);
        };

        //礼包


        t.prototype.sendEnvelopesCmd = function (num) {
            var o = new proto_cs.club.sysEnvelopes();
            JsonHttp.send(o, function () {
                if (n.unionProxy.envelopes && n.unionProxy.envelopes.free.length > 0) {
                    i.alertUtil.alert(
                        i18n.t("UNION_MONEY_TXT_2") + "-" + num
                    );
                }
            });
        };

        t.prototype.sendGiftsInfo = function () {
            var o = new proto_cs.club.gift();
            JsonHttp.send(o);

        };
        t.prototype.sendGetGift = function (type, id) {
            var o = new proto_cs.club.receive();
            o.type = type;
            o.id = id;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.onGifts = function (t) {
            this.gifts = t;
            this.onGiftRed();
            facade.send(this.UNION_GIFTS_DATA_UPDATE);
        };
        //份例
        t.prototype.sendEnvelopesInfo = function () {
            var o = new proto_cs.club.envelopes();
            JsonHttp.send(o);
        };

        t.prototype.sendGrabEnvelope = function (id, cost, gx) {
            var o = new proto_cs.club.grabEnvelopes();
            o.item_id = id;
            JsonHttp.send(o, function (t) {

                if (t.a.system.errror) {

                } else {
                    i.alertUtil.alert18n("UNION_DAY_GRAB_TIP");
                    var r = localcache.getItem(localdb.table_item, 1);
                    i.alertUtil.alert("CELL_COST", {
                        n: r.name,
                        v: cost
                    });

                    n.timeProxy.floatReward();
                }
            });
        };

        t.prototype.sendRobEnvelopes = function (id) {
            var o = new proto_cs.club.robEnvelopes();
            o.id = id;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };

        t.prototype.sendReceiveEnvelopes = function (id) {
            var o = new proto_cs.club.receiveEnvelopes();
            o.id = id;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };

        t.prototype.onEnvelopes = function (t) {
            this.envelopes = t;

            this.onFenli();
            facade.send(this.UNION_Envelopes_DATA_UPDATE);
        };

        //抽奖
        t.prototype.sendDraw = function (type) {
            var o = new proto_cs.club.draw();
            o.type = type;
            JsonHttp.send(o);
        };
        t.prototype.onDraw = function (t) {
            this.drawData = t;
            facade.send(this.UNION_DRAW_DATA_UPDATE);
        };
        //日常
        t.prototype.getDailyTask = function (id) {
            for (var info of this.memberInfo.target) {
                if (info.id === id) {
                    return info;
                }
            }
            return null;
        };
        t.prototype.sendDailyTask = function (id) {
            var o = new proto_cs.club.taskRwd();
            o.id = id;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };


        //活跃
        t.prototype.getDailyRwd = function (id) {
            if (!this.memberInfo || null == this.memberInfo.status) return null;
            for (var e = 0; e < this.memberInfo.status.length; e++)
                if (this.memberInfo.status[e].id == id) return this.memberInfo.status[e];
            return null;
        };
        t.prototype.sendActiveRwd = function (id) {

            var o = new proto_cs.club.activeRwd();
            o.id = id;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };

        //邀请好友

        t.prototype.sendFriends = function () {

            var o = new proto_cs.club.investLists();
            JsonHttp.send(o);

        };

        t.prototype.sendInvestFriend = function (id) {

            var o = new proto_cs.club.invest();
            o.fuid = id;
            JsonHttp.send(o);

        };

        t.prototype.sendJoin = function (type, fuid, cid) {

            var o = new proto_cs.club.join();
            o.type = type;
            o.fuid = fuid;
            o.cid = cid;
            JsonHttp.send(o);

        };



        t.prototype.onInvestLists = function (t) {
            this.investLists = t;
            facade.send(this.UNION_ON_GET_FRIEND_LIST);
        };
        t.prototype.onInvest = function (t) {
            this.invest = t;
            i.alertUtil.alert18n("UNION_INVITE_SUCCESS");
        };

        //解散
        t.prototype.onDismiss = function (t) {
            this.dismiss = t;
            facade.send(this.UNION_UPDATE_DISMISS_MSG);
        };

        t.prototype.sendCancelDismiss = function (t) {
            var o = new proto_cs.club.cancel();
            JsonHttp.send(o, function () {
                i.alertUtil.alert18n("UNION_CANCEL_JIE_SAN_TIP");
            });
        };


        t.prototype.onWin = function (t) {
            i.utils.openPrefabView("union/UnionCopyWindow", null, t);
        };
        t.prototype.onHeroLog = function (t) {
            this.heroLog = t;
            this.heroLog.sort(this.sortHeroLog);
            facade.send("UNION_RECORD_UPDATE");
        };
        t.prototype.sortHeroLog = function (t, e) {
            return e.time - t.time;
        };
        t.prototype.onClubLog = function (t) {
            this.clubLog = t;
            this.clubLog.sort(this.sortHeroLog);
            facade.send("UNION_CLUB_LOG_UPDATE");
        };
        t.prototype.onBossFg = function (t) {
            this.bossFtList = t;
            facade.send("UNION_FT_LIST_UPDATE");
        };
        t.prototype.onUidLog = function (t) {
            this.fightRank = t;
            for (var e = 0; e < t.list.length; e++) {
                t.list[e].rid = e + 1;
                t.list[e].uid == n.playerProxy.userData.uid &&
                    (this.myFightRankInfo = t.list[e]);
            }
            if (null == this.myFightRankInfo) {
                var o = {};
                o.name = n.playerProxy.userData.name;
                o.hit = 0;
                o.rid = 0;
                o.gx = 0;
                this.myFightRankInfo = o;
            }
        };
        t.prototype.onBossInfo = function (t) {
            this.bossInfo = t;
            this.updateCopyRed();
            facade.send("UPDATE_BOSS_INFO");
        };
        t.prototype.updateCopyRed = function () {
            var t = !1,
                e = this.bossInfo;
            if (e && e.length > 0)
                for (var o = 0; o < e.length; o++)
                    if (0 != e[o].id && 1 == e[o].type) {
                        t = !0;
                        break;
                    }
            var n =
                i.timeUtil.second > i.timeUtil.getTodaySecond(0) &&
                i.timeUtil.second < i.timeUtil.getTodaySecond(23.5);
            l.default.change("unionCopy", t && n);
        };
        t.prototype.onMemberInfo = function (t) {
            this.memberInfo = t;
            0 == t.cid && l.default.change("unionCopy", !1);


            this.onTasks();

            facade.send("UPDATE_MEMBER_INFO");
        };

        t.prototype.onTasks = function (t) {

            l.default.change("unionBuild", false);

            if (this.memberInfo) {
                for (var info of this.memberInfo.target) {
                    var set = localcache.getItem(localdb.table_clubDailyTask, info.id);
                    if (set.num <= info.num && 1 != info.status) {
                        l.default.change("unionBuild", true);
                        return;
                    }
                }
            }

            if (!this.memberInfo || null == this.memberInfo.status || !this.clubInfo) return;

            var t = localcache.getItem(localdb.table_clubDailyRwd, this.clubInfo.level).active;

            for (var e = 0; e < t.length; e++) {
                var k = this.memberInfo.status[e];

                if (!k && this.memberInfo.ae >= t[e].min) {
                    l.default.change("unionBuild", true);
                    return;
                }
            }


        };

        t.prototype.onFenli = function (t) {


            l.default.change("unionFenli1", false);
            l.default.change("unionFenli2", false);

            if (this.envelopes) {
                for (var one of this.envelopes.grant) {
                    if (one.status != 1 && one.surplus_times > 0) {
                        l.default.change("unionFenli2", true);
                        break;
                    }
                }
                for (var one of this.envelopes.free) {
                    if (one.status != 1 && one.surplus_times > 0) {
                        l.default.change("unionFenli1", true);
                        break;
                    }
                }
            }


        };

        t.prototype.onGiftRed = function (t) {


            if (this.gifts && this.gifts.lists && this.gifts.lists.length > 0) {
                l.default.change("unionGift", true);
                return;
            }
            l.default.change("unionGift", false);
        };


        t.prototype.onClubInfo = function (t) {
            this.clubInfo = t;
            facade.send("UPDATE_SEARCH_INFO");
        };
        t.prototype.onClubList = function (t) {
            this.clubList = t;
            if (this.clubInfo)
                for (var e = 0; e < this.clubList.length; e++)
                    if (this.clubList[e].id == this.clubInfo.id) {
                        this.lookClubInfo = this.clubList[e];
                        break;
                    }
            facade.send("UPDATE_CLUB_RANK");
        };
        t.prototype.onApplyList = function (t) {
            this.applyList = t;
            var e = t ? t.length : 0;
            l.default.change("unionApply", e > 0);
            facade.send("UPDATE_APPLY_LIST");
        };
        t.prototype.onTransInfo = function (t) {
            this.transList = t;
            facade.send("UPDATE_TRANS_LIST");
        };
        t.prototype.onClubRank = function (t) {
            this.myClubRank = t;
            facade.send("UPDATE_MY_RANK");
        };
        t.prototype.onShopList = function (t) {
            this.shopList = t;
            facade.send("UPDATE_SHOP_LIST");
        };
        t.prototype.sendTran = function (t, e) {
            var o = new proto_cs.club.transWang();
            o.fuid = e;
            o.password = t;
            JsonHttp.send(o);
        };
        t.prototype.sendSearchUnion = function (t) {
            var e = new proto_cs.club.clubFind();
            e.cid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendAllowRandomJoin = function (t) {
            var e = new proto_cs.club.isJoin();
            e.join = t;
            JsonHttp.send(e);
        };
        t.prototype.sendReject = function (t) {
            void 0 === t && (t = 0);
            var e = new proto_cs.club.noJoin();
            e.fuid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendApplyJoin = function (t) {
            var e = new proto_cs.club.yesJoin();
            e.fuid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendInfoMod = function (t, e, o, i) {
            var n = new proto_cs.club.clubInfoSave();
            n.qq = t;
            n.laoma = e;
            n.notice = o;
            n.outmsg = i;
            JsonHttp.send(n);
        };
        t.prototype.sendJiesan = function (t) {
            var e = new proto_cs.club.delClub();
            e.password = t;
            JsonHttp.send(e);
        };
        t.prototype.sendModifyName = function (t, e) {
            var o = new proto_cs.club.clubName();
            o.name = t;
            o.type = e;
            var n = this;
            JsonHttp.send(o, function () {
                n.clubInfo.name == t &&
                    i.alertUtil.alert18n("UNION_CHANGE_SUCCESS");
            });
        };
        t.prototype.sendCovert = function (t) {
            var e = new proto_cs.club.shopBuy();
            e.id = t;
            JsonHttp.send(e, function () {
                facade.send("UNION_SHOP_UPDATE");
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendChangePos = function (t, e) {
            var o = new proto_cs.club.memberPost();
            o.fuid = t;
            o.postid = e;
            var n = this.changePosParam;
            JsonHttp.send(o, function (t) {
                1 == t.s &&
                    i.alertUtil.alert("union_change_tip" + e, {
                        name: n.name
                    });
            });
        };
        t.prototype.sendReqOpen = function (t, e) {
            var o = new proto_cs.club.clubBossOpen();
            o.cbid = t;
            o.type = e;
            JsonHttp.send(o, function () {
                facade.send("UNION_OPEN_COPY_RESULT");
            });
        };
        t.prototype.sendBuild = function (t) {
            var e = new proto_cs.club.dayGongXian();
            e.dcid = t;
            JsonHttp.send(e, function (e) {
                if (1 == e.s) {
                    var o = localcache.getItem(localdb.table_construction, t);
                    i.alertUtil.alert(
                        i18n.t("UNION_EXP_TXT_2") + "+" + o.get.exp
                    );
                    i.alertUtil.alert(
                        i18n.t("UNION_MONEY_TXT_2") + "+" + o.get.fund
                    );
                    i.alertUtil.alert(
                        i18n.t("UNION_GE_REN_GONG_XIAN_2", {
                            num: o.get.gx
                        })
                    );
                }
            });
        };
        t.prototype.sendHitList = function (t) {
            var e = new proto_cs.club.clubBossHitList();
            e.id = t;
            JsonHttp.send(e, function () {
                i.utils.openPrefabView("union/UnionHurtRank");
            });
        };
        t.prototype.sendTranList = function () {
            var t = new proto_cs.club.transList();
            JsonHttp.send(t);
        };
        t.prototype.sendApplyUnion = function (t) {
            var e = this,
                o = new proto_cs.club.clubApply();
            o.cid = t;
            JsonHttp.send(o, function () {
                if (e.memberInfo && 0 != e.memberInfo.cid) {
                    i.utils.isOpenView("union/UnionView") &&
                        i.utils.closeNameView("union/UnionView");
                    i.utils.isOpenView("union/UnionInfo") &&
                        i.utils.closeNameView("union/UnionInfo");
                    i.utils.isOpenView("union/UnionSearch") &&
                        i.utils.closeNameView("union/UnionSearch");
                    i.utils.isOpenView("union/UnionRank") &&
                        i.utils.closeNameView("union/UnionRank");
                    i.utils.openPrefabView("union/UnionMain");
                }
            });
        };
        t.prototype.sendCreateUnion = function (t, e, o, i, l, r) {
            var a = new proto_cs.club.clubCreate();
            a.isJoin = r ? 1 : 0;
            a.laoma = o;
            a.name = t;
            a.outmsg = l;
            a.qq = e;
            a.password = i;
            var s = this;
            JsonHttp.send(a, function () {
                s.enterUnion();
                n.chatProxy.sendChat(i18n.t("SYS_HELLO_CHAT"), 1);
            });
        };
        t.prototype.sendOut = function () {
            var t = this;
            JsonHttp.send(new proto_cs.club.outClub(), function () {
                t.enterUnion();
                n.chatProxy.clubMsg = [];
            });
            1 != this.memberInfo.post && (this.clubInfo = null);
        };
        t.prototype.sendRankList = function (t) {
            var e = new proto_cs.club.clubList();
            e.cid = t;
            JsonHttp.send(e, function () {
                i.utils.openPrefabView("union/UnionRank");
            });
        };
        t.prototype.sendRandomAdd = function () {
            var t = new proto_cs.club.clubRand(),
                e = this;
            JsonHttp.send(t, function () {
                e.enterUnion();
            });
        };
        t.prototype.sendShopList = function () {
            var t = new proto_cs.club.shopList();
            JsonHttp.send(t, function () {
                i.utils.openPrefabView("union/UnionConvert");
            });
        };
        t.prototype.sendBossList = function () {
            var t = new proto_cs.club.clubBossInfo();
            JsonHttp.send(t, function () {
                i.utils.openPrefabView("union/UnionCopy");
            });
        };
        t.prototype.sendHeroFuhuo = function (t) {
            var e = new proto_cs.club.clubHeroCone();
            e.id = t;
            JsonHttp.send(e, function (t) {
                1 == t.s && i.alertUtil.alert18n("UNION_FU_HUO_SUCCESS");
            });
        };
        t.prototype.sendFightBoss = function (t, e) {
            var o = new proto_cs.club.clubBossPK();
            o.cbid = t;
            o.id = e;
            JsonHttp.send(o);
        };
        t.prototype.sendApplyList = function () {
            JsonHttp.send(new proto_cs.club.applyList());
        };
        t.prototype.sendGetMemberInfo = function (t) {
            var e = new proto_cs.club.clubMemberInfo();
            e.cid = t;
            JsonHttp.send(e);

            this.sendEnvelopesInfo();
        };
        t.prototype.sendGetBossRecord = function (t) {
            var e = new proto_cs.club.clubBossPKLog();
            e.cbid = t;
            JsonHttp.send(e);
        };
        t.prototype.enterUnion = function () {

            var self = this;

            if (this.memberInfo && this.memberInfo.cid) {
                this.sendGetMemberInfo(this.memberInfo.cid);
            }
            JsonHttp.send(new proto_cs.club.applyList(), function () {
                if (self.memberInfo && self.memberInfo.cid > 0) {
                    i.utils.openPrefabView("union/UnionMain");
                    facade.send("UNION_CREATE_SUCCESS");
                } else i.utils.openPrefabView("union/UnionView");
            });

        };
        t.prototype.getMengzhu = function (t) {
            for (var e = 0; e < t.length; e++)
                if (1 == t[e].post) return t[e];
            return null;
        };
        t.prototype.getUnionLvMaxCount = function (t) {
            var e = this.getUnionData(t);
            return e ? e.maxMember : 0;
        };
        t.prototype.getUnionLvExp = function (t) {
            for (var e = 0, o = 1; o < t + 1; o++) {
                var i = this.getUnionData(o);
                e += i ? i.exp : 0;
            }
            return e;
        };
        t.prototype.getUnionData = function (t) {
            return localcache.getItem(localdb.table_union, t);
        };
        t.prototype.getPostNum = function (t) {
            var e = 0;
            if (null == this.clubInfo) return 0;
            var o = this.clubInfo.members;
            if (0 == o.length) return 0;
            for (var i = 0; i < o.length; i++) o[i].post == t && e++;
            return e;
        };
        t.prototype.getPostion = function (t) {
            return i18n.t("union_pos" + t);
        };
        t.prototype.getAllShili = function (t) {
            for (var e = 0, o = 0; o < t.length; o++)
                e += t[o] ? t[o].shili : 0;
            return e;
        };
        t.prototype.getHeroFightData = function (t) {
            for (var e = null, o = 0; o < this.bossFtList.length; o++)
                if (this.bossFtList[o].id == t) {
                    e = this.bossFtList[o];
                    break;
                }
            return e;
        };
        t.prototype.getClubLog = function (t) {
            var e = "";
            switch (t.type) {
                case 1:
                    var o = localcache.getItem(
                        localdb.table_construction,
                        t.num1
                    );
                    e = i18n.t("UNION_JIN_XING_YI_CI", {
                        str: o.msg,
                        exp: o.get.exp,
                        rich: o.get.fund,
                        gx: o.get.gx
                    });
                    break;

                case 2:
                    e = i18n.t("UNION_GENG_GAI_GONG_GAO");
                    break;

                case 3:
                    var i = localcache.getItem(localdb.table_unionBoss, t.num1);
                    e = i18n.t("UNION_JI_SHA_LE", {
                        name: i.name,
                        exp: i.rwd.exp
                    });
                    break;

                case 4:
                    var n = localcache.getItem(localdb.table_unionBoss, t.num1);
                    e = i18n.t("UNION_KAI_QI_FU_BEN_TXT", {
                        name: n.name
                    });
                    break;

                case 5:
                    var l = this.getPostion(t.num2);
                    e = i18n.t("UNION_ZHI_WEI_BIAN_GENG", {
                        name1: t.name,
                        name2: l
                    });
                    break;

                case 6:
                    e = i18n.t("UNION_GENG_GAI_MING_ZI");
                    break;

                case 7:
                    e = i18n.t("UNION_ZHU_CHU_LIAN_MENG", {
                        name: t.name
                    });
                    break;

                case 8:
                    e = i18n.t("UNION_GONG_DIAN_SHENG_JI", {
                        num: t.num1
                    });
                    break;

                case 9:
                    e = i18n.t("UNION_JIA_RU_TXT");
                    break;

                case 10:
                    e = i18n.t("UNION_LI_KAI_GONG_DIAN");
                    break;

                case 11:
                    e = i18n.t("UNION_JIA_RU_TXT");
            }
            return e;
        };
        return t;
    })();
o.UnionProxy = r;