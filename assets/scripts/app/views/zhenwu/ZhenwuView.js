var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../item/ItemSlotUI"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.lblExp = null;
            e.lblDes = null;
            e.lblSelect1 = null;
            e.lblSelect2 = null;
            e.lblRwd1 = null;
            e.lblRwd2 = null;
            e.pro = null;
            e.nodeEnd = null;
            e.nodeStar = null;
            e.lblTime = null;
            e.lblName = null;
            e.lblEffect = null;
            e.lblRemain = null;
            e.itemSlot = null;
            e.nodeSelect3 = null;
            e.servant = null;
            e.lblSelect3 = null;
            e.lblRwd3 = null;
            e.servantBtn = null;
            e._isRev = !1;
            e._isSend = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.playerProxy.PLAYER_USER_UPDATE,
                this.updateExp,
                this
            );
            facade.subscribe(
                l.jingyingProxy.JINGYING_EXP,
                this.updateZhengwu,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onUpdateItem,
                this
            );
            this.nodeSelect3.active = !1;
            this.updateExp();
            this.updateZhengwu();
        };
        e.prototype.onUpdateItem = function() {
            this.lblRemain.string = i18n.t("COMMON_COUNT", {
                c: l.bagProxy.getItemCount(
                    i.utils.getParamInt("zw_cost_item_id")
                )
            });
        };
        e.prototype.updateExp = function() {
            var t = l.playerProxy.userData,
                e = localcache.getItem(localdb.table_officer, t.level);
            if (e) {
                this.lblExp.string = i18n.t("COMMON_NUM", {
                    f: i.utils.formatMoney(t.exp),
                    s: i.utils.formatMoney(e.need_exp)
                });
                var o = t.exp / e.need_exp;
                this.pro.progress = o > 1 ? 1 : o;
            }
        };
        e.prototype.updateZhengwu = function() {
            var t = l.jingyingProxy.exp,
                e = localcache.getItem(
                    localdb.table_officer,
                    l.playerProxy.userData.level
                );
            this.nodeStar.active = t.cd.num > 0;
            this.nodeEnd.active = 0 == t.cd.num;
            t.cd.num < e.max_zw
                ? n.uiUtils.countDown(
                      t.cd.next,
                      this.lblTime,
                      function() {
                          l.playerProxy.sendAdok(t.cd.label);
                      },
                      0 == t.cd.num,
                      "ZHENGWU_NEXT",
                      "t"
                  )
                : this.lblTime.unscheduleAllCallbacks();
            this.lblCount.string = i18n.t("ZHENGWU_COUNT", {
                f: t.cd.num,
                s: e.max_zw
            });
            if (t.cd.num > 0) {
                var o = localcache.getItem(localdb.table_item, t.itemid),
                    r = localcache.getItem(localdb.table_zw, t.type);
                this.lblDes.string = l.playerProxy.getReplaceName(r.msg1);
                this._isRev = 10 * Math.random() < 5;
                this.lblSelect1.string = this._isRev ? r.msg3 : r.msg2;
                this.lblSelect2.string = this._isRev ? r.msg2 : r.msg3;
                this.nodeSelect3.active = 0 != t.heroId && null != t.heroId;
                if (this.nodeSelect3.active) {
                    this.lblRwd3.string = i18n.t("JINGYING_SP_REWARD");
                    this.lblSelect3.string = r.msg4;
                    this.servant.url = n.uiHelps.getServantHead(t.heroId);
                    this.servantBtn.interactable =
                        null != l.servantProxy.getHeroData(t.heroId);
                }
                var a = i18n.t("ZHENGWU_GET", {
                        t: i18n.t("COMMON_ADD", {
                            n: o.name,
                            c: t.count
                        })
                    }),
                    s = i18n.t("ZHENGWU_GET", {
                        t: i18n.t("COMMON_ADD", {
                            n: i18n.t("COMMON_ZHENGJI"),
                            c: e.zw_exp
                        })
                    });
                this.lblRwd1.string = this._isRev ? s : a;
                this.lblRwd2.string = this._isRev ? a : s;
            } else {
                o = localcache.getItem(
                    localdb.table_item,
                    i.utils.getParamInt("zw_cost_item_id")
                );
                var c = new n.ItemSlotData();
                c.id = o.id;
                this.itemSlot.data = c;
                this.lblEffect.string = o.explain;
                this.lblName.string = o.name;
                this.lblRemain.string = i18n.t("COMMON_COUNT", {
                    c: l.bagProxy.getItemCount(c.id)
                });
            }
            this._isSend = !1;
        };
        e.prototype.onClickSelect = function(t, e) {
            if (!this._isSend) {
                var o = parseInt(e);
                if (l.jingyingProxy.exp.count > 0)
                    if (3 == o) {
                        var n = l.jingyingProxy.exp;
                        if (null == l.servantProxy.getHeroData(n.heroId)) {
                            var r = localcache.getItem(
                                localdb.table_hero,
                                n.heroId
                            );
                            i.alertUtil.alert("ZHENGWU_UNHAVE_SERVANT", {
                                n: r ? r.name : "",
                                des: r.unlock
                            });
                            return;
                        }
                        if (0 != n.heroId) {
                            for (
                                var a = localcache.getItem(
                                        localdb.table_hero,
                                        n.heroId
                                    ),
                                    s = localcache.getList(
                                        localdb.table_jytext
                                    ),
                                    c =
                                        parseInt(
                                            l.jingyingProxy.exp.type + ""
                                        ) + 100,
                                    _ = [],
                                    d = 0;
                                d < s.length;
                                d++
                            )
                                (s[d].herochar != a.disposition &&
                                    0 != s[d].herochar) ||
                                    s[d].type != c ||
                                    _.push(s[d]);
                            var u = null;
                            1 == _.length
                                ? (u = _[0])
                                : _.length > 1 &&
                                  (u = _[Math.floor(Math.random() * _.length)]);
                            if (
                                u &&
                                !i.stringUtil.isBlank(u.story) &&
                                l.playerProxy.getStoryData(u.story)
                            ) {
                                l.playerProxy.addStoryId(u.story);
                                i.utils.openPrefabView("StoryView", !1, {
                                    heroid: n.heroId,
                                    type: 2
                                });
                                this._isSend = !0;
                            } else
                                null != u &&
                                    i.alertUtil.alert(
                                        i18n.t("COMMON_DATA_ERROR") + u.story
                                    );
                        }
                    } else {
                        this._isSend = !0;
                        l.jingyingProxy.sendZwAct(
                            this._isRev ? (1 == o ? 2 : 1) : o
                        );
                    }
            }
        };
        e.prototype.onClickUseItem = function() {
            var t = i.utils.getParamInt("zw_cost_item_id"),
                e = l.bagProxy.getItemCount(t),
                o = i.utils.getParamInt("show_slider_count");
            e <= 0
                ? i.alertUtil.alertItemLimit(t)
                : e > o
                ? i.utils.showConfirmItemMore(
                      i18n.t("ZHENGWU_USE_ITEM", {
                          n: l.playerProxy.getKindIdName(1, t)
                      }),
                      t,
                      e,
                      function(num) {
                          if(num > e) {
                            i.alertUtil.alertItemLimit(t);
                          }else {
                            l.jingyingProxy.sendZwl(num);
                          }
                          
                      }
                  )
                : l.jingyingProxy.sendZwl(1);
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSelect1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSelect2", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblRwd1", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblRwd2", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "pro", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeEnd", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeStar", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblEffect", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRemain", void 0);
        __decorate([_(a.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeSelect3", void 0);
        __decorate([_(r.default)], e.prototype, "servant", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSelect3", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblRwd3", void 0);
        __decorate([_(cc.Button)], e.prototype, "servantBtn", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
