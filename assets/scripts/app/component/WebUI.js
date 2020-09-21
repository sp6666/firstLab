var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.errorLbl = null;
            e.webNode = null;
            e.webView = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            t && t.url && this.show(t.url);
        };
        e.prototype.show = function(t) {
            if (null == this.webView) {
                this.errorLbl.string = ".";
                this.webView = this.webNode.addComponent(cc.WebView);
                this.webView.url = t;
                var e = new cc.Component.EventHandler();
                e.target = this.node;
                e.component = "WebUI";
                e.handler = "onEvent";
                this.webView.webviewEvents.push(e);
            }
        };
        e.prototype.onEvent = function(t, e) {
            switch (e) {
                case cc.WebView.EventType.LOADING:
                    this.errorLbl.string = "..";
                    break;

                case cc.WebView.EventType.ERROR:
                    this.errorLbl.string = "....";
                    break;

                case cc.WebView.EventType.LOADED:
                    this.errorLbl.string = "...";
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([r(cc.Label)], e.prototype, "errorLbl", void 0);
        __decorate([r(cc.Node)], e.prototype, "webNode", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
