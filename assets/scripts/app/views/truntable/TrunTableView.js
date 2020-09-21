var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./TrunTableItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemArr = [];
            e.lblHqCount = null;
            e.bg = null;
            e.lblTime = null;
            e.curIndex = 0;
            e.roundIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.trunTableProxy.TRUN_TABLE_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            r.shaderUtils.setBlur(this.bg);
            l.trunTableProxy.sendOpen();
            this.onItemUpdate();
            l.shopProxy.sendList(!1);
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onDataUpdate = function(t) {
            if (t.prize) {
                this.curIndex = t.prize[0].dc;
                this.showEff(0);
            } else if (t)
                for (var e = 0; e < this.itemArr.length; e++)
                    if (e < t.list.length) {
                        this.itemArr[e].data = t.list[e];
                        this.itemArr[e].select = 0 == e;
                    }
            l.trunTableProxy.data && this.onItemUpdate();
        };
        e.prototype.showEff = function(t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function() {
            for (
                var t = this.roundIndex % 10, e = 0;
                e < this.itemArr.length;
                e++
            )
                this.itemArr[e].select = t == e;
            this.roundIndex++;
            if (this.roundIndex >= 10 && this.roundIndex < 20)
                this.showEff(0.03);
            else if (this.roundIndex >= 20 && this.roundIndex < 30)
                this.showEff(0.03 + (this.roundIndex - 20) / 200);
            else if (
                this.roundIndex >= 30 + this.curIndex &&
                this.roundIndex < 100
            ) {
                this.roundIndex = 0;
                this.curIndex = 0;
                this.unscheduleAllCallbacks();
                l.timeProxy.floatReward();
            }
        };
        e.prototype.onItemUpdate = function() {
            if (l.trunTableProxy.data) {
                var t = l.bagProxy.getItemCount(l.trunTableProxy.data.need.id);
                this.lblHqCount.string = t + "";
            }
        };
        e.prototype.onClickRoll = function(t, e) {
            if (0 == this.curIndex) {
                var o = parseInt(e);
                if (
                    l.bagProxy.getItemCount(l.trunTableProxy.data.need.id) < o
                ) {
                    var i = localcache.getItem(
                        localdb.table_item,
                        l.trunTableProxy.data.need.id
                    );
                    n.alertUtil.alert(
                        i18n.t("COMMON_LIMIT", {
                            n: i.name
                        })
                    );
                    this.onClickAdd();
                } else l.trunTableProxy.sendRoll(o);
            } else n.alertUtil.alert18n("TRUN_TABLE_IS_ROLLING");
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickAdd = function() {
            l.shopProxy.openShopBuy(l.trunTableProxy.data.need.id);
        };
        e.prototype.onTimer = function() {
            if (l.trunTableProxy.data) {
                var t =
                    l.trunTableProxy.data.info.eTime - n.timeUtil.second > 0
                        ? l.trunTableProxy.data.info.eTime - n.timeUtil.second
                        : 0;
                this.lblTime.string = i18n.t("union_endcool", {
                    time: n.timeUtil.second2hms(t)
                });
            }
        };
        e.prototype.onClickRecharge = function() {
            a.funUtils.openView(a.funUtils.recharge.id);
        };
        __decorate([_([i.default])], e.prototype, "itemArr", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblHqCount", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
