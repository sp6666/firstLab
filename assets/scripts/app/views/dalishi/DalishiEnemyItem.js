var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../user/UserHeadItem"),
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
            e.lblLevel = null;
            e.lblShili = null;
            e.head = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = t.fuser.id + "";
                this.lblName.string = i18n.t("DALISI_USER_NAME_SCORE", {
                    n: t.fuser.name,
                    d: t.score
                });
                this.lblDate.string = n.timeUtil.getDateDiff(t.time);
                this.lblShili.string = n.utils.formatMoney(t.fuser.shili);
                var e = localcache.getItem(
                    localdb.table_officer,
                    t.fuser.level
                );
                this.lblLevel.string = e ? e.name : "";
                this.head.setUserHead(t.fuser.job, t.fuser.headavatar);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([s(l.default)], e.prototype, "head", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
