var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDate = null;
            e.records = null;
            e.scroll = null;
            e.content = null;
            e.boat = null;
            e.contentScroll = null;
            e.startNode = null;
            e.endNode = null;
            e.heroHead = null;
            e.headUrl = null;
            e.check = null;
            e.lblNum = null;
            e.boatAnie = null;
            e.welcome = null;
            e.pointList = [];
            e.isFirst = !0;
            e._oldId = 0;
            e._oldScore = 0;
            e.isMove = !1;
            e.isEvent = !1;
            e.playType = "";
            e.selfMoving = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.dragonBoatProxy.DRAGON_BOAT_RECORD_UPDATE,
                this.onRecords,
                this
            );
            facade.subscribe(
                n.dragonBoatProxy.DRAGON_BOAT_CFG_UPDATE,
                this.onCfg,
                this
            );
            facade.subscribe(
                n.dragonBoatProxy.DRAGON_BOAT_ACT_UPDATE,
                this.onAct,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            this.pointList = localcache.getList(localdb.table_duanwu_point);
            this.startNode.x = this.pointList[0].dwm_x;
            this.startNode.y = this.pointList[0].dwm_y;
            this.endNode.x = this.pointList[this.pointList.length - 1].dwm_x;
            this.endNode.y = this.pointList[this.pointList.length - 1].dwm_y;
            n.dragonBoatProxy.sendOpenActivity();
        };
        e.prototype.onCfg = function() {
            var t = this;
            r.uiUtils.countDown(
                n.dragonBoatProxy.cfg.info.eTime,
                this.lblDate,
                function() {
                    t.lblDate.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };
        e.prototype.onAct = function() {
            var t = n.dragonBoatProxy.act;
            if (null != t) {
                var e = localcache.getItem(
                    localdb.table_duanwu_point,
                    0 == t.place ? 1 : t.place
                );
                if (this.isFirst) {
                    this.boat.x = e.dwm_x;
                    this.boat.y = e.dwm_y;
                    this.isFirst = !1;
                    this._oldId = t.place;
                    this.lblNum.string =
                        n.bagProxy.getItemCount(n.dragonBoatProxy.cfg.need) +
                        "";
                    (null != t.cons && 0 != t.cons) ||
                        !n.dragonBoatProxy.isFirst ||
                        (this.welcome.active = !0);
                    n.dragonBoatProxy.isFirst = !1;
                    this._oldScore = n.dragonBoatProxy.act.cons;
                    this.check.isChecked = n.dragonBoatProxy.isSelf;
                    this.changeScrollX(e.dwm_x);
                } else {
                    var o = t.place - this._oldId;
                    if ((o >= 4 && o < 6) || o >= 40) {
                        var l = Math.floor(
                                Math.random() *
                                    (n.servantProxy.servantList.length - 1)
                            ),
                            a = localcache.getItem(
                                localdb.table_hero,
                                n.servantProxy.servantList[l].id
                            ),
                            s = Math.ceil(5 * Math.random());
                        i.alertUtil.alert(
                            i18n.t("DRAGON_BOAT_GU_WU_" + s, {
                                name: a.name
                            })
                        );
                        this.headUrl.url = r.uiHelps.getServantHead(a.heroid);
                        this.heroHead.active = !0;
                        this.scheduleOnce(this.hideHead, 2);
                    }
                    this.isEvent =
                        n.dragonBoatProxy.act.eventPlace &&
                        0 != n.dragonBoatProxy.act.eventPlace;
                    var c = n.dragonBoatProxy.act.cons - this._oldScore;
                    i.alertUtil.alert(
                        i18n.t("CLOTHE_PVE_SCORE_ADD", {
                            d: c
                        })
                    );
                    this._oldScore = n.dragonBoatProxy.act.cons;
                    this.onMove();
                }
            }
        };
        e.prototype.hideHead = function() {
            this.heroHead.active = !1;
        };
        e.prototype.onMove = function() {
            this.isMove = !0;
            var t = localcache.getItem(
                    localdb.table_duanwu_point,
                    n.dragonBoatProxy.act.place
                ),
                e = 3 * Math.random() + 1;
            this.boat.runAction(cc.moveTo(e, new cc.Vec2(t.dwm_x, t.dwm_y)));
            this.boatAnie.animation = "run";
            this.scheduleOnce(this.onTimer, e);
            this.changeScrollX(t.dwm_x);
            if (n.dragonBoatProxy.act.tid) {
                this.scheduleOnce(this.onAlert, e);
                this.scheduleOnce(this.onTimerEnd, e + 3.5);
            } else this.scheduleOnce(this.onTimerEnd, e + 2);
        };
        e.prototype.onTimer = function() {
            this._oldId = n.dragonBoatProxy.act.place;
            if (n.dragonBoatProxy.act.tid) {
                if (
                    localcache.getItem(
                        localdb.table_duanwu_event,
                        n.dragonBoatProxy.act.tid
                    ) &&
                    this.isEvent
                ) {
                    this.onMoveEventPlace();
                    return;
                }
            }
            this.onMoveEnd();
        };
        e.prototype.onSelfTimer = function() {
            if (i.utils.isOpenView("AlertItemMore")) {
                i.utils.closeNameView("AlertItemMore");
                i.utils.popNext(!1);
            } else if (i.utils.isOpenView("AlertItemShow")) {
                i.utils.closeNameView("AlertItemShow");
                i.utils.popNext(!1);
            }
            if (n.dragonBoatProxy.cfg.info.eTime < i.timeUtil.second) {
                this.check.isChecked = n.dragonBoatProxy.isSelf = this.selfMoving = !1;
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            } else if (
                n.bagProxy.getItemCount(n.dragonBoatProxy.cfg.need) <
                parseInt(this.playType)
            ) {
                this.check.isChecked = n.dragonBoatProxy.isSelf = this.selfMoving = !1;
                i.alertUtil.alertItemLimit(n.dragonBoatProxy.cfg.need);
            } else n.dragonBoatProxy.sendPlay(parseInt(this.playType));
        };
        e.prototype.onMoveEventPlace = function() {
            var t = localcache.getItem(
                localdb.table_duanwu_point,
                n.dragonBoatProxy.act.eventPlace
            );
            this.boat.runAction(cc.moveTo(1, new cc.Vec2(t.dwm_x, t.dwm_y)));
            this.isEvent = !1;
            this.boatAnie.animation = "run";
            this.scheduleOnce(this.onEventTimer, 1.5);
        };
        e.prototype.onEventTimer = function() {
            this.onMoveEnd();
        };
        e.prototype.onMoveEnd = function() {
            this.boatAnie.animation = "idle";
            if (!this.isEvent && n.dragonBoatProxy.isSelf) {
                this.scheduleOnce(this.onSelfTimer, 1);
                if (
                    n.dragonBoatProxy.act.place ==
                    this.pointList[this.pointList.length - 1].dwm_id
                ) {
                    this.boat.x = this.pointList[0].dwm_x;
                    this.boat.y = this.pointList[0].dwm_y;
                    this._oldId = this.pointList[0].dwm_id;
                    this.changeScrollX(0);
                    i.alertUtil.alert18n("DRAGON_BOAT_KAI_QI_XIN_DE_YI_LUN");
                }
            }
            n.timeProxy.floatReward();
        };
        e.prototype.onAlert = function() {
            var t = localcache.getItem(
                localdb.table_duanwu_event,
                n.dragonBoatProxy.act.tid
            );
            i.alertUtil.alert(t.dwe_text);
        };
        e.prototype.onRecords = function() {
            this.records.data = n.dragonBoatProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickPlay = function(t, e) {
            var o = this;
            if (
                n.dragonBoatProxy.isSelf &&
                this.check.isChecked &&
                this.selfMoving
            )
                this.closeSelf();
            else if (this.isMove) i.alertUtil.alert18n("GIRLS_DAY_ROLLING");
            else if (i.timeUtil.second > n.dragonBoatProxy.cfg.info.eTime)
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                var l = parseInt(e);
                if (n.bagProxy.getItemCount(n.dragonBoatProxy.cfg.need) < l) {
                    i.alertUtil.alertItemLimit(n.dragonBoatProxy.cfg.need);
                    i.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: n.dragonBoatProxy.shop[0],
                        activityId: n.dragonBoatProxy.cfg.info.id
                    });
                } else {
                    var r = this;
                    if (n.dragonBoatProxy.isSelf) {
                        var a = "DRAGON_BOAT_SELF_" + e;
                        i.utils.showConfirm(i18n.t(a), function() {
                            n.dragonBoatProxy.sendPlay(l);
                            i.alertUtil.alert18n("DRAGON_BOAT_SELF_KAI_QI");
                            o.playType = e;
                            o.selfMoving = !0;
                            o.isMove = !0;
                        });
                    } else if (
                        n.dragonBoatProxy.act.place !=
                            this.pointList[this.pointList.length - 1].dwm_id ||
                        this._oldId == this.pointList[0].dwm_id
                    ) {
                        n.dragonBoatProxy.sendPlay(l);
                        this.isMove = !0;
                    } else
                        i.utils.showConfirm(
                            i18n.t("DRAGON_BOAT_IS_RESET"),
                            function() {
                                r.contentScroll.scrollToLeft(0.5);
                                r.boat.x = o.pointList[0].dwm_x;
                                r.boat.y = o.pointList[0].dwm_y;
                                o._oldId = o.pointList[0].dwm_id;
                            }
                        );
                }
            }
        };
        e.prototype.onTimerEnd = function() {
            this.isMove = !1;
        };
        e.prototype.onClickTab = function(t, e) {
            if (n.dragonBoatProxy.isSelf && this.check.isChecked)
                this.closeSelf();
            else
                switch (e) {
                    case "1":
                        i.utils.openPrefabView(
                            "ActivityShopView",
                            null,
                            n.dragonBoatProxy.dhShop
                        );
                        break;

                    case "2":
                        i.utils.openPrefabView(
                            "limitactivity/LimitActivityView",
                            null,
                            {
                                type: n.limitActivityProxy.DRAGON_BOAT_TYPE
                            }
                        );
                        break;

                    case "3":
                        i.utils.openPrefabView("dragonboat/DragonBoatRwd");
                        break;

                    case "4":
                        i.utils.openPrefabView("ActivitySpecialBuy", null, {
                            data: n.dragonBoatProxy.shop[0],
                            activityId: n.dragonBoatProxy.cfg.info.id
                        });
                }
        };
        e.prototype.closeSelf = function() {
            var t = this;
            i.utils.showConfirm(i18n.t("DRAGON_BOAT_CLOSE_SELF"), function() {
                t.check.isChecked = n.dragonBoatProxy.isSelf = t.selfMoving = !1;
            });
        };
        e.prototype.onClickCheck = function() {
            if (this.selfMoving) {
                i.alertUtil.alert18n("DRAGON_BOAT_IS_MOVING");
                this.check.isChecked = !0;
            } else if (this.isMove) {
                i.alertUtil.alert18n("DRAGON_BOAT_IS_MOVING");
                this.check.isChecked = !1;
            } else {
                if (!this.check.isChecked) {
                    this.selfMoving = !1;
                    i.alertUtil.alert18n("DRAGON_BOAT_SELF_GUAN_BI");
                }
                n.dragonBoatProxy.isSelf = this.check.isChecked;
            }
        };
        e.prototype.onTimerClose = function() {
            this.isMove = !1;
        };
        e.prototype.changeScrollX = function(t) {
            if (t < 360) this.contentScroll.scrollToPercentHorizontal(0, 2);
            else if (t > 360 && t < 1800) {
                var e = t - 360;
                this.contentScroll.scrollToPercentHorizontal(e / 1800, 2);
            } else
                t >= 1800 && this.contentScroll.scrollToPercentHorizontal(1, 2);
        };
        e.prototype.onItemUpdate = function() {
            this.lblNum.string =
                n.bagProxy.getItemCount(n.dragonBoatProxy.cfg.need) + "";
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onCloseWelcome = function() {
            this.welcome.active = !1;
        };
        __decorate([_(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([_(l.default)], e.prototype, "records", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([_(cc.Node)], e.prototype, "content", void 0);
        __decorate([_(cc.Node)], e.prototype, "boat", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "contentScroll", void 0);
        __decorate([_(cc.Node)], e.prototype, "startNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "endNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "heroHead", void 0);
        __decorate([_(a.default)], e.prototype, "headUrl", void 0);
        __decorate([_(cc.Toggle)], e.prototype, "check", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "boatAnie", void 0);
        __decorate([_(cc.Node)], e.prototype, "welcome", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
