var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/SelectMax"),
    a = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    UrlLoad = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGate = null;   //标题
            e.lblScore = null;
            e.lblCount = null;  //剩余次数
            e.list = null;      //奖励
            e.mustList = null;  //必得奖励
            e.lblDes = null;    //说明
            e.lblTime = null;
            e.lblHighScore = null;  //本关最高得分
            e.select = null;
            e.nodeClear = null;     //已通关显示
            e.nodeUnclear = null;   //未通关显示
            e.nodeFight = null;
            e.nodeUnopen = null;
            e.tag1 = null;
            e.tag2 = null;
            e.nodeMaxStar = null;   //满星奖励按钮
            e.lblMustScore = null;  //必定获得的情愫值
            return e;
        }
        e.prototype.onLoad = function() {
            this.data = this.node.openParam;
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_BASE,
                this.updateCount,
                this
            );
            //领奖返回 
            facade.subscribe(l.confidanteProxy.ON_CON_GET_RWD_BACK, this.updateShow, this);
            //买通关次数返回
            facade.subscribe(l.confidanteProxy.ON_CON_GET_TIMES_BACK, this.updateShow, this);
            //过关结束，刷新列表 
            facade.subscribe(l.confidanteProxy.ON_CON_DATING_GATE, this.updateShow, this);
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            //更新数据
            var lv = this.data.chapter + "_" + this.data.lv;
            var lst = l.confidanteProxy.hero.heros.cts;
            for(var key in lst){
                if(lv == key)
                {
                    this.data.info = lst[key];
                }
            }

            //标题
            this.lblGate.string = this.data.value.name;     
            //说明
            this.lblDes.string = this.data.value.msg;       

            //推荐
            var tags = this.data.value.clothe_score;
            tags.sort(function (a, b) {
                return b.point - a.point;
            });
            this.tag1.url = a.uiHelps.getTag(tags[0].tag);
            this.tag2.url = a.uiHelps.getTag(tags[1].tag);
            //end推荐

            //过关奖励
            this.list.data = this.data.value.prop_rwd.rwd;

            //最高分
            var high = l.confidanteProxy.getScoreChapter(this.data.chapter, this.data.lv);

            this.lblHighScore.string = i18n.t("CONFIDANTE_IT_LBL_SCORE",{score:high});

            //当前次数
            var score = this.data.info == null ? 3 : this.data.info.ct_times;
            this.lblCount.string = i18n.t("CONFIDANTE_IT_LBL_COUNT",{count:score});

            //通关
            var isCross = false;
            if(this.data.info && this.data.info.is_ct > 0)  //有info 并且is_ct大于0
            {
                isCross = true;
            }
            this.nodeClear.active = isCross == true;
            this.nodeUnclear.active = isCross == false;

            //满星奖励按钮是否显示
            var state = this.data.info == null ? 0 : this.data.info.status;
            this.nodeMaxStar.active = state == 0;

            //必定获得的情愫值， 这里写死是情愫值 1482
            var exp = this.data.value.exp == null ? 0 : this.data.value.exp;
            var itemCfg = localcache.getItem(localdb.table_item, 1482);
            if(itemCfg)
            {
                var mList = [];
                var expItem = {};
                expItem.id = 1482;
                expItem.count = exp;
                expItem.kind = itemCfg.kind;
                mList.push(expItem);
                this.mustList.data = mList;
            }
            
            this.lblMustScore.string = i18n.t("CONFIDANTE_MUST_GET_SCORE",{num:exp});
        };
        e.prototype.onClickAdd = function() {
            /*
            if (
                l.clothePveProxy.info &&
                l.clothePveProxy.info.info.eTime < i.timeUtil.second
            )
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                i.utils.openPrefabView("ConfirmBuyMore");
            }
            */
        };
        e.prototype.updateCount = function() {
            this.lblCount.string = i18n.t("CLOTHE_PVE_REMAIN", {
                d: l.clothePveProxy.info.count - l.clothePveProxy.base.use
            });
            if (this.nodeClear.active) {
                this.select.max =
                    l.clothePveProxy.info.count - l.clothePveProxy.base.use;
                this.select.curValue =
                    this.select.curValue > this.select.max
                        ? this.select.max
                        : this.select.curValue < 1
                        ? 1
                        : this.select.curValue;
            }
        };
        e.prototype.checkStarsRwd = function() {
            //检查是否可领三星奖励
            var cur = this.data.chapter + "_" + this.data.lv;
            var lst = l.confidanteProxy.hero.heros.cts;
            for(var key in lst)
            {
                if(key == cur)
                {
                    return lst[key].star == 3;
                }
            }
            return false;
        };
        e.prototype.onClickFight = function() {
            var score = this.data.info == null ? 3 : this.data.info.ct_times;
            if(score <= 0)
            {
                i.alertUtil.alert(i18n.t("CONFIDANTE_TIMES_OVER"));
                return;
            }

            i.utils.openPrefabView( "confidante/ConfidanteDatingChange", false, this.data );
            this.onClickClost();
        };
        e.prototype.onClickRwd = function() {
            //是否可领奖
            if(this.checkStarsRwd())
            {
                //领奖
                l.confidanteProxy.sendRwd(1, this.data.chapter, this.data.lv);
            }
            else{
                l.confidanteProxy.curShowRwd = this.data.value.stars_rwd;
                i.utils.openPrefabView("confidante/ConfidanteDatingRwdView");
            }
        };
        e.prototype.onClickFast = function() {
            var score = this.data.info == null ? 3 : this.data.info.ct_times;
            if(score <= 0)
            {
                i.alertUtil.alert(i18n.t("CONFIDANTE_TIMES_OVER"));
                return;
            }

            l.confidanteProxy.sendClearance(
                2,
                this.data.chapter, 
                this.data.lv,
                0,0,0,0,0,0);
        };
        e.prototype.onClickTimes = function() {
            //购买通关次数
            var self = this;
            var times = 1;
            if(this.data.info)
            {
                //没有通关就没有info，这种情况下买体力按第0次购买
                times =  this.data.info.buy_times >= 10 ? 10 : this.data.info.buy_times + 1;
            }
            
            var streng = localcache.getItem(localdb.table_confidante_times, times);
            if(streng)
            {
                utils.utils.showConfirm(i18n.t("CONFIDANTE_CONF_BUY_TIMES",{num:streng.need}), function() {
                    l.confidanteProxy.sendTimes(self.data.chapter, self.data.lv);
                });
            }
            
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.initCureentTag = function() {
            var pveInfos = localcache.getItem(localdb.table_clothepve, this.data.gateid);
            var tags = pveInfos.clothe_score;
            tags.sort(function (a, b) {
                return b.point - a.point;
            });
            this.tag1.url = a.uiHelps.getTag(tags[0].tag);
            this.tag2.url = a.uiHelps.getTag(tags[1].tag);  
        };
        
        __decorate([_(cc.Label)], e.prototype, "lblGate", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(n.default)], e.prototype, "mustList", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblHighScore", void 0);
        __decorate([_(r.default)], e.prototype, "select", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeClear", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnclear", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnopen", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeMaxStar", void 0);
        __decorate([_(UrlLoad.default)], e.prototype, "tag1", void 0);
        __decorate([_(UrlLoad.default)], e.prototype, "tag2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMustScore", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
