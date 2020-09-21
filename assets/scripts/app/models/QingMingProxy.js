var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = (function() {
        function t() {
            this.cfg = null;
            this.rollData = null;
            this.shop = null;
            this.records = null;
            this.ranks = null;
            this.myRid = null;
            this.pointArr = [
                {
                    id: 1011
                },
                {
                    id: 1012
                },
                {
                    id: 1013
                },
                {
                    id: 1014
                },
                {
                    id: 1015
                },
                {
                    id: 1016
                }
            ];
            this.vehicleIndex = 0;
            this.isFirst = !0;
            this.isSelf = !1;
            this.QING_MING_CFG_DATA = "QING_MING_CFG_DATA";
            this.QING_MING_ROLL_DATA = "QING_MING_ROLL_DATA";
            this.QING_MING_RECORDS = "QING_MING_RECORDS";
            this.QING_MING_RANKS = "QING_MING_RANKS";
            this.QING_MING_MY_RID = "QING_MING_MY_RID";
            this.QING_MING_MOVE_POINT = "QING_MING_MOVE_POINT";
            this.QING_MING_UPDATE_VEHICLE = "QING_MING_UPDATE_VEHICLE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.qingming.cfg, this.onCfg, this);
            JsonHttp.subscribe(proto_sc.qingming.act, this.onRollData, this);
            JsonHttp.subscribe(proto_sc.qingming.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.qingming.rwdLog, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.qingming.qmRank, this.onRanks, this);
            JsonHttp.subscribe(proto_sc.qingming.myQmRid, this.onMyRid, this);
        };
        t.prototype.clearData = function() {
            this.cfg = null;
            this.rollData = null;
            this.shop = null;
            this.records = null;
            this.ranks = null;
            this.myRid = null;
            this.vehicleIndex = 0;
            this.isFirst = !0;
        };
        t.prototype.onCfg = function(t) {
            this.cfg = t;
            facade.send(this.QING_MING_CFG_DATA);
        };
        t.prototype.onRollData = function(t) {
            this.rollData = t;
            facade.send(this.QING_MING_ROLL_DATA);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.QING_MING_RECORDS);
        };
        t.prototype.onRanks = function(t) {
            this.ranks = t;
            facade.send(this.QING_MING_RANKS);
        };
        t.prototype.onMyRid = function(t) {
            this.myRid = t;
            facade.send(this.QING_MING_MY_RID);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6222Info());
        };
        t.prototype.sendRoll = function(t, e) {
            var o = new proto_cs.huodong.hd6222play();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                i.utils.openPrefabView("qingming/QingMingRollResult");
            });
        };
        t.prototype.sendLookRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6222paihang());
        };
        t.prototype.sendBuy = function(t, e) {
            var o = new proto_cs.huodong.hd6222buy();
            o.id = t;
            JsonHttp.send(o);
        };
        return t;
    })();
o.QingMingProxy = n;
