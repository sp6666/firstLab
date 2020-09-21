var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../user/UserHeadItem"),
    l = require("../../Initializer"),
    r = require("../chenghao/ChengHaoItem"),
    a = require("../../Config"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLv = null;
            e.lblShili = null;
            e.btn = null;
            e.btnNo = null;
            e.head = null;
            e.chengHao = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btn &&
                this.btn.clickEvents &&
                this.btn.clickEvents.length > 0 &&
                (this.btn.clickEvents[0].customEventData = this);
            this.btnNo &&
                this.btnNo.clickEvents &&
                this.btnNo.clickEvents.length > 0 &&
                (this.btnNo.clickEvents[0].customEventData = this);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                if (
                    a.Config.isShowChengHao &&
                    s.funUtils.isOpenFun(s.funUtils.chenghao)
                ) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chenghao
                    );
                    this.chengHao.data = e;
                }
                this.lblName.string = t.name;
                this.lblShili.string = t.shili + "";
            }
        };
        e.prototype.onClickHead = function() {
            var t = this.data;
            l.playerProxy.sendGetOther(t.id);
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnNo", void 0);
        __decorate([d(n.default)], e.prototype, "head", void 0);
        __decorate([d(r.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
