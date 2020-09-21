var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../models/JieqiProxy"),
    a = require("../../models/BagProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.time = [];
            e.day = [];
            e.msg = null;
            e.lblNode = [];
            e.timeBtn = [];
            e.dayBtn = [];
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.purchaseProxy.PURCHASE_DATA_UPDATA,
                this.onShowData,
                this
            );
            facade.subscribe(
                n.jieqiProxy.UPDATE_JIEQI_PURCASE,
                this.onShowData,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onclickClose, this);
            n.jieqiProxy.senOpenJieqi();
            n.purchaseProxy.sendOpenPrince();
        };
        e.prototype.onShowData = function() {
            var t = n.jieqiProxy.info,
                e = n.jieqiProxy.purcase,
                o = n.purchaseProxy.gift;
            if (t && e && o) {
                this.msg.string = t.msg;
                for (var i = [], s = 0; s < e.length; s++) i.push(e[s]);
                for (s = 0; s < n.purchaseProxy.gift.length; s++) {
                    var c = o[s];
                    if (6211 == c.type) {
                        var _ = new r.purchaseBuyInfo();
                        _.id = s;
                        _.icon =
                            c.items[0].kind == a.DataType.CLOTHE
                                ? c.items[0].id
                                : c.icon;
                        _.name = c.name;
                        _.type = 2;
                        _.present = c.present;
                        _.prime = c.prime;
                        _.grade = c.grade;
                        _.sign = c.sign;
                        _.limit = c.limit;
                        _.islimit = c.islimit;
                        _.isclothe = c.items[0].kind == a.DataType.CLOTHE;
                        i.push(_);
                    }
                }
                i.sort(function(t, e) {
                    var o = t.limit > 0 ? 0 : 1,
                        i = e.limit > 0 ? 0 : 1;
                    return o != i
                        ? o - i
                        : t.type != e.type
                        ? t.type - e.type
                        : t.id - e.id;
                });
                this.list.data = i;
                for (var d = 0; d < this.time.length; d++) {
                    for (
                        var u = l.timeUtil.format(
                                t.info.sTime + 86400 * d,
                                "MM-dd"
                            ),
                            p = l.timeUtil.format(
                                t.info.sTime + 86400 * (d + 1),
                                "MM-dd"
                            ),
                            h = u.split("-"),
                            y = p.split("-"),
                            f = [],
                            I = 0;
                        I < h.length;
                        I++
                    )
                        f.push(parseInt(h[I]));
                    for (var m = [], b = 0; b < y.length; b++)
                        m.push(parseInt(y[b]));
                    var g = i18n.t("TIME_MONTH_DAY", {
                        month: f[0],
                        day: f[1]
                    });
                    i18n.t("TIME_MONTH_DAY", {
                        month: m[0],
                        day: m[1]
                    });
                    this.time[d].string = g;
                }
                for (var v = 0; v < this.day.length; v++) {
                    this.day[v].string = i18n.t("JIE_QI_DAY", {
                        day: l.utils.getHanzi(v + 1)
                    });
                    this.lblNode[v].active = v == t.count - 1;
                    this.timeBtn[v].interactable = v == t.count - 1;
                    this.dayBtn[v].interactable = v == t.count - 1;
                }
            }
        };
        e.prototype.onclickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([_([cc.Label])], e.prototype, "time", void 0);
        __decorate([_([cc.Label])], e.prototype, "day", void 0);
        __decorate([_(cc.Label)], e.prototype, "msg", void 0);
        __decorate([_([cc.Node])], e.prototype, "lblNode", void 0);
        __decorate([_([cc.Button])], e.prototype, "timeBtn", void 0);
        __decorate([_([cc.Button])], e.prototype, "dayBtn", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
