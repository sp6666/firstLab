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
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.shop = null;
            this.NEW_YEAR_DATA_UPDATE = "NEW_YEAR_DATA_UPDATE";
            this.NEW_YEAR_OPEN_PAIHANG = "NEW_YEAR_OPEN_PAIHANG";
            this.NEW_YEAR_ITEM_UPDATA = "NEW_YEAR_ITEM_UPDATA";
            this.NEW_YEAR_MY_RID = "NEW_YEAR_MY_RID";
            this.NEW_YEAR_RANK = "NEW_YEAR_RANK";
            this.NEW_YEAR_ITEM_RED = "NEW_YEAR_ITEM_RED";
            this.dhShop = {};
            this.isFirst = !0;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(
                proto_sc.newyear.kongming,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.newyear.mykmdRid,
                this.onMyRid,
                this
            );
            JsonHttp.subscribe(
                proto_sc.newyear.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.newyear.kmdRank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.newyear.shop, this.onShop, this);
        };
        t.prototype.clearData = function () {
            this.data = null;
            this.rank = null;
            this.myRid = null;
            this.dhShop = {};
            this.isFirst = !0;
        };

        t.prototype.onDataUpdate = function (t) {
            this.data = t;
            l.default.change("newyear", this.hasRed());
            facade.send(this.NEW_YEAR_DATA_UPDATE);
            facade.send(this.NEW_YEAR_ITEM_RED);
        };
        t.prototype.onMyRid = function (t) {
            this.myRid = t;
            facade.send(this.NEW_YEAR_MY_RID);
            facade.send(this.NEW_YEAR_ITEM_RED);
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
            facade.send(this.NEW_YEAR_RANK);
        };
        t.prototype.sendOpenNewYear = function () {
            JsonHttp.send(new proto_cs.huodong.hd6283Info(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendLingQu = function (t) {
            var e = this,
                o = new proto_cs.huodong.hd6283Rwd();
            o.lv = t;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
                facade.send(e.NEW_YEAR_OPEN_PAIHANG);
            });
        };
        t.prototype.sendNewYearOnce = function () {
            JsonHttp.send(new proto_cs.huodong.hd6283Play(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendNewYearTen = function () {
            JsonHttp.send(new proto_cs.huodong.hd6283PlayTen(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function (t) {
            void 0 === t && (t = 0);
            2 == t ?
                JsonHttp.send(
                    new proto_cs.huodong.hd6283paihang(),
                    function () {
                        n.utils.openPrefabView("newyear/NewYearRwd");
                    }
                ) :
                3 == t &&
                JsonHttp.send(
                    new proto_cs.huodong.hd6283paihang(),
                    function () {
                        n.utils.openPrefabView("newyear/NewYearLeiJi");
                    }
                );
        };

        t.prototype.gotoActivityShopView = function () {

            JsonHttp.send(new proto_cs.huodong.hd6283Info(), function () {
                n.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    i.newYearProxy.dhShop
                );
            });
        };

        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.data.total.length; e++)
                if (
                    this.data.cons >= this.data.total[e].need &&
                    0 == this.data.total[e].get
                ) {
                    t = !0;
                    break;
                }
            return t;
        };
        return t;
    })();
o.NewYearProxy = r;