var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list1 = null;
            e.list2 = null;
            e.title = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.list1.data = r.palaceProxy.list;
            var t = this;
            this.list1.selectHandle = function(e) {
                t.showList(e);
            };
        };
        e.prototype.showList = function(t) {
            t.key;
            var e = t.data;
            e && (this.list2.data = e);
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "list1", void 0);
        __decorate([c(i.default)], e.prototype, "list2", void 0);
        __decorate([c(n.default)], e.prototype, "title", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
