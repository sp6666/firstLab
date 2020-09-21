var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../models/TimeProxy"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lbl = null;
            return e;
        }
        e.prototype.onClick = function() {
            var t = this._data;
            if (t) {
                n.funUtils.openView(t.id);
                facade.send("CLOSE_GUAN");
            }
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t)
                switch (t.id) {
                    case n.funUtils.jingyingView.id:
                        var e =
                            l.jingyingProxy.food.num +
                            l.jingyingProxy.army.num +
                            l.jingyingProxy.coin.num;
                        this.lbl.string = i18n.t("GUAN_JINGYING", {
                            c: e
                        });
                        break;

                    case n.funUtils.zhengwuView.id:
                        this.lbl.string = i18n.t("GUAN_ZHENGWU", {
                            c: l.jingyingProxy.exp.cd.num
                        });
                        break;

                    case n.funUtils.xunFangView.id:
                        this.lbl.string = i18n.t("GUAN_XUNFANG", {
                            c: l.lookProxy.xfinfo.num
                        });
                }
        };
        __decorate([s(cc.Label)], e.prototype, "lbl", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
