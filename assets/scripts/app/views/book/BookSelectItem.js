var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblExp = null;
            e.urlLoad = null;
            e.btnSelect = null;
            e.sp1 = null;
            e.sp2 = null;
            e.nodeEffect = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnSelect);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.id);
                this.lblName.string = e.name;
                this.lblExp.string = t.zzexp + "";
                this.urlLoad.url = l.uiHelps.getServantHead(t.id);
                this.sp1.url = l.uiHelps.getLangSp(e.spec[0]);
                this.sp2.node.active = e.spec.length > 1;
                this.sp2.node.active &&
                    (this.sp2.url = l.uiHelps.getLangSp(e.spec[1]));
                var o = r.timeUtil.getCurData();
                this.nodeEffect.active =
                    o > 4 ||
                    5 == e.spec[0] ||
                    6 == e.spec[0] ||
                    o == e.spec[0] ||
                    o == e.spec[1];
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([c(n.default)], e.prototype, "urlLoad", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnSelect", void 0);
        __decorate([c(n.default)], e.prototype, "sp1", void 0);
        __decorate([c(n.default)], e.prototype, "sp2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeEffect", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
