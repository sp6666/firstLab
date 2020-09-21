var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblrank = null;
            e.lblname = null;
            e.lblscore = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblrank.string = t.rid + "";
                this.lblname.string = t.name;
                this.lblscore.string = t.score + "";
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblrank", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblscore", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
