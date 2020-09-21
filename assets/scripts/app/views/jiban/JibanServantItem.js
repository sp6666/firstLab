var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../component/List"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblJbValue = null;
            e.roleUrl = null;
            e.btnShow = null;
            e.list = null;
            e.lblLimit = null;
            e.nodeNew = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnShow);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t && 1 == t.type) {
                var e = localcache.getItem(localdb.table_hero, t.roleid);
                this.lblName.string = e.name;
                var o = r.jibanProxy.getHeroJB(t.roleid);
                this.lblJbValue.string = o + "";
                this.roleUrl.url = a.uiHelps.getServantSmallSpine(t.roleid);
                for (var i = [], n = 0; n < 5; n++)
                    r.jibanProxy.getJbItemCount(t.roleid, n) > 0 &&
                        i.push({
                            star: n,
                            num: r.jibanProxy.getJbItemCount(t.roleid, n)
                        });
                this.list.data = i;
                this.lblLimit.node.active = 0 == i.length;
                this.nodeNew.active = r.jibanProxy.hasNewStory(t.roleid);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblJbValue", void 0);
        __decorate([_(n.default)], e.prototype, "roleUrl", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnShow", void 0);
        __decorate([_(l.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeNew", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
