var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = require("./TimeProxy"),
    a = (function () {
        function t() {
            this.UPDATE_BAG_HECHENG = "UPDATE_BAG_HECHENG";
            this.UPDATE_BAG_ITEM = "UPDATE_BAG_ITEM";
            this.UPDATE_BAG_CHENGHAO = "UPDATE_BAG_CHENGHAO";
            this.heChengList = null;
            this.chInfo = null;
            this.itemList = null;
            this.itemObjs = {};
            this.listRedDot = [];
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.item.itemList, this.onItemList, this);
            JsonHttp.subscribe(proto_sc.item.hecheng, this.onHeCheng, this);
        };
        t.prototype.clearData = function () {
            this.itemObjs = {};
            this.itemList = null;
            this.heChengList = null;
            this.listRedDot = [];
        };
        t.prototype.onItemList = function (t) {
            this.itemObjs = {};
            if (null == this.itemList) this.itemList = t;
            else {
                i.utils.copyList(this.itemList, t, "id", !0, "count");
                for (var e = !1, o = 0; o < t.length && !(e = 1 == t[o].isNew); o++)
                {
                    
                }
                l.default.change("bagview", e);
            }
            for(var idx = 0; idx < this.itemList.length; idx++)
            {
                if(this.itemList[idx].isNew == true)
                {
                    this.listRedDot.push(this.itemList[idx]);
                }
            }
            for (o = 0; o < this.itemList.length; o++) {
                var a = this.itemList[o];
                this.itemObjs[a.id] = a;
            }
            facade.send(this.UPDATE_BAG_ITEM);
            n.treasureProxy.updateTreasureRed();
            r.funUtils.isOpenFun(r.funUtils.girlsDay) &&
                n.girlsDayProxy.updateItemNum();
            facade.send(n.flowerFriendProxy.UPDATE_FLOWER_FRIENDS);


        };
        t.prototype.onHeCheng = function (t) {
            this.initHeChengList();
            i.utils.copyList(this.heChengList, t, "itemid");
            facade.send(this.UPDATE_BAG_HECHENG);
        };
        t.prototype.initHeChengList = function () {
            if (null == this.heChengList) {
                this.heChengList = [];
                for (
                    var t = localcache.getList(localdb.table_group), e = 0; e < t.length; e++
                ) {
                    var o = t[e],
                        i = {};
                    i.itemid = o.itemid;
                    i.outtime = 0;
                    i.times = 0;
                    i.totonum = 0;
                    i.need = o.need;
                    this.heChengList.push(i);
                }
            }
        };
        t.prototype.sendUse = function (t, e) {
            var o = new proto_cs.item.useitem();
            o.id = t;
            o.count = e;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendCompose = function (t, e) {
            void 0 === e && (e = 1);
            var o = new proto_cs.item.hecheng();
            o.id = t;
            o.count = e;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendFashion = function (t) {
            var e = new proto_cs.chenghao.setChengHao();
            e.chid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendCancelFashion = function (t) {
            n.playerProxy.userData.chenghao = 0;
            var e = new proto_cs.chenghao.offChengHao();
            e.chid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendUseItemHero = function (t, e, o) {
            var i = new proto_cs.item.useforhero();
            i.count = e;
            i.heroid = o;
            i.id = t;
            JsonHttp.send(i, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.getItemCount = function (t) {
            var e = this.itemObjs[t];
            if (e) return e.count;
            switch (t) {
                case 1:
                    return n.playerProxy.userData.cash;

                case 2:
                    return n.playerProxy.userData.coin;

                case 3:
                    return n.playerProxy.userData.food;

                case 4:
                    return n.playerProxy.userData.army;

                case 5:
                    return n.playerProxy.userData.exp;
            }
            return 0;
        };
        t.prototype.getItemList = function () {
            for (var t = [], e = {}, o = 0; o < this.itemList.length; o++) {
                var i = this.itemList[o];
                if (null != i && 0 != i.count) {
                    var n = localcache.getItem(localdb.table_item, i.id);
                    if (null != n) {
                        e[i.id] = 0 == n.classify ? 99 : n.classify;
                        i.showtype = undefined == n.showtype ? 0 : n.showtype;  //填入显示分类
                        t.push(i);
                    }
                }
            }
            t.sort(function (t, o) {
                var i = e[t.id],
                    n = e[o.id];
                return i == n ? t.id - o.id : i - n;
            });
            return t;
        };
        t.prototype.getFoodList = function () {
            for (var t = [], e = 0; e < this.itemList.length; e++) {
                var o = localcache.getItem(
                    localdb.table_item,
                    this.itemList[e].id
                );
                o &&
                    101 == o.kind &&
                    this.itemList[e].count > 0 &&
                    t.push(this.itemList[e]);
            }
            return t;
        };
        t.prototype.getHecheng = function (t) {
            null == this.heChengList && this.initHeChengList();
            for (var e = 0; e < this.heChengList.length; e++)
                for (var o = this.heChengList[e], i = 0; i < o.need.length; i++)
                    if (o.need[i].id == t) return o;
            return null;
        };
        t.prototype.getCanHechengItem = function (t) {
            null == this.heChengList && this.initHeChengList();
            for (var e = 0; e < this.heChengList.length; e++) {
                var o = this.heChengList[e];
                if (o.itemid == t) return o;
            }
            return null;
        };
        return t;
    })();
o.BagProxy = a;
(function (t) {
    t[(t.NONE = 0)] = "NONE";
    t[(t.ITEM = 1)] = "ITEM";
    t[(t.ENUM_ITEM = 2)] = "ENUM_ITEM";
    t[(t.WIFE_LOVE = 3)] = "WIFE_LOVE";
    t[(t.WIFE_FLOWER = 4)] = "WIFE_FLOWER";
    t[(t.BOOK_EXP = 5)] = "BOOK_EXP";
    t[(t.SKILL_EXT = 6)] = "SKILL_EXT";
    t[(t.HERO = 7)] = "HERO";
    t[(t.WIFE = 8)] = "WIFE";
    t[(t.WIFE_HAOGAN = 9)] = "WIFE_HAOGAN";
    t[(t.CHENGHAO = 10)] = "CHENGHAO";
    t[(t.HUODONG = 11)] = "HUODONG";
    t[(t.WIFE_EXP = 12)] = "WIFE_EXP";
    t[(t.HERO_SW = 90)] = "HERO_SW";
    t[(t.ROLE_SW = 91)] = "ROLE_SW";
    t[(t.HERO_JB = 92)] = "HERO_JB";
    t[(t.WIFE_JB = 93)] = "WIFE_JB";
    t[(t.HEAD_BLANK = 94)] = "HEAD_BLANK";
    t[(t.CLOTHE = 95)] = "CLOTHE";
    t[(t.JB_ITEM = 96)] = "JB_ITEM";
    t[(t.HERO_CLOTHE = 97)] = "HERO_CLOTHE";
    t[(t.HEAD_HEAD = 98)] = "HEAD_HEAD";
    t[(t.HERO_EP = 999)] = "HERO_EP";
})(o.DataType || (o.DataType = {}));
(function (t) {
    t[(t.NORMAL = 1)] = "NORMAL";
    t[(t.WIFE_LOVE = 3)] = "WIFE_LOVE";
    t[(t.WIFE_FLOWER = 4)] = "WIFE_FLOWER";
    t[(t.HERO_PROP_EXP = 5)] = "HERO_PROP_EXP";
    t[(t.HERO_SKILL_EXP = 6)] = "HERO_SKILL_EXP";
    t[(t.HERO_PROP_UP = 7)] = "HERO_PROP_UP";
    t[(t.CHENGHAO = 10)] = "CHENGHAO";
    t[(t.HUODONG = 11)] = "HUODONG";
    t[(t.PROP_ADD = 13)] = "PROP_ADD";
    t[(t.ADD_PROP = 14)] = "ADD_PROP";
    t[(t.GIFT = 15)] = "GIFT";
    t[(t.MARRY_ITEM = 16)] = "MARRY_ITEM";
    t[(t.COOK_ITEM = 100)] = "COOK_ITEM";
    t[(t.FOOD_ITEM = 101)] = "FOOD_ITEM";
    t[(t.TREASURE_CLIP = 103)] = "TREASURE_CLIP";
    t[(t.TREASURE = 104)] = "TREASURE";
    t[(t.TRUN_TABLE = 105)] = "TRUN_TABLE";
})(o.ItemType || (o.ItemType = {}));