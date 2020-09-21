var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function () {
    function t() {
        this.gift = null;
        this.MERGE_PURCHASE_DATA_UPDATA = "MERGE_PURCHASE_DATA_UPDATA";
        this.MERGE_PURCHASE_IS_BUY = "MERGE_PURCHASE_IS_BUY";
        this.limitBuy = !1;
        this._lastid = 0;
    }
    t.prototype.ctor = function () {
        JsonHttp.subscribe(proto_sc.mergezchuodong.mergeGift, this.onUpGift, this);
    };
    t.prototype.onUpGift = function (t) {
        this.gift = t;
        facade.send(this.MERGE_PURCHASE_DATA_UPDATA);
        this.limitBuy = !1;
    };
    t.prototype.setGiftNum = function (t, e) {
        t = 0 == t ? this._lastid : t;
        this._lastid = t;
        for (var o = 0; o < this.gift.length; o++)
            this.gift[o].id == t && (this.gift[o].limit += e);
        e > 0 && (this._lastid = 0);
        facade.send(this.MERGE_PURCHASE_DATA_UPDATA);
    };
    t.prototype.sendOpenPrince = function () {
        JsonHttp.send(new proto_cs.huodong.hd6273Info());
    };
    t.prototype.sendBuy = function () {
        if (0 != this._lastid) {
            var t = new proto_cs.huodong.hd6273buy();
            t.id = this._lastid;
            JsonHttp.send(t);
            this._lastid = 0;
        }
    };
    t.prototype.hasRed = function () {
        var t = !1,
            e = this.gift.length;
        if (this.gift)
            for (var o = 0; o < e; o++) this.gift[o].limit > 0 && (t = !0);
        return t;
    };
    return t;
})();
o.MergePurchaseProxy = i;