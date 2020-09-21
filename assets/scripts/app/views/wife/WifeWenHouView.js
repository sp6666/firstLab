var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeArr = [];
            e.roleUrl = null;
            e.content1 = null;
            e.content2 = null;
            e.kuang = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                var e = localcache.getItem(localdb.table_wife, t.wifeid),
                    o = t.type,
                    n = [];
                if (100 * Math.random() <= 50) o = e.type;
                else {
                    for (var a = 1; a < 5; a++) a != e.type && n.push(a + "");
                    o = parseInt(n[Math.floor(Math.random() * n.length)]);
                }
                Math.random();
                var s = "WIFE_WEN_HOU_TYPE_" + o + "_" + (0 == t.isgad ? 1 : 2);
                0 != t.isgad && i.alertUtil.alert18n("WIFE_IS_GAD");
                var c = i18n.t(s).split("|");
                this.content1.string = c[0];
                this.content2.string = c.length > 1 ? c[1] : "";
                for (a = 0; a < this.nodeArr.length; a++)
                    this.nodeArr[a].active = a == o - 1;
                this.roleUrl.url = l.uiHelps.getWifeBody(e.res);
                r.timeProxy.floatReward();
                i.alertUtil.alert(
                    i18n.t("WIFE_WEN_HOU_QIN_MI", {
                        name: e.wname2
                    })
                );
                this.kuang.height = c[0].length > 11 ? 570 : 450;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c([cc.Node])], e.prototype, "nodeArr", void 0);
        __decorate([c(n.default)], e.prototype, "roleUrl", void 0);
        __decorate([c(cc.Label)], e.prototype, "content1", void 0);
        __decorate([c(cc.Label)], e.prototype, "content2", void 0);
        __decorate([c(cc.Node)], e.prototype, "kuang", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
