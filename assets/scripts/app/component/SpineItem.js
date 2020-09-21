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
            e.spine = null;
            e.shadow = null;
            e.aStr = "";
            e.skin = "";
            return e;
        }
        e.prototype.actionString = function(t) {
            if (this.aStr != t) {
                this.aStr = t;
                this.spine && (this.spine.animation = t);
                this.shadow && (this.shadow.animation = t);
            }
        };
        e.prototype.actionSkinString = function(t, e) {
            if (this.skin != t || this.aStr != e) {
                this.skin = t;
                this.aStr = e;
                if (this.spine) {
                    this.spine.animation = e;
                    this.spine.setSkin(t);
                }
                if (this.shadow) {
                    this.shadow.animation = e;
                    this.shadow.setSkin(t);
                }
            }
        };
        __decorate([l(sp.Skeleton)], e.prototype, "spine", void 0);
        __decorate([l(sp.Skeleton)], e.prototype, "shadow", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
