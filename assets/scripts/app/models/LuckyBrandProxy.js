var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = (function() {
        function t() {
            this.data = null;
            this.records = null;
            this.isWaiting = !1;
            this.playList = [];
            this.rwdList = [];

            this.LUCKY_BRAND_DATA_UPDATE = "LUCKY_BRAND_DATA_UPDATE";
            this.LUCKY_BRAND_RECORD_UPDATE = "LUCKY_BRAND_RECORD_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.fphuodong.flop, this.dataUpdate, this);
            JsonHttp.subscribe(
                proto_sc.fphuodong.records,
                this.onRecords,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.records = null;
            this.isWaiting = !1;
            this.playList = [];
            this.rwdList = [];
        };
        t.prototype.dataUpdate = function(t) {
            this.data = t;
            t.show && (this.data.draw = t.show);

            this.rwdList = [];
            if(this.data && this.data.cfg && this.data.cfg.rwd){
                for(var i = 0;i<this.data.cfg.rwd.length;++i){
                    var item = this.data.cfg.rwd[i];
                     this.rwdList.push(item.items);
                }
            }

            facade.send(this.LUCKY_BRAND_DATA_UPDATE);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.LUCKY_BRAND_RECORD_UPDATE);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6188Info());
        };
        t.prototype.sendGetRewad = function(t) {
            var e = new proto_cs.huodong.hd6188Rwd();
            e.id = t;
            if (this.isWaiting) i.alertUtil.alert18n("LUCKY_BRAND_WAITING");
            else {
                this.isWaiting = !0;
                var o = this;
                JsonHttp.send(e, function() {
                    o.isWaiting = !1;
                });
            }
        };
        t.prototype.sendGetRecord = function() {
            JsonHttp.send(new proto_cs.huodong.hd6188Journal());
        };
        t.prototype.getIndexData = function(t) {
            for (var e = null, o = 0; o < this.data.draw.length; o++)
                if (t == this.data.draw[o].did) {
                    e = this.data.draw[o];
                    break;
                }
            return e;
        };
        t.prototype.getLeftCount = function() {
            return null == this.data
                ? 0
                : null == this.data.getNum
                ? 0
                : 0 == this.data.getNum
                ? 0
                : this.data.getNum - this.getCount();
        };
        t.prototype.getCount = function() {
            return this.data ? this.data.flopNum : 0;
        };
        t.prototype.isPalyed = function(t) {
            for (var e = 0; e < this.playList.length; e++)
                if (t.did == this.playList[e].did) return !0;
            return !1;
        };
        return t;
    })();
o.LuckyBrandProxy = n;
