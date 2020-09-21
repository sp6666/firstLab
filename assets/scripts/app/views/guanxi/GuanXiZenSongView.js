var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var selectMax = require("../../component/SelectMax");
var itemSlot = require("../item/ItemSlotUI");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        //界面
        nodeItem: {
            default: null,
            type: cc.Node
        },
        //数量选择
        selectMax: {
            default: null,
            type: selectMax.default
        },
        //icon
        spSelected: {
            default: null,
            type: cc.Sprite
        },
        //item
        imgItemSlot: {
            default: null,
            type: itemSlot.default
        },
    },
    onLoad () {
        //选中关系好友
        facade.subscribe(init.guanxiProxy.ON_RELATION_FLOWER_SET, this.onSelectId, this);
        facade.subscribe(init.guanxiProxy.ON_RELATION_FLOWER_GIVE_BACK, this.onClickClose, this); 
        this.init();
    },

    init() {
        //清除增加值
        init.guanxiProxy.givePt = 0;
        //清除选中鲜花id
        init.guanxiProxy.curSelectFlowerId = 0;

        //silder
        this.selectMax.curValue = 0;
        this.selectMax.max = 0;//>7?7:t.num;
        this.selectMax.lblCount.string = 0;

        //itemslot
        this.imgItemSlot.node.active = false;

        //出现动画
        this.nodeItem.setPosition(-700, -100);
        this.nodeItem.runAction(cc.moveTo(0.3, new cc.Vec2(40, -100)));
    },

    // start () {

    // },

    // update (dt) {},

    onSelectId(id) {
        //当前选中
        init.guanxiProxy.curSelectFlowerId = id;
        var flower = localcache.getItem(localdb.table_friend_flowerCore, init.guanxiProxy.curSelectFlowerId);
        var item = localcache.getItem(localdb.table_item, flower.itemid + "");
        if(!flower || !item)
        {
            //报错
            return;
        }

        //选中的物品
        this.spSelected.url = uiUtils.uiHelps.getItemSlot(item ? item.icon : item.id);
        this.imgItemSlot.data = item;
        this.imgItemSlot.node.active = true;

        //数量
        var count = init.bagProxy.getItemCount(item.id);
        this.selectMax.curValue = 0;
        this.selectMax.max = count;
        this.selectMax.lblCount.string = count > 0 ? 1 : 0;
    },

    //点击
    onClickItem() {
        //GUANXI_TIP_ZENSONG
        //点击弹出鲜花选择界面
        utils.utils.openPrefabView("guanxi/GuanXiZenSongSelectView");
    },
    onClickZenSong() {
        //数量
        var count = parseInt(this.selectMax.curValue);
        if(count <= 0 || parseInt(this.selectMax.max) < 0 || init.guanxiProxy.curSelectFlowerId <= 0 || max <= 0)
        {
            utils.alertUtil.alert18n("GUANXI_TIP_NO_NUM");
            return;
        }

        //点击赠送
        var flower = localcache.getItem(localdb.table_friend_flowerCore, init.guanxiProxy.curSelectFlowerId + "");
        var item = localcache.getItem(localdb.table_item, flower.itemid + "");
        var countBag = init.bagProxy.getItemCount(item.id);
        if(this.selectMax.curValue > countBag) {
            utils.alertUtil.alert18n("USER_ITEMS_SHORT");
            return;
        }
        var user = init.haoyouProxy.getUser(init.haoyouProxy.curSelectId);
        var max = init.bagProxy.getItemCount(init.guanxiProxy.curSelectFlowerId);
        if(!flower || !item || !user)
        {
            return;
        }
        
        utils.utils.showConfirm(i18n.t("GUANXI_TIP_ZENSONG",{num:count, flower:item.name, name:user.name}), function() {
            init.guanxiProxy.sendGive(init.haoyouProxy.curSelectId, count, flower.itemid, flower.fnum);
        });
        //发送消息
        
    },
    onClickClose() {
        //点击关闭
        utils.utils.closeView(this, false);

        //如果这时候还没有关闭对话框，那么就强制关闭
        if (utils.utils.isOpenView("ConfirmView")) {
            utils.utils.closeNameView("ConfirmView");
            utils.utils.popNext(!1);
        }
    },
});

