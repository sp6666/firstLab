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
            e.selectedImg = null;
            e.unSelectImg = null;
            e.selectedTxt = null;
            e.unSelectTxt = null;
            e.selectedArr = [];
            e.unSelectArr = [];
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectedImg.node.active = t;
                this.unSelectImg.node.active = !t;
                this.selectedTxt.node.active = t;
                this.unSelectTxt.node.active = !t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.selectedTxt.spriteFrame = this.selectedArr[t.type];
                this.unSelectTxt.spriteFrame = this.unSelectArr[t.type];
            }
        };
        __decorate([r(cc.Sprite)], e.prototype, "selectedImg", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "unSelectImg", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "selectedTxt", void 0);
        __decorate([r(cc.Sprite)], e.prototype, "unSelectTxt", void 0);
        __decorate([r([cc.SpriteFrame])], e.prototype, "selectedArr", void 0);
        __decorate([r([cc.SpriteFrame])], e.prototype, "unSelectArr", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
