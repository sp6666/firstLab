var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    init = require("../Initializer"),
    n = require("../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.setClose = false; //保证只执行一次关闭
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("CLOST_ITEM_SHOW", this.onClickClost, this);
            var t = this.node.openParam;
            null != t && (this.list.data = t);
        };
        e.prototype.lateUpdate = function(){
            if(init.kaixueProxy.onAutoPlay && !this.setClose){
                this.scheduleOnce(this.onClickClost, 0.6);
                this.setClose = true;
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            i.utils.popNext(!1);
        };
        __decorate([a(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
