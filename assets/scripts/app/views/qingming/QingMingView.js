var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("./QingMingPoint"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("./QingMingVehicleItem"),
    c = require("../../utils/ShaderUtils"),
    _ = require("../../component/ConfirmView"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.scroll = null;
            e.progress = null;
            e.lblSdNum = null;
            e.lblRanNum = null;
            e.lblTime = null;
            e.content = null;
            e.records = null;
            e.pointItem = null;
            e.horse = null;
            e.lblCount = null;
            e.vehicleArr = [];
            e.lblPro = null;
            e.horseArr = [];
            e.recordScroll = null;
            e.check = null;
            e.nextId = 0;
            e._oldId = 0;
            e._pointNum = 0;
            e._backNum = 0;
            e._maxNum = 0;
            e._isMoving = !1;
            e._isRolling = !1;
            e.isFirst = !0;
            e.rollType = 1;
            e.pointList = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.qingMingProxy.QING_MING_CFG_DATA,
                this.onQingMingData,
                this
            );
            facade.subscribe(
                r.qingMingProxy.QING_MING_ROLL_DATA,
                this.onRollData,
                this
            );
            facade.subscribe(
                r.qingMingProxy.QING_MING_MOVE_POINT,
                this.updateMove,
                this
            );
            facade.subscribe(
                r.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe(
                r.qingMingProxy.QING_MING_UPDATE_VEHICLE,
                this.onUpdateVechile,
                this
            );
            facade.subscribe(
                r.qingMingProxy.QING_MING_RECORDS,
                this.onRecords,
                this
            );
            r.qingMingProxy.sendOpenActivity();
            this.createPoint();
        };
        e.prototype.onQingMingData = function() {
            if (r.qingMingProxy.cfg) {
                var t = this;
                a.uiUtils.countDown(
                    r.qingMingProxy.cfg.info.eTime,
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                this.onItemUpdate();
            }
        };
        e.prototype.onRollData = function() {
            var t = r.qingMingProxy.rollData;
            if (null != t) {
                var e = localcache.getItem(
                    localdb.table_dafuweng_point,
                    0 == t.place ? 1 : t.place
                );
                if (this.isFirst && 0 == this._oldId) {
                    this.horse.x = e.x;
                    this.horse.y = e.y;
                    this.isFirst = !1;
                    this.nextId = this._oldId = t.place;
                    this.changeScrollX(e.x);
                    if (0 == t.cons && r.qingMingProxy.isFirst) {
                        var o = i.utils.getParamStr("qingming_story_id");
                        r.playerProxy.addStoryId(o);
                        i.utils.openPrefabView("StoryView", !1, {
                            type: 3
                        });
                        r.qingMingProxy.isFirst = !1;
                    }
                    this.updatePoint();
                    this.onUpdateVechile();
                    this.onUpdateProgress();
                }
                if (t.dice) {
                    var n = 0;
                    t.dice.num1 && (n += t.dice.num1);
                    t.dice.num2 && (n += t.dice.num2);
                    t.dice.num3 && (n += t.dice.num3);
                    this.nextId += n;
                }
                for (var l = 0; l < this.vehicleArr.length; l++)
                    if (!(l >= r.qingMingProxy.cfg.vehicle.length)) {
                        this.vehicleArr[l].data =
                            r.qingMingProxy.cfg.vehicle[l];
                        t.cons >= r.qingMingProxy.cfg.vehicle[l].score
                            ? c.shaderUtils.clearNodeShader(
                                  this.vehicleArr[l].node
                              )
                            : c.shaderUtils.setNodeGray(
                                  this.vehicleArr[l].node
                              );
                    }
            }
        };
        e.prototype.createPoint = function() {
            this.pointList = localcache.getList(localdb.table_dafuweng_point);
            this._maxNum = this.pointList.length;
            for (var t = 0; t < this.pointList.length; t++) {
                var e = cc.instantiate(this.pointItem);
                e.getComponent(l.default).data = this.pointList[t];
                e.active = !0;
                e.x = this.pointList[t].x;
                e.y = this.pointList[t].y;
                this.content.addChild(e);
            }
            this.horse.setSiblingIndex(99);
        };
        e.prototype.onUpdateVechile = function() {
            if (null != r.qingMingProxy.rollData)
                for (var t = 0; t < this.vehicleArr.length; t++)
                    if (!(t >= r.qingMingProxy.cfg.vehicle.length)) {
                        this.vehicleArr[t].data =
                            r.qingMingProxy.cfg.vehicle[t];
                        var e =
                            t == r.qingMingProxy.vehicleIndex &&
                            r.qingMingProxy.rollData.cons >=
                                r.qingMingProxy.cfg.vehicle[t].score;
                        this.vehicleArr[t].select = e;
                        a.uiUtils.scaleRepeat(
                            this.vehicleArr[t].node,
                            e ? 0.9 : 1,
                            e ? 1.1 : 1
                        );
                        this.horseArr[t].node.active =
                            t == r.qingMingProxy.vehicleIndex;
                        t == r.qingMingProxy.vehicleIndex &&
                            (this.rollType = r.qingMingProxy.cfg.vehicle[t].id);
                    }
        };
        e.prototype.onClickRollType = function(t, e) {
            if (r.qingMingProxy.cfg.vehicle && r.qingMingProxy.rollData) {
                var o = parseInt(e);
                this.vehicleArr[o];
                for (var n = 0; n < this.vehicleArr.length; n++) {
                    var l =
                        n == o &&
                        r.qingMingProxy.rollData.cons >=
                            r.qingMingProxy.cfg.vehicle[n].score;
                    this.vehicleArr[n].select = l;
                    a.uiUtils.scaleRepeat(
                        this.vehicleArr[n].node,
                        l ? 0.9 : 1,
                        l ? 1.1 : 1
                    );
                    if (n == o) {
                        this.rollType = r.qingMingProxy.cfg.vehicle[n].id;
                        l ||
                            i.alertUtil.alert(
                                i18n.t("QING_MING_SCORE_LOCK", {
                                    num: r.qingMingProxy.cfg.vehicle[n].score,
                                    name: r.qingMingProxy.cfg.vehicle[n].name
                                })
                            );
                    }
                }
            }
        };
        e.prototype.updateMove = function() {
            if (this.nextId > this._maxNum) {
                this._backNum = this.nextId - this._maxNum;
                this.nextId = this._maxNum;
            }
            this._pointNum = this.nextId - this._oldId;
            this._isMoving = !0;
            this.schedule(this.onTimer, 0.5);
        };
        e.prototype.updatePoint = function() {
            for (
                var t = this.content.getComponentsInChildren(l.default), e = 0;
                e < t.length;
                e++
            ) {
                var o = t[e],
                    i = t[e].data;
                if (o) {
                    o.yellowEvent.node.active =
                        2 == i.type && i.id <= this._oldId;
                    o.yellowNor.node.active =
                        1 == i.type && i.id <= this._oldId;
                    o.redEvent.node.active = 2 == i.type && i.id > this._oldId;
                    o.redNor.node.active = 1 == i.type && i.id > this._oldId;
                    o.end.node.active = 3 == i.type;
                    o.begin.node.active = 4 == i.type;
                }
            }
        };
        e.prototype.onTimer = function() {
            var t = null;
            if (this._pointNum > 0) {
                this._pointNum--;
                this._oldId++;
                t = localcache.getItem(
                    localdb.table_dafuweng_point,
                    this._oldId
                );
                this.moveHorse();
            } else if (this._backNum > 0) {
                this._backNum--;
                this._oldId--;
                this.nextId--;
                this.moveHorse();
            } else {
                i.alertUtil.alert("QING_MING_TA_QING_JI_FEN", {
                    num: r.qingMingProxy.rollData.add
                });
                if (2 == r.qingMingProxy.rollData.type) {
                    var e = localcache.getItem(
                        localdb.table_dafuweng_event,
                        r.qingMingProxy.rollData.typeid
                    );
                    i.alertUtil.alert(e.talk1);
                } else
                    3 == r.qingMingProxy.rollData.type &&
                        i.alertUtil.alert18n("QING_MING_FINISH");
                r.timeProxy.floatReward();
                this.onUpdateProgress();
                this._isMoving = !1;
                this._isRolling = !1;
                t = localcache.getItem(
                    localdb.table_dafuweng_point,
                    r.qingMingProxy.rollData.place
                );
                this.unscheduleAllCallbacks();
                if (this.check.isChecked && r.qingMingProxy.isSelf) {
                    var o = localcache.getList(localdb.table_dafuweng_point);
                    if (o[o.length - 1].id == r.qingMingProxy.rollData.place)
                        this.closeSelf();
                    else if (
                        r.bagProxy.getItemCount(r.qingMingProxy.cfg.need) > 0
                    )
                        this.scheduleOnce(this.selfTimer, 1);
                    else {
                        this.closeSelf();
                        i.alertUtil.alertItemLimit(r.qingMingProxy.cfg.need);
                    }
                }
            }
            t && this.changeScrollX(t.x);
        };
        e.prototype.closeSelf = function() {
            this.check.isChecked = !1;
            r.qingMingProxy.isSelf = !1;
            i.alertUtil.alert18n("QING_MING_GUAN_BI_TIP");
        };
        e.prototype.moveHorse = function() {
            var t = localcache.getItem(
                localdb.table_dafuweng_point,
                this._oldId
            );
            this.horse.runAction(cc.moveTo(0.1, new cc.Vec2(t.x, t.y)));
            this.updatePoint();
        };
        e.prototype.onClickTab = function(t, e) {
            var o = this;
            if (this.check.isChecked && r.qingMingProxy.isSelf)
                i.utils.showConfirm(i18n.t("QING_MING_GUAN_BI"), function() {
                    o.check.isChecked = !1;
                    r.qingMingProxy.isSelf = !1;
                });
            else if (this._isMoving)
                i.alertUtil.alert18n("QING_MING_ZHENG_ZAI_YI_DONG");
            else if (this._isRolling)
                i.alertUtil.alert18n("QING_MING_ZHENG_ZAI_YAO_DIAN");
            else {
                var n = localcache.getList(localdb.table_dafuweng_point);
                "1" == e
                    ? i.utils.openPrefabView("limitactivity/DHShop")
                    : "2" == e
                    ? i.utils.openPrefabView(
                          "limitactivity/LimitActivityView",
                          null,
                          {
                              type: r.limitActivityProxy.QING_MING_TYPE
                          }
                      )
                    : "3" == e &&
                      i.utils.openPrefabView("qingming/QingMingRankRwd");
                if (i.timeUtil.second > r.qingMingProxy.cfg.info.eTime)
                    i.alertUtil.alert18n("ACTHD_OVERDUE");
                else if ("4" == e) {
                    if (r.qingMingProxy.rollData.place == n[n.length - 1].id) {
                        this.onShowCon();
                        return;
                    }
                    i.utils.openPrefabView("qingming/QingMingRollSelect");
                } else if ("5" == e) {
                    if (r.qingMingProxy.rollData.place == n[n.length - 1].id) {
                        this.onShowCon();
                        return;
                    }
                    if (
                        0 == r.bagProxy.getItemCount(r.qingMingProxy.cfg.need)
                    ) {
                        i.alertUtil.alertItemLimit(r.qingMingProxy.cfg.need);
                        i.utils.openPrefabView("ActivitySpecialBuy", null, {
                            data: r.qingMingProxy.shop[0],
                            activityId: r.qingMingProxy.cfg.info.id
                        });
                        return;
                    }
                    if (this.check.isChecked && !r.qingMingProxy.isSelf) {
                        i.utils.showConfirm(
                            i18n.t("QING_MING_ZI_DONG"),
                            function(t) {
                                r.qingMingProxy.isSelf = !0;
                                o.selfTimer();
                            }
                        );
                        return;
                    }
                    r.qingMingProxy.sendRoll(
                        r.qingMingProxy.cfg.need,
                        this.rollType
                    );
                    this._isRolling = !0;
                }
            }
        };
        e.prototype.onShowCon = function() {
            var t = this,
                e = this;
            i.utils.showConfirm(i18n.t("SPELL_IS_RESET"), function(o) {
                if (o != _.default.NO) {
                    var i = localcache.getItem(localdb.table_dafuweng_point, 1);
                    e.horse.x = i.x;
                    e.horse.y = i.y;
                    r.qingMingProxy.rollData.place = t._oldId = t.nextId = 1;
                    t.updatePoint();
                    t.scroll.scrollToPercentHorizontal(0, 1);
                }
            });
        };
        e.prototype.onItemUpdate = function() {
            if (r.qingMingProxy.cfg) {
                this.lblCount.string =
                    r.bagProxy.getItemCount(r.qingMingProxy.cfg.need) + "";
                this.lblRanNum.string =
                    r.bagProxy.getItemCount(r.qingMingProxy.cfg.need) + "";
                for (var t = 0, e = 0; e < r.qingMingProxy.pointArr.length; e++)
                    t += r.bagProxy.getItemCount(
                        r.qingMingProxy.pointArr[e].id
                    );
                this.lblSdNum.string = t + "";
            }
        };
        e.prototype.onClickBuy = function() {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: r.qingMingProxy.shop[0],
                activityId: r.qingMingProxy.cfg.info.id
            });
        };
        e.prototype.onClickClose = function() {
            r.qingMingProxy.isSelf = !1;
            i.utils.closeView(this);
        };
        e.prototype.onUpdateProgress = function() {
            var t =
                r.qingMingProxy.cfg.vehicle[
                    r.qingMingProxy.cfg.vehicle.length - 1
                ].score;
            this.progress.progress = r.qingMingProxy.rollData.cons / t;
            if (
                r.qingMingProxy.rollData.cons <
                r.qingMingProxy.cfg.vehicle[
                    r.qingMingProxy.cfg.vehicle.length - 1
                ].score
            ) {
                for (var e = 0; e < r.qingMingProxy.cfg.vehicle.length; e++)
                    if (
                        r.qingMingProxy.rollData.cons <
                        r.qingMingProxy.cfg.vehicle[e].score
                    ) {
                        this.lblPro.string = i18n.t("COMMON_NUM", {
                            f: r.qingMingProxy.rollData.cons,
                            s: r.qingMingProxy.cfg.vehicle[e].score
                        });
                        break;
                    }
            } else
                this.lblPro.string = i18n.t("COMMON_NUM", {
                    f: r.qingMingProxy.rollData.cons,
                    s:
                        r.qingMingProxy.cfg.vehicle[
                            r.qingMingProxy.cfg.vehicle.length - 1
                        ].score
                });
        };
        e.prototype.changeScrollX = function(t) {
            if (t > 360 && t < 1800) {
                var e = t - 360;
                this.scroll.scrollToPercentHorizontal(e / 1800, 2);
            } else t >= 1800 && this.scroll.scrollToPercentHorizontal(1, 2);
        };
        e.prototype.onRecords = function() {
            this.records.data = r.qingMingProxy.records;
            this.recordScroll.scrollToBottom();
        };
        e.prototype.onClickCheck = function() {
            if (!this.check.isChecked) {
                i.alertUtil.alert18n("QING_MING_GUAN_BI_TIP");
                r.qingMingProxy.isSelf = !1;
            }
        };
        e.prototype.selfTimer = function() {
            if (i.utils.isOpenView("AlertItemMore")) {
                i.utils.closeNameView("AlertItemMore");
                i.utils.popNext(!1);
            } else if (i.utils.isOpenView("AlertItemShow")) {
                i.utils.closeNameView("AlertItemShow");
                i.utils.popNext(!1);
            }
            r.qingMingProxy.sendRoll(r.qingMingProxy.cfg.need, this.rollType);
        };
        e.prototype.showTip = function() {};
        __decorate([p(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([p(cc.ProgressBar)], e.prototype, "progress", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblSdNum", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblRanNum", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([p(cc.Node)], e.prototype, "content", void 0);
        __decorate([p(n.default)], e.prototype, "records", void 0);
        __decorate([p(cc.Node)], e.prototype, "pointItem", void 0);
        __decorate([p(cc.Node)], e.prototype, "horse", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([p([s.default])], e.prototype, "vehicleArr", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([p([sp.Skeleton])], e.prototype, "horseArr", void 0);
        __decorate([p(cc.ScrollView)], e.prototype, "recordScroll", void 0);
        __decorate([p(cc.Toggle)], e.prototype, "check", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
