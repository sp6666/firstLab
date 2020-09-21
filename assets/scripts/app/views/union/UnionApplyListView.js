var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.applyNum = null;
            e.toggle = null;
            e.nodeScroll = null;
            e.nodeTip = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.UPDATE_APPLY_LIST();
            facade.subscribe("UPDATE_APPLY_LIST", this.UPDATE_APPLY_LIST, this);
            !i.unionProxy.memberInfo ||
                (1 != i.unionProxy.memberInfo.post &&
                    2 != i.unionProxy.memberInfo.post) ||
                i.unionProxy.sendApplyList();
            this.toggle.isChecked = 1 == i.unionProxy.clubInfo.isJoin;
        };
        e.prototype.UPDATE_APPLY_LIST = function() {
            var t = i.unionProxy.applyList;
            this.nodeTip.active = null == t || 0 == t.length;
            this.nodeScroll.active = t && t.length > 0;
            this.list.data = t;
        };
        e.prototype.eventClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.eventCheck = function(t) {
            i.unionProxy.sendAllowRandomJoin(this.toggle.isChecked ? 1 : 0);
        };
        e.prototype.onekeyReject = function() {
            i.unionProxy.sendReject(0);
        };
        e.prototype.onClickAccept = function(t, e) {
            var o = e.data;
            o && i.unionProxy.sendApplyJoin(o.id);
        };
        e.prototype.onClickReject = function(t, e) {
            var o = e.data;
            o && i.unionProxy.sendReject(o.id);
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "applyNum", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "toggle", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeScroll", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeTip", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
