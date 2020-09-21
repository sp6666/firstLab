var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = require("../../utils/ApiUtils"),
    a = require("./ServantStarShow"),
    s = require("../../component/List"),
    init = require("../../Initializer"),
    c = require("../../Config"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblEps = [];
            e.lblAllZZ = null;
            e.urlload = null;
            e.lblName = null;
            e.lblRecruit = null;
            e.nodeShare = null;
            e.btnShare = null;
            e.logo = null;
            e.stars = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
            this.btnShare.active = c.Config.isShowShare;
            var t = this.node.openParam;
            if (t) {
                for (var e = 0; e < this.lblEps.length; e++) {
                    var o = e + 1;
                    this.lblEps[e].string = 10 * t.zz["e" + o] + "";
                }
                var i = localcache.getItem(localdb.table_hero, t.id);
                n.uiUtils.showNumChange(
                    this.lblAllZZ,
                    0,
                    t.zz.e1 + t.zz.e2 + t.zz.e3 + t.zz.e4,
                    30,
                    "SERVANT_ZHZZ",
                    "zz"
                );
                this.urlload.url = n.uiHelps.getServantSpine(t.id);
                this.lblName.string = i ? i.name : "";
                var r = localcache.getItem(localdb.table_heroinfo, t.id);
                this.lblRecruit.string = r ? r.recruit : "";
                this.stars.setValue(i.star);
                this.list.node.x = -this.list.node.width / 2;
                l.audioManager.playSound("huoban/" + i.voice, !0, !0);
            }
        };
        e.prototype.onClickClost = function() {
            var t = this.node.openParam;
            if(t)
            {
                if (l.utils.isOpenView("AlertItemMore")) {
                    l.utils.closeNameView("AlertItemMore");
                    l.utils.popNext(!1);
                } else if (l.utils.isOpenView("AlertItemShow")) {
                    l.utils.closeNameView("AlertItemShow");
                    l.utils.popNext(!1);
                }

                //获得角色以后，关闭的时候调用一下新手引导
                if(init.confidanteProxy.getStatus() == 0)  //新玩家才走这里
                {
                    facade.send(init.guideProxy.UPDATE_TRIGGER_GUIDE, {type: 13, value: t.id});
                }
                
            }
            
            l.audioManager.playSound("", !0);
            l.utils.closeView(this);
        };
        e.prototype.onClickShare = function() {
            this.nodeShare.active = this.logo.active = !0;
            this.btnShare.active = !1;
            this.scheduleOnce(this.delayShare, 0.1);
        };
        e.prototype.delayShare = function() {
            r.apiUtils.share_game("servant");
        };
        e.prototype.onShareShow = function() {
            this.nodeShare.active = this.logo.active = !0;
            this.btnShare.active = !0;
        };
        __decorate([u([cc.Label])], e.prototype, "lblEps", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblAllZZ", void 0);
        __decorate([u(i.default)], e.prototype, "urlload", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblRecruit", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeShare", void 0);
        __decorate([u(cc.Node)], e.prototype, "btnShare", void 0);
        __decorate([u(cc.Node)], e.prototype, "logo", void 0);
        __decorate([u(a.default)], e.prototype, "stars", void 0);
        __decorate([u(s.default)], e.prototype, "list", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
