var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("./BookItem"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.nodeAdd = null;
            e.sp = null;
            e.nodeAll = null;
            e.nodeLeft = null;
            e.ndoeRight = null;
            e.items = [];
            e.gais = [];
            e.lblCosts = [];
            e.lblAdd = null;
            e.lblLv = null;
            e.lblExp = null;
            e.prg = null;
            e.btnOneKeyStudy = null;
            e.lblVip =[];
            e.max = 0;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.updateSeatCount();
            facade.subscribe(
                n.bookProxy.UPDATE_BOOK_BASE,
                this.updateBase,
                this
            );
            facade.subscribe(
                n.bookProxy.UPDATE_BOOK_LIST,
                this.updateSeatCount,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onMoveRight, this);
            facade.subscribe(
                n.bookProxy.UPDATE_BOOK_LEVEL,
                this.updateLvShow,
                this
            );
            this.updateAdd();
            l.uiUtils.scaleRepeat(this.nodeLeft, 0.95, 1.05);
            l.uiUtils.scaleRepeat(this.ndoeRight, 0.95, 1.05);
            this.lblAdd.string = i18n.t("BOOK_ADD_TIP", {
                d: i.utils.getParamInt("school_study_exp"),
                t: i.utils.getParamInt("school_skill_exp")
            });
            this.updateLeftShow();
            this.updateLvShow();
            this.onPlayVoice();
        };
        e.prototype.onMoveLeft = function() {
            this.onClickSelect(null, -1);
        };
        e.prototype.onMoveRight = function() {
            this.onClickSelect(null, 1);
        };
        e.prototype.updateLvShow = function() {
            var t = n.bookProxy.level.level,
                e = n.bookProxy.level.exp,
                o = localcache.getItem(localdb.table_schoollv, t),
                i = o ? o.school_exp : 1;
            this.lblLv.string = i18n.t("BOOK_LEVEL_TIP", {
                d: t
            });
            this.lblExp.string =
                null == o || 0 == i
                    ? i18n.t("COMMON_MAX")
                    : i18n.t("COMMON_NUM", {
                          f: e,
                          s: i
                      });
            this.prg.progress = null == o || 0 == i ? 1 : e / i;
        };
        e.prototype.updateLeftShow = function() {
            var t = Math.floor((n.bookProxy.base.desk + 1) / this.items.length);
            this.ndoeRight.active = this.nodeLeft.active = t > 0;
        };
        e.prototype.updateBase = function() {
            this.updateLeftShow();
            this.updateSeatCount();
        };
        e.prototype.updateAdd = function() {
            var t = i.timeUtil.getCurData();
            this.sp.node.active = t > 0 && t < 5;
            this.sp.node.active && (this.sp.url = l.uiHelps.getLangSp(t));
            this.nodeAll.active = !this.sp.node.active;
        };
        e.prototype.updateSeatCount = function() {
            0 == this.max &&
                (this.max = localcache.getList(localdb.table_school).length);
            this.nodeAdd.active = n.bookProxy.base.desk <= this.max;
            this.lblCount.string = i18n.t("BOOK_CUR_SEAT", {
                n: this.getCur(),
                m: n.bookProxy.base.desk
            });
            for (
                var t = localcache.getItem(
                        localdb.table_school,
                        n.bookProxy.base.desk
                    ),
                    e = this.curIndex * this.items.length,
                    o = 0;
                o < this.items.length;
                o++
            ) {
                this.gais[o].active = o + e >= n.bookProxy.base.desk;
                this.lblCosts[o].string = t ? t.cash + "" : "";
                this.lblCosts[o].node.parent.active =
                    o + e == n.bookProxy.base.desk && null != t;

                //add by Ocean
                this.lblVip[o].node.active =
                    o + e == n.bookProxy.base.desk && null != t&&t.VIP!=0;
                this.lblVip[o].string =t?i18n.t("COMMON_VIP_NAME",{v:t.VIP}):"";
                
                this.items[o].node.active = n.bookProxy.base.desk > o + e;
                this.items[o].node.active &&
                    (this.items[o].data =
                        n.bookProxy.list.length > o + e
                            ? n.bookProxy.list[o + e]
                            : null);
            }
            var l = n.timeProxy.getLoacalValue("BOOK_STUDY_PARAM"),
                r = !1;
            for (o = 0; o < n.bookProxy.list.length; o++)
                if (n.bookProxy.list[o].hid && 0 != n.bookProxy.list[o].hid) {
                    r = !0;
                    break;
                }
            //一件学习常显
            // i.stringUtil.isBlank(l) || r
            //     ? (this.btnOneKeyStudy.active = !1)
            //     : (this.btnOneKeyStudy.active = !0);
        };
        e.prototype.getCur = function() {
            for (var t = 0, e = 0; e < n.bookProxy.list.length; e++) {
                t += 0 != n.bookProxy.list[e].hid ? 1 : 0;
            }
            return t;
        };
        e.prototype.onPlayVoice = function() {
            if (null != n.bookProxy.list) {
                for (var t = [], e = 0; e < n.bookProxy.list.length; e++)
                    t.push(n.bookProxy.list[e].hid);
                if (0 != t.length) {
                    var o = n.voiceProxy.randomHeroVoice(
                        t[Math.floor(Math.random() * t.length)]
                    );
                    o &&
                        i.audioManager.playSound(
                            "servant/" + o.herovoice,
                            !0,
                            !0
                        );
                }
            }
        };
        e.prototype.onClickAdd = function() {
            var t = localcache.getItem(
                localdb.table_school,
                n.bookProxy.base.desk
            );
            //add by Ocean 
            if(t.VIP>n.playerProxy.userData.vip){
                i.alertUtil.alert18n("LOOK_FOR_VIP_LEVEL_SHORT");
                return;
            }

            if (t) {
                var e = n.bagProxy.getItemCount(1);
                i.utils.showConfirmItem(
                    i18n.t("BOOK_BUY_SEAT", {
                        c: t.cash
                    }),
                    1,
                    e,
                    function() {
                        e < t.cash
                            ? i.alertUtil.alertItemLimit(1)
                            : n.bookProxy.sendBuyDesk();
                    },
                    "BOOK_BUY_SEAT"
                );
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = parseInt(e);
            //修改 向左关闭界面的问题 改为打开最后一页。形成循环
            // if (0 != this.curIndex || -1 != o) {
                var i = Math.floor(
                    (n.bookProxy.base.desk + 1) / this.items.length
                );
                this.curIndex += o;
                this.curIndex = this.curIndex < 0 ? i : this.curIndex;
                this.curIndex = this.curIndex > i ? 0 : this.curIndex;
                this.updateSeatCount();
            // } else this.onClickClost();
        };
        e.prototype.onClickOneKey = function() {
            if (n.playerProxy.userData.vip < 5)
                i.alertUtil.alert18n("BOOK_VIP_ONE_KEY_STUDY");
            else {
                var t = n.timeProxy.getLoacalValue("BOOK_STUDY_PARAM"),
                    e = JSON.parse(t);
                if (null != e) {
                    var o = [],
                        l = 0;
                    for (var r in e) {
                        var a = {};
                        if (0 != e[r]) {
                            if (n.xianyunProxy.isXianYun(e[r])) {
                                l = e[r];
                                break;
                            }
                            a.id = parseInt(r);
                            a.hid = e[r];
                            o.push(a);
                        }
                    }
                    if (0 == l) n.bookProxy.sendOneKeyStudy(o);
                    else {
                        var s = localcache.getItem(localdb.table_hero, l);
                        i.alertUtil.alert(
                            i18n.t("BOOK_HERO_IS_XIAN_YUN", {
                                name: s.name
                            })
                        );
                    }
                } else i.alertUtil.alert18n("BOOK_ONE_KEY_LIMIT");
            }
        };
        e.prototype.onClickOneKeyOver = function() {
            if (n.playerProxy.userData.vip < 4)
                i.alertUtil.alert18n("BOOK_VIP_ONE_KEY_FINISH");
            else {
                for (var t = !1, e = 0; e < n.bookProxy.list.length; e++)
                    if (0 != n.bookProxy.list[e].hid) {
                        t = !0;
                        break;
                    }
                t
                    ? n.bookProxy.sendOneKyOver()
                    : i.alertUtil.alert18n("BOOK_NO_HERO_STUDY");
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAdd", void 0);
        __decorate([_(a.default)], e.prototype, "sp", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeAll", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([_(cc.Node)], e.prototype, "ndoeRight", void 0);
        __decorate([_([r.default])], e.prototype, "items", void 0);
        __decorate([_([cc.Node])], e.prototype, "gais", void 0);
        __decorate([_([cc.Label])], e.prototype, "lblCosts", void 0);
        __decorate([_([cc.Label])], e.prototype, "lblVip", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblAdd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnOneKeyStudy", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
