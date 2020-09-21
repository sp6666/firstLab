var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.img = null;
            e.label = null;
            e.lblName = null;
            e.spBag = null;
            e.spfBag = [];
            e.spfItems = [];
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {


                this.set = localcache.getItem(
                    localdb.table_unionGiftBag,
                    t.id
                );
                if (this.set.type == 0) {
                    this.label.string = i18n.t('UNION_GIFT_NAME_TIP', {
                        name: t.name
                    });
                    this.spBag.spriteFrame = this.spfBag[0];
                } else {
                    this.label.string = i18n.t('UNION_GIFT_NAME_TIP2', {
                        name: t.name
                    });
                    this.spBag.spriteFrame = this.spfBag[1];
                }
                this.lblName.string = this.set.name;

                this.img.spriteFrame = this.spfItems[this.set.lv];



            }
        };
        e.prototype.onClickGet = function () {
            var t = this._data;
            t && n.unionProxy.sendGetGift(1, t.index);
        };
        e.prototype.onClickDetail = function (t, e) {
            var o = this._data;
            if (o) {
                n.unionProxy.setSelectInfo(o.id);
                n.unionProxy.selectDetail &&
                    l.utils.openPrefabView("achieve/AchieveDetail");
            }
        };

        __decorate([_(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([_(cc.Label)], e.prototype, "label", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);

        __decorate([_(cc.Sprite)], e.prototype, "spBag", void 0);
        __decorate([_([cc.SpriteFrame])], e.prototype, "spfBag", void 0);
        __decorate([_([cc.SpriteFrame])], e.prototype, "spfItems", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;