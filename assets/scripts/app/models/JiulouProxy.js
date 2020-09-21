var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = (function() {
        function t() {
            this.yhInfo = null;
            this.yhType = null;
            this.yhList = null;
            this.yhBaseInfo = null;
            this.shop = null;
            this.yhHeroList = null;
            this.win = null;
            this.xwId = 0;
            this.yhOldList = null;
            this.yhBadList = null;
            this.lbList = null;
            this.rankList = null;
            this.selectFood = [];
            this.isCreate = !1;
            this.myRank = null;
            this.selectData = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.boite.yhInfo, this.onYhInfo, this);
            JsonHttp.subscribe(proto_sc.boite.yhType, this.onYhType, this);
            JsonHttp.subscribe(proto_sc.boite.yhshow, this.onYhShow, this);
            JsonHttp.subscribe(
                proto_sc.boite.yhBaseInfo,
                this.onYhBaseInfo,
                this
            );
            JsonHttp.subscribe(proto_sc.boite.jlShop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.boite.heroList, this.onHeroList, this);
            JsonHttp.subscribe(proto_sc.boite.win, this.onWindow, this);
            JsonHttp.subscribe(proto_sc.boite.yhOld, this.onYhOld, this);
            JsonHttp.subscribe(proto_sc.boite.yhbad, this.onYhBad, this);
            JsonHttp.subscribe(proto_sc.boite.lbList, this.onLbList, this);
            JsonHttp.subscribe(proto_sc.boite.yhList, this.onRankList, this);
            JsonHttp.subscribe(proto_sc.boite.myYhRid, this.onYhRid, this);
        };
        t.prototype.clearData = function() {
            this.yhInfo = null;
            this.yhType = null;
            this.yhList = null;
            this.yhBaseInfo = null;
            this.shop = null;
            this.yhHeroList = null;
            this.win = null;
            this.xwId = 0;
            this.yhOldList = null;
            this.yhBadList = null;
            this.lbList = null;
            this.rankList = null;
            this.selectFood = [];
            this.myRank = null;
        };
        t.prototype.onYhOld = function(t) {
            this.yhOldList = t;
            facade.send("JIU_LOU_LOG_UPDATE");
        };
        t.prototype.onYhBad = function(t) {
            this.yhBadList = t;
            facade.send("JIU_LOU_LOG_UPDATE");
        };
        t.prototype.onLbList = function(t) {
            this.lbList = t;
            facade.send("JIU_LOU_LOG_UPDATE");
        };
        t.prototype.onYhInfo = function(t) {
            this.yhInfo = t;
            facade.send("JIU_LOU_YH_INFO");
        };
        t.prototype.onYhType = function(t) {
            this.yhType = t;
            facade.send("JIU_LOU_TYPE_CHANGE");
        };
        t.prototype.onYhShow = function(t) {
            this.yhList = t;
            facade.send("JIU_LOU_YH_LIST");
        };
        t.prototype.onYhBaseInfo = function(t) {
            this.yhBaseInfo = t;
            facade.send("JIU_LOU_BASE_INFO");
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
            facade.send("JIU_LOU_SHOP_LIST");
        };
        t.prototype.onHeroList = function(t) {
            this.yhHeroList = t;
            facade.send("JIU_LOU_HERO_LIST");
        };
        t.prototype.onWindow = function(t) {
            t.yhnew && (this.win = t);
        };
        t.prototype.onRankList = function(t) {
            this.rankList = t;
        };
        t.prototype.onYhRid = function(t) {
            this.myRank = t;
            facade.send("JIU_LOU_MY_RANK_DATA");
        };
        t.prototype.sendJlInfo = function() {
            JsonHttp.send(new proto_cs.boite.jlInfo(), function() {
                facade.send("JIU_LOU_INFO_BACK");
            });
        };
        t.prototype.sendYhFind = function(t) {
            var e = new proto_cs.boite.yhFind();
            e.fuid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendYhGo = function(t) {
            var e = new proto_cs.boite.yhGo();
            e.fuid = t;
            JsonHttp.send(e, function(t) {
                t.a.boite
                    ? null == n.jiulouProxy.selectData
                        ? i.utils.openPrefabView("jiulou/JiulouDinnce")
                        : i.utils.openPrefabView(
                              "jiulou/JiulouGoView",
                              !1,
                              n.jiulouProxy.selectData
                          )
                    : n.jiulouProxy.sendJlInfo();
            });
        };
        t.prototype.sendYhChi = function(t, e, o) {
            var i = new proto_cs.boite.yhChi();
            i.fuid = t;
            i.xwid = e;
            i.hid = o;
            JsonHttp.send(i);
        };
        t.prototype.sendShoChange = function(t) {
            var e = new proto_cs.boite.shopChange();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendYhHold = function(t, e, o, i, n) {
            var l = new proto_cs.boite.yhHold();
            l.type = t;
            l.isOpen = e;
            l.food1 = o;
            l.food2 = i;
            l.food3 = n;
            this.isCreate = !0;
            JsonHttp.send(l);
        };
        t.prototype.sendJlRank = function() {
            var t = this;
            JsonHttp.send(new proto_cs.boite.jlRanking(), function() {
                var e = {};
                e.rank = t.myRank.rid;
                e.value = t.myRank.score;
                i.utils.openPrefabView("RankCommon", null, {
                    rankType: n.rankProxy.JIU_LOU_RANK,
                    list: t.rankList,
                    mine: e
                });
            });
        };
        t.prototype.isJoin = function(t) {
            for (var e = !1, o = 0; o < this.yhHeroList.length; o++)
                if (this.yhHeroList[o].hid == t) {
                    e = !0;
                    break;
                }
            return e;
        };
        t.prototype.getHeroList = function() {
            for (
                var t = [], e = 0;
                e < n.servantProxy.getServantList().length;
                e++
            ) {
                var o = {
                    hero: n.servantProxy.getServantList()[e],
                    flag: this.isJoin(n.servantProxy.getServantList()[e].id)
                };
                t.push(o);
            }
            t.sort(this.sortList);
            return t;
        };
        t.prototype.sortList = function(t, e) {
            var o = t.flag ? 1 : 0,
                i = e.flag ? 1 : 0,
                n = t.hero,
                l = e.hero,
                r = n.aep.e1 + n.aep.e2 + n.aep.e3 + n.aep.e4,
                a = l.aep.e1 + l.aep.e2 + l.aep.e3 + l.aep.e4;
            return o != i ? o - i : r > a ? -1 : 1;
        };
        t.prototype.getShopCount = function(t) {
            for (var e = 0, o = 0; o < this.shop.list.length; o++)
                if (this.shop.list[o].id == t) {
                    e = this.shop.list[o].num;
                    break;
                }
            return e;
        };
        t.prototype.getYhData = function(t) {
            var e = null;
            if (this.yhList)
                for (var o = 0; o < this.yhList.length; o++)
                    if (this.yhList[o].uid == t) {
                        e = this.yhList[o];
                        break;
                    }
            return e;
        };
        t.prototype.getYhHeroList = function() {
            for (var t = [], e = 0; e < this.yhHeroList.length; e++)
                n.xianyunProxy.isXianYun(this.yhHeroList[e].hid) ||
                    t.push(this.yhHeroList[e]);
            return t;
        };
        return t;
    })();
o.JiulouProxy = l;
var r = function() {
    this.type = 0;
    this.itemId = 0;
    this.add = 0;
    this.cost = 0;
};
o.JiulouChooseData = r;
