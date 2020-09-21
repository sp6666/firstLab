var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("./SacrificeItem"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.records = null;
            e.spellList = [];
            e.scroll = null;
            e.lblRwd = null;
            e.lblNoRwd = null;
            e.lblNum = null;
            e.tipNode = null;
            e.lblBall = null;
            e.btnSacrifice = null;
            e.noSacrificeNode = null;
            e.btnLinQu = null;
            e.jiangli = null;
            e.animationNode = null;
            e._oldNum = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.zhongyuanProxy.SCARIFICE_DATA_UPDAT,
                this.onSpellData,
                this
            );
            facade.subscribe(
                n.zhongyuanProxy.SCARIFICE_DATA_RECORDS,
                this.onRecords,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            l.uiUtils.scaleRepeat(this.lblRwd, 0.9, 1.1);
            this.lblRwd.active = !(this.lblNoRwd.active = !0);
            s.shaderUtils.setImageGray(this.jiangli);
            this.onItemUpdate();
            this.onSpellData();
        };
        e.prototype.onSpellData = function() {
            if (null != n.zhongyuanProxy.data) {
                var t = this;
                l.uiUtils.countDown(
                    n.zhongyuanProxy.data.info.eTime,
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    }
                );
                for (var e = 0; e < n.zhongyuanProxy.data.debris.length; e++)
                    this.spellList[e].data = n.zhongyuanProxy.data.debris[e];
                this.noSacrificeNode.active = !(this.btnSacrifice.interactable = n.zhongyuanProxy.isEnough());
                var o = JSON.stringify(n.zhongyuanProxy.data.debris);
                n.timeProxy.saveLocalValue("sacrifice", o);
                this.lblBall.string =
                    n.bagProxy.getItemCount(n.zhongyuanProxy.data.need) + "";
                this.tipNode.active =
                    0 == n.bagProxy.getItemCount(n.zhongyuanProxy.data.need);
            }
        };
        e.prototype.onRecords = function() {
            this.records.data = n.zhongyuanProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickSacrifice = function() {
            this.btnSacrifice.interactable = !1;
            for (var t = 0; t < n.zhongyuanProxy.data.debris.length; t++) {
                n.zhongyuanProxy.data.debris[t].num--;
                this.spellList[t].data = n.zhongyuanProxy.data.debris[t];
            }
            this.showNodeAnimation1();
        };
        e.prototype.showNodeAnimation1 = function() {
            this.animationNode.getComponent(cc.Animation) &&
                r.utils.showNodeEffect(this.animationNode, 0);
            this.scheduleOnce(this.showNodeAnimation2, 0.8);
        };
        e.prototype.onUpdateRewardBtn = function() {
            s.shaderUtils.setImageGray(this.jiangli, !1);
            this.btnLinQu.interactable = !0;
            this.lblRwd.active = !(this.lblNoRwd.active = !1);
        };
        e.prototype.showNodeAnimation2 = function() {
            this.animationNode.getComponent(cc.Animation) &&
                r.utils.showNodeEffect(this.animationNode, 1);
            this.scheduleOnce(this.onUpdateRewardBtn, 0.15);
        };
        e.prototype.onClickAdd = function() {
            r.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.zhongyuanProxy.shop[0],
                activityId: n.zhongyuanProxy.data.info.id
            });
            n.shopProxy.openShopBuy(n.zhongyuanProxy.data.need);
        };
        e.prototype.onClickRwd = function() {
            n.zhongyuanProxy.sendRwd();
            this.lblRwd.active = !(this.lblNoRwd.active = !0);
            s.shaderUtils.setImageGray(this.jiangli);
            this.btnLinQu.interactable = !1;
            this.btnSacrifice.interactable = !0;
        };
        e.prototype.onClickBox = function() {
            if (0 != n.bagProxy.getItemCount(1040)) {
                var t = {
                    id: 1040
                };
                r.utils.openPrefabView("bag/BagUse", !1, t);
            } else r.alertUtil.alertItemLimit(1040);
        };
        e.prototype.onItemUpdate = function() {
            var t = n.bagProxy.getItemCount(1040);
            this._oldNum > t && n.zhongyuanProxy.sendInfo();
            this.lblNum.string = t + "";
            this._oldNum = t;
            if (n.zhongyuanProxy.data) {
                var e = n.bagProxy.getItemCount(n.zhongyuanProxy.data.need);
                this.tipNode.active = 0 == e;
                this.lblBall.string = e + "";
            }
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(i.default)], e.prototype, "records", void 0);
        __decorate([d([a.default])], e.prototype, "spellList", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([d(cc.Node)], e.prototype, "lblRwd", void 0);
        __decorate([d(cc.Node)], e.prototype, "lblNoRwd", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([d(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnSacrifice", void 0);
        __decorate([d(cc.Node)], e.prototype, "noSacrificeNode", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnLinQu", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "jiangli", void 0);
        __decorate([d(cc.Node)], e.prototype, "animationNode", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
