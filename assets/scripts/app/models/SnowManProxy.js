var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: true
});
var i = require("../Initializer"),
    utils = require("../utils/Utils"),
    n = require("../component/RedDot"),
    l = (function () {
        function t() {
            this.data = null;
            this.records = null;
            this.shop = null;
            this.rank = null;
            this.myRank = null;

            this.SNOWMAN_DATA_UPDATE = "SNOWMAN_DATA_UPDATE";
            this.SNOWMAN_RECORDS_UPDATE = "SNOWMAN_RECORDS_UPDATE";
            this.SNOWMAN_MY_RANK = 'SNOWMAN_MY_RANK';
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(
                proto_sc.dxrhuodong.snowman,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.dxrhuodong.records,
                this.onRecords,
                this
            );

            JsonHttp.subscribe(proto_sc.dxrhuodong.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.dxrhuodong.exchange, this.onDhShop, this);

            JsonHttp.subscribe(proto_sc.duixueren.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.duixueren.myRank, this.onMyRank, this);

        };



        t.prototype.clearData = function () {
            this.data = null;
            this.records = null;
            this.shop = null;
            this.rank = null;
            this.myRank = null;
        };

        t.prototype.onRank = function (t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            facade.send(i.tangyuanProxy.TANG_YUAN_MY_RANK);
        };

        t.prototype.onMyRank = function (t) {
            this.myRank = t;
            n.default.change("snowmanLeiji", this.hasLeijiRed());
            facade.send(this.SNOWMAN_MY_RANK);
        };

        t.prototype.onDhShop = function (t) {

            var e = {
                rwd: []
            };
            e.hid = this.data ? this.data.info.type : 1;
            e.rwd = t;
            e.stime = this.data ? this.data.info.showTime : 0;
            this.dhShop = e;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };

        t.prototype.onShop = function (t) {
            this.shop = t;
        };

        t.prototype.onDataUpdate = function (t) {
            this.data = t;
            n.default.change("snowman", this.hasRed());
            facade.send(this.SNOWMAN_DATA_UPDATE);
            //这里去查询个人积分
            this.sendLookRank();
        };
        t.prototype.onRecords = function (t) {
            this.records = t;
            facade.send(this.SNOWMAN_RECORDS_UPDATE);
        };
        t.prototype.sendOpenSnowMan = function () {
            JsonHttp.send(new proto_cs.huodong.hd6183Info());
        };
        t.prototype.sendSnowManOnce = function () {
            JsonHttp.send(new proto_cs.huodong.hd6183Play(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendSnowManTen = function () {
            JsonHttp.send(new proto_cs.huodong.hd6183PlayTen(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetReward = function (t) {
            var e = new proto_cs.huodong.hd6183Rwd();
            e.lv = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };

        //排行
        t.prototype.sendLookRank = function () {
            JsonHttp.send(new proto_cs.huodong.hd6183paihang());
        };


        t.prototype.sendLjPaiHang = function () {
            JsonHttp.send(new proto_cs.huodong.hd6183paihang(), function () {
                utils.utils.openPrefabView("snowman/SnowManLeiJi");
            });
        };

        t.prototype.sendLingQu = function (t) {
            var e = this,
                o = new proto_cs.huodong.hd6183ScoreRwd();
            o.lv = t;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
                facade.send(e.SNOWMAN_DATA_UPDATE);
            });
        };



        //兑换商城
        t.prototype.sendExchange = function (call) {
            JsonHttp.send(new proto_cs.huodong.hd6183exchange(), call);
        };

        t.prototype.hasRed = function () {
            for (var t = false, e = 0; e < this.data.snowman_rwd.length; e++)
                if (
                    this.data.bossinfo.lv >= this.data.snowman_rwd[e].lv &&
                    0 == this.data.snowman_rwd[e].get
                ) {
                    t = true;
                    break;
                }
            return t;
        };
        t.prototype.hasLeijiRed = function () {
            if (!this.data || !this.data.total || !this.myRank || !this.myRank.score) {
                return false;
            }
            for (var t = false, e = 0; e < this.data.total.length; e++) {
                if (this.myRank.score >= this.data.total[e].need && !this.data.total[e].get) {
                    return true;
                }
            }
            return false;
        };



        return t;
    })();
o.SnowManProxy = l;