var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.sonProxy.UPDATE_SON_SHOW_ERRECT,
                this.onClickClose,
                this
            );
            this.curData = this.node.openParam;
            if (this.curData) {
                this.list.data = l.sonProxy.getUnMarryBySex(
                    1 == this.curData.sex ? 2 : 1
                );
                l.sonProxy.tiQinObj.tUid = this.curData.fuid;
                l.sonProxy.tiQinObj.tSid = this.curData.sonuid;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
