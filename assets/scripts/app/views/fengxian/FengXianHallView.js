var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../component/UrlLoad"),
    l = require("../chenghao/ChengHaoItem"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../../Config"),
    c = require("../../models/TimeProxy"),
    _ = require("../../utils/Utils"),
    d = require("../../utils/ShaderUtils"),
    roleGroup = require("../fengxian/FengXianRoleItem"),
    list = require("../../component/List"),
    u = cc._decorator,
    p = u.ccclass,
    h = u.property,
    y = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btns = [];
            e.lblName = null;
            e.notNodeMobai = null;
            e.nodeMobai = null;
            e.nodeMobaied = null;
            e.role = null;
            e.bgUrl = null;
            e.redShili = null;
            e.redGongDou = null;
            e.redQinmi = null;
            e.lblNoChenghao = null;
            e.chengHao = null;
            e.chenghaoNode = null;
            e.grayRoleNode = null;
            e.tipNode = null;
            e.roleNode = null;
            e.nameNode = null;
            e.lblTitleName = null;
            e.lblBtnName1 = null;
            e.lblBtnName2 = null;
            e.lblBtnName3 = null;
            e.btnExchange = null;
            e.curIndex = 1;
            e.curInfo = null;
            e.keyArr = [1, 2, 3];
            e.oneNode = null;   //一个玩家节点
            e.oneRole = null;   //玩家role
            e.twoNode = null;   //两个玩家节点
            e.twoRole1 = null;  //玩家role1
            e.twoRole2 = null;  //玩家role2
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.crossProxy.FENGXIANDIAN_QINAN,
                this.updateMobai,
                this
            );
            facade.subscribe(
                r.crossProxy.FENGXIANDIAN_RANK_INFO,
                this.onInfo,
                this
            );
            facade.subscribe(
                r.crossProxy.FENGXIANDIAN_INFO,
                this.onShopInfo,
                this
            );
            r.crossProxy.sendOpenActivity();
            r.crossProxy.sendGetInfo();
            this.onShopInfo();

            //这个版本默认打开好感榜
            this.onClickTab(null, 2);
        };
        e.prototype.onShopInfo = function() {
            this.btnExchange.active = null != r.crossProxy.dhShop;
        };
        e.prototype.onInfo = function() {
            this.setDefault();
            this.onClickTab(null, this.curIndex);
        };
        e.prototype.setDefault = function(){
            for(var index = 0; index < this.keyArr.length; index++)
            {
                var cur = this.keyArr[index];
                var tmpCur = r.crossProxy.getCurTop(cur);
                if(!_.stringUtil.isBlank(tmpCur))
                {
                    if(!_.stringUtil.isBlank(tmpCur.topPlayer))
                    {
                        this.curIndex = cur;
                        break;
                    }
                }
            }
        };
        e.prototype.updateMobai = function() {
            var t = r.crossProxy.getQingAn(1),
                e = r.crossProxy.getQingAn(2),
                o = r.crossProxy.getQingAn(3),
                i = r.crossProxy.getCurTop(this.keyArr[0]),
                n = r.crossProxy.getCurTop(this.keyArr[1]),
                l = r.crossProxy.getCurTop(this.keyArr[2]),
                a = 0;
            switch (this.curIndex) {
                case 1:
                    a = t ? t.type : 0;
                    a = null != i ? a : 2;
                    break;

                case 2:
                    a = e ? e.type : 0;
                    a = null != n ? a : 2;
                    break;

                case 3:
                    a = o ? o.type : 0;
                    a = null != l ? a : 2;
            }
            this.nodeMobai.active = 0 == a;
            this.nodeMobaied.active = 1 == a;
            this.notNodeMobai.active = 2 == a;
            this.redShili.active = !!t && (0 == t.type && null != i);
            this.redGongDou.active = !!o && (0 == o.type && null != l);
            this.redQinmi.active = !!e && (0 == e.type && null != n);
            this.btns[0].interactable = null != i && 1 != this.curIndex;
            this.btns[1].interactable = null != n && 2 != this.curIndex;
            this.btns[2].interactable = null != l && 3 != this.curIndex;
            if (null != i) {
                d.shaderUtils.clearNodeShader(this.btns[0].node);
                this.lblBtnName1.node.color = cc.Color.WHITE.fromHEX("#B71B40");
            } else {
                d.shaderUtils.setNodeGray(this.btns[0].node);
                this.lblBtnName1.node.color = cc.Color.WHITE.fromHEX("#666666");
            }
            if (null != n) {
                d.shaderUtils.clearNodeShader(this.btns[1].node);
                this.lblBtnName2.node.color = cc.Color.WHITE.fromHEX("#B71B40");
            } else {
                d.shaderUtils.setNodeGray(this.btns[1].node);
                this.lblBtnName2.node.color = cc.Color.WHITE.fromHEX("#666666");
            }
            if (null != l) {
                d.shaderUtils.clearNodeShader(this.btns[2].node);
                this.lblBtnName3.node.color = cc.Color.WHITE.fromHEX("#B71B40");
            } else {
                d.shaderUtils.setNodeGray(this.btns[2].node);
                this.lblBtnName3.node.color = cc.Color.WHITE.fromHEX("#666666");
            }
        };
        e.prototype.onDhShop = function() {
            _.utils.openPrefabView(
                "ActivityShopView",
                null,
                r.crossProxy.dhShop
            );
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.curIndex = o;
            for (var i = 0; i < this.btns.length; i++)
                this.btns[i].interactable = i != o - 1;
            var n = !1;
            switch (this.curIndex) {
                case 1:
                    var l = r.crossProxy.getCurTop(this.keyArr[0]);
                    this.onSetPanelData(l ? l.topPlayer : null);
                    this.grayRoleNode.active = this.tipNode.active = null == l;
                    this.roleNode.active = !this.grayRoleNode.active;
                    n = null != l;
                    this.lblTitleName.string = i18n.t("RANK_SHILI");
                    break;

                case 2:
                    var a = r.crossProxy.getCurTop(this.keyArr[1]);
                    this.onSetPanelData(a ? a.topPlayer : null);
                    this.grayRoleNode.active = this.tipNode.active = null == a;
                    this.roleNode.active = !this.grayRoleNode.active;
                    n = null != a;
                    this.lblTitleName.string = i18n.t("RANK_QINMI");
                    break;

                case 3:
                    var _ = r.crossProxy.getCurTop(this.keyArr[2]);
                    this.onSetPanelData(_ ? _.topPlayer : null);
                    this.grayRoleNode.active = this.tipNode.active = null == _;
                    this.roleNode.active = !this.grayRoleNode.active;
                    n = null != _;
                    this.lblTitleName.string = i18n.t("CROSS_RANK_ARENA");
            }
            this.nameNode.active = n;
            this.chenghaoNode.active =
                s.Config.isShowChengHao &&
                c.funUtils.isOpenFun(c.funUtils.chenghao) &&
                n;
            if (
                s.Config.isShowChengHao &&
                c.funUtils.isOpenFun(c.funUtils.chenghao) &&
                n
            ) {
                var d = localcache.getGroup(
                    localdb.table_fashion,
                    "kuatype",
                    this.curIndex
                );
                if (d && d.length > 0) {
                    var u = d[0];
                    this.chengHao.data = u;
                    this.lblNoChenghao.active = !u;
                }
            }
            this.updateMobai();
        };
        e.prototype.onClickMobai = function() {
            r.crossProxy.sendMoBai(this.curIndex);
        };
        e.prototype.onClickClost = function() {
            _.utils.closeView(this, !0);
        };
        e.prototype.onSetPanelData = function(t) {
            this.curInfo = t;
            if (null != this.curInfo) {

                var lst = [];
                if(_.stringUtil.isBlank(this.curInfo.length))
                {
                    this.curInfo.curIndex = this.curIndex;
                    lst.push(this.curInfo);
                }
                else
                {
                    for(var key in this.curInfo){
                        this.curInfo[key].curIndex = this.curIndex;
                        lst.push(this.curInfo[key]);
                    }
                }

                var showOnce = this.curInfo.length <= 1;
                this.oneNode.active = showOnce;
                this.twoNode.active = !showOnce;

                if(this.curInfo.length <= 1)
                {
                    this.oneRole.data = this.curInfo[0];

                    //一个人的情况下显示背景
                    this.onUpdateRole(this.curInfo[0]);
                }
                else
                {
                    this.twoRole1.data = this.curInfo[0];
                    this.twoRole2.data = this.curInfo[1];
                }
                
                
                return;
                this.lblName.string = t.sevname + " " + this.curInfo.name;
                this.onUpdateRole(this.curInfo);
            }
        };
        e.prototype.onUpdateRole = function(t) {
            if (null != t) {
                //this.role.setClothes(t.sex, t.job, t.level, t.clothe);
                this.bgUrl.node.active = 0 != t.clothe.background;
                if (this.bgUrl.node.active) {
                    var e = localcache.getItem(
                        localdb.table_userClothe,
                        t.clothe.background
                    );
                    e && (this.bgUrl.url = a.uiHelps.getStoryBg(e.model));
                }
            }
        };
        __decorate([h([cc.Button])], e.prototype, "btns", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([h(cc.Node)], e.prototype, "notNodeMobai", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeMobai", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeMobaied", void 0);
        __decorate([h(i.default)], e.prototype, "role", void 0);
        __decorate([h(n.default)], e.prototype, "bgUrl", void 0);
        __decorate([h(cc.Node)], e.prototype, "redShili", void 0);
        __decorate([h(cc.Node)], e.prototype, "redGongDou", void 0);
        __decorate([h(cc.Node)], e.prototype, "redQinmi", void 0);
        __decorate([h(cc.Node)], e.prototype, "lblNoChenghao", void 0);
        __decorate([h(l.default)], e.prototype, "chengHao", void 0);
        __decorate([h(cc.Node)], e.prototype, "chenghaoNode", void 0);
        __decorate([h(cc.Node)], e.prototype, "grayRoleNode", void 0);
        __decorate([h(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([h(cc.Node)], e.prototype, "roleNode", void 0);
        __decorate([h(cc.Node)], e.prototype, "nameNode", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblTitleName", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblBtnName1", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblBtnName2", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblBtnName3", void 0);
        __decorate([h(cc.Node)], e.prototype, "btnExchange", void 0);

        __decorate([h(cc.Node)], e.prototype, "oneNode", void 0);
        __decorate([h(roleGroup.default)], e.prototype, "oneRole", void 0);

        __decorate([h(cc.Node)], e.prototype, "twoNode", void 0);
        __decorate([h(roleGroup.default)], e.prototype, "twoRole1", void 0);
        __decorate([h(roleGroup.default)], e.prototype, "twoRole2", void 0);
        return (e = __decorate([p], e));
    })(cc.Component);
o.default = y;
