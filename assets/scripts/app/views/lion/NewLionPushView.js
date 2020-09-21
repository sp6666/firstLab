var list=require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var item = require("../../views/item/ItemSlotUI");      //icon
var slect = require("../../component/SelectMax");       //数量
var urlLoad = require("../../component/UrlLoad");       //图片
cc.Class({
    extends: cc.Component,

    properties: {
        urlNeed:{
            //图片
            default:null,
            type:urlLoad.default
        },
        lblCount:{
            //数量
            default:null,
            type:cc.Label
        },
        selectCount:{
            //数量
            default:null,
            type:slect.default
        },
        lblLvFrom:{
            //等级1
            default:null,
            type:cc.Label
        },
        lblLvTo:{
            //等级2
            default:null,
            type:cc.Label
        },
        item1:{
            //icon1
            default:null,
            type:item.default
        },
        item2:{
            //icon2
            default:null,
            type:item.default
        },
        nodeItem2:{
            //icon2
            default:null,
            type:cc.Node
        }
    },

    onLoad () {
        var self = this;

        
        //数量选择
        var max = Math.ceil(init.lionProxy.toLastExp / init.lionProxy.cfg.shop.exp);
        this.selectCount.curValue = 1;  //初始化为1
        this.selectCount.max = max;     //最高为配置表最后等级所需经验
        //this.selectCount.lblCount.string = num > 0 ? 1 : 0;
        this.selectCount.changeHandler = function() {
            self.updateData();
        };

        this.updateData();
    },

    // update (dt) {},
    updateData() {
        //刷新数据
        var count = this.selectCount.curValue;

        var cfg = init.lionProxy.shopCfg;

        //价格
        //this.urlNeed.url = uiUtils.uiHelps.getItemSlot(cfg.need.id);
        this.lblCount.string = i18n.t("LION_BTN_BUY",{ num:cfg.need.count * count});

        //奖励
        /*
        if(cfg.items.id > 0)
        {
            //这里暂用，因为数据还不对
            var data = new uiUtils.ItemSlotData();
            data.id = cfg.items.id;
            data.count = cfg.items.count;
            this.item1.data = data;
        }
        */

        if(cfg.items.length > 0)
        {
            var data = new uiUtils.ItemSlotData();
            data.id = cfg.items[0].id;
            data.count = cfg.items[0].count * count;
            this.item1.data = data;
        }
        if(cfg.items.length > 1)
        {
            var data = new uiUtils.ItemSlotData();
            data.id = cfg.items[1].id;
            data.count = cfg.items[1].count * count;
            this.item2.data = data;
        }

        this.nodeItem2.active = cfg.items.length > 1;

        //等级
        //当前等级
        this.lblLvFrom.string = init.lionProxy.cfg.grade;

        //目标等级
        this.lblLvTo.string = init.lionProxy.checkAddExp(count * init.lionProxy.cfg.shop.exp);
    },
    onClickBuy() {
        //购买
        var self = this;
        var count = self.selectCount.curValue;
        var cashCount = count * init.lionProxy.cfg.shop.need.count;
        var expCount = count * init.lionProxy.cfg.shop.exp;
        utils.utils.showConfirm(
            i18n.t("LION_BTN_LV_UP",{num:cashCount, exp:expCount}),
            function() {
                init.lionProxy.sendLvUp(self.selectCount.curValue);
                self.onClickClose();
            }
        )
    },
    onClickAdd10() {
        //加10个
        var max = Math.ceil(init.lionProxy.toLastExp / init.lionProxy.cfg.shop.exp);
        var addNum = (this.selectCount.curValue + 10) >= max ? max : (this.selectCount.curValue + 10);
        this.selectCount.curValue = addNum;
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
