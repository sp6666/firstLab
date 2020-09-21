var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.lblName = null;
            e.lblValue = null;
            e.txtNode = null;
            e.imgNode = null;
            e.urlRank = null;
            e.lblunrankNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = null == t.rid ? 0 : t.rid;
                this.lblunrankNode.active = e <= 0;
                this.imgNode.active = e <= 3 && e >= 1;
                this.txtNode.active = e > 3;
                this.lblRank.string = e.toString();
                this.lblValue.string = t.score ? t.score.toString() : "0";
                this.imgNode.active &&
                    (this.urlRank.url = l.uiHelps.getRankIcon(e));
                var o = parseInt(t.type),
                    i = r.loginProxy.getServer(t.serv);
                this.lblName.string =
                    1 == o ? (i ? i.name + " " : "") + t.name : i ? i.name : "";
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblValue", void 0);
        __decorate([c(cc.Node)], e.prototype, "txtNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "imgNode", void 0);
        __decorate([c(n.default)], e.prototype, "urlRank", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblunrankNode", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
