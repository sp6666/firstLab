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
            e.lblName = null;
            e.lblContext = null;
            e.nodeLeft = null;
            e.nodeRight = null;
            e.lblName1 = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = "role" == t.say.trim();
                this.lblName1.string = this.lblName.string = e
                    ? i18n.t("STORY_SELF_TIP")
                    : t.say;
                this.nodeLeft.active = !e;
                this.nodeRight.active = e;
                this.lblName1.node.active = e;
                this.lblContext.string = n.playerProxy.getReplaceName(t.txt);
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeRight", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName1", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
