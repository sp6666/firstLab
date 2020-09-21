var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../formula"),
    l = require("../../utils/Utils"),
    r = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCostOnce = null;
            e.lblCostTen = null;
            e.lblDes = null;
            e.lblYl = null;
            e.effOnce = null;
            e.effTen = null;
            e.aniOnce = null;
            e.aniTen = null;
            e.lblWishCount = null;
            e.haveNum = null;
            e.scencArr = [];
            e.btns = [];
            e.flag = !1;
            e.costOnce = 0;
            e.costTen = 0;
            e.wishMax = 0;
            e.treeNum = 0;
            e.treeTypeArr = null;
            e.countData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.playerProxy.PLAYER_USER_UPDATE,
                this.onYueliUpdate,
                this
            );
            facade.subscribe(
                i.jibanProxy.UPDATE_WISHING_COUNT,
                this.onShowTree,
                this
            );
            this.treeTypeArr = localcache.getList(localdb.table_treeType);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            this.wishMax = l.utils.getParamInt("tree_daycount");
            this.onYueliUpdate();
            this.onShowTree();
            r.funUtils.isOpenFun(r.funUtils.wishingTree) &&
                facade.send("DOWNLOAD_SOUND", {
                    type: 3,
                    param: r.funUtils.wishingTree.id
                });
        };
        e.prototype.onShowTree = function() {
            this.wishMax = this.treeTypeArr[this.treeNum].daycount;
            for (var t = 0; t < i.jibanProxy.wishing.countInfo.length; t++)
                i.jibanProxy.wishing.countInfo[t].id ==
                    this.treeTypeArr[this.treeNum].id &&
                    (this.countData = i.jibanProxy.wishing.countInfo[t]);
            var e = this.countData.count + 1;
            this.costOnce = n.formula[
                "tree_ms" + this.treeTypeArr[this.treeNum].id
            ](e);
            for (var o = 0, l = e; l < e + 10; l++)
                o += n.formula["tree_ms" + this.treeTypeArr[this.treeNum].id](
                    l
                );
            this.costTen = o;
            this.lblCostOnce.string = i18n.t("WISHING_TREE_COST_TXT", {
                num: this.costOnce
            });
            this.lblCostTen.string = i18n.t("WISHING_TREE_COST_TXT", {
                num: this.costTen
            });
            this.lblWishCount.string = i18n.t("WISHING_TREE_COUNT_TXT", {
                num: this.countData.count
            });
            var r = localcache.getGroup(
                localdb.table_heropve,
                "tree",
                this.treeTypeArr[this.treeNum].id
            );
            this.haveNum.string =
                i.jibanProxy.getTreeTypeCount(
                    this.treeTypeArr[this.treeNum].id
                ) +
                "/" +
                r.length;
        };
        e.prototype.onClickJiBan = function(t, e) {
            l.utils.openPrefabView("wishingtree/WishingJiBanView", null, {
                index: parseInt(e)
            });
        };
        e.prototype.onYueliUpdate = function() {
            this.lblYl.string = l.utils.formatMoney(
                i.playerProxy.userData.army
            );
        };
        e.prototype.onClickOnce = function() {
            if (!this.flag) {
                if (this.costOnce > i.playerProxy.userData.army) {
                    l.alertUtil.alertItemLimit(4);
                    return;
                }
                if (this.wishMax - this.countData.count <= 0) {
                    l.alertUtil.alert18n("WISHING_TREE_COUNT_LIMIT");
                    return;
                }
                this.flag = !0;
                this.effOnce.animation = "shanzi-open";
                this.aniOnce.node.active = !0;
                this.aniOnce.play();
                this.scheduleOnce(this.onTimer1, 1.6);
            }
        };
        e.prototype.onClickTen = function() {
            if (!this.flag) {
                if (this.costTen > i.playerProxy.userData.army) {
                    l.alertUtil.alertItemLimit(4);
                    return;
                }
                if (this.wishMax - this.countData.count < 10) {
                    l.alertUtil.alert18n("WISHING_TREE_COUNT_LIMIT");
                    return;
                }
                this.flag = !0;
                this.effTen.animation = "shanzi-open";
                this.aniTen.node.active = !0;
                this.aniTen.play();
                this.scheduleOnce(this.onTimer2, 1.6);
            }
        };
        e.prototype.onTimer1 = function() {
            this.flag = !1;
            this.effOnce.animation = "shanzi-idle";
            i.jibanProxy.sendWishing(this.treeTypeArr[this.treeNum].id, 1);
        };
        e.prototype.onTimer2 = function() {
            this.flag = !1;
            this.effTen.animation = "shanzi-idle";
            i.jibanProxy.sendWishing(this.treeTypeArr[this.treeNum].id, 10);
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickAdd = function() {
            l.utils.openPrefabView("JingYingView");
        };
        e.prototype.onClickGo = function() {
            l.utils.closeView(this);
            l.utils.openPrefabView("jiban/JibanSelect");
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.treeNum =
                this.treeNum + o < 0
                    ? this.treeTypeArr.length - 1
                    : this.treeNum + o >= this.treeTypeArr.length
                    ? 0
                    : this.treeNum + o;
            if (this.treeNum < this.treeTypeArr.length) {
                var i = this.treeTypeArr[this.treeNum];
                l.alertUtil.alert(
                    i18n.t("WISHING_QIE_HUAN", {
                        name: i.treename
                    })
                );
            }
            for (var n = 0; n < this.scencArr.length; n++) {
                this.scencArr[n].active = n == this.treeNum;
                this.btns[n].active = n == this.treeNum;
            }
            this.onShowTree();
        };
        e.prototype.onClickLeft = function() {
            this.onClickTab(null, "-1");
        };
        e.prototype.onClickRight = function() {
            this.onClickTab(null, "1");
        };
        __decorate([c(cc.Label)], e.prototype, "lblCostOnce", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCostTen", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblYl", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "effOnce", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "effTen", void 0);
        __decorate([c(cc.Animation)], e.prototype, "aniOnce", void 0);
        __decorate([c(cc.Animation)], e.prototype, "aniTen", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblWishCount", void 0);
        __decorate([c(cc.Label)], e.prototype, "haveNum", void 0);
        __decorate([c([cc.Node])], e.prototype, "scencArr", void 0);
        __decorate([c([cc.Node])], e.prototype, "btns", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
