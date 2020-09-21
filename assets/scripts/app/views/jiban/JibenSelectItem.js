var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/UrlLoad"),
    r = require("../../Initializer"),
    a = require("../../component/StateImg"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblChapt = null;
            e.btnShow = null;
            e.state = null;
            e.imgHead = null;
            e.imgWife = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnShow);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = r.jibanProxy.getJibanType(t.roleid, t.type);
                this.state.total = e.length;
                if (2 == t.type) {
                    this.imgHead.node.active = !1;
                    this.imgWife.node.active = !0;
                    var o = localcache.getItem(localdb.table_wife, t.roleid);
                    this.imgWife.url = n.uiHelps.getWifeSmallBody(o.res);
                } else if (1 == t.type) {
                    this.imgHead.node.active = !0;
                    this.imgWife.node.active = !1;
                    this.imgHead.url = n.uiHelps.getServantSmallSpine(t.roleid);
                }
                for (var i = 0, l = 0; l < e.length; l++)
                    r.jibanProxy.isOverStory(e[l].id) && i++;
                this.state.value = i;
                if (2 == t.type) {
                    var a = localcache.getItem(localdb.table_wife, t.roleid);
                    this.lblName.string =
                        2 == r.playerProxy.userData.sex ? a.wname2 : a.wname;
                    var s = (2 == r.playerProxy.userData.sex
                        ? a.info2
                        : a.info
                    ).split("|");
                    this.lblChapt.string = s.length >= 2 ? s[0] + s[1] : s[0];
                } else if (1 == t.type) {
                    var c = localcache.getItem(localdb.table_hero, t.roleid),
                        _ = localcache.getItem(
                            localdb.table_heroinfo,
                            t.roleid
                        );
                    this.lblName.string = c.name;
                    var d = _.recruit.split("|");
                    this.lblChapt.string = d.length >= 2 ? d[0] + d[1] : d[0];
                }
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblChapt", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnShow", void 0);
        __decorate([_(a.default)], e.prototype, "state", void 0);
        __decorate([_(l.default)], e.prototype, "imgHead", void 0);
        __decorate([_(l.default)], e.prototype, "imgWife", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
