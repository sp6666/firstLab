var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/RedDot"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.nodes = [];
            e.lblName = null;
            e.lblTitles = [];
            e.seColor = null;
            e.norColor = null;
            e.selectImg = null;
            e.kejuSelectImg = null;
            e.dailyImg = null;
            e.kejuImg = null;
            e.chengjiuImg = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.UPDATE_ACHIEVE();
            facade.subscribe(
                n.achievementProxy.UPDATE_ACHIEVE,
                this.UPDATE_ACHIEVE,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);

            if (this.node.openParam === 'oldusers') {
                this.onClickTab(null, 2);
            } else {
                var t;
                t = !r.default._MAP.achieve ||
                    r.default._MAP.dailyrwd ||
                    r.default._MAP.dailytask ?
                    2 :
                    1;
                this.onClickTab(null, t);
            }


        };
        e.prototype.UPDATE_ACHIEVE = function () {
            this.list.data = n.achievementProxy.achieveList;
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this, !0);
        };
        e.prototype.onClickTab = function (t, e) {
            var o = parseInt(e) - 1;
            this.lblName.string = i18n.t(
                0 == o ?
                "ACHIEVE_TIP" :
                1 == o ?
                "ACHIEVE_DAILY_TIP" :
                "KEJU_TIP"
            );
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].active = o == i;
                this.lblTitles[i].node.color =
                    o == i ? this.seColor : this.norColor;
            }
            this.chengjiuImg.spriteFrame = 0 == o ? this.selectImg : null;
            this.kejuImg.spriteFrame = 2 == o ? this.kejuSelectImg : null;
            this.dailyImg.spriteFrame = 1 == o ? this.selectImg : null;
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c([cc.Node])], e.prototype, "nodes", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c([cc.Label])], e.prototype, "lblTitles", void 0);
        __decorate([c(cc.Color)], e.prototype, "seColor", void 0);
        __decorate([c(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([c(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([c(cc.SpriteFrame)], e.prototype, "kejuSelectImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "dailyImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "kejuImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "chengjiuImg", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;