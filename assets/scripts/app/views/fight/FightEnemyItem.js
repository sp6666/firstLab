var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/SpineItem"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.action = null;
            e.nc = null;
            e.sp = null;
            e.aStr = "";
            e.hp = 2;
            e.atkRank = 10;
            e.isCd = !1;
            e.isDead = !1;
            e.target = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if (null == this.action.loadHandle) {
                    this.action.loadHandle = this.onLoadOver;
                    this.action.target = this;
                }
                this.action.url = l.uiHelps.getEnemy(t.job);
                this.action.node.scaleX =
                    (t.index >= 1e3 ? -1 : 1) * this.action.node.scaleX;
                this.hp = t.hp;
                this.atkRank = t.atkRank;
            }
        };
        e.prototype.isCanAttack = function() {
            return !(
                this.isCd ||
                this.isDead ||
                null == this.target ||
                this.target.isDead ||
                this.atkRank <
                    cc.pDistance(this.node.position, this.target.node.position)
            );
        };
        e.prototype.onLoadOver = function() {
            var t = this._data;
            if (t) {
                var e = this.action.node.getComponentInChildren(r.default);
                if (e) {
                    this.sp = e;
                    this.sp.spine.node.color =
                        2 == t.isGray
                            ? cc.Color.WHITE.fromHEX("#D6D6D6")
                            : 1 == t.isGray
                            ? cc.Color.WHITE.fromHEX("#DADADA")
                            : a.utils.WHITE;
                    this.idle();
                }
            }
        };
        e.prototype.actionString = function(t) {
            if (this.aStr != t) {
                this.aStr = t;
                this._data;
                this.nc && this.nc.play(t);
                this.sp;
            }
        };
        e.prototype.hit = function() {
            this.hp -= 1;
            this.hp <= 0 && !this.isDead && this.dead();
        };
        e.prototype.run = function() {
            this.isDead || this.actionString("run");
        };
        e.prototype.atk = function(t) {
            void 0 === t && (t = !0);
            if (!this.isDead) {
                this.isCd = !0;
                var e = this,
                    o = 0.5;
                if (this.nc)
                    for (var i = this.nc.getClips(), n = 0; n < i.length; n++)
                        if ("atk" == i[n].name) {
                            o = i[n].duration;
                            break;
                        }
                this.scheduleOnce(function() {
                    e.idle();
                }, o);
                this.scheduleOnce(function() {
                    e.isCd = !1;
                    e.target && e.target.hit();
                }, o + 0.5);
                t && this.actionString("atk");
            }
        };
        e.prototype.idle = function() {
            this.isDead || this.actionString("idle");
        };
        e.prototype.dead = function() {
            var t = this,
                e = 0.5;
            if (this.nc)
                for (var o = this.nc.getClips(), i = 0; i < o.length; i++)
                    if ("dead" == o[i].name) {
                        e = o[i].duration;
                        break;
                    }
            if (this.sp) {
                this.sp.node.runAction(cc.fadeTo(0.5, 0));
                this.sp.spine.loop = !1;
            }
            t.isDead = !0;
            t.target = null;
            this.actionString("dead");
            this.scheduleOnce(function() {
                facade.send("FIGHT_ENEMY_DEAD", t._data.index);
            }, e + 0.5);
        };
        __decorate([_(n.default)], e.prototype, "action", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
