var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    uiUtils = require("../../utils/UIUtils"),
    url = require("../../component/UrlLoad"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnLook = null;
            e.lblTitle = null;
            e.iconTown1 = null;
            e.iconTown2 = null;
            e.lblTownName = null;
            e.lblTownInfo = null;
            e.lblReward = null;
            e.lblCost = null;
            e.listReward = null;
            

            //变量
            e.data = null;      //本地数据
            e.sevData = null;   //服务器数据
            e.cashCity = 0; //入城费
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.chuidiaoProxy.CHUIDIAO_ACT_UPDATE, this.onActUpdate, this);

            this.data = this.node.openParam;
            var curId = this.data.id;
            this.sevData = l.chuidiaoProxy.cities[curId];
            if (this.data && this.sevData) {
               this.updateData();
            }
        };
        e.prototype.updateData = function(){
            var t = this.data;

            //名称
            this.lblTitle.string = this.lblTownName.string = t.name;

            //icon
            var iconPath = (100 + parseInt(t.icon)).toString();
            this.iconTown1.url = this.iconTown2.url = uiUtils.uiHelps.getXunfangIcon(iconPath);
            
            var msg = localcache.getItem(localdb.table_chuidiao_msg, t.id);
            if(msg)
            {
                //介绍
                this.lblTownInfo.string = msg.msg;
            }

            var rwds = [];  //奖励
            this.cashCity = 0;  //入城费

            if(this.sevData.fishes.cheap || this.sevData.fishes.special)
            {
                this.lblReward.string = i18n.t("CHUIDIAO_MAIN_TAKE");   //显示将会获得

                if(this.sevData.fishes.cheap)//一般鱼
                {
                    this.cashCity = l.chuidiaoProxy.data.settings.walk.teleport_normal_fishing_city_cost;  //入城费
                    for(var idx = 0; idx < this.sevData.fishes.cheap.length; idx++)
                    {
                        var fish = localcache.getItem(localdb.table_item, this.sevData.fishes.cheap[idx]);
                        if(fish)
                        {
                            var item = {};
                            item.kind = fish.kind;
                            item.id = fish.id;
                            item.count = 1;
                            rwds.push(item);
                        }
                    }
                }

                if(this.sevData.fishes.special)//特殊鱼
                {
                    this.cashCity = l.chuidiaoProxy.data.settings.walk.teleport_special_fishing_city_cost;  //入城费
                    var fish = localcache.getItem(localdb.table_item, this.sevData.fishes.special);
                    if(fish)
                    {
                        var item = {};
                        item.kind = fish.kind;
                        item.id = fish.id;
                        item.count = 1;
                        rwds.push(item);
                    }
                }
            }
            else
            {
                this.lblReward.string = i18n.t("CHUIDIAO_MAIN_MABY_TAKE");  //显示可能获得
                this.cashCity = l.chuidiaoProxy.data.settings.walk.teleport_normal_city_cost; //入城费

                for(var idx = 0; idx < l.chuidiaoProxy.data.city_random_rwds.length; idx++)
                {
                    var item = {};
                    item.id = l.chuidiaoProxy.data.city_random_rwds[idx].id;
                    item.count = l.chuidiaoProxy.data.city_random_rwds[idx].count;
                    rwds.push(item);
                }
            }

            //列表
            this.listReward.data = rwds;
            //入城费
            this.lblCost.string = n.utils.formatMoney(this.cashCity);

            //按钮 活动未结束就打开
            this.btnLook.interactable = l.chuidiaoProxy.data.info.eTime > n.timeUtil.getCurSceond();
        };

        //入城扣钱
        e.prototype.onClickLook = function() {
            //如果此地尚未垂钓，就出提示
            if(l.chuidiaoProxy.act.place == l.chuidiaoProxy.act.mid_place && l.chuidiaoProxy.act.place > 0)
            {
                var self = this;
                n.utils.showConfirm(i18n.t("CHUIDIAO_MAIN_MOVE_TIP")
                , function() {
                    self.doPlay();
                });

                return;
            }

            this.doPlay();
        };

        //确认移动
        e.prototype.doPlay = function(){
            if(l.playerProxy.userData.cash < this.cashCity)
            {
                //元宝不够
                n.alertUtil.alertItemLimit(1);
                return;
            }

            if(l.chuidiaoProxy.act)
            {
                if(l.chuidiaoProxy.act.stamina < l.chuidiaoProxy.data.settings.walk.random_cost)
                {
                    //体力不够
                    if(!n.utils.isOpenView("ChuiDiaoStaminaBuy"))
                    {
                        n.utils.openPrefabView("chuidiao/ChuiDiaoStaminaBuy", null, null);
                    }
                    return;
                }
            }

            //体力元宝都够了就移动
            l.chuidiaoProxy.sendMove(this.data.id);
        };

        e.prototype.onActUpdate = function() {
            if(l.chuidiaoProxy.act.type <= 0)
            {
                //如果没有place说明仅仅是买了体力
                return;
            }

            //目前能取到就关闭,传id过去
            facade.send(l.chuidiaoProxy.ON_CHUIDIAO_ACT_BACK, this.data.id);
            this.onClickClose();
        };

        //关闭
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };

        //新的
        __decorate([s(cc.Button)], e.prototype, "btnLook", void 0);         //进城按钮
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);         //标题
        __decorate([s(url.default)], e.prototype, "iconTown1", void 0);     //城镇icon1
        __decorate([s(url.default)], e.prototype, "iconTown2", void 0);     //城镇icon2
        __decorate([s(cc.Label)], e.prototype, "lblTownName", void 0);      //lbl城镇名
        __decorate([s(cc.Label)], e.prototype, "lblTownInfo", void 0);      //lbl城镇介绍
        __decorate([s(cc.Label)], e.prototype, "lblReward", void 0);        //lbl奖励介绍
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);          //lbl进城费
        __decorate([s(i.default)], e.prototype, "listReward", void 0);      //list奖励表
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
