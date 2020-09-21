var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    c = require("../../component/JiBanShow"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.letfname = null;
            e.rightname = null;
            e.leftRole = null;
            e.rightRole = null;
            e.leftCaiyi = null;
            e.rightCaiyi = null;
            e.iconArr = [];
            e.lockNode = null;
            e.bgArr = [];
            e.bgImg = null;
            e.leftNode = null;
            e.rightNode = null;
            e.letfRed = null;
            e.rightRed = null;
            e.leftJb = null;
            e.rightJb = null;
            e.wifeData = null;
            e.leftSp = null;
            e.rightSp = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.wifeData = a.wifeProxy.getWifeData(t.wid);
                var e = a.wifeProxy.wifeSys.indexOf(t),
                    o = e % 2,
                    i = l.stringUtil.isBlank(t.type + "")
                        ? 3
                        : parseInt(t.type + "") - 1;
                this.leftNode.active = 0 == o;
                this.rightNode.active = 0 != o;
                if (0 == o) {
                    this.letfname.string =
                        2 == a.playerProxy.userData.sex ? t.wname2 : t.wname;
                    this.leftCaiyi.spriteFrame = this.iconArr[i];
                    this.leftRole.url = r.uiHelps.getWifeSmallBody(t.res);
                } else {
                    this.rightname.string =
                        2 == a.playerProxy.userData.sex ? t.wname2 : t.wname;
                    this.rightCaiyi.spriteFrame = this.iconArr[i];
                    this.rightRole.url = r.uiHelps.getWifeSmallBody(t.res);
                }
                var n = e % 6;
                this.bgImg.spriteFrame = this.bgArr[n];
                if (this.lockNode) {
                    var c = this;
                    if (null == this.wifeData) {
                        s.shaderUtils.setNodeGray(this.lockNode);
                        this.leftRole.loadHandle = function() {
                            c.leftSp = c.leftRole.getComponentInChildren(
                                sp.Skeleton
                            );
                            c.leftSp.animation = "";
                            s.shaderUtils.setNodeGray(c.leftRole.node);
                        };
                        this.rightRole.loadHandle = function() {
                            c.rightSp = c.rightRole.getComponentInChildren(
                                sp.Skeleton
                            );
                            c.rightSp.animation = "";
                            s.shaderUtils.setNodeGray(c.rightRole.node);
                        };
                        this.letfRed.active = this.rightRed.active = !1;
                        this.leftJb.node.active = this.rightJb.node.active = !1;
                    } else {
                        s.shaderUtils.clearNodeShader(this.lockNode);
                        this.rightRole.loadHandle = function() {
                            c.rightSp = c.rightRole.getComponentInChildren(
                                sp.Skeleton
                            );
                            c.rightSp.animation = "zhengchang";
                            s.shaderUtils.clearNodeShader(c.rightRole.node);
                        };
                        this.leftRole.loadHandle = function() {
                            c.leftSp = c.leftRole.getComponentInChildren(
                                sp.Skeleton
                            );
                            c.leftSp.animation = "zhengchang";
                            s.shaderUtils.clearNodeShader(c.leftRole.node);
                        };
                        this.letfRed.active = this.rightRed.active = a.wifeProxy.hasSkillUp(
                            this.wifeData.id
                        );
                        var _ = a.jibanProxy.getWifeJbLv(this.wifeData.id);
                        this.leftJb.setValue(5, _.level % 1e3);
                        this.rightJb.setValue(5, _.level % 1e3);
                    }
                }
            }
        };
        e.prototype.onClickItem = function() {
            var t = this._data;
            if (null == this.wifeData)
                l.utils.openPrefabView("wife/WifeInfo", null, t);
            else {
                var e = a.wifeProxy.getMarryList(!1).indexOf(t);
                l.utils.openPrefabView("wife/WifeListView", null, {
                    index: e
                });
            }
        };
        e.prototype.onClicCaiYi = function() {
            facade.send("WIFE_CAI_YI_TXT", this._data);
        };
        __decorate([u(cc.Label)], e.prototype, "letfname", void 0);
        __decorate([u(cc.Label)], e.prototype, "rightname", void 0);
        __decorate([u(n.default)], e.prototype, "leftRole", void 0);
        __decorate([u(n.default)], e.prototype, "rightRole", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "leftCaiyi", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "rightCaiyi", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([u(cc.Node)], e.prototype, "lockNode", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "bgArr", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "bgImg", void 0);
        __decorate([u(cc.Node)], e.prototype, "leftNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "rightNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "letfRed", void 0);
        __decorate([u(cc.Node)], e.prototype, "rightRed", void 0);
        __decorate([u(c.default)], e.prototype, "leftJb", void 0);
        __decorate([u(c.default)], e.prototype, "rightJb", void 0);
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;
