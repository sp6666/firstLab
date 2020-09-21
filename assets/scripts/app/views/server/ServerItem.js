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
            e.stateImg = null;
            e.sImgs = [];
            e.nodeNew = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblName.string = t.name;
                this.nodeNew && (this.nodeNew.active = 5 == t.state);
                this.stateImg.spriteFrame = this.sImgs[t.state - 1];
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "stateImg", void 0);
        __decorate([r([cc.SpriteFrame])], e.prototype, "sImgs", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeNew", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
