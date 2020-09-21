var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("./BagProxy"),
    l = require("../utils/UIUtils"),
    r = require("../Config"),
    a = require("../component/RedDot"),
    s = (function() {
        function t() {
            this.data = null;
            this.trunRwd = null;
            this.records = null;
            this.allReward = null;
            this.GIRLS_DAY_DATA_UPDATE = "GIRLS_DAY_DATA_UPDATE";
            this.GIRLS_DAY_SHOW_EFF = "GIRLS_DAY_SHOW_EFF";
            this.GIRLS_DAY_TRUN_RWD = "GIRLS_DAY_TRUN_RWD";
            this.GIRLS_DAY_RECORDS = "GIRLS_DAY_RECORDS";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.girlsday.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.girlsday.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.girlsday.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.girlsday.records, this.onRecords, this);
            JsonHttp.subscribe(
                proto_sc.girlsday.allrwd,
                this.onAllReward,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.GIRLS_DAY_DATA_UPDATE);
        };
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.GIRLS_DAY_SHOW_EFF);
        };
        t.prototype.onRwd = function(t) {
            this.trunRwd = t;
            facade.send(this.GIRLS_DAY_TRUN_RWD);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.GIRLS_DAY_RECORDS);
        };
        t.prototype.onAllReward = function(t) {
            this.allReward = t;
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.trunRwd = null;
            this.records = null;
        };
        t.prototype.sendOpenGrilsDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6220Info());
        };
        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6220Rwd();
            e.num = t;
            JsonHttp.send(e, function() {
                facade.send("GIRLS_DAY_SHOW_RWD_END");
            });
        };
        t.prototype.getShowItem = function() {
            for (var t = null, e = 0; e < this.allReward.length; e++)
                if (this.allReward[e].kind == n.DataType.CLOTHE) {
                    var o = localcache.getItem(
                        localdb.table_userClothe,
                        this.allReward[e].id
                    );
                    if (
                        1 == o.part ||
                        2 == o.part ||
                        4 == o.part ||
                        6 == o.part
                    ) {
                        if (!i.playerProxy.isUnlockCloth(o.id)) return o;
                        null == t && (t = o);
                    }
                }
            return t;
        };
        t.prototype.getItemUrl = function(t) {
            return null == t
                ? ""
                : 1 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : 2 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : 4 == t.part
                ? l.uiHelps.getStoryBg(t.model)
                : 6 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : void 0;
        };
        t.prototype.updateItemNum = function() {
            if (this.data) {
                var t = i.bagProxy.getItemCount(this.data.need);
                a.default.change("girlsday_num", t > 0);
            }
        };
        return t;
    })();
o.GirlsDayProxy = s;
