var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../utils/ShaderUtils"),
    s = require("../../component/ChildSpine"),
    c = require("../servant/ServantStarShow"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.unMarryNode = null;
            e.marryedNode = null;
            e.lblMother = null;
            e.lblQinMi = null;
            e.lblSonName = null;
            e.lblWuLi = null;
            e.lblZhiLi = null;
            e.lblShuXing = null;
            e.lblMeiLi = null;
            e.lblZhengZhi = null;
            e.unMarryList = null;
            e.sonImg = null;
            e.lblQinJia = null;
            e.lblJiaCheng = null;
            e.lblTime = null;
            e.roleMan = null;
            e.roleWoman = null;
            e.marryedList = null;
            e.txt_info = null;
            e.txt_info2 = null;
            e.btnLianYin = null;
            e.btnZhongZhiLianYin = null;
            e.lblLianYinTime = null;
            e.lblTiQin = null;
            e.marry_name1 = null;
            e.marry_name2 = null;
            e.marry_shuxing1 = null;
            e.marry_shuxing2 = null;
            e.bgNode = null;
            e.iconArr = [];
            e.techangIcon = null;
            e.btns = [];
            e.norColor = null;
            e.selColor = null;
            e.lblYH = null;
            e.lblWH = null;
            e.bg = null;
            e.selectImg = null;
            e.yjjImg = null;
            e.wjjImg = null;
            e.btnRequest = null;
            e.stars_1 = null;
            e.stars_2 = null;
            e.stars_3 = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            facade.subscribe(
                n.sonProxy.UPDATE_SON_INFO,
                this.onSonInfoUpdate,
                this
            );
            facade.subscribe("MARRY_EFFECT_END", this.onMarryEffectEnd, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            a.shaderUtils.setBlur(this.bg);
            n.sonProxy.sendMeiPo();
            var e = this;
            this.unMarryList.selectHandle = function(o) {
                var i = o;
                t.curData = i;
                n.sonProxy.tiQinObj.mySid = i.id;
                e.showUnMarryNode(i);
            };
            this.marryedList.selectHandle = function(t) {
                var o = t;
                e.showMarryedNode(o);
            };
            this.onClickTabs(null, "0");
        };
        e.prototype.onClickTabs = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.lblYH.node.color = 0 == e ? this.selColor : this.norColor;
            this.lblWH.node.color = 1 == e ? this.selColor : this.norColor;
            "0" == e
                ? this.onClickUnMarry()
                : "1" == e && this.onClickMarryed();
            this.wjjImg.spriteFrame = "1" == e ? this.selectImg : null;
            this.yjjImg.spriteFrame = "0" == e ? this.selectImg : null;
            this.btnRequest.active = "0" == e;
        };
        e.prototype.showUnMarryNode = function(t) {
            var e = n.wifeProxy.getWifeData(t.mom),
                o = localcache.getItem(localdb.table_wife, t.mom);
            this.lblMother.string = o.wname2;
            this.lblQinMi.string = "" + e.love.toString();
            var i = localcache.getItem(localdb.table_adult, t.honor);
            this.lblSonName.string = t.name + "(" + i.name + ")";
            var r = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
            this.lblShuXing.string = r + "";
            this.lblWuLi.string = "" + t.ep.e1;
            this.lblZhiLi.string = "" + t.ep.e2;
            this.lblZhengZhi.string = "" + t.ep.e3;
            this.lblMeiLi.string = "" + t.ep.e4;
            this.sonImg.setKid(t.id, t.sex);
            this.btnLianYin.active =
                t.state != proto_sc.SomState.request &&
                t.state != proto_sc.SomState.pass &&
                t.state != proto_sc.SomState.timeout &&
                10 != t.state;
            this.btnZhongZhiLianYin.active =
                t.state == proto_sc.SomState.request ||
                t.state == proto_sc.SomState.pass ||
                t.state == proto_sc.SomState.timeout ||
                t.state == proto_sc.SomState.requestAll;
            this.lblLianYinTime.node.active =
                t.state == proto_sc.SomState.request ||
                t.state == proto_sc.SomState.pass ||
                t.state == proto_sc.SomState.requestAll;
            if (
                t.state == proto_sc.SomState.request ||
                t.state == proto_sc.SomState.requestAll
            )
                0 == t.tqcd.next ||
                (t.state != proto_sc.SomState.request &&
                    t.state != proto_sc.SomState.requestAll)
                    ? this.lblLianYinTime.unscheduleAllCallbacks()
                    : l.uiUtils.countDown(
                          t.tqcd.next,
                          this.lblLianYinTime,
                          function() {
                              n.playerProxy.sendAdok(t.tqcd.label);
                          },
                          !0,
                          null,
                          null,
                          "HH:mm:ss"
                      );
            else if (t.state == proto_sc.SomState.pass) {
                this.lblLianYinTime.unscheduleAllCallbacks();
                this.lblLianYinTime.string = i18n.t("MARRY_REQUEST_PASS");
            }
            this.techangIcon.spriteFrame = this.iconArr[o.type - 1];
            this.stars_1.setValue(t.talent);
        };
        e.prototype.showMarryedNode = function(t) {
            this.lblQinJia.string = i18n.t("SON_QIN_JIA", {
                name: t.spouse.fname
            });
            this.lblTime.string = r.timeUtil.format(t.sptime, "yyyy-MM-dd");
            this.roleMan.setKid(t.id, t.sex);
            this.roleWoman.setKid(t.spouse.sonuid, t.spouse.sex);
            this.marry_name1.string = t.name;
            this.marry_name2.string = t.spouse.sname;
            this.marry_shuxing1.string =
                t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4 + "";
            var e =
                t.spouse.ep.e1 +
                t.spouse.ep.e2 +
                t.spouse.ep.e3 +
                t.spouse.ep.e4;
            this.lblJiaCheng.string = i18n.t("SON_LIAN_YIN_JIA_CHENG", {
                value: e
            });
            this.marry_shuxing2.string = e + "";
            this.stars_2.setValue(t.talent);
            this.stars_3.setValue(t.spouse.talent);
        };
        e.prototype.onClickUnMarry = function() {
            this.isLookMarry = !1;
            this.unMarryList.data = n.sonProxy.unMarryList;
            this.unMarryNode.active = n.sonProxy.unMarryList.length > 0;
            this.marryedNode.active = !1;
            n.sonProxy.unMarryList.length > 0 &&
                (this.unMarryList.selectIndex = 0);
            this.txt_info.active = 0 == n.sonProxy.unMarryList.length;
            this.txt_info2.active = !1;
            this.bgNode.active = n.sonProxy.unMarryList.length > 0;
        };
        e.prototype.onClickMarryed = function() {
            this.isLookMarry = !0;
            this.marryedList.data = n.sonProxy.sonMarryList;
            this.marryedList.node.active = n.sonProxy.sonMarryList.length > 1;
            this.unMarryNode.active = !1;
            this.marryedNode.active = n.sonProxy.sonMarryList.length > 0;
            n.sonProxy.sonMarryList.length > 0 &&
                (this.marryedList.selectIndex = 0);
            this.txt_info2.active = 0 == n.sonProxy.sonMarryList.length;
            this.txt_info.active = !1;
            this.bgNode.active = n.sonProxy.sonMarryList.length > 0;
        };
        e.prototype.onClickLianYin = function() {
            r.utils.openPrefabView("marry/SelectView", null, this.curData);
        };
        e.prototype.onClickZhongZhiLianYin = function() {
            var t = this;
            r.utils.showConfirm(i18n.t("SON_ZHONG_ZHI_LIAN_YIN_2"), function() {
                n.sonProxy.sendCancel(t.curData.id);
            });
        };
        e.prototype.onClickQingQiu = function() {
            n.sonProxy.sendRefreshTiQin();
            r.utils.openPrefabView(
                "marry/BringUpRequestView",
                null,
                this.curData
            );
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this, !0);
        };
        e.prototype.onSonInfoUpdate = function(t) {
            this.curData = n.sonProxy.getSon(this.curData.id);
            if (this.isLookMarry) {
                this.marryedList.data = n.sonProxy.sonMarryList;
                this.showMarryedNode(this.curData);
            } else {
                this.unMarryList.data = n.sonProxy.unMarryList;
                this.showUnMarryNode(this.curData);
            }
        };
        e.prototype.onClickOpenChild = function() {
            r.utils.closeView(this);
            r.utils.openPrefabView("child/ChildView");
        };
        e.prototype.onMarryEffectEnd = function() {
            this.onClickUnMarry();
        };
        __decorate([u(cc.Node)], e.prototype, "unMarryNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "marryedNode", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblMother", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblQinMi", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblSonName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblWuLi", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblZhiLi", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblShuXing", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblMeiLi", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblZhengZhi", void 0);
        __decorate([u(i.default)], e.prototype, "unMarryList", void 0);
        __decorate([u(s.default)], e.prototype, "sonImg", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblQinJia", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblJiaCheng", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([u(s.default)], e.prototype, "roleMan", void 0);
        __decorate([u(s.default)], e.prototype, "roleWoman", void 0);
        __decorate([u(i.default)], e.prototype, "marryedList", void 0);
        __decorate([u(cc.Node)], e.prototype, "txt_info", void 0);
        __decorate([u(cc.Node)], e.prototype, "txt_info2", void 0);
        __decorate([u(cc.Node)], e.prototype, "btnLianYin", void 0);
        __decorate([u(cc.Node)], e.prototype, "btnZhongZhiLianYin", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLianYinTime", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTiQin", void 0);
        __decorate([u(cc.Label)], e.prototype, "marry_name1", void 0);
        __decorate([u(cc.Label)], e.prototype, "marry_name2", void 0);
        __decorate([u(cc.Label)], e.prototype, "marry_shuxing1", void 0);
        __decorate([u(cc.Label)], e.prototype, "marry_shuxing2", void 0);
        __decorate([u(cc.Node)], e.prototype, "bgNode", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "techangIcon", void 0);
        __decorate([u([cc.Button])], e.prototype, "btns", void 0);
        __decorate([u(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([u(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblYH", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblWH", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([u(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "yjjImg", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "wjjImg", void 0);
        __decorate([u(cc.Node)], e.prototype, "btnRequest", void 0);
        __decorate([u(c.default)], e.prototype, "stars_1", void 0);
        __decorate([u(c.default)], e.prototype, "stars_2", void 0);
        __decorate([u(c.default)], e.prototype, "stars_3", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
