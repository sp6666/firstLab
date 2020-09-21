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
            e.id = 0;
            return e;
        }
        __decorate(
            [
                l({
                    tooltip: "0代表起始点,对应填入寻访建筑物id"
                })
            ],
            e.prototype,
            "id",
            void 0
        );
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
