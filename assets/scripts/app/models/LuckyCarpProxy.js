var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function() {
    function t() {
        this.UPDATE_LUCKY_CARP = "UPDATE_LUCKY_CARP";
    }
    t.prototype.ctor = function() {
        JsonHttp.subscribe(proto_sc.luckyCharm.share, this.onShare, this);
    };
    t.prototype.clearData = function() {
        this.share = null;
    };
    t.prototype.onShare = function(t) {
        this.share = t;
        facade.send(this.UPDATE_LUCKY_CARP);
    };
    return t;
})();
o.LuckyCarpProxy = i;
