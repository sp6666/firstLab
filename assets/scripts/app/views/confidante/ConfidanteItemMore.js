var item = require("../../component/RenderListItem");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var item = require("../item/ItemSlotUI");

cc.Class({
    extends: cc.Component,

    properties: {
        itemIcon:{
            //元宝icon
            default:null,
            type:item.default
        },
        lblBtn:{
            //按钮文本
            default:null,
            type:cc.Label
        },
        lblStrength:{
            //恢复1点体力
            default:null,
            type:cc.Label
        },
        lblAllStrength:{
            //恢复全部体力
            default:null,
            type:cc.Label
        }
    },
    onLoad() { 
        var self = this;
        var data = this.node.openParam;

        //icon
        var data = new uiUtils.ItemSlotData();
        data.id = 1;    //固定为元宝
        data.kind = 1;
        data.count = init.bagProxy.getItemCount(data.id);
        this.itemIcon.data = data;

        //按钮文字
        var times = init.confidanteProxy.hero.tl_times >= 10 ? 10 : init.confidanteProxy.hero.tl_times + 1;
        var streng = localcache.getItem(localdb.table_confidante_strength, times);
        if(streng)
        {
            this.lblBtn.string = i18n.t("CONFIDANTE_STRENGTH_BTN_RECOVER",{num:streng.need});
        }

        if(init.confidanteProxy.hero.count < init.confidanteProxy.cstMaxStrength)
        {
            //体力不足10点时才需要计算
            var curTime = utils.timeUtil.second - init.confidanteProxy.hero.use_time;
            if(init.confidanteProxy.cstRecoverTime > curTime)
            {
                curTime = init.confidanteProxy.cstRecoverTime - curTime;
            }

            uiUtils.uiUtils.countDown(curTime + utils.timeUtil.second, this.lblStrength,
                function() {
                    //结束以后自己先加1，再重新刷新界面
                    init.confidanteProxy.hero.count += 1;
                    self.onLoad();
                },
                !0,
                "CONFIDANTE_STRENGTH_RECOVER",
                "time"
            );

            //总的体力
            var curAllTime = curTime;
            var curSecond = init.confidanteProxy.cstMaxStrength - init.confidanteProxy.hero.count - 1;
            if(curSecond > 0)
            {
                curAllTime += (curSecond * init.confidanteProxy.cstRecoverTime);
            }

            uiUtils.uiUtils.countDown(curAllTime + utils.timeUtil.second, this.lblAllStrength, null, !0, "CONFIDANTE_STRENGTH_RECOVER_ALL", "time");
        }
        
    },
    onClickBuy() {
        //购买体力
        var times = init.confidanteProxy.hero.tl_times >= 10 ? 10 : init.confidanteProxy.hero.tl_times + 1;
        var streng = localcache.getItem(localdb.table_confidante_strength, times);
        if(streng)
        {
            var self = this;
            utils.utils.showConfirm(i18n.t("CONFIDANTE_CONF_BUY_STRENGTH",{num:streng.need}), function() {
                init.confidanteProxy.sendRecovery();
                self.onClickClose();
            });
        }
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
