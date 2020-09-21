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
            e.lblName1 = null;
            e.lblShengFen1 = null;
            e.lblShuXing1 = null;
            e.lblTime = null;
            e.lblName2 = null;
            e.lblShengFen2 = null;
            e.lblShuXing2 = null;
            e.lblQinjia = null;
            e.selectImg = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectImg.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName1.string = t.name;
                this.lblName2.string = t.spouse.sname;
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblName1", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblShengFen1", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblShuXing1", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblName2", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblShengFen2", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblShuXing2", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblQinjia", void 0);
        __decorate([r(cc.Node)], e.prototype, "selectImg", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
