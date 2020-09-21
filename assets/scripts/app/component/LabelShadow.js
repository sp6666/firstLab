var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = cc._decorator.ccclass,
    n = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.targetLabel = null;
            e.shadowLabel = null;
            e._str = null;
            e._color = null;
            return e;
        }
        Object.defineProperty(e.prototype, "string", {
            get: function() {
                return this._str;
            },
            set: function(t) {
                this.targetLabel && (this.targetLabel.string = t);
                this.shadowLabel && (this.shadowLabel.string = t);
                this._str = t;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "color", {
            set: function(t) {
                this.shadowLabel
                    ? (this.shadowLabel.node.color = t)
                    : this.targetLabel && (this.targetLabel.node.color = t);
                this._color = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            if (this.node.parent.getComponent("LabelShadow")) this.destroy();
            else {
                if (null == this.targetLabel) {
                    this.targetLabel = this.node.getComponent(cc.Label);
                    if (null == this.targetLabel) return;
                }
                if (null == this.shadowLabel) {
                    var t = cc.instantiate(this.targetLabel.node);
                    this.shadowLabel = t.getComponent(cc.Label);
                    this.targetLabel.node.addChild(t);
                    t.x = -1;
                    t.y = 1;
                    this.targetLabel.node.color = cc.Color.WHITE.fromHEX(
                        "#8D2939"
                    );
                }
                null != this._str && (this.string = this._str);
                null != this._color && (this.color = this._color);
            }
        };
        return (e = __decorate([i], e));
    })(cc.Component);
o.default = n;
