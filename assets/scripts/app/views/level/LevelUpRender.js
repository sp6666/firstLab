var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../models/TimeProxy"),
    init = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblDes = null;
            e.nodeBtn = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this.data;
            if (t) {
                this.lblTitle.string = t.title;
                this.lblDes.string = t.text;

            }
        };
        e.prototype.onClickGo = function () {
            var t = this.data;
            if (t) {
                if (t.charge) {

                    if (null == init.firstRechargeProxy.data ||
                        (2 != init.firstRechargeProxy.data.type &&
                            n.funUtils.isOpenFun(n.funUtils.firstRecharge))) {
                        n.funUtils.openView(n.funUtils.firstRecharge.id);
                    } else {
                        if (n.funUtils.isOpenFun(n.funUtils.purchase)) {
                            n.funUtils.openView(n.funUtils.purchase.id);
                        } else {
                            var e = localcache.getItem(localdb.table_iconOpen, n.funUtils.purchase.id);
                            if (e) l.alertUtil.alert(e.errmsg);
                        }
                    }
                } else {
                    n.funUtils.openView(t.iconopenid);
                }

                l.utils.closeNameView("stronger/LevelUpView");
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;