var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.base = null;
            this.data = null;
            this.rwdData = null;
            this.rank = null;

            this.myRank = null;
            this.records = null;
            this.shop = {};
            this.dhShop = {};
            this.sjShop = [];

            this.COOPERATE_ITEM_ID = 945;

            this.COOPERATE_DATA_UPDATE = "COOPERATE_DATA_UPDATE";
            this.COOPERATE_DATA_RECORDS = "COOPERATE_DATA_RECORDS";
            this.COOPERATE_RANK = "COOPERATE_RANK";
            this.COOPERATE_MY_RANK = "COOPERATE_MY_RANK";
        }
        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.cooperate.cfg, this.onData, this);
            JsonHttp.subscribe(proto_sc.cooperate.tongxin, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.cooperate.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.cooperate.myTxRid, this.onMyTxRid, this);
            JsonHttp.subscribe(proto_sc.cooperate.TxAllRank, this.onTxAllRank, this);

            JsonHttp.subscribe(proto_sc.cooperate.shop, this.onShop, this);

        };

        t.prototype.clearData = function () {
            this.data = null;
            this.rank = null;
            this.rwdData = null;
            this.myRank = null;
            this.shop = {};
            this.dhShop = {};
            this.foodList = [];

            this.records = null;
            this.sjShop = [];
            this.userId = "";
        };

        t.prototype.onShop = function (t) {
            this.shop = t;
        };

        t.prototype.onData = function (t) {
            this.data = t;
            if (this.rwdData && this.data) {
                facade.send(this.COOPERATE_DATA_UPDATE);
            }

        };

        t.prototype.onRwd = function (t) {
            this.rwdData = t;
            if (this.rwdData && this.data) {
                facade.send(this.COOPERATE_DATA_UPDATE);
            }
        };

        t.prototype.onRank = function (t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(this.COOPERATE_RANK);
        };
        t.prototype.onMyTxRid = function (t) {
            this.myRank = t;
            facade.send(this.COOPERATE_MY_RANK);
        };

        //领取个人
        t.prototype.getRwd = function (index) {

            var e = new proto_cs.huodong.hd6270Rwd();
            e.client_slot = index + 1;

            var self = this;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();

                var curNeed = self.data.score_rwd[index].need;
                for (var score of self.rwdData.score_rwd_got) {
                    if (score === curNeed) {
                        return;
                    }
                }

                self.rwdData.score_rwd_got.push(curNeed);
                facade.send(self.COOPERATE_DATA_UPDATE);
            });
        };

        //同心锁领取
        t.prototype.getTxsRwd = function () {

            var e = new proto_cs.huodong.hd6270ServerRwd();
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        //领取合服

        t.prototype.getHfRwd = function () {

            var e = new proto_cs.huodong.hd6270CompensateRwd();
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };

        //查询
        t.prototype.sendOpenActivity = function () {

            JsonHttp.send(new proto_cs.huodong.hd6270Info());
        };

        //排行
        t.prototype.sendLookRank = function () {
            JsonHttp.send(new proto_cs.huodong.hd6270paihang());
        };

        return t;
    })();
o.CooperateProxy = r;