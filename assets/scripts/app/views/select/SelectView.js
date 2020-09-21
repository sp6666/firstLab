var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = (n.property,
    (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.curData = this.node.openParam;
        };
        e.prototype.onClickZhaoQin = function() {
            this.curData &&
                i.utils.openPrefabView(
                    "marry/MarryGetView",
                    null,
                    this.curData
                );
            this.onClickClose();
        };
        e.prototype.onClickTiQin = function() {
            this.curData &&
                i.utils.openPrefabView(
                    "marry/BringUpMarryView",
                    null,
                    this.curData
                );
            this.onClickClose();
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        return (e = __decorate([l], e));
    })(cc.Component));
o.default = r;
