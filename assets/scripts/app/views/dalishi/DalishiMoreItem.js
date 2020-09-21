var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblName = null;
            e.lblDate = null;
            e.lblTxt = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.btn.node.active = t.user.uid != l.playerProxy.userData.uid;
                this.lblIndex.string = t.user.uid + "";
                this.lblName.string = t.user.name;
                this.lblDate.string = n.timeUtil.format(t.ktime);
                var e = localcache.getItem(localdb.table_hero, t.hid);
                this.lblTxt.string = i18n.t("DALISI_MSG", {
                    n: e.name,
                    act: i18n.t("DALISI_MSG_" + t.ftype + "_" + t.win),
                    n1: t.fuser.name,
                    d: t.kill,
                    m1: 1 == t.ftype ? i18n.t("DALISI_DOUBLE_MUL") : "",
                    m:
                        t.lkill > 3
                            ? i18n.t("DALISI_LKILL_TIP", {
                                  d: t.lkill
                              })
                            : ""
                });
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
