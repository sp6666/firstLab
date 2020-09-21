var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var head = require("../user/UserHeadItem");
var time = require("../../models/TimeProxy");
var i = require("../../component/RenderListItem"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeRank = [];
            e.lblName = null;
            e.lblScore = null;
            e.nodeHead = null;
            return e;
        }
        e.prototype.onLoad = function() {
        };
        e.prototype.showData = function() {
            var t = this._data;

            //头像
            this.nodeHead.set
            this.nodeHead.setUserHead(null, t.headavatar);

            //名字
            this.lblName.string = t.name;

            //分数
            this.lblScore.string = t.score;

            //排名
            for(var idx = 0; idx < this.nodeRank.length; idx++)
            {
                this.nodeRank[idx].active = idx == t.rank;
            }

            if(t.rank < 0)
            {
                this.lblScore.string += " " + i18n.t("RAKN_UNRANK");
            }
        };

        e.prototype.onClickItem = function() {
            var t = this.data;
            
            t && (init.playerProxy.sendGetOther(t.uid));
        };
        __decorate([a([cc.Node])], e.prototype, "nodeRank", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([a(head.default)], e.prototype, "nodeHead", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;