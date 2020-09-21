var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lblCost = null;
            e.icon = null;
            e.iconArr = [];
            e.costIcon = null;
            e.btnSelect = null;
            e.eff = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblname.string = t.name;
                this.lblCost.string = "" + t.money;
                this.icon.url = a.uiHelps.getChuXingIcon(t.id);
                this.costIcon.spriteFrame = this.iconArr[1 == t.type ? 0 : 1];
                var e = !1;
                1 == t.type
                    ? (e = l.playerProxy.userData.cash >= t.money)
                    : 2 == t.type &&
                      (e = l.playerProxy.userData.food >= t.money);
                this.btnSelect.interactable = e;
                this.eff.active = t.id > 5;
            }
        };
        e.prototype.onClickRender = function() {
            var t = this._data;
            l.sonProxy.lilianData.travel = t.id;
            n.utils.closeNameView("child/ChildLilianTravelSelect");
            facade.send("CHILD_LI_LIAN_SELECT_UPDATE");
        };
        __decorate([_(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(r.default)], e.prototype, "icon", void 0);
        __decorate([_([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "costIcon", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnSelect", void 0);
        __decorate([_(cc.Node)], e.prototype, "eff", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
