var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = (function () {
        function t() {
            this.UPDATE_REPORT_MSG = "UPDATE_REPORT_MSG";
            this.UPDATE_FORBIDDEN_MSG = "UPDATE_FORBIDDEN_MSG";
            this.HIDE_OTHER_REPORT_MSG = "HIDE_OTHER_REPORT_MSG";
            this.UPDATE_NOR_MSG = "UPDATE_NOR_MSG";
            this.UPDATE_BLACK_MSG = "UPDATE_BLACK_MSG";
            this.UPDATE_CLUB_MSG = "UPDATE_CLUB_MSG";
            this.UPDATE_KUAFU_MSG = "UPDATE_KUAFU_MSG";
            this.UPDATE_PAO_MSG = "UPDATE_PAO_MSG";
            this.UPDATE_SYS_MSG = "UPDATE_SYS_MSG";
            this.UPDATE_LABA_MSG = "UPDATE_LABA_MSG";
            this.UPDATE_SCROLL_TO_BOT = "UPDATE_SCROLL_TO_BOT";
            this.UPDATE_SCROLL_TO_TOP = "UPDATE_SCROLL_TO_TOP";
            this.ADD_BLACK_OK = "ADD_BLACK_OK"; //成功加入黑名单
            this.SUB_BLACK_OK = "SUB_BLACK_OK"; //成功移出黑名单
            this.norMsg = null;
            this.blackList = null;
            this.clubMsg = null;
            this.kuafuMsg = null;
            this.paoMsg = null;
            this.sysMsg = null;
            this.reportData = null;
            this.forbiddenData = null;
            this._laba = null;
            this.blackMsg = null;
            //好友
            this.friendMsg = null;
            //end 好友
            this.limitCount = 200;
            this.isSendAdok = !1;
            this.channel = 0;

            this.reportMsg = [];
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.chat.report, this.onReportBack, this);
            JsonHttp.subscribe(proto_sc.chat.forbidden, this.onForbiddenBack, this);
            JsonHttp.subscribe(proto_sc.chat.blacklist, this.onBlackList, this);
            JsonHttp.subscribe(proto_sc.chat.sev, this.onChatMsg, this);
            JsonHttp.subscribe(proto_sc.chat.club, this.onClubMsg, this);
            JsonHttp.subscribe(proto_sc.chat.kuafu, this.onKuafuMsg, this);
            JsonHttp.subscribe(proto_sc.chat.pao, this.onPaoMsg, this);
            JsonHttp.subscribe(proto_sc.chat.laba, this.onLaba, this);
            JsonHttp.subscribe(proto_sc.chat.sys, this.onSysMsg, this);
            this.clubMsg = [];
            this.kuafuMsg = [];
            this.paoMsg = [];
            this.reportMsg = [];

            //好友
            this.friendMsg = [];
            //end 好友
        };
        t.prototype.clearData = function () {
            this.norMsg = null;
            this.blackList = null;
            this.clubMsg = null;
            this.kuafuMsg = null;
            this.paoMsg = null;
            this.sysMsg = null;
            this._laba = null;
            //好友
            this.friendMsg = null;
            //end 好友
        };
        t.prototype.onLaba = function (t) {
            this._laba = t;
            facade.send(this.UPDATE_LABA_MSG);
        };
        Object.defineProperty(t.prototype, "laba", {
            get: function () {
                if (null == this._laba) return null;
                for (var t = [], e = 0; e < this._laba.length; e++) {
                    var o = this._laba[e];
                    null != o &&
                        ((o.user && this.isBlack(o.user.uid)) || t.push(o));
                }
                return t;
            },
            enumerable: !0,
            configurable: !0
        });
        t.prototype.onSysMsg = function (t) {
            null == this.sysMsg ?
                (this.sysMsg = t) :
                this.addData(this.sysMsg, t);
            facade.send(this.UPDATE_SYS_MSG);
        };


        t.prototype.onChatMsg = function (t) {
            var e = !1;
            null == this.norMsg && (this.norMsg = []);
            if (null == this.sysMsg) {
                e = !0;
                this.sysMsg = [];
            }
            for (var o = [], n = [], l = 0; l < t.length; l++) {
                var r = t[l];
                3 != r.type ?
                    o.push(r) :
                    i.timeUtil.second - r.time < 600 && n.push(r);
            }
            this.addData(this.norMsg, o);
            this.addData(this.sysMsg, n);
            e && this.addHelloMsg();
            o.length > 0 && facade.send(this.UPDATE_NOR_MSG);
            n.length > 0 && facade.send(this.UPDATE_SYS_MSG);
        };
        t.prototype.addHelloMsg = function () {
            null == this.sysMsg && (this.sysMsg = []);
            if (!(this.sysMsg.length > 0)) {
                var t = {};
                t.msg = i18n.t("SYS_HELLO_CHAT");
                t.time = i.timeUtil.second;
                t.type = 3;
                this.sysMsg.push(t);
            }
        };


        t.prototype.onBlackList = function (t) {
            this.blackList = t.list;
            this.blackMsg = [];
            for (var e = 0; e < t.list.length; e++) {
                var o = t.list[e];
                if (null != o) {
                    var n = {};
                    n.id = e + 1;
                    n.type = 4;
                    n.msg = i18n.t("CHAT_BLACK_TIME", {
                        d: i.timeUtil.format(o.btime)
                    });
                    n.time = o.btime;
                    n.user = {};
                    n.user.uid = o.id;
                    n.user.name = o.name;
                    n.user.job = o.job;
                    n.user.sex = o.sex;
                    n.user.level = o.level;
                    n.user.vip = o.vip;
                    n.user.chenghao = o.chenghao;
                    n.user.clothe = o.clothe;
                    n.user.shili = o.shili;
                    n.user.headavatar = o.headavatar;
                    this.blackMsg.push(n);
                }
            }
            facade.send(this.UPDATE_BLACK_MSG);
        };
        t.prototype.onClubMsg = function (t) {
            null == this.clubMsg && (this.clubMsg = []);
            this.addData(this.clubMsg, t);
            facade.send(this.UPDATE_CLUB_MSG);
        };
        t.prototype.onKuafuMsg = function (t) {
            null == this.kuafuMsg && (this.kuafuMsg = []);
            this.addData(this.kuafuMsg, t);
            facade.send(this.UPDATE_KUAFU_MSG);
        };
        t.prototype.onPaoMsg = function (t) {
            facade.send(this.UPDATE_PAO_MSG);
        };
        //好友
        t.prototype.addFriendMsg = function (msg) {
            this.addData(this.friendMsg, t);
        };
        //end 好友
        Object.defineProperty(t.prototype, "isBlackMax", {
            get: function () {
                var t = this.blackList ? this.blackList.length : 0,
                    e = localcache.getItem(
                        localdb.table_vip2,
                        n.playerProxy.userData.vip
                    ),
                    o = e ? e.ban_num : 0;
                return t >= o && o > 0;
            },
            enumerable: !0,
            configurable: !0
        });
        t.prototype.isBlack = function (t) {
            for (var e = 0; this.blackList && e < this.blackList.length; e++) {
                if (this.blackList[e].id == t) {
                    return !0;
                }
            }

            return !1;
        };
        t.prototype.addData = function (t, e) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                t.push(i);
                t.length > this.limitCount && t.splice(0, 1);
            }
        };
        t.prototype.sendBlackList = function (t) {
            var e = new proto_cs.chat.blacklist();
            JsonHttp.send(e, function (t) {
                //黑名单
                //i.alertUtil.alert(i18n.t("chat_add_black_success"));
                n.playerProxy.startTopViewMsg += 1;
                facade.send(n.playerProxy.TOP_VIEW_MSG);
            });
        };
        t.prototype.sendAddBlack = function (t) {
            var e = new proto_cs.chat.addblacklist();
            e.buid = t; //JIU_LOU_INFO_BACK
            JsonHttp.send(e, function (tt) {
                if (utils.stringUtil.isBlank(tt.a.system.errror)) {
                    i.alertUtil.alert(i18n.t("chat_add_black_success"));
                    facade.send("JIU_LOU_INFO_BACK");
                }
            });
        };
        t.prototype.sendAddBlackOther = function (t) {
            var self = this;
            var e = new proto_cs.chat.addblacklist();
            e.buid = t;
            JsonHttp.send(e, function (tt) {
                if (utils.stringUtil.isBlank(tt.a.system.errror)) {
                    i.alertUtil.alert(i18n.t("chat_add_black_success"));
                    facade.send(self.ADD_BLACK_OK);
                }
            });
        };
        t.prototype.sendDelBlack = function (t) {
            var self = this;
            var e = new proto_cs.chat.subblacklist();
            e.buid = t;
            JsonHttp.send(e, function () {
                if (utils.stringUtil.isBlank(tt.a.system.errror)) {
                    i.alertUtil.alert(i18n.t("chat_del_black_success"));
                    facade.send(self.SUB_BLACK_OK);
                }
            });
        };
        t.prototype.sendChat = function (t, e, o) {

            if (this.bForbidden()) {
                i.alertUtil.alert(i18n.t("REPORT_UN_TALK_TIP"));
                return;
            }
            void 0 === e && (e = 0);
            void 0 === o && (o = 0);
            var i = new proto_cs.chat.sev();
            1 == e ?
                (i = new proto_cs.chat.club()) :
                2 == e && (i = new proto_cs.chat.kuafu());
            i.msg = t;
            i.type = o;
            JsonHttp.send(i);
        };
        t.prototype.sendChatAdok = function () {
            var t = this;
            if (!this.isSendAdok) {
                this.isSendAdok = !0;
                var e = new proto_cs.user.adok();
                e.label = "";
                JsonHttp.send(e, function () {
                    t.isSendAdok = !1;
                });
            }
        };

        t.prototype.bReportAble = function (data) {

            if (this.reportData && this.reportData.max_times <= this.reportData.times) {

                return false;
            }

            return true;
        };

        t.prototype.sendReport = function (data) {
            /*
            "type":1,//1:聊天频道,2:宫殿频道,3:姐妹聊天
            "fuid":"200023",//发送消息的玩家uid
            "msg":"sdas",//发的消息内容
            "time":158822000,//发这条消息的时间
            */
            if (!this.bReportAble()) {
                i.alertUtil.alert(i18n.t("REPORT_TIMES_LIMIT"));
                return;
            }
            var cmd = new proto_cs.chat.report();
            cmd.type = this.channel;
            cmd.fuid = data.user.uid;
            cmd.msg = this.getSpMsg(data.msg);
            cmd.time = data.time;
            JsonHttp.send(cmd, function () {
                i.alertUtil.alert(i18n.t("REPORT_SENDED"));
            });
        };

        t.prototype.addReportMsg = function (data) {
            for (var o = 0; o < this.reportMsg.length; o++) {
                if (this.reportMsg[o] === data) {
                    break;
                }
            }
            this.reportMsg.push(data);
        };
        t.prototype.bReportMsg = function (data) {
            for (var o = 0; o < this.reportMsg.length; o++) {
                if (this.reportMsg[o] === data) {
                    return true;
                }
            }
            return false;
        };
        t.prototype.spliceReportMsg = function (data) {
            var index = -1;
            for (var o = 0; o < this.reportMsg.length; o++) {
                if (this.reportMsg[o] === data) {
                    index = o;
                    break;
                }
            }
            if (index >= 0) {
                this.reportMsg.splice(index, 1);
            }

        };


        t.prototype.onForbiddenBack = function (t) {
            this.forbiddenData = t;
            facade.send(this.UPDATE_FORBIDDEN_MSG);
        };

        t.prototype.bForbidden = function () {
            if (this.forbiddenData && this.forbiddenData.end_time >= i.timeUtil.second && this.forbiddenData.status == 1) {
                return true;
            }

            return false;
        };

        t.prototype.getLeftForbiddenText = function () {
            if (!this.bForbidden()) {
                return '';
            }
            var leftTime = this.forbiddenData.end_time - i.timeUtil.second;
            return i18n.t("REPORT_UN_TALK_ED_TIP", {
                n: i.timeUtil.second2hmsSimple(leftTime)
            });
        };

        t.prototype.onReportBack = function (t) {
            this.reportData = t;
            facade.send(this.UPDATE_REPORT_MSG);
        };

        t.prototype.sendGetHistory = function (t, e) {
            var o = this;
            void 0 === e && (e = 0);
            var i = new proto_cs.chat.sevhistory();
            1 == e ?
                (i = new proto_cs.chat.clubhistory()) :
                2 == e && (i = new proto_cs.chat.kuafuhistory());
            i.id = t;
            JsonHttp.send(i, function () {
                facade.send(o.UPDATE_SCROLL_TO_TOP);
            });
        };
        t.prototype.getMsg = function (t) {
            for (var e = new Array(), o = 0; null != t && o < t.length; o++)
                (t[o].user && this.isBlack(t[o].user.uid) && 4 != t[o].type) ||
                e.push(t[o]);
            e.sort(function (t, e) {
                return t.time - e.time;
            });
            e.length > 50 && (e = e.slice(e.length - 50, e.length));
            return e;
        };
        t.prototype.getLastMsg = function (t) {
            var e = null;
            if (null == t || 0 == t.length) return null;
            for (var o = 0; o < t.length; o++) {
                var i = t[o];
                null != i &&
                    ((i.user && this.isBlack(i.user.uid)) ||
                        (null == e ?
                            (e = t[o]) :
                            e && e.time < t[o].time && (e = t[o])));
            }
            return e;
        };
        t.getArea = function (t) {
            return t < 1e6 ? 999 : t % 1e6;
        };
        t.prototype.getSpMsg = function (t) {
            t += "";
            if (i.stringUtil.isBlank(t)) return t;
            if (0 == t.indexOf("#")) {
                var e = t.split("#")[1],
                    o = t.split("::")[1];
                switch (e) {
                    case "tangyuan":
                        return i18n.t("CHAT_TANGYUAN_QIANG", {
                            d: parseInt(o)
                        });

                    case "actqiandao":
                        return i18n.t("ACT_DAJI_TIP");

                    case "worldtree":
                        return i18n.t("FLOWER_CHAT_INFO", {
                            d: o
                        });

                    case "boite":
                        return 1 == parseInt(o) ?
                            i18n.t("BOITE_CHAT_MSG") :
                            i18n.t("BOITE_CHAT_MSG2");

                    case "childMarry":
                        var l = o.split(":");
                        return i18n.t("SON_FU_CHAT_TIP", {
                            n: l[0],
                            s: 1 == parseInt(l[1]) ?
                                i18n.t("CREATE_NAN") : i18n.t("CREATE_NV"),
                            p: l[2],
                            f: n.sonProxy.getHonourStr(parseInt(l[3]))
                        });

                    case "wishtree":
                        var r = localcache.getItem(localdb.table_heropve, o);
                        return i18n.t("WISHING_GET_CARD", {
                            name: r.name
                        });

                    case "gaodian":
                        return i18n.t("CHAT_GAODIAN_QIANG", {
                            d: parseInt(o)
                        });
                    case "mooncake": {
                        return i18n.t("CHAT_MOONCAKE_QIANG", {
                            d: parseInt(o)
                        });
                    }
                    case "RedBag": {
                        return i18n.t("CHAT_HONGBAO_QIANG", {
                            d: parseInt(o)
                        });
                    }
                    case "flowerFriend": {
                        var arr = o.split("_");
                        var strPath = arr[0] + "_" + arr[1] + "_" + arr[2];
                        var name = arr[3];
                        var flowerId = parseInt(arr[4]);
                        var flowerNum = parseInt(arr[5]);

                        var e = localcache.getItem(localdb.table_item, flowerId + "");
                        var nameFlower = e ? e.name : '';
                        return i18n.t(strPath, {
                            name1: name,
                            count: flowerNum,
                            name2: nameFlower
                        });
                    }
                    case "flowerNotice": {
                        var arr = o.split("_");
                        var strPath = arr[0] + "_" + arr[1] + "_" + arr[2];
                        var sendName = arr[3];
                        var getName = arr[4];
                        var flowerNum = parseInt(arr[6]);

                        return i18n.t(strPath, {
                            name1: sendName,
                            name2: getName,
                            count: flowerNum
                        });
                    }
                    case "clubEnvelopes": {
                        return i18n.t('UNION_RWD_MSG', {
                            name: o
                        });
                    }
                    case "linlangNotice": {
                        var arr = o.split(":");
                        var qiIndex = arr[0];
                        var itemId = arr[1];
                        var itemKind = arr[2];
                        var time = arr[3];
                        var ee = null;
                        if (itemKind == 95) {
                            ee = localcache.getItem(localdb.table_userClothe, itemId);
                        } else {
                            ee = localcache.getItem(localdb.table_item, itemId);
                        }
                        return i18n.t("LINGLANG_MSGNOTICE", {
                            index: qiIndex,
                            name: ee.name,
                            time: i.timeUtil.format(time, "yyyy-MM-dd HH:mm"),
                        })
                    }
                    case "linlangPrize": {
                        var arr = o.split(":");
                        var qiIndex = arr[0];
                        var userName = arr[1];
                        var itemId = arr[2];
                        var itemKind = arr[3];

                        var ee = null;
                        if (itemKind == 95) {
                            ee = localcache.getItem(localdb.table_userClothe, itemId);
                        } else {
                            ee = localcache.getItem(localdb.table_item, itemId);
                        }
                        return i18n.t("LINGLANG_MSGPRIZE", {
                            index: qiIndex,
                            name: ee.name,
                            userName: userName,
                        })
                    }
                }
            }
            return t;
        };
        return t;
    })();
o.ChatProxy = l;