var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/StateImg"),
    r = require("../../Initializer"),
    a = require("./LookBuildItem"),
    s = require("../../utils/ShaderUtils"),
    c = require("../../Config"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.lblLuck = null;
            e.btnLook = null;
            e.nodeRecy = null;
            e.luckImg = null;
            e.roleAnimation = null;
            e.roleSpine = null;
            e.beijing = null;
            e.blockNode = null;
            e.scroll = null;
            e.bgNode = null;
            e.lblTip = null;
            e.lblLookTip = null;
            e.nodeCount = null;
            e.checkAuto = null;
            e.nodeAutoTip = null;
            e._points = {};
            e._isMove = !1;
            e._speed = 200;
            e._moveBuild = null;
            e._lastTime = 0;
            e._showLv = 5;
            e._lastBuildId = 0;
            e._lastX = 999;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this;
            this.updateTime();
            this.updateCover();
            for (
                var e = this.beijing.getComponentsInChildren(a.default), o = 0; o < e.length; o++
            ) {
                var n = e[o];
                this._points[n.id] = n;
            }
            this.scheduleOnce(this.updateBuild, 0.6);
            facade.subscribe(
                r.lookProxy.UPDATE_XUNFANG_RECOVER,
                this.updateCover,
                this
            );
            facade.subscribe(
                r.lookProxy.UPDATE_XUNFANG_XFINFO,
                this.updateTime,
                this
            );
            facade.subscribe(r.lookProxy.UPDATE_XUNFANG_WIN, this.onWin, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onCheckClost, this);
            facade.subscribe("STORY_VIEW_DESOTRY", this.onStoryEnd, this);
            facade.subscribe("UNLOCK_AUTO_LOOK", this.unlockAuto, this);
            facade.subscribe("LOOK_CLOST_WIN_WIN", this.onStoryEnd, this);
            this.scheduleOnce(function () {
                var e = t.scroll.getComponent(cc.Widget).bottom;
                t.node.height - e > t.bgNode.height &&
                    (t.scroll.node.scaleX = t.scroll.node.scaleY =
                        (t.node.height - e) / t.bgNode.height);
            }, 0.01);
            this.checkAuto.node.active =
                r.playerProxy.userData.level > this._showLv &&
                (r.playerProxy.userData.level >=
                    i.utils.getParamInt("auto_lookout_lv") ||
                    r.playerProxy.getVipValue("is_jump"));
            this.nodeAutoTip.active = !this.checkAuto.node.active &&
                r.playerProxy.userData.level > this._showLv;
            var l = localcache.getItem(
                localdb.table_officer,
                r.playerProxy.userData.level
            );
            l && (this.lblTip.string = l.buttontext);

            if (r.guideProxy.guideUI && !r.guideProxy.guideUI.isHideShow()) {
                this.blockNode.active = true;
            } else {
                this.blockNode.active = false;
            }

        };
        e.prototype.unlockAuto = function (t) {
            if (this.checkAuto.isChecked) {
                this.checkAuto.isChecked = !1;
                i.alertUtil.alert18n("LOOK_UNLOCK_SELECT");
            }
        };
        e.prototype.onStoryEnd = function () {
            if (
                !(r.lookProxy.xfinfo.num <= 0) &&
                this.checkAuto.node.active &&
                this.checkAuto.isChecked
            ) {
                facade.send("CLOST_ITEM_SHOW");
                this.onClickLook(null, 0);
            }
        };
        e.prototype.onCheckClost = function () {
            var t = Math.abs(this.scroll.getScrollOffset().x);
            Math.abs(this.scroll.getScrollOffset().x) < 10 &&
                this._lastX < 10 &&
                this.onClickClost();
            this._lastX = t;
        };
        e.prototype.updateBuild = function () {
            for (
                var t = r.timeProxy.getLoacalValue("LookBuild"),
                    e = i.stringUtil.isBlank(t) ? [] : JSON.parse(t),
                    o = this.beijing.getComponentsInChildren(cc.Button),
                    n = !0,
                    l = !1,
                    a = 0; a < o.length; a++
            ) {
                var c = parseInt(o[a].clickEvents[0].customEventData + ""),
                    _ = this.isOpen(c),
                    d = o[a].getComponentInChildren(cc.Sprite);
                _ || s.shaderUtils.setImageGray(d);
                if (_ && -1 == e.indexOf(c)) {
                    if (n) {
                        this.scroll.scrollToOffset(
                            new cc.Vec2(
                                o[a].node.x - 360 > 0 ? o[a].node.x - 360 : 0,
                                0
                            )
                        );
                        n = !1;
                    }
                    i.utils.showEffect(o[a], 0);
                    e.push(c);
                    l = !0;
                }
            }
            if (l) {
                i.alertUtil.alert18n("LOOK_NEW_UNLOCK");
                r.timeProxy.saveLocalValue("LookBuild", JSON.stringify(e));
            }
        };
        e.prototype.updateTime = function () {
            var t = localcache.getItem(
                localdb.table_vip,
                r.playerProxy.userData.vip
            );
            r.lookProxy.xfinfo.num < t.tili ?
                n.uiUtils.countDown(
                    r.lookProxy.xfinfo.next,
                    this.lblCount,
                    function () {
                        r.playerProxy.sendAdok(r.lookProxy.xfinfo.label);
                    },
                    0 == r.lookProxy.xfinfo.num
                ) :
                this.lblCount.unscheduleAllCallbacks();
            var e =
                49 ==
                localcache.getItem(
                    localdb.table_mainTask,
                    r.taskProxy.mainTask.id
                ).type &&
                r.taskProxy.mainTask.num < r.taskProxy.mainTask.max;
            this.lblCount.string = i18n.t("COMMON_NUM", {
                f: r.lookProxy.xfinfo.num,
                s: t.tili
            });
            this.nodeRecy.active =
                0 == r.lookProxy.xfinfo.num &&
                r.playerProxy.userData.level > this._showLv;
            this.btnLook.node.active =
                r.lookProxy.xfinfo.num > 0 &&
                (r.playerProxy.userData.level > this._showLv || e);
            this.lblLookTip.string =
                r.playerProxy.userData.level > this._showLv ?
                "" :
                this.getLookTip();
            this.nodeCount.active = r.playerProxy.userData.level > this._showLv;
        };
        e.prototype.getLookTip = function () {
            for (
                var t = localcache.getList(localdb.table_lookEvent), e = 0; e < t.length; e++
            )
                if (t[e].object == r.taskProxy.mainTask.id) return t[e].text;
            return i18n.t("LOOK_OUT_TIP");
        };
        e.prototype.updateCover = function () {
            this.lblLuck.string = r.lookProxy.recover.num + "";
            this.luckImg.total = 10;
            this.luckImg.value = Math.floor(r.lookProxy.recover.num / 10);
        };
        e.prototype.onClickClost = function () {
            i.utils.isOpenView("look/LookBuildInfo") &&
                    i.utils.closeNameView("look/LookBuildInfo");
            i.utils.closeView(this, !0);
        };
        e.prototype.onClickRecy = function () {
            var t = i.utils.getParamInt("xf_cost_item_tl"),
                e = r.bagProxy.getItemCount(t);
            e < 1 ?
                i.alertUtil.alertItemLimit(t) :
                this.checkAuto.node.active ?
                i.utils.showConfirmItemMore(
                    i18n.t("LOOK_USE_RECY_CONFIRM", {
                        n: r.playerProxy.getKindIdName(1, t),
                        c: 1
                    }),
                    t,
                    e,
                    function (o) {
                        e < o ?
                            i.alertUtil.alertItemLimit(t) :
                            r.lookProxy.sendRecover(o);
                    }
                ) :
                i.utils.showConfirmItem(
                    i18n.t("LOOK_USE_RECY_CONFIRM", {
                        n: r.playerProxy.getKindIdName(1, t),
                        c: 1
                    }),
                    t,
                    e,
                    function () {
                        e < 1 ?
                            i.alertUtil.alertItemLimit(t) :
                            r.lookProxy.sendRecover();
                    },
                    "LOOK_USE_RECY_CONFIRM"
                );
        };
        e.prototype.onClickLook = function (t, e) {
            if (!this._isMove) {
                var o = e ? parseInt(e) : 0;
                if (r.lookProxy.xfinfo.num <= 0)
                    i.alertUtil.alert(i18n.t("LOOK_ACTIVE_LIMIT"));
                else {
                    this.btnLook.interactable = !1;
                    r.lookProxy.sendXunfan(o);
                }
            }
        };
        e.prototype.onClickBuild = function (t, e) {
            i.utils.openPrefabView("look/LookBuildInfo", null, e);
        };
        e.prototype.onClickAdd = function () {
            i.utils.openPrefabView("look/LookLuck");
        };
        e.prototype.onWin = function () {
            this._speed = 200;
            if (r.lookProxy.win.xfAll && r.lookProxy.win.xfAll.length > 0)
                if (r.lookProxy.win.xfAll.length > 1)
                    for (var t = 0; t < r.lookProxy.win.xfAll.length; t++) {
                        i.alertUtil.alert(
                            r.lookProxy.getString(r.lookProxy.win.xfAll[t])
                        );
                        this.checkStory(r.lookProxy.win.xfAll[t]);
                    }
            else {
                var e = r.lookProxy.win.xfAll[0];
                this._moveBuild = null;
                c.Config.DEBUG && cc.log("npc id " + e.npcid);
                if (7 == e.type) {
                    var o = localcache.getItem(
                        localdb.table_lookEvent,
                        e.npcid
                    );
                    if (o)
                        if (0 == o.locale) {
                            var n =
                                0 != e.build ?
                                e.build :
                                this.getRandomOpenLocale();
                            this._moveBuild = this._points[n];
                            this._lastBuildId = n;
                        } else {
                            this._moveBuild = this._points[o.locale];
                            this._lastBuildId = o.locale;
                        }
                } else {
                    var l = localcache.getItem(localdb.table_look, e.npcid);
                    if (l && 0 != l.build) {
                        this._moveBuild = this._points[l.build];
                        this._lastBuildId = l.build;
                    } else {
                        n = this.getRandomOpenLocale();
                        this._moveBuild = this._points[n];
                        this._lastBuildId = n;
                    }
                }
                if (this._moveBuild) {
                    this.setRunState();
                    this._lastTime = cc.sys.now();
                    this._isMove = !0;
                }
            }
        };
        e.prototype.getRandomOpenLocale = function () {
            for (
                var t = localcache.getList(localdb.table_lookBuild),
                    e = [],
                    o = 0; o < t.length; o++
            )
                t[o].lock < r.playerProxy.userData.bmap && e.push(t[o]);
            return e[Math.floor(Math.random() * e.length)].id;
        };
        e.prototype.isOpen = function (t) {
            var e = localcache.getItem(localdb.table_lookBuild, t);
            return !!e && e.lock < r.playerProxy.userData.bmap;
        };
        e.prototype.setRunState = function () {
            var t = this._moveBuild.node.x - this.roleAnimation.node.x,
                e = this._moveBuild.node.y - this.roleAnimation.node.y;
            this.roleSpine.node.scaleX = t < 0 ? 1 : -1;
            if (Math.abs(e) < 10) this.roleSpine.animation = "run3";
            else if (e < 0) {
                if (Math.abs(t) < 10) {
                    this.roleSpine.animation = "run1";
                    return;
                }
                this.roleSpine.animation = "run2";
            } else
                Math.abs(t) < 10 ?
                (this.roleSpine.animation = "run5") :
                (this.roleSpine.animation = "run4");
        };
        e.prototype.update = function () {
            if (this._isMove && null != this._moveBuild) {
                var t = cc.sys.now() - this._lastTime;
                t /= 1e3;
                this._speed += 5;
                this._lastTime = cc.sys.now();
                var e = cc.pDistance(
                    this.roleAnimation.node.position,
                    this._moveBuild.node.position
                );
                if (e < 10) {
                    this._moveBuild = null;
                    var o = r.lookProxy.win.xfAll[0],
                        i = localcache.getItem(
                            localdb.table_lookEvent,
                            o.npcid
                        );
                    if (this.checkStory(o, i)) return;
                    if (null == i) {
                        this._isMove = !1;
                        this.scheduleOnce(this.onOpenLookWin, 0.5);
                        return;
                    }
                    this.scheduleOnce(this.delayCanClick, 1);
                } else {
                    this.roleAnimation.node.position = cc.pLerp(
                        this.roleAnimation.node.position,
                        this._moveBuild.node.position,
                        (t * this._speed) / e
                    );
                    this.scroll.scrollToOffset(
                        new cc.Vec2(
                            this.roleAnimation.node.x - 360 > 0 ?
                            this.roleAnimation.node.x - 360 :
                            0,
                            0
                        )
                    );
                }
            }
        };
        e.prototype.onOpenLookWin = function () {
            this._isMove = !1;
            if (!r.lookProxy.win || 0 != r.lookProxy.win.xfAll[0].npcid) {
                i.utils.openPrefabView("look/LookWin", !1, {
                    id: this._lastBuildId,
                    isSkip: this.checkAuto.node.active && this.checkAuto.isChecked ?
                        1 : 0
                });
                this.scheduleOnce(this.delayCanClick, 1);
            }
        };
        e.prototype.checkStory = function (t, e) {
            void 0 === e && (e = null);
            if (7 != t.type) return !1;
            var o = null == e;
            if (
                (e =
                    null == e ?
                    localcache.getItem(localdb.table_lookEvent, t.npcid) :
                    e) &&
                !i.stringUtil.isBlank(e.storyid) &&
                r.playerProxy.getStoryData(e.storyid)
            ) {
                r.playerProxy.addStoryId(e.storyid);
                if (o) {
                    var n = {
                        type: 5,
                        isSkip: this.checkAuto.node.active &&
                            this.checkAuto.isChecked ?
                            1 : 0
                    };
                    0 != t.id &&
                        (2 == e.type ? (n.wifeid = t.id) : (n.heroid = t.id));
                    i.utils.openPrefabView("StoryView", !1, n);
                } else this.scheduleOnce(this.openStoryView, 0.5);
                this.scheduleOnce(this.delayCanClick, 1);
                return !0;
            }
            this.scheduleOnce(this.delayCanClick, 1);
            return !1;
        };
        e.prototype.delayCanClick = function () {
            this.btnLook.interactable = !0;
        };
        e.prototype.openStoryView = function () {
            var t =
                r.lookProxy.win && r.lookProxy.win.xfAll[0] ?
                r.lookProxy.win.xfAll[0] :
                null,
                e = localcache.getItem(localdb.table_lookEvent, t.npcid);
            this._isMove = !1;
            var o = {
                type: 5,
                isSkip: this.checkAuto.node.active && this.checkAuto.isChecked ?
                    1 : 0
            };
            0 != t.id && (2 == e.type ? (o.wifeid = t.id) : (o.heroid = t.id));
            r.playerProxy.storyIds &&
                r.playerProxy.storyIds.length > 0 &&
                i.utils.openPrefabView("StoryView", !1, o);
        };
        __decorate([u(cc.Node)], e.prototype, "blockNode", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLuck", void 0);
        __decorate([u(cc.Button)], e.prototype, "btnLook", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeRecy", void 0);
        __decorate([u(l.default)], e.prototype, "luckImg", void 0);
        __decorate([u(cc.Animation)], e.prototype, "roleAnimation", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "roleSpine", void 0);
        __decorate([u(cc.Node)], e.prototype, "beijing", void 0);
        __decorate([u(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([u(cc.Node)], e.prototype, "bgNode", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLookTip", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeCount", void 0);
        __decorate([u(cc.Toggle)], e.prototype, "checkAuto", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeAutoTip", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;