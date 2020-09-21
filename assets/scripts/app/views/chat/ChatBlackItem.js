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
            e.lblName = null;
            e.lblPower = null;
            e.lblLevel = null;
            e.imgHead = null;
            e.role1 = null;
            e.btnDel = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btnDel &&
                this.btnDel.clickEvents &&
                this.btnDel.clickEvents.length > 0 &&
                (this.btnDel.clickEvents[0].customEventData = this);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.lblPower.string = t.shili + "";
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblPower", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "imgHead", void 0);
        __decorate([r(cc.SpriteAtlas)], e.prototype, "role1", void 0);
        __decorate([r(cc.Button)], e.prototype, "btnDel", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
