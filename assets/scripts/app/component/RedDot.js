var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = cc._decorator,
    n = i.ccclass,
    l = i.property,
    r = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.binding = [];
            e.sprite = null;
            e._isOnLoad = !1;
            return e;
        }
        o = e;
        e.prototype.onLoad = function () {
            this._isOnLoad = !0;
            facade.subscribe("RED_DOT", this.updateData, this);
            this.updateData(null);
        };
        e.prototype.addBinding = function (t) {
            if (null != t) {
                for (var e = 0; e < t.length; e++) this.binding.push(t[e]);
                this._isOnLoad && this.updateData(null);
            }
        };
        e.prototype.updateData = function (t) {
            if (0 != this.binding.length) {
                var e = this.binding;
                if (null == t || -1 != e.indexOf(t)) {
                    for (var i = e.length, n = 0; n < i; n++)
                        if (o._MAP[e[n].toString()]) {
                            this.node.active = !0;
                            this.sprite && (this.sprite.node.active = !1);
                            return;
                        }
                    this.node.active = !1;
                    this.sprite && (this.sprite.node.active = !0);
                }
            } else this.node.active = !1;
        };
        e.change = function (t, e) {
            if (o._MAP[t] != e) {
                o._MAP[t] = e;
                facade.send("RED_DOT", t);
            }
        };
        e.clearData = function () {
            o._MAP = {};
        };
        e._MAP = {};
        __decorate([l([cc.String])], e.prototype, "binding", void 0);
        __decorate([l(cc.Sprite)], e.prototype, "sprite", void 0);
        return (e = o = __decorate([n], e));
        var o;
    })(cc.Component);
o.default = r;