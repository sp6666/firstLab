var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
var item = require("../item/ItemSlotUI");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //鲜花
        itemSlot: {
            default: null,
            type: item.default
        },
        //名字
        lblName: {
            default: null,
            type: cc.Label
        },
        //友情值
        lblYouqing: {
            default: null,
            type: cc.Label
        },
        //按钮
        btnXuanZhong: {
            default: null,
            type: cc.Button
        }
    },
    showData: function () {
        var t = this._data;

        var item = localcache.getItem(localdb.table_item, t.itemid + "");
        if(!t || !item)
        {
            return;
        }

        //icon
        var count = init.bagProxy.getItemCount(t.itemid);
        var e = new uiutil.ItemSlotData();
        e.itemid = t.itemid;
        e.count = count;
        this.itemSlot.data = e;

        //name
        this.lblName.string = item.name;

        //友情值 
        this.lblYouqing.string = i18n.t("GUANXI_FUN_NUMBER",{ num: t.fnum });

        //按钮
        this.btnXuanZhong.interactable = count > 0;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { 

    },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickItem() {
        facade.send(init.guanxiProxy.ON_RELATION_FLOWER_SET, this._data.id);    //设置选中的花
        facade.send(init.guanxiProxy.ON_RELATION_FLOWER_SELECT);    //关闭界面
    },
});

