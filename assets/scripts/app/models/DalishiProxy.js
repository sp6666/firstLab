var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.UPDATE_DALISHI_LIST = "UPDATE_DALISHI_LIST";
            this.UPDATE_DALISHI_DEFLOG = "UPDATE_DALISHI_DEFLOG";
            this.UPDATE_DALISHI_ENEMY = "UPDATE_DALISHI_ENEMY";
            this.UPDATE_DALISHI_FCLIST = "UPDATE_DALISHI_FCLIST";
            this.UPDATE_DALISHI_FIGHT = "UPDATE_DALISHI_FIGHT";
            this.UPDATE_DALISHI_INFO = "UPDATE_DALISHI_INFO";
            this.UPDATE_DALISHI_KILL20LOG = "UPDATE_DALISHI_KILL20LOG";
            this.UPDATE_DALISHI_MYRANK = "UPDATE_DALISHI_MYRANK";
            this.UPDATE_DALISHI_RANK = "UPDATE_DALISHI_RANK";
            this.UPDATE_DALISHI_WIN = "UPDATE_DALISHI_WIN";
            this.UPDATE_DALISHI_ZHUISHA = "UPDATE_DALISHI_ZHUISHA";
            //出战列表
            this.servantList = null;
            this.defLog = null;
            this.enemyMsg = null;
            //复仇列表
            this.fcList = null;
            this.fight = null;
            this.info = null;
            this.kill20Log = null;
            this.myRank = null;
            this.rank = null;
            this.win = null;
            this.zhuisha = null;
            this._lastHid = 0;
            this.rwds = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.yamen.cslist, this.onServantList, this);
            JsonHttp.subscribe(proto_sc.yamen.deflog, this.onDefLog, this);
            JsonHttp.subscribe(proto_sc.yamen.enymsg, this.onEnyMsg, this);
            JsonHttp.subscribe(proto_sc.yamen.fclist, this.onFcList, this);
            JsonHttp.subscribe(proto_sc.yamen.fight, this.onFight, this);
            JsonHttp.subscribe(proto_sc.yamen.info, this.onInfo, this);
            JsonHttp.subscribe(
                proto_sc.yamen.kill20log,
                this.onKill20Log,
                this
            );
            JsonHttp.subscribe(proto_sc.yamen.myrank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.yamen.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.yamen.win, this.onWin, this);
            JsonHttp.subscribe(proto_sc.yamen.zhuisha, this.onZhuiSha, this);
        };
        t.prototype.clearData = function() {
            this.servantList = null;
            this.defLog = null;
            this.enemyMsg = null;
            this.fcList = null;
            this.fight = null;
            this.info = null;
            this.kill20Log = null;
            this.myRank = null;
            this.rank = null;
            this.win = null;
            this.zhuisha = null;
        };
        t.prototype.onServantList = function(t) {
            this.servantList = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_LIST);
        };
        t.prototype.onDefLog = function(t) {
            null == this.defLog
                ? (this.defLog = t)
                : i.utils.copyList(this.defLog, t);
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_DEFLOG);
        };
        t.prototype.onEnyMsg = function(t) {
            null == this.enemyMsg
                ? (this.enemyMsg = t)
                : i.utils.copyList(this.enemyMsg, t);
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_ENEMY);
        };
        t.prototype.onFcList = function(t) {
            this.fcList = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_FCLIST);
        };
        t.prototype.onFight = function(t) {
            this._lastHid = this.fight ? this.fight.hid : t.hid;
            this.fight = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_FIGHT);
        };
        t.prototype.onInfo = function(t) {
            this.info = t;
            l.default.change(
                "dalisi",
                0 != this.info.qhid || 2 == this.info.state
            );
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_INFO);
        };
        t.prototype.onKill20Log = function(t) {
            null == this.kill20Log
                ? (this.kill20Log = t)
                : i.utils.copyList(this.kill20Log, t);
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_KILL20LOG);
        };
        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_MYRANK);
        };
        t.prototype.onRank = function(t) {
            this.rank = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_RANK);
        };
        t.prototype.onWin = function(t) {
            this.win = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_WIN);
        };
        t.prototype.onZhuiSha = function(t) {
            this.zhuisha = t;
            facade.send("DALISHI_MASK_ACTIVE",false);
            facade.send(this.UPDATE_DALISHI_ZHUISHA);
        };
        t.prototype.sendChushi = function() {
            JsonHttp.send(new proto_cs.yamen.chushi());
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendFight = function(t) {
            var e = new proto_cs.yamen.fight();
            e.id = t;
            JsonHttp.send(e, function() {
                i.utils.openPrefabView("dalishi/FightView");
            });
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendFindZhuiSha = function(t) {
            var e = new proto_cs.yamen.findzhuisha();
            e.fuid = t;
            JsonHttp.send(e);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendFuChou = function(t, e) {
            var o = new proto_cs.yamen.fuchou();
            o.fuid = t;
            o.hid = e;
            JsonHttp.send(o);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendRank = function() {
            var t = this;
            JsonHttp.send(new proto_cs.yamen.getrank(), function() {
                var e = {};
                e.rank = t.myRank.rank;
                e.value = t.myRank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: n.rankProxy.DALISI_RANK,
                    list: t.rank,
                    mine: e
                });
            });
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendRwd = function() {
            new proto_cs.yamen.getrwd();
            JsonHttp.send(new proto_cs.yamen.getrwd());
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendPiZun = function() {
            JsonHttp.send(new proto_cs.yamen.pizun(), function() {
                i.utils.openPrefabView("dalishi/DalishiServant");
            });
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendSelectadd = function(t) {
            var e = new proto_cs.yamen.seladd();
            e.id = t;
            JsonHttp.send(e);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendTiaoZhan = function(t, e) {
            var o = new proto_cs.yamen.tiaozhan();
            o.hid = e;
            o.fuid = t;
            JsonHttp.send(o);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendYaMen = function() {
            JsonHttp.send(new proto_cs.yamen.yamen());
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendGetHistory = function() {
            JsonHttp.send(new proto_cs.yamen.getHistory());
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendYamenHistory = function(t) {
            var e = new proto_cs.yamen.yamenhistory();
            e.id = t;
            JsonHttp.send(e);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendZhuiSha = function(t, e) {
            var o = new proto_cs.yamen.zhuisha();
            o.fuid = t;
            o.hid = e;
            JsonHttp.send(o);
            facade.send("DALISHI_MASK_ACTIVE",true);
        };
        t.prototype.sendBuy = function() {
            JsonHttp.send(new proto_cs.yamen.clearCD());
            facade.send("DALISHI_MASK_ACTIVE",true);
        };

        t.prototype.getCanFightTimes = function(t) {
            if (this.info == null || null == this.fcList) return 0;

            var times = 3;
            for (var e = 0; e < this.fcList.length; e++){
                var csItem = this.fcList[e];
                if (csItem.id == t) {
                    //计算剩余次数
                    //if(csItem.h == 1)
                    //{
                        times =  this.info.maxf - csItem.f;
                    //}
                   
                    break;
                }
            }
            return times;
        };

        t.prototype.isCanFight = function(t) {
            if (this.info == null || null == this.fcList) return !0;
            for (var e = 0; e < this.fcList.length; e++){
                var fcItem = this.fcList[e];
                if (fcItem.id == t) {
                    //如果参于次数到最大返回False
                    if(fcItem.f >= this.info.maxf){
                        return !1;
                    }
                   
                    break;
                }
            }
            return !0;
        };
        
        t.prototype.isCanNorFight = function(t) {
            if (null == this.servantList) return !0;
            for (var e = 0; e < this.servantList.length; e++)
                if (this.servantList[e].id == t) return !1;
            return !0;
        };
        t.prototype.hasCanFight = function() {
            for (
                var t = i.utils.getParamInt("gongdou_unlock_level"), e = 0;
                e < n.servantProxy.getServantList().length;
                e++
            ) {
                var o = n.servantProxy.getServantList()[e];
                if (o && o.level >= t && this.isCanNorFight(o.id)) return !0;
            }
            return !1;
        };
        t.prototype.openShop = function() {
            var t = parseInt(n.timeProxy.getLoacalValue("DALISI_SHOP")),
                e = this.fight;
            e && t != e.hid && null != e.shop && e.fheronum - e.killnum > 0
                ? i.utils.openPrefabView("dalishi/ShopDView")
                : (null != e && 0 != e.hid && e.killnum != e.fheronum) ||
                  i.utils.closeNameView("dalishi/DalishiServant");
        };
        t.prototype.getTalkType = function(t) {
            var e = localcache.getGroup(localdb.table_yanmenText, "type", t),
                o = Math.floor(Math.random() * e.length);
            return o < e.length ? e[o].text : e[0].text;
        };
        t.prototype.isSelected = function() {
            if (null == this.fight || null == this.fight.shop) return !1;
            for (var t = 0; t < this.fight.shop.length; t++)
                if (1 == this.fight.shop[t].type) return !0;
            return !1;
        };
        t.prototype.getAwardReward = function(t, e) {
            if (null == this.rwds) {
                this.rwds = [];
                for (
                    var o = localcache.getList(localdb.table_yanmenRwd), n = 0;
                    n < o.length;
                    n++
                ) {
                    var l = o[n].rwd;
                    (a = {}).count = l.count;
                    a.kind = l.kind;
                    a.id = l.id;
                    if (2 == l.kind)
                        switch (l.id) {
                            case 17:
                                a.kind = 5;
                                break;

                            case 18:
                                a.kind = 6;
                        }
                    this.rwds.push(a);
                }
            }
            i.utils.randomArray(this.rwds);
            var r = [];
            for (n = 0; n < 6; n++) {
                var a = {};
                l = this.rwds[n];
                a.count = l.count;
                a.kind = l.kind;
                a.id = 1 == l.kind ? l.id : 1 != t.kind ? t.id : this._lastHid;
                if (a.count == t.count && a.id == t.id && a.kind == t.kind) {
                    if (n != e) {
                        a.count = this.rwds[e].count;
                        a.kind = this.rwds[e].kind;
                        a.id =
                            1 == this.rwds[e].kind
                                ? this.rwds[e].id
                                : 1 != t.kind
                                ? t.id
                                : this._lastHid;
                    }
                } else if (n == e) {
                    a.count = t.count;
                    a.kind = t.kind;
                    a.id = t.id;
                }
                r.push(a);
            }
            return r;
        };
        t.prototype.isHaveFight = function() {
            return (
                !(!this.fight || 0 == this.fight.hid) ||
                !(!this.info || 0 == this.info.qhid)
            );
        };
        return t;
    })();
o.DalishiProxy = r;
