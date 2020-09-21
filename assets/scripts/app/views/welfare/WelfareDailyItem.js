var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDay = null;
            e.lblState = null;
            e.itemSlot2 = null;
            e.btn = null;
            e.effect = null;
            e.qiandao = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(
                    localdb.table_qiandaoReward,
                    t.rwdId
                );
                this.lblDay.string = t.day + "";
                this.lblState.string =
                    1 == t.isQiandao ? "" : i18n.t("WELFARE_UNQIANDAO");
                this.itemSlot2.data =
                    e.qiandaoRwd.length > 0 ? e.qiandaoRwd[0] : null;
                this.itemSlot2.setGray(0 != t.isQiandao);
                this.btn.interactable = 0 == t.isQiandao;
                this.effect.active =
                    t.day == l.welfareProxy.qiandao.days && 0 == t.isQiandao;
                this.qiandao.active = 1 == t.isQiandao;
            }
        };
        e.prototype.onClickItem = function() {
            var t = this._data;
            t && !t.isQiandao && 0 == l.welfareProxy.qiandao.qiandao
                ? l.welfareProxy.sendQiandao()
                : r.alertUtil.alert18n("WELFARE_QIANDAO_LIMIT");
        };
        __decorate([c(cc.Label)], e.prototype, "lblDay", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblState", void 0);
        __decorate([c(n.default)], e.prototype, "itemSlot2", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Node)], e.prototype, "effect", void 0);
        __decorate([c(cc.Node)], e.prototype, "qiandao", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
