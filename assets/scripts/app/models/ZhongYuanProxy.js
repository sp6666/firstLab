var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.ZHONGYUAN_DATA_UPDATE = "ZHONGYUAN_DATA_UPDATE";
            this.ZHONGYUAN_MY_RID = "ZHONGYUAN_MY_RID";
            this.ZHONGYUAN_OPEN_PAIHANG = "ZHONGYUAN_OPEN_PAIHANG";
            this.ZHONGYUAN_ITEM_LINQU = "ZHONGYUAN_ITEM_LINQU";
            this.SCARIFICE_DATA_UPDAT = "SCARIFICE_DATA_UPDAT";
            this.SCARIFICE_DATA_RECORDS = "SCARIFICE_DATA_RECORDS";
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.records = null;
            this.shop = null;
            this.win = null;
            this.dhShop = {};
            this.isTrun = !1;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.zhongyuan.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(
                proto_sc.zhongyuan.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.zhongyuan.myZyRid, this.onMyRid, this);
            JsonHttp.subscribe(proto_sc.zhongyuan.zyRank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.zhongyuan.rwdLog, this.onRwdLog, this);
            JsonHttp.subscribe(proto_sc.zhongyuan.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.zhongyuan.win, this.onWin, this);
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.records = null;
            this.shop = null;
            this.dhShop = {};
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.ZHONGYUAN_DATA_UPDATE);
            facade.send(this.SCARIFICE_DATA_UPDAT);
        };
        t.prototype.onDhShop = function(t) {
            this.dhShop.hid = this.data ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime = this.data ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.onMyRid = function(t) {
            this.myRid = t;
            facade.send(this.ZHONGYUAN_MY_RID);
        };
        t.prototype.onRank = function(t) {
            this.rank = t;
            facade.send(this.ZHONGYUAN_OPEN_PAIHANG);
        };
        t.prototype.onRwdLog = function(t) {
            this.records = t;
            facade.send(this.SCARIFICE_DATA_RECORDS);
        };
        t.prototype.onWin = function(t) {
            this.win = t;
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        t.prototype.sendInfo = function() {
            JsonHttp.send(new proto_cs.huodong.hd6244Info());
        };
        t.prototype.sendPlay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6244Paly());
        };
        t.prototype.sendGive = function(t, e) {
            var o = new proto_cs.huodong.hd6244Give();
            o.fuid = t;
            o.itemId = e;
            JsonHttp.send(o);
        };
        t.prototype.sendRwd = function() {
            JsonHttp.send(new proto_cs.huodong.hd6244Rwd(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuy = function(t, e) {
            var o = new proto_cs.huodong.hd6244buy();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendExchange = function(t) {
            var e = new proto_cs.huodong.hd6244exchange();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function() {
            JsonHttp.send(new proto_cs.huodong.hd6244Paihang(), function() {
                n.utils.openPrefabView("zhongyuan/ZhongYuanRankRwd");
            });
        };
        t.prototype.isEnough = function() {
            if (this.data)
                for (var t = !0, e = 0; e < this.data.debris.length; e++)
                    if (
                        null == this.data.debris[e].num ||
                        0 == this.data.debris[e].num
                    ) {
                        t = !1;
                        break;
                    }
            return t;
        };
        return t;
    })();
o.ZhongYuanProxy = l;
