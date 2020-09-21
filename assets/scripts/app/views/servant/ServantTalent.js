var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.tablentList = null;
            e.widget = null;
            e._curHero = null;
            e._curIndex = -1;
            e._orgY = 0;
            e._orgH = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SERVANT_UP", this.updateServant, this);
            this.updateShow();
        };
        e.prototype.updateServant = function() {
            this._curHero = l.servantProxy.getHeroData(this._curHero.id);
            this.updateShow();
        };
        e.prototype.updateShow = function(t) {
            void 0 === t && (t = null);
            this._curHero = t || this._curHero;
            this._curIndex = -1;
            this._curHero && this.onClickTab(null, 0);
            this.tablentList.data = this._curHero.epskill;
        };
        e.prototype.onClickItem = function(t, e) {
            e.data && i.utils.openPrefabView("servant/BookUpLv", null, e.data);
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e) - 1;
            o == this._curIndex ? (this._curIndex = -1) : (this._curIndex = o);
            for (var i = [], n = 0; n < this._curHero.epskill.length; n++) {
                var l = this._curHero.epskill[n],
                    r = localcache.getItem(localdb.table_epSkill, l.id + "");
                !r ||
                    (r.ep != this._curIndex + 1 && -1 != this._curIndex) ||
                    i.push(l);
            }
        };
        __decorate([s(n.default)], e.prototype, "tablentList", void 0);
        __decorate([s(cc.Node)], e.prototype, "widget", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
