var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ApiUtils"),
    a = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName_1 = null;
            e.lblName_2 = null;
            e.lblMeiLi = null;
            e.urlload = null;
            e.nodeShare = null;
            e.btnShare = null;
            e.logo = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btnShare.active = a.Config.isShowShare;
            facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
            var t = this.node.openParam;
            if (t) {
                var e = localcache.getItem(localdb.table_wife, t.id);
                this.lblName_1.string = e.wname2;
                this.lblMeiLi.string = t.flower + "";
                var o = localcache.getGroup(
                        localdb.table_wifeSkill,
                        "wid",
                        t.id
                    ),
                    n = localcache.getItem(localdb.table_hero, o[0].heroid);
                this.lblName_2.string = n.name;
                this.urlload.url = l.uiHelps.getWifeBody(e.res);
                i.audioManager.playSound("zhiji/" + e.voice, !0, !0);
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickShare = function() {
            this.nodeShare.active = this.logo.active = !0;
            this.btnShare.active = !1;
            this.scheduleOnce(this.delayShare, 0.1);
        };
        e.prototype.delayShare = function() {
            r.apiUtils.share_game("wife");
        };
        e.prototype.onShareShow = function() {
            this.nodeShare.active = this.logo.active = !1;
            this.btnShare.active = !0;
        };
        __decorate([_(cc.Label)], e.prototype, "lblName_1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName_2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMeiLi", void 0);
        __decorate([_(n.default)], e.prototype, "urlload", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeShare", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnShare", void 0);
        __decorate([_(cc.Node)], e.prototype, "logo", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
