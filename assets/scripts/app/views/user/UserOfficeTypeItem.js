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
            e.btn = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.btn.interactable = n.playerProxy.officeLvIsOver(t);
            }
        };
        e.prototype.onClick = function() {
            var t = this._data;
            t && facade.send("USER_CLICK_OFFICETYPE", t);
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;