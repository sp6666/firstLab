var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urlload = null;
            e.img = null;
            e.lblName = null;
            e.lblDes = null;
            e.lblGet = null;
            e.lblBuild = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam.id;
            1 == this.node.openParam.isSkip &&
                this.scheduleOnce(this.onClickClost, 1);
            var e = l.lookProxy.win.xfAll[0];
            if (e) {
                var o = localcache.getItem(localdb.table_look, e.npcid);
                if (o) {
                    var n = o.wfid;
                    if (1 == o.type) {
                        var a = localcache.getItem(localdb.table_wife, n);
                        n = a ? a.res : n;
                        l.wifeProxy.getWifeData(o.wfid) &&
                            i.alertUtil.alert(l.lookProxy.getString(e));
                    }
                    this.urlload.url =
                        1 == o.type
                            ? r.uiHelps.getWifeBody(n)
                            : r.uiHelps.getServantSpine(n);
                    this.lblName.string = o.name;
                    var s = localcache.getItem(
                        localdb.table_lookBuild,
                        0 == o.build ? t : o.build
                    );
                    r.uiUtils.showText(this.lblDes, o.nodesc);
                    this.lblBuild.string = s ? s.name : "";
                    this.lblGet.string = l.lookProxy.getString(e);
                }
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
            facade.send("LOOK_CLOST_WIN_WIN");
        };
        __decorate([c(n.default)], e.prototype, "urlload", void 0);
        __decorate([c(n.default)], e.prototype, "img", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblGet", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblBuild", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
