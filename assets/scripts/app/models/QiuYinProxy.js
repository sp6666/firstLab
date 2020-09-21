var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.data = null;
            this.myRid = null;
            this.rank = null;
            this.shop = null;
            this.result = null;
            this.QIUYIN_DATA_UPDATE = "QIUYIN_DATA_UPDATE";
            this.QIUYIN_OPEN_PAIHANG = "QIUYIN_OPEN_PAIHANG";
            this.QIUYIN_ITEM_UPDATA = "QIUYIN_ITEM_UPDATA";
            this.QIUYIN_MY_RID = "QIUYIN_MY_RID";
            this.QIUYIN_RANK = "QIUYIN_RANK";
            this.QIUYIN_ITEM_RED = "QIUYIN_ITEM_RED";
            this.QIUYIN_SELECT_HERO = "QIUYIN_SELECT_HERO";
            this.dhShop = {};
            this.isFirst = !0;
            this.selectHeroId = 0;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.qiuyin.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.qiuyin.myQxRid, this.onMyRid, this);
            JsonHttp.subscribe(
                proto_sc.qiuyin.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.qiuyin.qxRank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.qiuyin.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.qiuyin.act, this.onGetResult, this);
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.rank = null;
            this.myRid = null;
            this.dhShop = {};
            this.isFirst = !0;
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            l.default.change("qiuyin_rwd", this.hasRed());
            facade.send(this.QIUYIN_DATA_UPDATE);
        };
        t.prototype.getHeroRwd = function(t) {
            if (null == this.data) return null;
            if (null == this.data.rwds) return null;
            for (var e = 0; e < this.data.rwds.length; e++) {
                var o = this.data.rwds[e];
                if (o.hid == t) return o;
            }
            return null;
        };
        t.prototype.onMyRid = function(t) {
            this.myRid = t;
            facade.send(this.QIUYIN_MY_RID);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        t.prototype.onDhShop = function(t) {
            this.dhShop.hid = this.data ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime = this.data ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.onRank = function(t) {
            this.rank = t;
            facade.send(this.QIUYIN_RANK);
        };
        t.prototype.onGetResult = function(t) {
            this.result = t;
        };
        t.prototype.sendOpenQIUYI = function() {
            JsonHttp.send(new proto_cs.huodong.hd6253Info());
        };
        t.prototype.sendLingQu = function(t, e) {
            var o = this,
                n = new proto_cs.huodong.hd6253Rwd();
            n.id = t;
            n.hid = e;
            JsonHttp.send(n, function() {
                i.timeProxy.floatReward();
                facade.send(o.QIUYI_OPEN_PAIHANG);
            });
        };
        t.prototype.sendQIUYI = function(t) {
            var e = new proto_cs.huodong.hd6253Paly();
            e.num = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function(t) {
            void 0 === t && (t = 0);
            2 == t
                ? JsonHttp.send(
                      new proto_cs.huodong.hd6253paihang(),
                      function() {
                          n.utils.openPrefabView("qiuyin/QiuYinRwd");
                      }
                  )
                : 3 == t &&
                  JsonHttp.send(
                      new proto_cs.huodong.hd6253paihang(),
                      function() {
                          n.utils.openPrefabView("qiuyin/QiuYinLeiJi");
                      }
                  );
        };
        t.prototype.hasRed = function() {
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
o.QiuYinProxy = r;
