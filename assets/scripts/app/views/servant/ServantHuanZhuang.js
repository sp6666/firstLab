var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../item/ItemSlotUI"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/BagProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.explain = null;
            e.getWayDetails = null;
            e.unlockDetails = null;
            e.clothesName = null;
            e.roleSpine = null;
            e.ItemSlotUI = null;
            e.btnTakeOff = null;
            e.btnName = null;
            e.qiShi = null;
            e.zhiMou = null;
            e.zhengLue = null;
            e.meiLi = null;
            e.ep1 = null;
            e.ep2 = null;
            e.ep3 = null;
            e.ep4 = null;
            e.btnLeft = null;
            e.btnRight = null;
            e.curHero = null;
            e.skinSysArr = null;
            e.curIndex = 0;
            e.btnType = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SERVANT_CHUANZHUANG", this.onHuanZhuang, this);
            this.curHero = this.node.openParam;
            this.skinSysArr = localcache.getGroup(
                localdb.table_heroClothe,
                "heroid",
                this.curHero.id
            );
            this.btnRight.active =
                null != this.skinSysArr && this.skinSysArr.length > 1;
            this.btnLeft.active =
                null != this.skinSysArr && this.skinSysArr.length > 1;
            var t = r.servantProxy.getSink(this.curHero.id);
            if (null != t && null != t.dress) {
                for (var e = 0; e < this.skinSysArr.length; e++)
                    this.skinSysArr[e].id == t.dress && (this.curIndex = e);
                this.onHuanZhuang();
                this.showTheBtn(this.curIndex);
            } else {
                this.curDate(this.curIndex);
                this.showTheBtn(this.curIndex);
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClost = function() {
            r.servantProxy.curSelectId = 0;
            i.audioManager.playSound("", !0);
            i.utils.closeView(this);
            r.servantProxy.isRenMaiOpen
                ? (r.servantProxy.isRenMaiOpen = !1)
                : i.utils.openPrefabView("servant/ServantListView");
        };
        e.prototype.onBack = function() {
            r.servantProxy.curSelectId = 0;
            i.audioManager.playSound("", !0);
            i.utils.closeView(this, !0);
            r.servantProxy.isRenMaiOpen && (r.servantProxy.isRenMaiOpen = !1);
        };
        e.prototype.onHuanZhuang = function() {
            this.curDate(this.curIndex);
            this.showTheBtn(this.curIndex);
        };
        e.prototype.onClickLeft = function(t) {
            t < 300 || this.showClickData(-1);
        };
        e.prototype.onClickRight = function(t) {
            t < 300 || this.showClickData(1);
        };
        e.prototype.showClickData = function(t) {
            this.curIndex += t;
            this.curIndex =
                this.curIndex < 0 ? this.skinSysArr.length - 1 : this.curIndex;
            this.curIndex =
                this.curIndex > this.skinSysArr.length - 1 ? 0 : this.curIndex;
            this.curDate(this.curIndex);
            this.showTheBtn(this.curIndex);
        };
        e.prototype.curDate = function(t) {
            var e = this.skinSysArr[t];
            this.qiShi.string = e.prop[0][1];
            this.zhiMou.string = e.prop[0][2];
            this.zhengLue.string = e.prop[0][3];
            this.meiLi.string = e.prop[0][4];
            this.roleSpine.url = a.uiHelps.getServantSkinSpine(e.model);
            this.explain.string = e.txt;
            this.getWayDetails.string = e.way;
            var o = new a.ItemSlotData();
            o.id = e.id;
            o.kind = s.DataType.HERO_CLOTHE;
            this.ItemSlotUI.data = o;
        };
        e.prototype.showTheBtn = function(t) {
            var e = r.servantProxy.getSink(this.curHero.id);
            if (null != e) {
                var o = this.skinSysArr[t];
                if (e.dress != o.id)
                    for (var i = 0; i < e.list.length; i++) {
                        if (o.id == e.list[i]) {
                            this.btnTakeOff.interactable = !0;
                            this.btnName.string = i18n.t(
                                "SERVANT_HUANZHUANG_WEAR"
                            );
                            this.btnType = 2;
                            return;
                        }
                        this.btnTakeOff.interactable = !1;
                        this.btnName.string = i18n.t("SERVANT_HUANZHUANG_WEAR");
                    }
                else {
                    this.btnTakeOff.interactable = !0;
                    this.btnName.string = i18n.t("SERVANT_HUANZHUANG_TAKEOFF");
                    this.btnType = 1;
                }
            } else {
                this.btnTakeOff.interactable = !1;
                this.btnName.string = i18n.t("SERVANT_HUANZHUANG_WEAR");
            }
        };
        e.prototype.ClickTakeOff = function() {
            var t = this.skinSysArr[this.curIndex];
            1 != this.btnType
                ? 2 == this.btnType &&
                  r.servantProxy.sendHz(this.curHero.id, t.id)
                : r.servantProxy.sendHz(this.curHero.id, 0);
        };
        __decorate([d(cc.Label)], e.prototype, "explain", void 0);
        __decorate([d(cc.Label)], e.prototype, "getWayDetails", void 0);
        __decorate([d(cc.Label)], e.prototype, "unlockDetails", void 0);
        __decorate([d(cc.Label)], e.prototype, "clothesName", void 0);
        __decorate([d(n.default)], e.prototype, "roleSpine", void 0);
        __decorate([d(l.default)], e.prototype, "ItemSlotUI", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnTakeOff", void 0);
        __decorate([d(cc.Label)], e.prototype, "btnName", void 0);
        __decorate([d(cc.Label)], e.prototype, "qiShi", void 0);
        __decorate([d(cc.Label)], e.prototype, "zhiMou", void 0);
        __decorate([d(cc.Label)], e.prototype, "zhengLue", void 0);
        __decorate([d(cc.Label)], e.prototype, "meiLi", void 0);
        __decorate([d(cc.Node)], e.prototype, "ep1", void 0);
        __decorate([d(cc.Node)], e.prototype, "ep2", void 0);
        __decorate([d(cc.Node)], e.prototype, "ep3", void 0);
        __decorate([d(cc.Node)], e.prototype, "ep4", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnLeft", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnRight", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
