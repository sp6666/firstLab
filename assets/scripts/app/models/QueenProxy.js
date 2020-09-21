var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    k = (function () {
        function t() {
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.shop = null;
            this.rwdList = null;
            this.QUEEN_DATA_UPDATE = "QUEEN_DATA_UPDATE";
            this.QUEEN_OPEN_PAIHANG = "QUEEN_OPEN_PAIHANG";
            this.QUEEN_PLAY_UPDATE = "QUEEN_PLAY_UPDATE";
            this.QUEEN_MY_RID = "QUEEN_MY_RID";
            this.QUEEN_RANK = "QUEEN_RANK";
            this.QUEEN_ITEM_RED = "QUEEN_ITEM_RED";
            this.dhShop = {};

            this.tableNum = 10;
            this.tableAngle = 360 / this.tableNum;
        }



        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.queen.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.queen.rank, this.onRank, this);
            JsonHttp.subscribe(
                proto_sc.queen.info,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.queen.myRid,
                this.onMyRid,
                this
            );
            JsonHttp.subscribe(
                proto_sc.queen.exchange,
                this.onDhShop,
                this
            );
        };
        t.prototype.clearData = function () {
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.shop = null;
            this.rwdList = null;
            this.dhShop = {};
        };
        t.prototype.onDataUpdate = function (t) {
            this.data = t;



            if (!this.rwdList) {
                this.rwdList = new Array(0);
                for (var items of t.items) {
                    for (var item of items.item_rwd) {
                        var bOwned = false;
                        for (var rwd of this.rwdList) {
                            if (rwd.id === item.id) {
                                bOwned = true;
                                break;
                            }
                        }
                        if (!bOwned) {
                            var newItem = {
                                id: 0,
                                count: 1
                            };
                            newItem.id = item.id;
                            this.rwdList.push(newItem);
                        }
                    }
                }

                var sortHuoDong = function (t, e) {
                    return t.id - e.id;
                };

                this.rwdList.sort(sortHuoDong);
            }

            var log = this.data.queen_status.rwd_log;
            if (log) {
                log.reverse();
            }

            facade.send(this.QUEEN_DATA_UPDATE, t);
            l.default.change("queen_reward", this.hasRed());
            facade.send(this.QUEEN_ITEM_RED);
        };

        t.prototype.onMyRid = function (t) {
            this.myRid = t;
            facade.send(this.QUEEN_MY_RID);
            facade.send(this.QUEEN_ITEM_RED);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        };
        t.prototype.onDhShop = function (t) {
            this.dhShop.hid = this.data ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime = this.data ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.onRank = function (t) {
            this.rank = t;
            facade.send(this.QUEEN_RANK);
        };
        t.prototype.sendOpen = function () {
            JsonHttp.send(new proto_cs.huodong.hd6806Info(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendLingQu = function (t) {
            var e = this,
                o = new proto_cs.huodong.hd6806Rwd();
            o.lv = t;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
                facade.send(e.QUEEN_OPEN_PAIHANG);
            });
        };
        t.prototype.sendBtnDraw = function (t) {

            var e = new proto_cs.huodong.hd6806Play();
            e.num = t;
            JsonHttp.send(e);
        };

        t.prototype.sendRank = function (t) {
            void 0 === t && (t = 0);
            2 == t ?
                JsonHttp.send(
                    new proto_cs.huodong.hd6806Rank(),
                    function () {
                        n.utils.openPrefabView("queen/QueenRwd");
                    }
                ) :
                3 == t &&
                JsonHttp.send(
                    new proto_cs.huodong.hd6806Rank(),
                    function () {
                        n.utils.openPrefabView("queen/QueenLeiJi");
                    }
                );
        };

        t.prototype.gotoActivityShopView = function () {

            JsonHttp.send(new proto_cs.huodong.hd6806Info(), function () {
                n.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    i.queenProxy.dhShop
                );
            });
        };

        t.prototype.hasRed = function () {

            var selfCons = this.data.queen_status.counts;
            for (var t = !1, e = 0; e < this.data.total.length; e++) {
                if (
                    selfCons >= this.data.total[e].need &&
                    0 == this.data.total[e].get
                ) {
                    t = !0;
                    break;
                }
            }
            return t;
        };
        return t;
    })();
o.QueenProxy = k;