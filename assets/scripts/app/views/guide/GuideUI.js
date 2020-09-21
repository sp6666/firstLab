var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.guideNode = null;
            e.lblContext = null;
            e.guideJump = null;
            e.guide = null;
            e.guide1 = null;
            e.guideTask = null;
            e.blockBg = null;
            e.blockMask = null;
            e.frames = [];
            e.texts = [];
            e.nodeContinue = null;
            e._guide = null;
            e._target = null;
            e._listenClick = !1;
            e._state = 0;
            e._isBlank = !1;
            e._press = !1;
            e.guideArrow = null;
            e._triggerId = 0;
            e._waitActiveGuide = null;
            e.itemPool = new Map();
            e._isShowEffect = !1;
            e._helpGuideType = 0;

            e.taskGuideTime = 0;

            e.arrowPathIndex = 1;
            return e;
        }
        e.prototype.onLoad = function () {
            i.guideProxy.guideUI = this;
            this._triggerId = i.playerProxy.guide.gnew;
            facade.subscribe("STORY_END", this.triggerFist, this);
            facade.subscribe("GUIDE_HELP", this.onHelpGuide, this);
            facade.subscribe(
                i.guideProxy.UPDATE_TRIGGER_GUIDE,
                this.triggerGuide,
                this
            );
            facade.subscribe(i.guideProxy.UPDATE_TRIGGER, this.trigger, this);
            this.triggerFist();
            l.uiUtils.scaleRepeat(this.nodeContinue, 0.95, 1.05);

            this.blockMask.active = true;
            this.scheduleOnce(this.hideBlockBg, 0);

        };
        e.prototype.hideBlockBg = function () {
            this.blockMask.active = false;
            
        };
        e.prototype.onHelpGuide = function (t) {
            var e = parseInt(t),
                o = localcache.getGroup(localdb.table_tips, "type", e);
            this._helpGuideType = t;
            for (var i = 0; i < o.length; i++)
                if (0 != o[i].guide) {
                    this.trigger(o[i].guide);
                    break;
                }
        };
        e.prototype.trigger = function (t) {
            var e = localcache.getItem(localdb.table_guide, t);
            this._isShowEffect = !0;
            this.setGuide(e);
        };
        e.prototype.triggerFist = function () {
            if (
                i.playerProxy.guide.gnew <= 1 &&
                (null == i.playerProxy.storyIds ||
                    0 == i.playerProxy.storyIds.length)
            ) {
                var t = n.utils.getParamInt("guide_first_id");
                t = 0 == t ? 1 : t;
                var e = localcache.getItem(localdb.table_guide, t);
                this._isShowEffect = !0;
                this.setGuide(e);
                i.guideProxy.sendGuide(t);
                i.playerProxy.userData.level < 1 &&
                    i.guideProxy.sendGuideUpGuan();
            }
        };
        e.prototype.onDestroy = function () {
            this.removeListenClick();
            facade.remove(this);
        };
        e.prototype.update = function (dt) {
            this.checkFocusItem(null);
            this.triggerAfterItemActive();
            this.showTaskGuide(dt);
        };

        e.prototype.showTaskGuide = function (dt) {

            this.guideTask.active = false;

            if (this.guide1.active || this.guide.active || this.guideJump.active) {
                this.taskGuideTime = 0;
                return;
            }
            if (!i.playerProxy.userData || i.playerProxy.userData.level >= 5) {
                this.taskGuideTime = 0;
                return;
            }
            if (n.utils.getViewNum() > 0) {
                this.taskGuideTime = 0;
                return;
            }
            this.taskGuideTime += dt;
            if (this.taskGuideTime > 5) {
                this.guideTask.active = true;
            }

        };
        e.prototype.triggerGuide = function (t) {
            for (
                var e = t.type,
                    o = t.value,
                    l = localcache.getList(localdb.table_guide),
                    r = 0,
                    a = l.length; r < a; r++
            ) {
                var s = l[r];
                if (
                    s.trigger == e &&
                    s.trigger_val == o &&
                    this._triggerId <= s.guide_id &&
                    this.jumpGuide(s.trigger, s.trigger_val)
                ) {
                    this._triggerId = s.guide_id;
                    this._isShowEffect = !0;
                    if (
                        n.stringUtil.isBlank(s.button_name) ||
                        this.isItemActive(s)
                    ) {
                        this.setGuide(s);
                        i.guideProxy.sendGuide(s.guide_id);
                    } else this._waitActiveGuide = s;
                    break;
                }
            }
        };
        e.prototype.triggerAfterItemActive = function () {
            var t = this._waitActiveGuide;
            null != t && this.isItemActive(t) && this.setGuide(t);
        };
        e.prototype.startupListenClick = function () {
            if (!this._listenClick) {
                this._listenClick = !0;
                this.guideNode.on(
                    cc.Node.EventType.TOUCH_START,
                    this.onTouchStart,
                    this,
                    !0
                );
                this.guideNode.on(
                    cc.Node.EventType.TOUCH_END,
                    this.onTouchEnd,
                    this,
                    !0
                );
            }
        };
        e.prototype.removeListenClick = function () {
            if (this._listenClick) {
                this._listenClick = !1;
                this.guideNode.off(
                    cc.Node.EventType.TOUCH_START,
                    this.onTouchStart,
                    this,
                    !0
                );
                this.guideNode.off(
                    cc.Node.EventType.TOUCH_END,
                    this.onTouchEnd,
                    this,
                    !0
                );
            }
        };
        e.prototype.onTouchStart = function (t) {

            this.guideNode._touchListener.setSwallowTouches(false);
            if (1 == this._state) {
                this._isBlank ?
                    n.alertUtil.alert18n("GUIDE_LIMIT") :
                    this.nextGuide();
                //t.stopPropagationImmediate();

                if(this.guideNode&&this.guideNode._touchListener){
                    this.guideNode._touchListener.setSwallowTouches(true);
                }
            } else if (2 == this._state) {
                if (this._target == t.target || t.target == this.guideJump) {
                    if (!this._guide || 99 != this._guide.trigger) return;
                    //t.stopPropagationImmediate();
                }
                if (null != this._target) {
                    if (this._target.activeInHierarchy) {
                        var e = t.getLocationInView(),
                            o = this.guide1.getPosition();
                        Math.abs(e.x - (o.x + this.node.x)) < 100 &&
                            Math.abs(e.y - (this.node.y - o.y)) < 100 &&
                            (this._press = !0);
                    }
                    this._guide &&
                        99 == this._guide.trigger &&
                        (this._press = !0);
                }
                //t.stopPropagationImmediate();
                if(this.guideNode&&this.guideNode._touchListener){
                    this.guideNode._touchListener.setSwallowTouches(true);
                }
            }
            
        };
        e.prototype.onTouchEnd = function (t) {
            if (this._press) {
                this._press = !1;
                if (2 == this._state && null != this._target&&this._target.activeInHierarchy) {
                    var e = this._target.getComponent(cc.Button);
                    null == e && (e = this._target.getComponent(cc.Toggle));
                    if (null != e) {
                        t.target = this._target;
                        (null != this._guide && 99 == this._guide.trigger) ||
                        cc.Component.EventHandler.emitEvents(
                            e.clickEvents,
                            t
                        );
                        this.onClick(t);
                    } else if (this._guide && 99 == this._guide.trigger) {
                        t.target = this._target;
                        this.onClick(t);
                    }
                }
            }
        };
        e.prototype.addGuideHandler = function (t) {
            if (null != t && null == t._GH) {
                t._GH = !0;
                t.on("click", this.onClick, this);
                cc.log("[GUIDE]Listen click event:" + t.name);
            }
        };
        e.prototype.removeGuideHandler = function (t) {
            if (null != t && t._GH) {
                t._GH = void 0;
                t.off("click", this.onClick, this);
            }
        };
        e.prototype.onClick = function (t) {
            if (
                2 == this._state &&
                (this._target == t.target ||
                    (this._guide && 99 == this._guide.trigger))
            ) {
                cc.log("[GUIDE]onClick:" + t.target.name);
                this._state = 0;
                this.nextGuide();
            }
        };
        e.prototype.onClickJump = function () {
            var t = this._guide;
            null != t &&
                0 != t.guide_next &&
                (this._guide = localcache.getItem(
                    localdb.table_guide,
                    t.guide_next
                ));
            this.setGuide(null);
        };
        e.prototype.showJump = function () {
            this.guideJump.active = this.guide1.active;
        };
        e.prototype.setItem = function (t, e, bLast) {

            if (bLast) {
                //这里为了fightView里可以指向最新章节
                this.itemPool.set(t, e);
            } else {
                var item = this.itemPool.get(t);
                if (item && !item.node) {
                    this.itemPool.set(t, e);
                } else {
                    null == item && this.itemPool.set(t, e);
                    null == e &&
                        null != item &&
                        this.itemPool.set(t, e);
                }

            }
            this.checkFocusItem(t);
        };
        e.prototype.setGuide = function (t) {
            if (null == t && null != this._guide && 99 != this._guide.trigger) {
                this._triggerId = this._guide.guide_id;
                i.guideProxy.sendGuide(this._guide.guide_id);
            }
            this._guide = t;
            this._state = 0;
            this._isBlank = !1;
            this.removeGuideHandler(this._target);
            this._target = null;
            this._waitActiveGuide = null;
            this.guideJump.active = !1;
            if (null != t) {
                cc.log("[GUIDE]" + t.guide_id + ":" + t.dialog);
                this.startupListenClick();
                if (n.stringUtil.isBlank(t.button_name)) {
                    this._state = 1;
                    this._isBlank = n.stringUtil.isBlank(t.dialog);
                    this.guide.active = !this._isBlank;
                    if (this._isShowEffect) {
                        n.utils.showNodeEffect(this.guide);
                        this._isShowEffect = !1;
                    }
                    this.guide1.active = false;
                    this.blockMask.active = false;

                    this.lblContext.string = t.dialog.replace(
                        "#name#",
                        i.playerProxy.userData.name
                    );
                } else {
                    this._state = 2;
                    this.guide.active = false;
                    this.guide1.active = true;
                    this.blockMask.active = t.block_bg !== undefined ? true : false;



                    this.scheduleOnce(this.showJump, 3);
                    for (var e = 0; e < 4; e++) {
                        var o = e + 1 == t.fangxiang;
                        this.frames[e].active = o;
                        this.texts[e].string = o ? t.dialog : null;
                    }
                    this.checkFocusItem(null);
                }
            } else this.scheduleOnce(this.delayHide, 0.1);
        };
        e.prototype.delayHide = function () {
            this.guide.active = !1;
            this.guide1.active = !1;
            this.blockMask.active = !1;
            if (0 != this._helpGuideType) {
                n.utils.openPrefabView("HelpWindow", !1, {
                    type: this._helpGuideType
                });
                this._helpGuideType = 0;
            }
        };
        e.prototype.isHideShow = function () {
            return !this.guide.active && !this.guide1.active;
        };
        e.prototype.checkFocusItem = function (t) {
            if (2 == this._state) {
                var e = this._guide;
                if (null != e) {
                    var o =
                        e.button_ui +
                        "-" +
                        e.button_name +
                        (n.stringUtil.isBlank(e.button_item + "") ?
                            "" :
                            "-" + e.button_item);
                    if (null == t || t == o) {
                        var i = this.itemPool.get(o);
                        if (null != i && i.node) {
                            this._target = i.node;
                            if (i.node.activeInHierarchy) {
                                var l = n.utils.getWorldPos(i.node, this.node);
                                this.guide1.setPosition(l);

                                if (this.blockMask.active) {
                                    this.blockBg.y = e.block_bg - this.guide1.y;
                                    this.blockBg.x = -this.guide1.x;
                                }


                                var arrowPathIndex = this.arrowPathIndex;
                                if (this.guide1.x > 0 && this.guide1.y > 0) {

                                    arrowPathIndex = 2;
                                } else if (this.guide1.x > 0 && this.guide1.y < 0) {

                                    arrowPathIndex = 3;
                                } else if (this.guide1.x < 0 && this.guide1.y > 0) {

                                    arrowPathIndex = 1;
                                } else if (this.guide1.x < 0 && this.guide1.y < 0) {

                                    arrowPathIndex = 0;
                                } else {
                                    arrowPathIndex = 1;
                                }
                                if (this.arrowPathIndex != arrowPathIndex) {
                                    this.arrowPathIndex = arrowPathIndex;
                                    var clips = this.guideArrow.getClips();
                                    this.guideArrow.play(clips[this.arrowPathIndex].name);
                                }

                                (l.x < -360 || l.y > 360) &&
                                facade.send("GUIDE_MOVE_ITEM", l.x);
                                this.addGuideHandler(i.node);
                            } else 99 == e.trigger && this.nextGuide();
                        } else
                            (99 != e.trigger && 98 != e.trigger) ||
                            this.nextGuide();
                    }
                }
            }
        };
        e.prototype.isItemActive = function (t) {
            var e = t.button_ui + "-" + t.button_name,
                o = this.itemPool.get(e);
            return !(null == o || !o.node.activeInHierarchy);
        };
        e.prototype.nextGuide = function () {
            var t = this._guide;
            null != t &&
                (0 != t.guide_next ?
                    this.setGuide(
                        localcache.getItem(localdb.table_guide, t.guide_next)
                    ) :
                    this.setGuide(null));
        };
        e.prototype.jumpGuide = function (key, value) {
            //特殊处理跳过新手引导
            if(key == 3 && value == 95 && i.confidanteProxy.info.status != undefined && i.confidanteProxy.info.status != 0)//0是新玩家才跳引导
            {
                return false;
            }

            return true;
        };
        __decorate([s(cc.Node)], e.prototype, "guideNode", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([s(cc.Node)], e.prototype, "guideJump", void 0);
        __decorate([s(cc.Node)], e.prototype, "guide", void 0);
        __decorate([s(cc.Node)], e.prototype, "guide1", void 0);
        __decorate([s(cc.Animation)], e.prototype, "guideArrow", void 0);
        __decorate([s(cc.Node)], e.prototype, "guideTask", void 0);
        __decorate([s(cc.Node)], e.prototype, "blockBg", void 0);
        __decorate([s(cc.Node)], e.prototype, "blockMask", void 0);
        __decorate([s([cc.Node])], e.prototype, "frames", void 0);
        __decorate([s([cc.Label])], e.prototype, "texts", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeContinue", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;