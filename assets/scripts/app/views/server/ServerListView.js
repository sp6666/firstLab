var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../Config"),
    u = require("../../utils/ApiUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lastList = null;
            e.list = null;
            e.quList = null;
            e.roleList = null;
            e.serverNode = null;
            e.roleNode = null;
            e.lblList = null;
            e.lblRole = null;
            e.listImg = null;
            e.roleImg = null;
            e.norColor = null;
            e.selColor = null;
            e.btns = [];
            e.selectImg = null;
            e.btnNode = null;
            e.oldServerNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.loginProxy.LOGIN_SERVER_LIST,
                this.update_ServerList,
                this
            );
            facade.subscribe(
                n.loginProxy.LOGIN_ROLE_LIST,
                this.onRoleList,
                this
            );
            this.update_ServerList();
            this.onRoleList();
            this.onClickTab(null, "0");
            this.btnNode.active = r.Config.isShowMyServer;
            this.oldServerNode.active = !r.Config.isShowMyServer;
            this.serverNode.y = r.Config.isShowMyServer ? 100 : 50;
        };
        e.prototype.update_ServerList = function() {
            var t = this;
            this.quList.data = n.loginProxy.quList;
            this.quList.selectHandle = function(e) {
                t.list.data = e ? e.list : null;
            };
            this.quList.selectIndex = 0;
            this.lastList.data = n.loginProxy.lastList;
        };
        e.prototype.closeBtn = function() {
            l.utils.closeView(this);
        };
        e.prototype.clickItem = function(t, e) {
            var o = e.data;
            if (o) {
                n.loginProxy.pick(o.id);
                u.apiUtils.selectServer();
                
                this.closeBtn();
            }
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.lblList.node.color = "0" == e ? this.selColor : this.norColor;
            this.lblRole.node.color = "1" == e ? this.selColor : this.norColor;
            this.serverNode.active = "0" == e;
            this.roleNode.active = "1" == e;
            this.listImg.spriteFrame = "0" == e ? this.selectImg : null;
            this.roleImg.spriteFrame = "1" == e ? this.selectImg : null;
        };
        e.prototype.onClickRoleServer = function(t, e) {
            var o = e.data;
            if (o) {
                n.loginProxy.pick(o.serverid);
                this.closeBtn();
            }
        };
        e.prototype.onRoleList = function() {
            if (null != n.loginProxy.roleList) {
                n.loginProxy.roleList.sort(function(t, e) {
                    return e.lastlogin - t.lastlogin;
                });
                this.roleList.data = n.loginProxy.roleList;
            }
        };
        __decorate([c(i.default)], e.prototype, "lastList", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(i.default)], e.prototype, "quList", void 0);
        __decorate([c(i.default)], e.prototype, "roleList", void 0);
        __decorate([c(cc.Node)], e.prototype, "serverNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "roleNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblRole", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "listImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "roleImg", void 0);
        __decorate([c(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([c(cc.Color)], e.prototype, "selColor", void 0);
        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "oldServerNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
