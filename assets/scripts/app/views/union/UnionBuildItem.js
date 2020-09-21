var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;

            e.nodeTask = null;
            e.nodeBuild = null;
            e.lblCost = null;
            e.lblDes = null;
            e.lblName = null;
            e.nodeState = null;
            e.nodeBtn = null;
            e.btn = null;
            e.icon = null;
            e.img_5 = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.btn &&
                this.btn.clickEvents &&
                this.btn.clickEvents.length > 0 &&
                (this.btn.clickEvents[0].customEventData = this);
        };
        e.prototype.onClickItem = function () {
            this.data;
        };
        e.prototype.onClickBuild = function () {
            var t = this._data;
            if (1 == t.pay[0].id) {
                if (n.playerProxy.userData.cash < t.pay[0].count) {
                    r.alertUtil.alertItemLimit(1);
                    return;
                }
            } else if (n.bagProxy.getItemCount(t.pay[0].id) < t.pay[0].count) {
                r.alertUtil.alertItemLimit(t.pay[0].id);
                return;
            }
            t && n.unionProxy.sendBuild(t.id);
        };
        e.prototype.showData = function () {
            var t = this._data;
            if (t && t.pay) {

                this.nodeBuild.active = true;
                this.nodeTask.active = false;

                this.lblCost.string = "" + t.pay[0].count;
                this.lblDes.string = i18n.t("union_build_effect", {
                    exp: t.get.exp,
                    rich: t.get.fund,
                    gx: t.get.gx
                });
                this.lblName.string = t.msg;
                this.nodeBtn.active = n.unionProxy.memberInfo.dcid <= 0;
                this.nodeState.active = n.unionProxy.memberInfo.dcid == t.id;
                this.nodeBtn.active = 0 == n.unionProxy.memberInfo.dcid;
                this.icon.url = l.uiHelps.getItemSlot(t.icon);
                this.img_5.url = l.uiHelps.getResIcon(t.pay[0].id);
            } else if (t && !t.pay) {
                this.nodeBuild.active = false;
                this.nodeTask.active = true;
                this.nodeTask.getComponent('UnionTaskDayItem').data = t;
            }
        };

        __decorate([_(cc.Node)], e.prototype, "nodeTask", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBuild", void 0);

        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeState", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBtn", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(a.default)], e.prototype, "icon", void 0);
        __decorate([_(a.default)], e.prototype, "img_5", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;