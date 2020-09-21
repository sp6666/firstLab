var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("./KitchenConfirm"),
    r = require("./KitchenItem"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.nodeAdd = null;
            e.confirm = null;
            e.nodeLeft = null;
            e.nodeRight = null;
            e.items = [];
            e.gais = [];
            e.lblCosts = [];
            e.lblVip =[];
            e.lblLv = null;
            e.lblExp = null;
            e.prg = null;
            e.btnOneKeyCook = null;
            e.max = 0;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.confirm.node.active = !1;
            this.updateStoveCount();
            facade.subscribe(
                i.kitchenProxy.UPDATE_KITCHEN_BASE,
                this.updateStoveCount,
                this
            );
            facade.subscribe(
                i.kitchenProxy.UPDATE_KITCHEN_LIST,
                this.updateStove,
                this
            );
            facade.subscribe(
                i.kitchenProxy.UPDATE_KITCHEN_LEVEL,
                this.updateLvShow,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onMoveRight, this);
            a.uiUtils.scaleRepeat(this.nodeLeft, 0.95, 1.05);
            a.uiUtils.scaleRepeat(this.nodeRight, 0.95, 1.05);
            this.updateLeftShow();
            this.onPlayVoice();
            this.updateLvShow();
        };
        e.prototype.updateLvShow = function() {
            var t = i.kitchenProxy.level.level,
                e = i.kitchenProxy.level.exp,
                o = localcache.getItem(localdb.table_kitlv, t),
                n = o ? o.exp : 1;
            this.lblLv.string = i18n.t("COMMON_LEVEL_TIP", {
                d: t,
                n: o ? o.title : ""
            });
            this.lblExp.string =
                null == o || 0 == n
                    ? i18n.t("COMMON_MAX")
                    : i18n.t("COMMON_NUM", {
                          f: e,
                          s: n
                      });
            this.prg.progress = null == o || 0 == n ? 1 : e / n;
        };
        e.prototype.onMoveLeft = function() {
            this.onClickSelect(null, -1);
        };
        e.prototype.onMoveRight = function() {
            this.onClickSelect(null, 1);
        };
        e.prototype.updateLeftShow = function() {
            var t = Math.floor(
                (i.kitchenProxy.base.stove + 1) / this.items.length
            );
            this.nodeRight.active = this.nodeLeft.active = t > 0;
        };
        e.prototype.updateStove = function() {
            for (
                var t = this.curIndex * this.items.length,
                    e = localcache.getItem(
                        localdb.table_kitunlock,
                        i.kitchenProxy.base.stove
                    ),
                    o = 0;
                o < this.items.length;
                o++
            ) {
                this.gais[o].active = o + t >= i.kitchenProxy.base.stove;
                this.lblCosts[o].string = e ? e.cash + "" : "";
                this.lblCosts[o].node.parent.active =
                    o + t == i.kitchenProxy.base.stove && null != e;
                //add by Ocean
                this.lblVip[o].node.active =
                o + t == i.kitchenProxy.base.stove && null != e&&e.VIP!=0;
                this.lblVip[o].string =e?i18n.t("COMMON_VIP_NAME",{v:e.VIP}):"";
                
                this.items[o].node.active = i.kitchenProxy.base.stove > o + t;
                this.items[o].node.active &&
                    (this.items[o].data =
                        i.kitchenProxy.list.length > o + t
                            ? i.kitchenProxy.list[o + t]
                            : null);
            }
            var l = i.timeProxy.getLoacalValue("KITCHEN_PARAM"),
                r = !1;
            for (o = 0; o < i.kitchenProxy.list.length; o++)
                if (
                    i.kitchenProxy.list[o].wid &&
                    0 != i.kitchenProxy.list[o].wid
                ) {
                    r = !0;
                    break;
                }
            //常显
            // n.stringUtil.isBlank(l) || r
            //     ? (this.btnOneKeyCook.active = !1)
            //     : (this.btnOneKeyCook.active = !0);
        };
        e.prototype.updateStoveCount = function() {
            0 == this.max &&
                (this.max = localcache.getList(localdb.table_kitunlock).length);
            this.nodeAdd.active = i.kitchenProxy.base.stove <= this.max;
            this.lblCount.string = i18n.t("BOOK_CUR_SEAT", {
                n: this.getCur(),
                m: i.kitchenProxy.base.stove
            });
            this.updateLeftShow();
            this.updateStove();
        };
        e.prototype.getCur = function() {
            for (var t = 0, e = 0; e < i.kitchenProxy.list.length; e++) {
                t += 0 != i.kitchenProxy.list[e].wid ? 1 : 0;
            }
            return t;
        };
        e.prototype.onPlayVoice = function() {
            if (null != i.kitchenProxy.list) {
                for (var t = [], e = 0; e < i.kitchenProxy.list.length; e++)
                    t.push(i.kitchenProxy.list[e].wid);
                if (0 != t.length) {
                    var o = i.voiceProxy.randomWifeVoice(
                        t[Math.floor(Math.random() * t.length)]
                    );
                    o &&
                        n.audioManager.playSound("wife/" + o.wifevoice, !0, !0);
                }
            }
        };
        e.prototype.onClickAdd = function() {
            var t = localcache.getItem(
                localdb.table_kitunlock,
                i.kitchenProxy.base.stove
            );
            //add by Ocean 
            if(t&&t.VIP>i.playerProxy.userData.vip){
                n.alertUtil.alert18n("LOOK_FOR_VIP_LEVEL_SHORT");
                return;
            }
            if (t) {
                var e = i.bagProxy.getItemCount(1);
                n.utils.showConfirmItem(
                    i18n.t("KITCHEN_BUY_STOVE", {
                        c: t.cash
                    }),
                    1,
                    e,
                    function() {
                        e < t.cash
                            ? n.alertUtil.alertItemLimit(1)
                            : i.kitchenProxy.sendBuyStove();
                    },
                    "KITCHEN_BUY_STOVE"
                );
            }
        };
        e.prototype.onClickOpen = function(t, e) {
            n.utils.openPrefabView(e);
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickStove = function(t, e) {
            var o = e.data;
            if (o)
                if (0 != o.wid && o.cd.next < n.timeUtil.second)
                    i.kitchenProxy.sendOver(o.id);
                else {
                    this.confirm.node.active = !0;
                    facade.send("KITCHEN_SELECT_STOVE", o);
                }
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = parseInt(e);
            //修改为常显不会消失
            // if (0 != this.curIndex || -1 != o) {
                var n = Math.floor(
                    (i.kitchenProxy.base.stove + 1) / this.items.length
                );
                this.curIndex += o;
                this.curIndex = this.curIndex < 0 ? n : this.curIndex;
                this.curIndex = this.curIndex > n ? 0 : this.curIndex;
                this.updateStove();
            // } else this.onClickClost();
        };
        e.prototype.onClickOneKeyCook = function() {
            if (i.playerProxy.userData.vip < 5)
                n.alertUtil.alert18n("KIT_VIP_OPEN_ONE_KEY_COOK");
            else {
                var t = [],
                    e = i.timeProxy.getLoacalValue("KITCHEN_PARAM"),
                    o = JSON.parse(e);
                if (null != o) {
                    var l = {};
                    for (var r in o)
                        if (null != o[r]) {
                            var a = {};
                            a.id = parseInt(r);
                            a.itemId = o[r].itemId;
                            a.wid = o[r].wid;
                            if (!i.kitchenProxy.isHave(r)) {
                                t.push(a);
                                for (
                                    var s = localcache.getItem(
                                            localdb.table_kitchen,
                                            o[r].itemId
                                        ),
                                        c = 0;
                                    c < s.fooditemid.length;
                                    c++
                                ) {
                                    var _ = s.fooditemid[c];
                                    null == l[_] ? (l[_] = 1) : (l[_] += 1);
                                }
                            }
                        }
                    var d = !0;
                    var lackMaterial=[];
                    for (var u in l)
                        if (i.bagProxy.getItemCount(parseInt(u)) < l[u]) {
                            var item={};//缺少的食材itemId 以及数量
                            item.id=u;
                            item.needcount =l[u]-i.bagProxy.getItemCount(parseInt(u));
                            lackMaterial.push(item);
                            // n.alertUtil.alertItemLimit(u);
                            // d = !1;
                            // break;
                        }
                    if(lackMaterial.length>0){
                        n.utils.openPrefabView("kitchen/KitLackMaterialView","",lackMaterial);
                        return;
                    }
                    if (d) {
                        if (0 == t.length) {
                            n.alertUtil.alert18n("KIT_YI_XUAN_COOK");
                            return;
                        }
                        i.kitchenProxy.sendOneKeyCook(t);
                    }
                } else n.alertUtil.alert18n("KIT_QING_XIAN_PAI_QIAN");
            }
        };
        e.prototype.onClickOneKeyFinish = function() {
            if (i.playerProxy.userData.vip < 4)
                n.alertUtil.alert18n("KIT_VIP_OPEN_ONE_KEY_OVER");
            else {
                for (var t = !1, e = 0; e < i.kitchenProxy.list.length; e++)
                    if (
                        i.kitchenProxy.list[e].wid &&
                        0 != i.kitchenProxy.list[e].wid
                    ) {
                        t = !0;
                        break;
                    }
                t
                    ? i.kitchenProxy.sendOneKeyFinish()
                    : n.alertUtil.alert18n("KITCHEN_NO_BODY_COOK");
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAdd", void 0);
        __decorate([_(l.default)], e.prototype, "confirm", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeRight", void 0);
        __decorate([_([r.default])], e.prototype, "items", void 0);
        __decorate([_([cc.Node])], e.prototype, "gais", void 0);
        __decorate([_([cc.Label])], e.prototype, "lblCosts", void 0);
        __decorate([_([cc.Label])], e.prototype, "lblVip", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnOneKeyCook", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
