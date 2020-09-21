var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../component/LabelShadow"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLock = null;
            e.lblInfo = null;
            e.icon = null;
            e.lockNode = null;
            e.lblName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lockNode.active = !r.lookProxy.isLock(t);
                this.lblLock.node.active = !r.lookProxy.isLock(t);
                this.lblInfo.string = t.text;
                this.lblName.string = t.name;
                this.icon.url =
                    t.pic > 100 && t.pic < 200
                        ? l.uiHelps.getXunfangIcon(t.pic)
                        : l.uiHelps.getServantHead(t.pic);
                var e = "";
                if (0 == t.unlock) return;
                if (1 == t.unlock) {
                    e = localcache.getItem(localdb.table_lookBuild, t.uk_para)
                        .name;
                } else if (2 == t.unlock) {
                    e = localcache.getItem(localdb.table_mainTask, t.uk_para)
                        .name;
                } else if (3 == t.unlock) {
                    e = localcache.getItem(localdb.table_bigPve, t.uk_para)
                        .name;
                } else 4 == t.unlock && (e = t.uk_para + "");
                this.lblLock.string = i18n.t("LOOK_LOCK_TEXT_" + t.unlock, {
                    name: e
                });
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblInfo", void 0);
        __decorate([_(n.default)], e.prototype, "icon", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNode", void 0);
        __decorate([_(a.default)], e.prototype, "lblName", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
