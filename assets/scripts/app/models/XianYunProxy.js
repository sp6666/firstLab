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
            this.base = null;
            this.deskCashList = null;
            this.deskInfoList = null;
            this.heroList = null;
            this.days = null;
            this.recall = null;
            this.XIAN_YUN_HERO_LIST = "XIAN_YUN_HERO_LIST";
            this.XIAN_YUN_DESK_INFO_LIST = "XIAN_YUN_DESK_INFO_LIST";
            this.XIAN_YUN_DESK_COUNT_UPDATE = "XIAN_YUN_DESK_COUNT_UPDATE";
            this.deskList = [];
            this.curSelectIndex = 0;
            this.curSelectHero = 0;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.banish.base, this.onBase, this);
            JsonHttp.subscribe(
                proto_sc.banish.deskCashList,
                this.onDeskCashList,
                this
            );
            JsonHttp.subscribe(proto_sc.banish.list, this.onDeskInfoList, this);
            JsonHttp.subscribe(proto_sc.banish.herolist, this.onHeroList, this);
            JsonHttp.subscribe(proto_sc.banish.days, this.onDays, this);
            JsonHttp.subscribe(proto_sc.banish.recall, this.onRecall, this);
            for (var t = 1; t < 21; t++) {
                var e = {
                    id: t
                };
                this.deskList.push(e);
            }
        };
        t.prototype.clearData = function() {
            this.base = null;
            this.deskCashList = null;
            this.deskInfoList = null;
            this.heroList = null;
            this.days = null;
            this.deskList = [];
            this.recall = null;
            this.curSelectHero = 0;
            this.curSelectIndex = 0;
        };
        t.prototype.onBase = function(t) {
            this.base = t;
            facade.send(this.XIAN_YUN_DESK_COUNT_UPDATE);
        };
        t.prototype.onDeskCashList = function(t) {
            this.deskCashList = t;
            facade.send(this.XIAN_YUN_DESK_INFO_LIST);
        };
        t.prototype.onDeskInfoList = function(t) {
            this.deskInfoList = t;
            if (t) {
                for (var e = !1, o = 0; o < t.length; o++)
                    if (t[o].cd.next <= n.timeUtil.second && 0 != t[o].hid) {
                        e = !0;
                        break;
                    }
                l.default.change("xianyun", e);
            }
            facade.send(this.XIAN_YUN_DESK_INFO_LIST);
        };
        t.prototype.onHeroList = function(t) {
            this.heroList = t;
            facade.send(this.XIAN_YUN_HERO_LIST);
        };
        t.prototype.onDays = function(t) {
            this.days = t;
        };
        t.prototype.onRecall = function(t) {
            this.recall = t;
        };
        t.prototype.sendOpenXianYun = function() {
            JsonHttp.send(new proto_cs.fapei.info(), function() {
                facade.send("XIAN_YUN_OPEN_END");
            });
        };
        t.prototype.sendAddDesk = function() {
            JsonHttp.send(new proto_cs.fapei.addDesk(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendFapei = function(t, e) {
            var o = new proto_cs.fapei.banish();
            o.hid = t;
            o.did = e;
            JsonHttp.send(o);
        };
        t.prototype.sendZhaohui = function(t, e) {
            var o = new proto_cs.fapei.recall();
            o.did = t;
            o.type = e;
            JsonHttp.send(o, function() {
                n.alertUtil.alert18n("XIAN_YUN_HUI_LAI");
            });
        };
        t.prototype.getDeskInfo = function(t) {
            if (this.deskInfoList)
                for (var e = 0; e < this.deskInfoList.length; e++)
                    if (this.deskInfoList[e].id == t)
                        return this.deskInfoList[e];
            return null;
        };
        t.prototype.getDeskPrice = function(t) {
            if (this.deskCashList)
                for (var e = 0; e < this.deskCashList.length; e++)
                    if (this.deskCashList[e].id == t)
                        return this.deskCashList[e];
            return null;
        };
        t.prototype.isXianYun = function(t) {
            if (null == this.heroList) return !1;
            for (var e = 0; e < this.heroList.length; e++)
                if (t == this.heroList[e].hid) return !0;
            return !1;
        };
        t.prototype.getDeskInfoByHid = function(t) {
            if (this.deskInfoList)
                for (var e = 0; e < this.deskInfoList.length; e++)
                    if (this.deskInfoList[e].hid == t)
                        return this.deskInfoList[e];
            return null;
        };
        return t;
    })();
o.XianYunProxy = r;
