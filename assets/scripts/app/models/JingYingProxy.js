var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = require("./TimeProxy"),
    a = (function() {
        function t() {
            this.JINGYING_ARMY = "JINGYING_ARMY";
            this.JINGYING_FOOD = "JINGYING_FOOD";
            this.JINGYING_COIN = "JINGYING_COIN";
            this.JINGYING_EXP = "JINGYING_EXP";
            this.JINGYING_WIN = "JINGYING_WIN";
            this.JINGYING_WEIPAI = "JINGYING_WEIPAI";
            this.isSendAdok = !1;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.jingYing.army, this.onArmy, this);
            JsonHttp.subscribe(proto_sc.jingYing.coin, this.onCoin, this);
            JsonHttp.subscribe(proto_sc.jingYing.food, this.onFood, this);
            JsonHttp.subscribe(proto_sc.jingYing.exp, this.onExp, this);
            JsonHttp.subscribe(proto_sc.jingYing.win, this.onWin, this);
            JsonHttp.subscribe(proto_sc.jingYing.weipai, this.onWeipai, this);
        };
        t.prototype.clearData = function() {
            this.army = null;
            this.coin = null;
            this.food = null;
            this.exp = null;
            this.win = null;
            this.weipai = null;
        };
        t.prototype.onArmy = function(t) {
            this.army = t;
            this.updateJY();
            facade.send(this.JINGYING_ARMY);
        };
        t.prototype.onFood = function(t) {
            this.food = t;
            this.updateJY();
            facade.send(this.JINGYING_FOOD);
        };
        t.prototype.onCoin = function(t) {
            this.coin = t;
            this.updateJY();
            facade.send(this.JINGYING_COIN);
        };
        t.prototype.sendAdok = function() {
            if (!this.isSendAdok && null != this.army) {
                var t = i.timeUtil.second;
                this.army.num < this.army.max &&
                    this.army.next < t &&
                    n.playerProxy.sendAdok(this.army.label);
                this.coin.num < this.coin.max &&
                    this.coin.next < t &&
                    n.playerProxy.sendAdok(this.coin.label);
                this.food.num < this.food.max &&
                    this.food.next < t &&
                    n.playerProxy.sendAdok(this.food.label);
                0 != this.exp.cd.next &&
                    this.exp.cd.next < t &&
                    n.playerProxy.sendAdok(this.exp.cd.label);
            }
        };
        t.prototype.updateJY = function() {
            n.taskProxy.mainTask &&
                l.default.change(
                    "jingying",
                    (this.coin.num > 0 ||
                        this.food.num > 0 ||
                        this.army.num > 0) &&
                        r.funUtils.isOpenFun(r.funUtils.jingyingView)
                );
        };
        t.prototype.updateZW = function() {
            null != n.taskProxy.mainTask &&
                l.default.change(
                    "zhengwu",
                    this.exp.cd.num > 0 &&
                        r.funUtils.isOpenFun(r.funUtils.zhengwuView)
                );
        };
        t.prototype.onExp = function(t) {
            this.exp = t;
            this.updateZW();
            facade.send(this.JINGYING_EXP);
        };
        t.prototype.onWin = function(t) {
            this.win = t;
            facade.send(this.JINGYING_WIN);
        };
        t.prototype.onWeipai = function(t) {
            this.weipai = t;
            facade.send(this.JINGYING_WEIPAI);
        };
        t.prototype.sendJingying = function(t) {
            var e = new proto_cs.user.jingYing();
            e.jyid = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward(!1);
            });
        };
        t.prototype.sendJingyingAll = function() {
            var t = new proto_cs.user.jingYingAll();
            JsonHttp.send(t, function() {
                n.timeProxy.floatReward(!1);
            });
        };
        t.prototype.sendJYL = function(t, e) {
            var o = new proto_cs.user.jingYingLing();
            o.jyid = t;
            o.num = e;
            JsonHttp.send(o, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendZwl = function(t) {
            var e = new proto_cs.user.zhengWuLing();
            e.num = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendZwAct = function(t, e) {
            void 0 === e && (e = "");
            var o = new proto_cs.user.zhengWu();
            o.act = t;
            JsonHttp.send(o, function() {
                3 != t ||
                    i.stringUtil.isBlank(e) ||
                    n.jibanProxy.sendGetZWAward(e);
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendWeipai = function(t, e, o, i) {
            void 0 === o && (o = 0);
            void 0 === i && (i = 0);
            var n = new proto_cs.user.weipai();
            n.type = t;
            n.heroId1 = e;
            n.heroId2 = o;
            n.heroId3 = i;
            JsonHttp.send(n);
        };
        t.prototype.getCount = function(t) {
            switch (t) {
                case 2:
                    return this.coin.num;

                case 3:
                    return this.food.num;

                case 4:
                    return this.army.num;
            }
            return 0;
        };
        t.prototype.isCanOpenWeipai = function(t, e) {
            for (
                var o = localcache.getGroup(localdb.table_jyWeipai, "type", e),
                    i = 0;
                i < o.length;
                i++
            )
                if (o[i].sequence == t)
                    switch (o[i].condition) {
                        case 1:
                            return (
                                n.taskProxy.mainTask.id >
                                parseInt(o[i].value + "")
                            );

                        case 2:
                            var l = (o[i].value + "").split(",");
                            return n.achievementProxy.isOverAchieve(
                                parseInt(l[0]),
                                parseInt(l[1])
                            );
                    }
            return !0;
        };
        t.prototype.alertWPLock = function(t, e) {
            for (
                var o = localcache.getGroup(localdb.table_jyWeipai, "type", e),
                    n = 0;
                n < o.length;
                n++
            )
                o[n].sequence == t && i.alertUtil.alert(o[n].text);
        };
        t.prototype.isWeipai = function(t, e) {
            var o = [];
            if (this.weipai) {
                o = this.weipai.coin;
                3 == e && (o = this.weipai.food);
                4 == e && (o = this.weipai.army);
            }
            return -1 != o.indexOf(t);
        };
        t.prototype.getWeipaiAdd = function(t) {
            var e = [];
            if (this.weipai) {
                e = this.weipai.coin;
                3 == t && (e = this.weipai.food);
                4 == t && (e = this.weipai.army);
            }
            for (var o = 0, i = 0; i < e.length; i++) {
                var l = n.servantProxy.getHeroData(e[i]);
                l && (o += l.aep ? l.aep["e" + t] : 0);
            }
            return o;
        };
        return t;
    })();
o.JingYingProxy = a;
