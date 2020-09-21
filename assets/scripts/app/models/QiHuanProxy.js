var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../component/RedDot"),
    l = require("../Initializer"),
    a = (function () {
        function t() {

            this.startTime = null;
            this.endTime = null;
            this.data = null;
            this.records = null;
            this.finalRank = null;
            this.myRid = null;
            this.shop = null;
            this.dhShop = {};
            this.likeMsg = null;
            this.likeScore = [];
            this.QIHUAN_DATA_UPDATE = "QIHUAN_DATA_UPDATE";
            this.QIHUAN_FEED_BACK = "QIHUAN_FEED_BACK";
            this.QIHUAN_MY_RID = "QIHUAN_MY_RID";
            this.QIHUAN_RANK = "QIHUAN_RANK";
            this.QIHUAN_DAY_RECORDS = "QIHUAN_DAY_RECORDS";

            this.eTalkMode = {
                none: -1,
                dislike: 0,
                tip: 1,
                like: 2,
            };

            this.aPersonStatus = [{
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }, {
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }, {
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }];
        }
        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.qihuan.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.qihuan.exchange, this.onActivityShop, this);
            JsonHttp.subscribe(proto_sc.qihuan.rwdLog, this.onRwdLog, this);
            JsonHttp.subscribe(proto_sc.qihuan.finalRank, this.onFinalRank, this);
            JsonHttp.subscribe(proto_sc.qihuan.myLdRid, this.onMyRid, this);

            JsonHttp.subscribe(proto_sc.qihuan.give_gift, this.feedback, this);

            JsonHttp.subscribe(proto_sc.qihuan.shop, this.onShop, this);


        };

        t.prototype.clearData = function () {
            this.data = null;
            this.records = null;
            this.finalRank = null;
            this.myRid = null;
            this.likeMsg = null;
            this.likeScore = null;

            this.aPersonStatus = [{
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }, {
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }, {
                id: 0,
                lv: 0,
                like: this.eTalkMode.none
            }];
        };

        t.prototype.feedback = function (t) {
            this.likeMsg = t;

            var persons = localcache.getList(localdb.table_qihuan_person);

            for (var servant of persons) {
                if (servant.hid === this.likeMsg.hid) {
                    this.likeScore[servant.id - 1] += this.likeMsg.score;
                    break;
                }
            }

            facade.send(this.QIHUAN_FEED_BACK);
        };

        t.prototype.onDataUpdate = function (t) {
            if (t) {
                this.data = t;

                this.startTime = i.timeUtil.getTodaySecond(this.data.info.begin[0], this.data.info.begin[1], this.data.info.begin[2]);
                this.endTime = i.timeUtil.getTodaySecond(this.data.info.end[0], this.data.info.end[1], this.data.info.end[2]);

                this.likeScore = [];
                this.likeScore.push(this.data.score.score_1061);
                this.likeScore.push(this.data.score.score_1062);
                this.likeScore.push(this.data.score.score_1063);
                facade.send(this.QIHUAN_DATA_UPDATE);

                this.updateRedDot();
            }

        };

        t.prototype.updateRedDot = function (t) {

            n.default.change("qihuan_feed", this.hasRed());
        };


        t.prototype.onRwdLog = function (t) {
            this.records = t;
            facade.send(this.QIHUAN_DAY_RECORDS);
        };
        t.prototype.onFinalRank = function (t) {
            this.finalRank = t;
            facade.send(this.QIHUAN_RANK);
        };
        t.prototype.onMyRid = function (t) {
            this.myRid = t;

            facade.send(this.QIHUAN_MY_RID);
        };
        t.prototype.onActivityShop = function (t) {
            var e = {
                rwd: []
            };
            e.hid = this.data ? this.data.info.type : 1;
            e.rwd = t;
            e.stime = this.data ? this.data.info.showTime : 0;
            this.dhShop = e;
            facade.send(l.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        };
        t.prototype.sendOpenArborDay = function () {
            JsonHttp.send(new proto_cs.huodong.hd6260Info());
        };

        t.prototype.sendLookRank = function () {
            JsonHttp.send(new proto_cs.huodong.hd6260paihang());
        };
        t.prototype.sendGetRwd = function (t) {
            var e = new proto_cs.huodong.hd6260Rwd();
            //e.id = t;
            JsonHttp.send(e, function () {
                //l.timeProxy.floatReward();
            });
        };

        t.prototype.sendFeed = function (pId, candyId) {

            var person = localcache.getItem(localdb.table_qihuan_person, pId);
            var candy = localcache.getItem(localdb.table_qihuan_candy, candyId);

            var o = new proto_cs.huodong.hd6260GiveGift();
            o.hid = person.hid;
            o.itemid = candy.itemid;

            JsonHttp.send(o, function () {
                l.timeProxy.floatReward();
                cc.log("hd6260GiveGift back" + person.hid + '   ' + candy.itemid);
            });

            cc.log("hd6260GiveGift" + person.hid + '   ' + candy.itemid);
        };

        t.prototype.hasRed = function () {
            if (this.data) {
                if (i.timeUtil.second >= this.startTime && i.timeUtil.second <= this.endTime) {
                    return true;
                }
            }


            return false;
        };
        return t;
    })();
o.QiHuanProxy = a;
var s = function () {
    this.time = 0;
    this.ids = [];
};