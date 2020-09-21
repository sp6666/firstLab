var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../formula"),
    r = require("../component/RedDot"),
    cfg = require("../Config"),
    a = require("./TimeProxy"),
    s = (function () {
        function t() {

            this.UPDATE_FLOWER_FIELD = "UPDATE_FLOWER_FRIEND_FIELD";
            this.UPDATE_FLOWER_LEVEL = "UPDATE_FLOWER_FRIEND_LEVEL";
            this.UPDATE_FLOWER_FRIENDS = "UPDATE_FLOWER_FRIEND_FRIENDS";
            this.UPDATE_FLOWER_PAOMA_UPDATE = "UPDATE_FLOWER_PAOMA_UPDATE";

            this.UPDATE_FLOWER_MYRANK = "UPDATE_FLOWER_FRIEND_MYRANK";
            this.UPDATE_FLOWER_RANK = "UPDATE_FLOWER_FRIEND_RANK";

            this.field = null;
            this.rank = null;
            this.myRank = null;
            this.level = null;
            this.autoshou = null;
            this.friends = null;
            this.flowerInfo = null;
            this.maxid = 0;
            this.isSendAdok = false;
            this.isShowEffect = true;
            this.effectId = 0;
        }
        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.flowerFriend.field, this.onField, this);
            JsonHttp.subscribe(proto_sc.flowerFriend.level, this.onLevel, this);
            JsonHttp.subscribe(proto_sc.flowerFriend.friends, this.onFriends, this);
            JsonHttp.subscribe(proto_sc.flowerFriend.notice, this.onNotice, this);
            JsonHttp.subscribe(proto_sc.flowerFriend.receive, this.onReceive, this);



            JsonHttp.subscribe(proto_sc.flowerFriend.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.flowerFriend.rank, this.onRank, this);



        };
        t.prototype.clearData = function () {
            this.field = null;
            this.rank = null;
            this.myRank = null;
            this.level = null;
            this.autoshou = null;
            this.friends = null;
            this.maxid = 0;
            this.isSendAdok = false;
            this.isShowEffect = true;
            this.effectId = 0;
        };


        t.prototype.sendNoticeAdok = function () {


            if (!this.isSendAdok) {
                if (this.maxid === 0) {
                    var id = n.timeProxy.getLoacalValue("FLOWER_EFFECT_ID");
                    if (id != null) {
                        this.maxid = id;
                    }
                }
                this.isSendAdok = true;
                var e = new proto_cs.user.adok();
                e.label = "flower_notice";
                e.maxid = parseInt(this.maxid);


                var t = this;
                JsonHttp.send(e, function () {
                    t.isSendAdok = false;
                });
            }
        };

        t.prototype.onNotice = function (t) {

            this.isSendAdok = false;
            if (null != t && 0 != t.lists.length) {
                null == this.paoma && (this.paoma = []);
                for (var e of t.lists) {

                    e.msg = n.chatProxy.getSpMsg(e.msg);
                    this.paoma.push(e);
                    this.maxid = e.id;
                }


                if (this.paoma.length > 0) {
                    n.timeProxy.saveLocalValue("FLOWER_EFFECT_ID", this.maxid);
                    facade.send(this.UPDATE_FLOWER_PAOMA_UPDATE);
                }

            }
        };
        t.prototype.onReceive = function (t) {

            this.effectId = t.id;
            if (this.effectId != 0 && this.isShowEffect) {
                if (i.utils.getViewNum() === 0) {
                    i.utils.openPrefabView("flower/FlowerEffect");
                }

            }

        };


        t.prototype.onFriends = function (t) {
            this.friends = t;
            facade.send(this.UPDATE_FLOWER_FRIENDS);
        };

        t.prototype.showAutoShow = function () {
            this.autoshou &&
                this.autoshou.id > 0 &&
                i.utils.showSingeConfirm(
                    i18n.t("FLOWER_AUTO_CHEN", {
                        d: this.autoshou.id
                    }),
                    null
                );
            this.autoshou = null;
        };
        t.prototype.onAutoShou = function (t) {
            this.autoshou = t;
        };




        t.prototype.onGive = function (t) {
            //这个在GuanxiProxy里调用
            if (this.friends) {
                for (var item of this.friends.lists) {
                    if (item.fuid === t.fuid) {
                        item.fnum = t.fnum;
                        break;
                    }
                }
            }

            if (t.is_show === 1) {
                //显示特效
                var e = localcache.getItem(localdb.table_friend_flowerCore, t.id);
                this.effectId = e.id;
                if (this.effectId != 0 && this.isShowEffect) {
                    i.utils.openPrefabView("flower/FlowerEffect");
                }
            }
        };
        t.prototype.onField = function (t) {
            this.field = t;
            this.updateRed();
            facade.send(this.UPDATE_FLOWER_FIELD);
        };
        t.prototype.onLevel = function (t) {
            this.level = t;
            null != this.level.isNewChenlu &&
                r.default.change(
                    "chenlu",
                    this.level.isNewChenlu &&
                    a.funUtils.isOpenFun(a.funUtils.flower)
                );
            null != this.level.isNewFlower &&
                r.default.change(
                    "flowerFriend",
                    this.level.isNewFlower &&
                    a.funUtils.isOpenFun(a.funUtils.flower)
                );
            facade.send(this.UPDATE_FLOWER_LEVEL);
        };

        t.prototype.onMyRank = function (t) {
            this.myRank = t;
        };
        t.prototype.onRank = function (t) {
            this.rank = t;
        };
        t.prototype.sendOpen = function (t) {
            var e = new proto_cs.flowerFriend.unlock();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendInfo = function (callBack) {
            JsonHttp.send(new proto_cs.flowerFriend.lists(), callBack);
        };

        t.prototype.sendPlant = function (t, e) {
            var o = new proto_cs.flowerFriend.plant();
            o.type = 1;
            o.id = t;
            o.pid = e;
            JsonHttp.send(o);
        };
        t.prototype.sendPlantRwd = function (t) {
            var e = new proto_cs.flowerFriend.receive();
            e.id = t;
            e.type = 1;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendRank = function () {
            var t = this;
            JsonHttp.send(new proto_cs.flowerFriend.rank(), function () {
                var e = {};
                e.rank = t.myRank.rid;
                e.value = t.myRank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: "FLOWER_FRIEND_RANK",
                    list: t.rank,
                    mine: e
                });
            });
        };
        t.prototype.sendRwd = function (t) {
            var e = new proto_cs.flowerFriend.rwd();
            e.id = t;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.getStatu = function (t, e) {
            var o = 0,
                n = i.timeUtil.second;
            n > t + e / 3 && (o = 1);
            n > t + (e / 3) * 2 && (o = 2);
            return o;
        };
        t.prototype.isNextUnlock = function (t) {
            if (-1 != this.field.openid.indexOf(t - 1)) return !0;
            var e = localcache.getItem(localdb.table_friend_flowerField, t - 1);
            return !!(e && e.lv <= this.level.lv);
        };

        t.prototype.sendFriends = function () {
            var e = new proto_cs.flowerFriend.friends();
            JsonHttp.send(e);
        };

        t.prototype.sendYjsh = function () {
            var e = new proto_cs.flowerFriend.receive();
            e.type = 2;
            JsonHttp.send(e, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendYjPlant = function (t, hasGold = 1) {
            var o = new proto_cs.flowerFriend.plant();
            o.type = 2;
            o.arr = t;
            o.isGold = hasGold
            JsonHttp.send(o);
        };

        t.prototype.sendZY = function (fuid, num) {

            var e = localcache.getItem(localdb.table_item, this.flowerInfo.id);

            n.guanxiProxy.sendGive(fuid, num, this.flowerInfo.id, e.type[3]);
        };

        t.prototype.lvCanUse = function () {
            if (cc.sys.os == cc.sys.OS_WINDOWS) {
                return true;
            }

            return cfg.Config.zone == "GAT";
        };

        t.prototype.updateRed = function () {
            this.updateFlowerRed();
        };
        t.prototype.updateFlowerRed = function () {
            if (null != this.field && null != this.field.fields) {
                for (
                    var t = !1, e = i.timeUtil.second, k = this.field.fields, len = k.length, o = 0; o < len; o++
                ) {
                    var n = k[o];
                    if (0 != n.pid) {
                        var l = localcache.getItem(
                            localdb.table_friend_flowerCore,
                            n.pid
                        );
                        if (n.stime + l.time <= e) {
                            t = !0;
                            break;
                        }
                    }
                }
                r.default.change(
                    "flowerFriend",
                    t && a.funUtils.isOpenFun(a.funUtils.flower)
                );
            }
        };

        return t;
    })();
o.FlowerFriendProxy = s;