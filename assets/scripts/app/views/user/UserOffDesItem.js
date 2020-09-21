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
            e.lblDes = null;
            e.btnNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.lblDes.string = n.playerProxy.getOfficeDes(t);
                this.btnNode.interactable =
                    t.id <= n.playerProxy.userData.level;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnNode", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
