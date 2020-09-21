var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/Utils"),
    r = require("../../component/List"),
    a = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    c = require("../../component/LabelShadow"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.lblName = null;
            e.nodeBtn = null;
            e.lblTime = null;
            e.list = null;
            e.nodeUnlock = null;
            e.lblUnlock = null;
            e.grays = [];
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.nodeBtn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_kitchen, t.id);
                this.item.data = {
                    id: e.itemid
                };
                for (var o = [], i = 0; i < e.fooditemid.length; i++)
                    o.push({
                        id: e.fooditemid[i]
                    });
                var n = a.wifeProxy.getWifeData(t.wid);
                this.nodeUnlock.active =
                    n && (n.love < e.intmin || n.flower < e.intmax);
                if (this.nodeUnlock.active) {
                    var r =
                            n.love < e.intmin
                                ? i18n.t("KIT_NEED_LOVE", {
                                      d: e.intmin
                                  })
                                : "",
                        c =
                            n.flower < e.intmax
                                ? i18n.t("KIT_NEED_FLOWER", {
                                      d: e.intmax
                                  })
                                : "";
                    this.lblUnlock.string = l.stringUtil.isBlank(r)
                        ? c
                        : l.stringUtil.isBlank(c)
                        ? r
                        : i18n.t("COMMON_CONTEXT_NUM", {
                              c: r,
                              n: c
                          });
                }
                this.nodeBtn.interactable = !this.nodeUnlock.active;
                for (i = 0; i < this.grays.length; i++)
                    s.shaderUtils.setImageGray(
                        this.grays[i],
                        this.nodeUnlock.active
                    );
                this.list.data = o;
                this.lblTime.string = i18n.t("KIT_COST_TIME", {
                    t: l.timeUtil.second2hms(e.time, "HH:mm:ss")
                });
            }
        };
        __decorate([u(n.default)], e.prototype, "item", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Button)], e.prototype, "nodeBtn", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([u(r.default)], e.prototype, "list", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([u(c.default)], e.prototype, "lblUnlock", void 0);
        __decorate([u([cc.Sprite])], e.prototype, "grays", void 0);
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;
