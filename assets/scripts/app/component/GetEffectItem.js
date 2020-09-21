var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urlLoad = null;
            return e;
        }
        o = e;
        Object.defineProperty(e.prototype, "url", {
            set: function(t) {
                this.urlLoad.url = t;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "des", {
            set: function(t) {
                var e = this;
                if (0 == o.count) {
                    var i = this.urlLoad.node.getComponent(cc.Animation);
                    i && (o.count = i.getClips().length);
                }
                var l = this;
                n.utils.showEffect(
                    this.urlLoad,
                    Math.floor(Math.random() * o.count),
                    function() {
                        e.node.runAction(
                            cc.sequence(
                                cc.delayTime(0.5),
                                cc.spawn(
                                    cc.moveTo(0.5, t),
                                    cc.fadeTo(0.5, 0),
                                    cc.scaleTo(0.5, 0)
                                ),
                                cc.callFunc(function() {
                                    l.node.removeFromParent(!0);
                                    l.node.destroy();
                                })
                            )
                        );
                    }
                );
            },
            enumerable: !0,
            configurable: !0
        });
        e.count = 0;
        __decorate([a(i.default)], e.prototype, "urlLoad", void 0);
        return (e = o = __decorate([r], e));
        var o;
    })(cc.Component);
o.default = s;
