var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.isGuideID = !1;
            e.btn = null;
            e.nodeRed = null;
            return e;
        }
        Object.defineProperty(e.prototype, "data", {
            get: function() {
                return this._data;
            },
            set: function(t) {
                this._data = t;
                if (null != this._data) {
                    this.node.active = !0;
                    this.showData();
                    this.showItemData();
                } else this.node.active = !1;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.setGuideId = function() {};
        e.prototype.showItemData = function() {
            var t = this._data;
            if (t) {
                this.nodeRed && (this.nodeRed.active = t.isNew);
                this.isGuideID && this.setGuideId();
            }
        };
        __decorate([r], e.prototype, "isGuideID", void 0);
        __decorate([r(cc.Button)], e.prototype, "btn", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeRed", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
