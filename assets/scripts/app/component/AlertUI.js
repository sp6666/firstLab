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
            e.textLabel = null;
            e.lbl = null;
            e.text = "";
            e.textOpt = null;
            e.textColor = null;
            e.endCall = null;
            return e;
        }
        e.prototype.onLoad = function() {
            if (null != this.textLabel) {
                null == this.textOpt
                    ? (this.textLabel.string = this.text)
                    : (this.textLabel.string = i18n.t(this.text, this.textOpt));
                null != this.textColor &&
                    (this.textLabel.node.color = this.textColor);
                this.lbl.string = this.textLabel.string;
            }
        };
        e.prototype.onAlertEnd = function() {
            null != this.endCall && this.endCall.call();
            this.node.removeFromParent(!0);
            this.node.destroy();
        };
        __decorate([l(cc.Label)], e.prototype, "textLabel", void 0);
        __decorate([l(cc.Label)], e.prototype, "lbl", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
