var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    a = require("../../Initializer"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = [];
            e.dayFrames = [];
            e.dayOne = null;
            e.dayNormal = null;
            e.dayAct = null;
            e.daySprite = null;
            return e;
        }
        o = e;

        e.prototype.showData = function () {

            this.list[0].data = {
                rwd: this._data.items[40],
                need: 40,
                day: this._data.id
            };
            this.list[1].data = {
                rwd: this._data.items[80],
                need: 80,
                day: this._data.id
            };
            this.list[2].data = {
                rwd: this._data.items[120],
                need: 120,
                day: this._data.id
            };

            this.daySprite.spriteFrame = this.dayFrames[this._data.id - 1];
            this.dayOne.active = this._data.id === 1;
            this.dayNormal.active = this._data.id !== 1;

            var score = a.oldUsersProxy.regression.activity_score ? a.oldUsersProxy.regression.activity_score[this._data.id] : 0;
            score = score ? score : 0;
            this.dayAct.string = score + '';
        };

        e.prototype.getRwd = function (t, e) {

            e = parseInt(e);
            a.oldUsersProxy.sendActivityRwd(this._data.id, e);
        };

        __decorate([p([i.default])], e.prototype, "list", void 0);
        __decorate([p(cc.Label)], e.prototype, "dayAct", void 0);
        __decorate([p(cc.Node)], e.prototype, "dayOne", void 0);
        __decorate([p(cc.Node)], e.prototype, "dayNormal", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "daySprite", void 0);
        __decorate([p([cc.SpriteFrame])], e.prototype, "dayFrames", void 0);
        return (e = o = __decorate([u], e));
    })(i.default);
o.default = h;