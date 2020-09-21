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
            this.KITE_WIND_BACK = "KITE_WIND_BACK";
            this.KITE_DATA_UPDATE = "KITE_DATA_UPDATE";
            this.KITE_OPEN_PAIHANG = "KITE_OPEN_PAIHANG";
            this.KITE_ITEM_UPDATA = "KITE_ITEM_UPDATA";
            this.KITE_MY_RID = "KITE_MY_RID";
            this.KITE_RANK = "KITE_RANK";
            this.KITE_ITEM_RED = "KITE_ITEM_RED";
            this.KITE_SELECT_HERO = "KITE_SELECT_HERO";
            this.dhShop = {};
            this.isFirst = !0;
            this.selectHeroId = 0;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.kite.info, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.kite.myRid, this.onMyRid, this);
            JsonHttp.subscribe(
                proto_sc.kite.exchange,
                this.onDhShop,
                this
            );
            JsonHttp.subscribe(proto_sc.kite.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.kite.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.kite.wind_type, this.onWindBack, this);
        };
        t.prototype.clearData = function () {
            this.data = null;
            this.rank = null;
            this.myRid = null;
            this.dhShop = {};
            this.isFirst = !0;
        };

        t.prototype.getKiteById = function (id) {
            if (this.data) {
                for (var kite of this.data.items) {
                    if (kite.id === id) {
                        return kite;
                    }
                }
            };
            return null;
        };

        t.prototype.onDataUpdate = function (t) {
            this.data = t;

            this.dhShop.hid = this.data ? this.data.info.id : 1;
            this.dhShop.stime = this.data ? this.data.info.showTime : 0;

            l.default.change("kite_reward", this.hasRed());
            facade.send(this.KITE_DATA_UPDATE);
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
            facade.send(this.KITE_MY_RID);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        };

        t.prototype.onWindBack = function (t) {
            if (!t) {
                return;
            }

            var windConfig = localcache.getItem(
                localdb.table_kiteWind,
                t.id
            );

            var str = i18n.t('KITE_WIND_HEIGHT_DES', {
                name: windConfig.name,
                num: t.num,
                n: t.height
            });
            if (t.durability !== 0) {
                str += ',' + i18n.t('KITE_WIND_HP_DES', {
                    n: t.durability
                });
            }
            n.alertUtil.alert(str);

            facade.send(this.KITE_WIND_BACK);
        };

        t.prototype.onDhShop = function (t) {
            this.dhShop.hid = this.data ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime = this.data ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.onRank = function (t) {
            this.rank = t;
            facade.send(this.KITE_RANK);
        };
        t.prototype.onGetResult = function (t) {
            this.result = t;
        };
        t.prototype.sendOpenInfo = function () {
            JsonHttp.send(new proto_cs.huodong.hd6805Info(), function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendRepair = function () {
            JsonHttp.send(new proto_cs.huodong.hd6805Repair());
        };
        t.prototype.sendLingQu = function (t, e) {
            var o = this,
                n = new proto_cs.huodong.hd6805Rwd();
            n.lv = t;
            JsonHttp.send(n, function () {
                i.timeProxy.floatReward();
                facade.send(o.KITE_OPEN_PAIHANG);
            });
        };
        t.prototype.sendWind = function (t) {
            var e = new proto_cs.huodong.hd6805Play();
            e.num = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendPaiHang = function (t) {
            void 0 === t && (t = 0);
            2 == t ?
                JsonHttp.send(
                    new proto_cs.huodong.hd6805rank(),
                    function () {
                        n.utils.openPrefabView("kite/KiteRwd");
                    }
                ) :
                3 == t &&
                JsonHttp.send(
                    new proto_cs.huodong.hd6805rank(),
                    function () {
                        n.utils.openPrefabView("kite/KiteLeiJi");
                    }
                );
        };
        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.data.total.length; e++)
                if (
                    this.data.kite_status.height >= this.data.total[e].need &&
                    0 == this.data.total[e].get
                ) {
                    t = !0;
                    break;
                }
            return t;
        };
        return t;
    })();
o.KiteProxy = r;