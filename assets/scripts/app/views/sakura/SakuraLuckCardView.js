var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.list12 = null;
            e.list16 = null;
            e.lblCost = null;
            e.lblLevel = null;
            e.lblTag = null;
            e.lblBoxLeft = null;
            e.lblTreeLeft = null;
            e.flag = false;
            e.btnLeft = null;
            e.btnRight = null;
            e.btnRefresh = null;
            e.spine = null;
            e.currentLevelNode = null;
            e.isFirst = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.data = this.node.openParam;
            var t = this;
            facade.subscribe(
                l.sakuraProxy.SAKURA_LEVELDATA,
                this.onDataUpdate,
                this
            );

            this.list.selectHandle = function(e) {
                if(this.waitOpenNext) return;
                var i = e.__index;
                if(e.data != null) return;
                if (!l.sakuraProxy.getIsEnough(t.currentLevel)) {
                    n.alertUtil.alert18n("SAKURA_XINGCHENGBUZU");
                    return;
                }
                if (t.flag) return;
                t.flag = true;
                t.scheduleOnce(t.onTimer, 0.5);
                if (
                    n.timeUtil.second >=
                    l.sakuraProxy.data.info.showTime
                ) {
                    n.alertUtil.alert18n("ACTHD_OVERDUE");
                    return;
                }
                l.sakuraProxy.sendGetRewad(t.currentLevel + 1, t.currentPage + 1, i + 1);
            };

            this.list12.selectHandle = function(e) {
                if(this.waitOpenNext) return;
                var i = e.__index;
                if(e.data != null) return;
                if (!l.sakuraProxy.getIsEnough(t.currentLevel)) {
                    n.alertUtil.alert18n("SAKURA_XINGCHENGBUZU");
                    return;
                }
                if (t.flag) return;
                t.flag = true;
                t.scheduleOnce(t.onTimer, 0.5);
                if (
                    n.timeUtil.second >=
                    l.sakuraProxy.data.info.showTime
                ) {
                    n.alertUtil.alert18n("ACTHD_OVERDUE");
                    return;
                }
                l.sakuraProxy.sendGetRewad(t.currentLevel + 1, t.currentPage + 1, i + 1);
            };


            this.list16.selectHandle = function(e) {
                if(this.waitOpenNext) return;
                var i = e.__index;
                if(e.data != null) return;
                if (!l.sakuraProxy.getIsEnough(t.currentLevel)) {
                    n.alertUtil.alert18n("SAKURA_XINGCHENGBUZU");
                    return;
                }
                if (t.flag) return;
                t.flag = true;
                t.scheduleOnce(t.onTimer, 0.5);
                if (
                    n.timeUtil.second >=
                    l.sakuraProxy.data.info.showTime
                ) {
                    n.alertUtil.alert18n("ACTHD_OVERDUE");
                    return;
                }
                l.sakuraProxy.sendGetRewad(t.currentLevel + 1, t.currentPage + 1, i + 1);
            };

            this.currentPage = 0;
            this.currentLevel = this.data.id - 1;//从1开始的
            this.totalPage = this.data.page;
            //l.luckyBrandProxy.sendOpenActivity();
            //this.schedule(this.onTimer2, 30);
        };
        e.prototype.gotoNext = function() {
            this.currentLevel ++;
            if(l.sakuraProxy.getMostLevel() == 8) {
                //第八关已打开
                this.currentLevel = 7;
            }
            this.currentPage = 0;
            this.data = l.sakuraProxy.getCurrentLevelData(this.currentLevel);
            this.totalPage = this.data.page;
            this.initCurrentTag();
        };
        e.prototype.onTimer = function() {
            this.flag = false;
        };

        e.prototype.start = function() {
            this.waitOpenNext = false;
            l.timeProxy.itemReward = null;
            if(l.sakuraProxy.level_data.is_pass == 1) {
                l.sakuraProxy.level_data.is_pass = 0;
            }
            this.initCurrentTag();
        };

        e.prototype.initCurrentTag = function() {
            l.sakuraProxy.reset = true;
            this.initList();
            if(this.currentPage <= 0) {
                this.btnLeft.node.active = false;
                this.btnRight.node.active = true;
            }else if(this.currentPage + 1 >= this.totalPage) {
                this.btnLeft.node.active = true;
                this.btnRight.node.active = false;
            }else {
                this.btnLeft.node.active = true;
                this.btnRight.node.active = true;
            }
            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function() {
            
            var data = l.sakuraProxy.getCurrentTagData(this.currentLevel, this.currentPage, this.data.count);
            if(this.data.count == 9) {
                this.list.node.active = true;
                this.list.data = data;
                this.list12.node.active = false;
                this.list16.node.active = false;
            }else if(this.data.count == 12) {
                this.list12.node.active = true;
                this.list12.data = data;
                this.list.node.active = false;
                this.list16.node.active = false;
            }else if(this.data.count == 16) {
                this.list16.node.active = true;
                this.list16.data = data;
                this.list.node.active = false;
                this.list12.node.active = false;
            }

            this.lblLevel.string = i18n.t("SAKURA_LEVE", {level : this.currentLevel + 1});
            if(this.currentLevel == 7) {
                //第八关
                this.lblLevel.string = i18n.t("SAKURA_LEVENOLIMIT");
            }
            this.lblTag.string = i18n.t("SAKURA_TAG", {tag : this.currentPage + 1});
            this.lblCost.string = i18n.t("SAKURA_LEVELCOST", {num : l.sakuraProxy.getNeed(this.currentLevel)});
            this.lblTreeLeft.string = i18n.t("SAKURA_TREELEFT", {num : l.sakuraProxy.getCurrentTreeLeft(this.currentLevel)});
            this.lblBoxLeft.string = i18n.t("SAKURA_BOXLEFT", {num : l.sakuraProxy.getCurrentBoxLeft(this.currentLevel, this.currentPage)});

            this.btnRefresh.node.active = l.sakuraProxy.getRefreshBtnShow(this.currentLevel);
            if(this.currentLevel == 7) {
                this.currentLevelNode.active = false;
            }else {
                this.currentLevelNode.active = true;
            }
            
            l.sakuraProxy.reset = false;
            if(l.sakuraProxy.isBoxOpen()) {
                //播放动画
                this.unschedule(this.onTimer, this);
                this.flag = true;
                this.spine.node.active = true;
                this.spine.clearTracks();
                this.spine.setAnimation(0, "tiaochu", false);
                this.spine.setCompleteListener(()=> {
                    this.spine.setCompleteListener(null);
                    this.spine.node.active = false;
                    this.flag = false;
                    l.timeProxy.floatReward();
                    this.checkPass();
                })
            }else {
                l.timeProxy.floatReward();
                this.checkPass();
            }
            
        };

        e.prototype.checkPass = function() {
            //这里监听是否有获得钥匙，获得钥匙之后是否进入下一关
            if(l.sakuraProxy.isAlertPass()) {
                if(this.currentLevel == 7) {
                    //第八关
                    // this.btnRefresh.node.active = true;
                    // this.currentLevelNode.active = false;
                }else {
                    this.waitOpenNext = true;
                    this.scheduleOnce(this.openNextDialog, 1.5);
                }
            }
        };

        e.prototype.openNextDialog = function() {
            this.waitOpenNext = false;
            n.utils.showConfirm(
                i18n.t("SAKURA_NEXLEVEL"),
                ()=> {
                    if (n.utils.isOpenView("AlertItemShow")) {
                        n.utils.closeNameView("AlertItemShow");
                        n.utils.popNext(false);
                    }

                    this.gotoNext();
                }
            )
        };

        e.prototype.initList = function() {
            l.sakuraProxy.playList = [];
        };
        e.prototype.onClickClose = function() {
            if(this.waitOpenNext) return;
            n.utils.closeView(this);
        };




        e.prototype.onClickLeft = function() {
            if(this.waitOpenNext) return;
            this.currentPage --;
            if(this.currentPage < 0)  {
                this.currentPage = 0;
                return;
            }
            
            this.initCurrentTag();
        };

        e.prototype.onClickRight = function() {
            if(this.waitOpenNext) return;
            this.currentPage ++;
            if(this.currentPage >= this.totalPage) {
                this.currentPage = this.totalPage - 1;
                return;
            }
            this.initCurrentTag();
        };

        e.prototype.onClickRefresh = function() {
            l.sakuraProxy.refresh(()=> {
                this.btnRefresh.node.active = false;
                this.currentPage = 0;
                this.data = l.sakuraProxy.getCurrentLevelData(this.currentLevel);
                this.totalPage = this.data.page;
                this.initCurrentTag();
            })
        };

        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(i.default)], e.prototype, "list12", void 0);
        __decorate([c(i.default)], e.prototype, "list16", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTag", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblBoxLeft", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTreeLeft", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnLeft", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnRight", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnRefresh", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "spine", void 0);
        __decorate([c(cc.Node)], e.prototype, "currentLevelNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
