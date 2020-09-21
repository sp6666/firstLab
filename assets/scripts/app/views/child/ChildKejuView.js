var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/ChildSpine"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.childSpine = null;
            e.nameText = null;
            e.mother = null;
            e.total = null;
            e.wuli = null;
            e.zhili = null;
            e.zz = null;
            e.meili = null;
            e.lblSf = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.nameText.string = t.name;
                this.wuli.string = "" + t.ep.e1;
                this.zhili.string = "" + t.ep.e2;
                this.zz.string = "" + t.ep.e3;
                this.meili.string = "" + t.ep.e4;
                var e = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
                this.total.string = "" + e;
                this.childSpine.setKid(t.id, t.sex);
                var o = localcache.getItem(localdb.table_adult, t.honor);
                this.lblSf.string = o.name;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a(n.default)], e.prototype, "childSpine", void 0);
        __decorate([a(cc.Label)], e.prototype, "nameText", void 0);
        __decorate([a(cc.Label)], e.prototype, "mother", void 0);
        __decorate([a(cc.Label)], e.prototype, "total", void 0);
        __decorate([a(cc.Label)], e.prototype, "wuli", void 0);
        __decorate([a(cc.Label)], e.prototype, "zhili", void 0);
        __decorate([a(cc.Label)], e.prototype, "zz", void 0);
        __decorate([a(cc.Label)], e.prototype, "meili", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblSf", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
