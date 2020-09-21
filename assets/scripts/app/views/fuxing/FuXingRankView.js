var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    uiUtils = require("../../utils/UIUtils"),
    urlLoad = require("../../component/UrlLoad"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblMyRank = null;
            e.lblMyName = null;
            e.lblMyScore = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(l.fuXingProxy.FUXING_RANK_UPDATE, this.onRank, this);
            this.servantIndex = 0;
            this.onRank();
            // this.onMyRid();
   
        };
        e.prototype.onRank = function () {
            var data = null;
            if(this.servantIndex == 0) {
                data = l.fuXingProxy.rankData.cx_rank;
            }else if(this.servantIndex == 1) {
                data = l.fuXingProxy.rankData.rob_rank;
            }else if(this.servantIndex == 2) {
                data = l.fuXingProxy.rankData.yb_rank;
            }
            this.list.data = data.rank;

            if(data != null) {
                this.lblMyName.string = data.myRank.name;
                this.lblMyScore.string = data.myRank.score;
                this.lblMyRank.string = 0 == data.myRank.rid ? i18n.t("RAKN_UNRANK") : data.myRank.rid + "";
            }

            
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.changePerson = function (t, e) {
            this.servantIndex = parseInt(e);
            this.onRank();
        };







        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);


        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;