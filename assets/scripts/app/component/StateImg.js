var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = cc._decorator,
    n = i.ccclass,
    l = i.property,
    r = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.spaceX = 0;
            e._total = 0;
            e._value = 0;
            e._itemName = "";
            return e;
        }
        Object.defineProperty(e.prototype, "total", {
            get: function() {
                return this._total;
            },
            set: function(t) {
                this._total = t;
                this.updateShow();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "value", {
            get: function() {
                return this._value;
            },
            set: function(t) {
                this._value = t;
                this.updateShow();
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            this._itemName = this.item.name;
            this.item.name = this._itemName + "_0";
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            for (
                var t = this.node.childrenCount, e = this.node.children, o = 0;
                o < t;
                o++
            ) {
                (i = e[o]).active = o < this._total;
                i.children &&
                    i.childrenCount > 0 &&
                    (i.children[0].active = o < this.value);
                i.x = this.item.width * (o + 0.5) + this.spaceX * o;
            }
            if (t < this._total)
                for (o = 0; o < this._total; o++) {
                    var i = cc.instantiate(this.item);
                    this.node.addChild(i);
                    i.children &&
                        i.childrenCount > 0 &&
                        (i.children[0].active = o < this.value);
                    i.x = this.item.width * (o + 0.5) + this.spaceX * o;
                }
            this.node.width =
                this.item.width * this._total +
                this.spaceX * (this._total > 0 ? this._total - 1 : 0);
        };
        __decorate([l(cc.Node)], e.prototype, "item", void 0);
        __decorate([l], e.prototype, "spaceX", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
