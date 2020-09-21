var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = require("../../component/UrlLoad"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.records = null;
            e.scroll = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.xiXiangProxy.XIXIANG_DAY_RECORDS,
                this.onRecords,
                this
            );

            this.onRecords();
        };

        e.prototype.onRecords = function () {
            var records = [].concat(l.xiXiangProxy.records);
            records.reverse();
            this.records.data = records;
            this.scroll.scrollToTop();
        };

        __decorate([d(n.default)], e.prototype, "records", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "scroll", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;