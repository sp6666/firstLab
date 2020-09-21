var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.node_Doing = null;
            e.node_Fishing = null;
            e.nodeGet = null;
            e.nodeUnover = null;
            e.list = null;
            e.lblName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.node_Doing.active = 1 == t.state;
                this.nodeUnover.active = 0 == t.state;
                this.node_Fishing.active = 2 == t.state;
                this.nodeGet.active = 3 == t.state;
                this.lblName.string = i18n.t("MAIN_TASK_SHOW", {
                    id: t.id,
                    t: t.dAchieve.title,
                    c: t.dAchieve.num,
                    m: t.data.need
                });
                this.list.data = t.rwd;
            }
        };
        __decorate([a(cc.Node)], e.prototype, "node_Doing", void 0);
        __decorate([a(cc.Node)], e.prototype, "node_Fishing", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeGet", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeUnover", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
