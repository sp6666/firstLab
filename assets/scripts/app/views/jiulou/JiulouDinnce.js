var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/List"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblSeat = null;
            e.lblScore = null;
            e.lblTime = null;
            e.lblId = null;
            e.lblName = null;
            e.listLog = null;
            e.listSeat = null;
            e.tipNode = null;
            e.lblTip = null;
            e.jia_bg = null;
            e.guan_bg = null;
            e.diban_jia = null;
            e.diban_guan = null;
            e.btnLeft = null;
            e.btnRight = null;
            e.lblPage = null;
            e.xinxiNode = null;
            e.laibinNode = null;
            e.btnArr = [];
            e.lblNameRich = null;
            e.bottomNode = null;
            e.curIndex = 1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("JIU_LOU_YH_INFO", this.onYhInfo, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            n.jiulouProxy.isCreate &&
                i.utils.openPrefabView("jiulou/JiulouCreateSuccess");
            this.onYhInfo();
            this.onClickTab(null, "0");
            l.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
            l.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
            !n.jiulouProxy.isCreate &&
                n.playerProxy.userData &&
                n.jiulouProxy.yhInfo &&
                n.jiulouProxy.yhInfo.uid == n.playerProxy.userData.uid &&
                i.alertUtil.alert18n("JIU_LOU_JOIN_OWN");
        };
        e.prototype.onYhInfo = function() {
            if (n.jiulouProxy.yhInfo) {
                var t = n.jiulouProxy.yhInfo;
                this.lblNameRich.string = i18n.t("JIU_LOU_YAN_HUI_NAME", {
                    str: t.name,
                    value: t.addPer / 100
                });
                this.lblScore.string = t.score + "";
                this.lblId.string = t.uid + "";
                this.lblSeat.string = i18n.t("COMMON_NUM", {
                    f: t.num,
                    s: t.maxnum
                });
                if (0 != t.ltime.next)
                    l.uiUtils.countDown(t.ltime.next, this.lblTime);
                else {
                    this.lblTime.unscheduleAllCallbacks();
                    this.lblTime.string = "00:00:00";
                }
                for (var e = [], o = 0; o < t.list.length; o++)
                    0 != t.list[o].hid && e.push(t.list[o]);
                this.listLog.data = e;
                this.tipNode.active = 0 == e.length;
                this.lblTip.string =
                    1 == t.id
                        ? i18n.t("JIU_LOU_JIA_YAN_TXT")
                        : i18n.t("JIU_LOU_GUAN_TAN_TXT");
                null != n.jiulouProxy.win &&
                    (1 == n.jiulouProxy.win.yhnew.isover
                        ? i.utils.openPrefabView("jiulou/JiulouOver")
                        : i.utils.openPrefabView("jiulou/JiulouMes"));
                this.bottomNode.active =
                    null == n.jiulouProxy.win ||
                    1 != n.jiulouProxy.win.yhnew.isover;
                this.jia_bg.active = this.diban_jia.active =
                    1 == n.jiulouProxy.yhInfo.id ||
                    0 == n.jiulouProxy.yhInfo.id;
                this.guan_bg.active = this.diban_guan.active =
                    2 == n.jiulouProxy.yhInfo.id;
                this.onShowList();
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeNameView("jiulou/JiulouDinnce");
        };
        e.prototype.onShowList = function() {
            for (
                var t = n.jiulouProxy.yhInfo.list,
                    e = 6 * (this.curIndex - 1),
                    o = 6 * this.curIndex,
                    i = [],
                    l = 0;
                l < t.length;
                l++
            )
                l >= e && l < o && i.push(t[l]);
            this.listSeat.data = i;
            this.btnLeft.active = this.curIndex > 1;
            this.btnRight.active = this.curIndex < Math.ceil(t.length / 6);
            this.lblPage.string = this.curIndex + "/" + Math.ceil(t.length / 6);
        };
        e.prototype.onClickLeft = function() {
            if (!(this.curIndex <= 1)) {
                this.curIndex--;
                this.onShowList();
            }
        };
        e.prototype.onClickRight = function() {
            if (
                !(
                    this.curIndex >=
                    Math.ceil(n.jiulouProxy.yhInfo.list.length / 6)
                )
            ) {
                this.curIndex++;
                this.onShowList();
            }
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = parseInt(e), i = 0; i < this.btnArr.length; i++)
                this.btnArr[i].interactable = o != i;
            this.xinxiNode.active = 0 == o;
            this.laibinNode.active = 1 == o;
        };
        __decorate([c(cc.Label)], e.prototype, "lblSeat", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(r.default)], e.prototype, "listLog", void 0);
        __decorate([c(r.default)], e.prototype, "listSeat", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([c(cc.Node)], e.prototype, "jia_bg", void 0);
        __decorate([c(cc.Node)], e.prototype, "guan_bg", void 0);
        __decorate([c(cc.Node)], e.prototype, "diban_jia", void 0);
        __decorate([c(cc.Node)], e.prototype, "diban_guan", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnLeft", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnRight", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPage", void 0);
        __decorate([c(cc.Node)], e.prototype, "xinxiNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "laibinNode", void 0);
        __decorate([c([cc.Button])], e.prototype, "btnArr", void 0);
        __decorate([c(cc.RichText)], e.prototype, "lblNameRich", void 0);
        __decorate([c(cc.Node)], e.prototype, "bottomNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
