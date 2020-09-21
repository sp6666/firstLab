var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.textLabel = null;
            e.urlload = null;
            e.text = "";
            e.url = "";
            e.textColor = null;
            e.endCall = null;
            return e;
        }
        e.prototype.onLoad = function() {
            if (null != this.textLabel) {
                this.textLabel.string = this.text;
                null != this.textColor &&
                    (this.textLabel.node.color = this.textColor);
            }
            this.urlload && (this.urlload.url = this.url);
        };
        e.prototype.onAlertEnd = function() {
            null != this.endCall && this.endCall.call();
            this.node.removeFromParent(!0);
            this.node.destroy();
        };
        __decorate([r(cc.Label)], e.prototype, "textLabel", void 0);
        __decorate([r(i.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
