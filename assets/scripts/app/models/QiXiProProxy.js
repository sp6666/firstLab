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
            this.result = null;
            this.QIXI_PRO_DATA_UPDATE = "QIXI_PRO_DATA_UPDATE";
            this.QIXI_PRO_OPEN_PAIHANG = "QIXI_PRO_OPEN_PAIHANG";
            this.QIXI_PRO_ITEM_UPDATA = "QIXI_PRO_ITEM_UPDATA";
            this.QIXI_PRO_MY_RID = "QIXI_PRO_MY_RID";
            this.QIXI_PRO_RANK = "QIXI_PRO_RANK";
            this.QIXI_PRO_ITEM_RED = "QIXI_PRO_ITEM_RED";
            this.QIXI_PRO_SELECT_HERO = "QIXI_PRO_SELECT_HERO";
            this.dhShop = {};
            this.isFirst = !0;
            this.selectHeroId = 0;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.affection.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.affection.myQxRid, this.onMyRid, this);
            JsonHttp.subscribe(
                proto_sc.affection.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.affection.qxRank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.affection.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.affection.act, this.onGetResult, this);
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
            l.default.change("qixi_pro_rwd", this.hasRed());
            facade.send(this.QIXI_PRO_DATA_UPDATE);
        };
        t.prototype.getHeroRwd = function (t) {
            if (null == this.data) return null;
            if (null == this.data.rwds) return null;
            for (var e = 0; e < this.data.rwds.length; e++) {
                var o = this.data.rwds[e];
                if (o.hid == t) return o;
            }
            return null;
        };
        t.prototype.onMyRid = function (t) {
            this.myRid = t;
            facade.send(this.QIXI_PRO_MY_RID);
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
            facade.send(this.QIXI_PRO_RANK);
        };
        t.prototype.onGetResult = function (t) {
            this.result = t;
        };
        t.prototype.sendOpenQIXI = function () {
            JsonHttp.send(new proto_cs.huodong.hd6285Info(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendLingQu = function (t, e) {
            var o = this,
                n = new proto_cs.huodong.hd6285Rwd();
            n.id = t;
            n.hid = e;
            JsonHttp.send(n, function () {
                i.timeProxy.floatReward();
                facade.send(o.QIXI_PRO_OPEN_PAIHANG);
            });
        };
        t.prototype.sendQIXI = function (t) {
            var e = new proto_cs.huodong.hd6285Paly();
            e.num = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function (t) {
            void 0 === t && (t = 0);
            2 == t ?
                JsonHttp.send(
                    new proto_cs.huodong.hd6285paihang(),
                    function () {
                        n.utils.openPrefabView("qixiPro/QiXiProRwd");
                    }
                ) :
                3 == t &&
                JsonHttp.send(
                    new proto_cs.huodong.hd6285paihang(),
                    function () {
                        n.utils.openPrefabView("qixiPro/QiXiProLeiJi");
                    }
                );
        };
        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.data.rwds.length; e++)
                for (var o = 0; o < this.data.rwds[e].rwd.length; o++)
                    if (
                        this.data.rwds[e].cons >=
                        this.data.rwds[e].rwd[o].need &&
                        0 == this.data.rwds[e].rwd[o].get
                    ) {
                        t = !0;
                        break;
                    }
            return t;
        };
        return t;
    })();
o.QiXiProProxy = r;