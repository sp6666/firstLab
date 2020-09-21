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
            this.HEDENG_DATA_UPDATE = "HEDENG_DATA_UPDATE";
            this.HEDENG_OPEN_PAIHANG = "HEDENG_OPEN_PAIHANG";
            this.HEDENG_ITEM_UPDATA = "HEDENG_ITEM_UPDATA";
            this.HEDENG_MY_RID = "HEDENG_MY_RID";
            this.HEDENG_RANK = "HEDENG_RANK";
            this.HEDENG_ITEM_RED = "HEDENG_ITEM_RED";
            this.dhShop = {};
            this.isFirst = !0;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.fanghedeng.hedenginfo,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.fanghedeng.myfhdRid,
                this.onMyRid,
                this
            );
            JsonHttp.subscribe(
                proto_sc.fanghedeng.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.fanghedeng.fhdRank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.fanghedeng.shop, this.onShop, this);
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
            l.default.change("hedeng", this.hasRed());
            facade.send(this.HEDENG_DATA_UPDATE);
            facade.send(this.HEDENG_ITEM_RED);
        };
        t.prototype.onMyRid = function(t) {
            this.myRid = t;
            facade.send(this.HEDENG_MY_RID);
            facade.send(this.HEDENG_ITEM_RED);
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
            facade.send(this.HEDENG_RANK);
        };
        t.prototype.sendOpenHeDeng = function() {
            JsonHttp.send(new proto_cs.huodong.hd6234Info());
        };
        t.prototype.sendLingQu = function(t) {
            var e = this,
                o = new proto_cs.huodong.hd6234Rwd();
            o.lv = t;
            JsonHttp.send(o, function() {
                i.timeProxy.floatReward();
                facade.send(e.HEDENG_OPEN_PAIHANG);
            });
        };
        t.prototype.sendHeDengOnce = function() {
            JsonHttp.send(new proto_cs.huodong.hd6234Paly(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendHeDengTen = function() {
            JsonHttp.send(new proto_cs.huodong.hd6234PalyTen(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function(t) {
            void 0 === t && (t = 0);
            2 == t
                ? JsonHttp.send(
                      new proto_cs.huodong.hd6234paihang(),
                      function() {
                          n.utils.openPrefabView("hedeng/HeDengRwd");
                      }
                  )
                : 3 == t &&
                  JsonHttp.send(
                      new proto_cs.huodong.hd6234paihang(),
                      function() {
                          n.utils.openPrefabView("hedeng/HeDengLeiJi");
                      }
                  );
        };
        t.prototype.hasRed = function() {
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
o.HeDengProxy = r;
