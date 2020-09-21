var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../item/ItemSlotUI"),
    s = require("../../component/SelectMax"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.jingLiText = null;
            e.btn_Reset = null;
            e.btn_ResetJq = null;
            e.btn_sjwh = null;
            e.btn_yjwh = null;
            e.btn_yjcy = null;
            e.btn_SJCY = null;
            e.jiaqiText = null;
            e.wifeList = null;
            e.itemSlot = null;
            e.lblItemName = null;
            e.bar = null;
            e.useNode = null;
            e.check_onKey = null;
            e.cyLv = 0;
            e.whLv = 0;
            e.curWifeList = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("WIFE_JING_LI", this.onJingliUpdate, this);
            facade.subscribe("WIFE_JIA_QI", this.onJiaQiUpdate, this);
            facade.subscribe(
                n.wifeProxy.WIFE_LIST_UPDATE,
                this.showWifeList,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.showWifeList();
            this.onJingliUpdate();
            this.onJiaQiUpdate();
            this.onClickBtn(null, "0");
            this.whLv = l.utils.getParamInt("wenhou_vip_level");
            this.cyLv = l.utils.getParamInt("chuyou_vip_level");
        };
        e.prototype.showWifeList = function() {
            for (
                var t = localcache.getList(localdb.table_wife), e = [], o = 0;
                o < t.length;
                o++
            )
                1 == t[o].open &&
                    (n.jibanProxy.getWifeJB(t[o].wid) > 0 ||
                        null != n.wifeProxy.getWifeData(t[o].wid)) &&
                    e.push(t[o]);
            e.sort(function(t, e) {
                var o = n.wifeProxy.getWifeData(t.wid),
                    i = n.wifeProxy.getWifeData(e.wid),
                    l = null == o ? 1 : 0,
                    r = null == i ? 1 : 0,
                    a = null == o ? 0 : o.love,
                    s = null == i ? 0 : i.love;
                return l == r ? s - a : l - r;
            });
            n.wifeProxy.wifeSys = e;
            this.wifeList.data = e;
        };
        e.prototype.onClickBtn = function(t, e) {
            var o = parseInt(e);
            this.curWifeList = n.wifeProxy.getMarryList(1 == o);
            this.curWifeList.length;
        };
        e.prototype.onJingliUpdate = function() {
            var t = localcache.getItem(
                    localdb.table_vip,
                    n.playerProxy.userData.vip
                ),
                e = n.wifeProxy.jingliData;
            e.num < t.jingli
                ? r.uiUtils.countDown(
                      e.next,
                      this.jingLiText,
                      function() {
                          n.playerProxy.sendAdok(e.label);
                      },
                      0 == e.num
                  )
                : this.jingLiText.unscheduleAllCallbacks();
            e.num > 0 &&
                (this.jingLiText.string = i18n.t("COMMON_NUM", {
                    f: e.num,
                    s: t.jingli
                }));
            this.onShowBtnState();
        };
        e.prototype.onJiaQiUpdate = function() {
            var t = localcache.getItem(
                    localdb.table_vip,
                    n.playerProxy.userData.vip
                ),
                e = n.wifeProxy.jiaqiData;
            e.num < t.jiaqi
                ? r.uiUtils.countDown(
                      e.next,
                      this.jiaqiText,
                      function() {
                          n.playerProxy.sendAdok(e.label);
                      },
                      0 == e.num
                  )
                : this.jiaqiText.unscheduleAllCallbacks();
            e.num > 0 &&
                (this.jiaqiText.string = i18n.t("COMMON_NUM", {
                    f: e.num,
                    s: t.jiaqi
                }));
            this.btn_SJCY.interactable = e.num > 0;
            this.onShowBtnState();
        };
        e.prototype.onShowBtnState = function() {
            if (n.wifeProxy.jingliData.num <= 0) {
                this.btn_Reset.node.active = !0;
                this.btn_sjwh.node.active = this.btn_yjwh.node.active = !1;
            } else {
                this.btn_sjwh.node.active = !this.check_onKey.isChecked;
                this.btn_yjwh.node.active = this.check_onKey.isChecked;
                this.btn_Reset.node.active = !1;
            }
            if (n.wifeProxy.jiaqiData.num <= 0) {
                this.btn_ResetJq.node.active = !0;
                this.btn_SJCY.node.active = this.btn_yjcy.active = !1;
            } else {
                this.btn_SJCY.node.active = !this.check_onKey.isChecked;
                this.btn_yjcy.active = this.check_onKey.isChecked;
                this.btn_ResetJq.node.active = !1;
            }
        };
        e.prototype.onClickYJXO = function() {
            n.playerProxy.userData.vip < this.whLv
                ? l.alertUtil.alert(
                      i18n.t("WIFE_ONE_KEY_OPEN_WEN_HOU", {
                          num: this.whLv
                      })
                  )
                : n.wifeProxy.jingliData.num <= 0
                ? l.alertUtil.alert(i18n.t("WIFE_JINGLING_LIMIT"))
                : n.wifeProxy.sendYJXO();
        };
        e.prototype.randomBtn = function() {
            n.wifeProxy.jingliData.num <= 0
                ? l.alertUtil.alert(i18n.t("WIFE_JINGLING_LIMIT"))
                : n.wifeProxy.sendSJXO();
        };
        e.prototype.resetBtn = function() {
            var t = l.utils.getParamInt("hg_cost_item_jl"),
                e = n.bagProxy.getItemCount(t);
            if (e <= 0) l.alertUtil.alertItemLimit(t);
            else {
                var o = localcache.getItem(localdb.table_item, t);
                l.utils.showConfirmItem(
                    i18n.t("WIFE_USE_JING_LI_DAN", {
                        name: o.name,
                        num: 1
                    }),
                    t,
                    e,
                    function() {
                        n.wifeProxy.sendWeige();
                    },
                    "WIFE_USE_JING_LI_DAN"
                );
            }
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this, !0);
        };
        e.prototype.onClickRandowChuYou = function() {
            n.wifeProxy.sendSJCY();
        };
        e.prototype.restJiaQi = function() {
            var t = l.utils.getParamInt("jiaqi_cost_item_chuyou"),
                e = n.bagProxy.getItemCount(t);
            if (e <= 0) l.alertUtil.alertItemLimit(t);
            else {
                var o = localcache.getItem(localdb.table_item, t),
                    i = localcache.getItem(
                        localdb.table_vip,
                        n.playerProxy.userData.vip
                    );
                this.useNode.active = !0;
                this.bar.max = e >= i.jiaqi ? i.jiaqi : e;
                this.bar.curValue = 1;
                this.lblItemName.string = o.name;
                var a = new r.ItemSlotData();
                a.id = o.id;
                a.count = e;
                this.itemSlot.data = a;
            }
        };
        e.prototype.onClickUseChe = function() {
            n.wifeProxy.sendJiaQi(this.bar.curValue ? this.bar.curValue : 1);
            this.useNode.active = !1;
        };
        e.prototype.onCloseUseNode = function() {
            this.useNode.active = !1;
        };
        e.prototype.onClickYjcy = function() {
            n.playerProxy.userData.vip < this.cyLv
                ? l.alertUtil.alert(
                      i18n.t("WIFE_ONE_KEY_OPEN_CHU_YOU", {
                          num: this.cyLv
                      })
                  )
                : n.wifeProxy.sendYJCY();
        };
        __decorate([d(cc.Label)], e.prototype, "jingLiText", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn_Reset", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn_ResetJq", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn_sjwh", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn_yjwh", void 0);
        __decorate([d(cc.Node)], e.prototype, "btn_yjcy", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn_SJCY", void 0);
        __decorate([d(cc.Label)], e.prototype, "jiaqiText", void 0);
        __decorate([d(i.default)], e.prototype, "wifeList", void 0);
        __decorate([d(a.default)], e.prototype, "itemSlot", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblItemName", void 0);
        __decorate([d(s.default)], e.prototype, "bar", void 0);
        __decorate([d(cc.Node)], e.prototype, "useNode", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "check_onKey", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
