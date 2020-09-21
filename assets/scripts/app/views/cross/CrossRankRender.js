var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.lblName = null;
            e.lblScore = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblRank.string = t.rid + "";
                this.lblScore.string = t.score ? t.score.toString() : "0";
                var e = parseInt(t.type),
                    o = n.loginProxy.getServer(t.serv);
                this.lblName.string =
                    1 == e
                        ? (o ? o.name + "\n" : "") + t.name
                        : o
                        ? o.name
                        : "";
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
