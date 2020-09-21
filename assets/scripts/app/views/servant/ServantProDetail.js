var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblPro = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                for (
                    var e = t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4,
                        o = [],
                        i = 1;
                    i < 5;
                    i++
                ) {
                    var n = {};
                    n.type = i;
                    n.pro = t.aep["e" + i];
                    n.zzAdd = t.zep["e" + i];
                    n.wifeAdd = t.wep["e" + i];
                    n.dan = t.hep["e" + i];
                    n.jiBan = t.jep ? t.jep["e" + i] : 0;
                    n.clothe = t.cep ? t.cep["e" + i] : 0;
                    n.lep = t.lep ? t.lep["e" + i] : 0;
                    n.yep = t.yep ? t.yep["e" + i] : 0;
                    n.sep = t.sep ? t.sep["e" + i] : 0;
                    n.tep = t.tep ? t.tep["e" + i] : 0;
                    n.csep = t.csep ? t.csep["e" + i] : 0;
                    o.push(n);
                }
                this.lblPro.string = i18n.t("SERVANT_ZONG_HE_SHU_XING", {
                    num: e
                });
                this.list.data = o;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
