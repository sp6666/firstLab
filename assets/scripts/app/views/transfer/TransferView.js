var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.unionWeath = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.UPDATE_SEARCH_INFO();
            facade.subscribe(
                "UPDATE_SEARCH_INFO",
                this.UPDATE_SEARCH_INFO,
                this
            );
            facade.subscribe("UPDATE_TRANS_LIST", this.UPDATE_TRANS_LIST, this);
            l.unionProxy.sendTranList();
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickTran = function(t, e) {
            var o = e.data;
            if (o) {
                l.unionProxy.dialogParam = {
                    type: "tran",
                    id: o.id
                };
                l.unionProxy.sendTran("", o.id);
                n.utils.closeView(this);
            }
        };
        e.prototype.UPDATE_SEARCH_INFO = function() {
            this.unionWeath.string = l.unionProxy.clubInfo.fund + "";
            this.UPDATE_TRANS_LIST();
        };
        e.prototype.UPDATE_TRANS_LIST = function() {
            this.list.data = l.unionProxy.transList;
        };
        __decorate([s(cc.Label)], e.prototype, "unionWeath", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
