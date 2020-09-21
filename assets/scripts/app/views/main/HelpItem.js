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
            e.helpId = 0;
            return e;
        }
        e.prototype.onClickHelp = function() {
            0 != this.helpId && facade.send("GUIDE_HELP", this.helpId);
        };
        __decorate([l], e.prototype, "helpId", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
