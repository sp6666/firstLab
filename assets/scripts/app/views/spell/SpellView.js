var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.light = null;
            e.records = null;
            e.spellList = null;
            e.scroll = null;
            e.lblRwd = null;
            e.lblNum = null;
            e._oldNum = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.spellProxy.SPELL_DATA_UPDAT,
                this.onSpellData,
                this
            );
            facade.subscribe(
                n.spellProxy.SPELL_DATA_RECORDS,
                this.onRecords,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            this.spellList.selectHandle = function(t) {
                var e = t;
                if (e)
                    if (e.num > 0) {
                        if (r.timeUtil.second > n.spellProxy.cfg.info.eTime) {
                            r.alertUtil.alert18n("ACTHD_OVERDUE");
                            return;
                        }
                        r.utils.openPrefabView("spell/SpellSend", null, {
                            itemId: e.id
                        });
                    } else {
                        var o = localcache.getItem(localdb.table_item, e.id);
                        r.alertUtil.alert(
                            i18n.t("SPELL_ITEN_LIMIT", {
                                name: o.name
                            })
                        );
                    }
            };
            n.spellProxy.sendOpenActivity();
            this.onItemUpdate();
        };
        e.prototype.onSpellData = function() {
            if (null != n.spellProxy.cfg) {
                var t = this;
                l.uiUtils.countDown(
                    n.spellProxy.cfg.info.eTime,
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    }
                );
                this.spellList.data = n.spellProxy.cfg.debris;
                this.light.active = n.spellProxy.isEnough();
                n.spellProxy.isEnough() &&
                    l.uiUtils.scaleRepeat(this.lblRwd, 0.9, 1.1);
                var e = JSON.stringify(n.spellProxy.cfg.debris);
                n.timeProxy.saveLocalValue("spell", e);
            }
        };
        e.prototype.onRecords = function() {
            this.records.data = n.spellProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickRwd = function() {
            r.timeUtil.second > n.spellProxy.cfg.info.eTime
                ? r.alertUtil.alert18n("ACTHD_OVERDUE")
                : n.spellProxy.sendGetRwd();
        };
        e.prototype.onClickBox = function() {
            if (0 != n.bagProxy.getItemCount(930)) {
                var t = {
                    id: 930
                };
                r.utils.openPrefabView("bag/BagUse", !1, t);
            } else r.alertUtil.alertItemLimit(930);
        };
        e.prototype.onItemUpdate = function() {
            var t = n.bagProxy.getItemCount(930);
            this._oldNum > t && n.spellProxy.sendOpenActivity();
            this.lblNum.string = t + "";
            this._oldNum = t;
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Node)], e.prototype, "light", void 0);
        __decorate([c(i.default)], e.prototype, "records", void 0);
        __decorate([c(i.default)], e.prototype, "spellList", void 0);
        __decorate([c(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblRwd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
