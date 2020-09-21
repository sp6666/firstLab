var render = require("../../component/RenderListItem");
var item = require("../item/ItemSlotUI");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var head = require("../user/UserHeadItem");

cc.Class({
    extends: render.default,

    properties: {
        itemProp:{
            //图标
            default:null,
            type:urlLoad.default
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        },
        itemPrice:{
            //价格图标
            default:null,
            type:urlLoad.default
        },
        lblPrice:{
            //价格
            default:null,
            type:cc.Label
        },
        nodeUsed:{
            //已购买
            default:null,
            type:cc.Node
        }
    },

    showData() {
        var t = this._data;

        //图片ui
        var res = t.type == 1 ? uiUtils.uiHelps.getConfidanteIcon(t.res) : uiUtils.uiHelps.getGalleryIcon(t.res);
        this.itemProp.url = res;

        //名字
        this.lblName.string = t.name;

        //价格图标
        if(t.need.length > 0)
        {
            //图标
            var id = t.type == 1 ? t.need[0].item : t.need[0].id;
            this.itemPrice.url = uiUtils.uiHelps.getItemSlot(id);

            //价格
            this.lblPrice.string = t.need[0].count + "";
        }

        //已购买
        var used = false;
        var lst = t.type == 1 ? init.confidanteProxy.hero.heros.clothes : init.confidanteProxy.hero.heros.paints;
        for(var key in lst)
        {
            if(lst[key] == t.id)
            {
                used = true;
                break;
            }
        }
        this.nodeUsed.active = used;
    },
    onLoad() { 

    },
    onClickItem() {
        //点击购买
        var t = this._data;
        var used = false;
        var lst = t.type == 1 ? init.confidanteProxy.hero.heros.clothes : init.confidanteProxy.hero.heros.paints;
        for(var key in lst)
        {
            if(lst[key] == t.id)
            {
                used = true;
                break;
            }
        }
        if(used)
        {
            //
            utils.alertUtil.alert(i18n.t("CONFIDANTE_LOCKED"));
            return;
        }

        var t = this._data;
        if(t && t.need.length > 0)
        {
            var id = t.type == 1 ? t.need[0].item : t.need[0].id;
            var item = localcache.getItem(localdb.table_item, id + "");
            if(item)
            {
                var self = this;
                utils.utils.showConfirm(i18n.t("CONFIDANTE_CONF_TIP_GIFT", {num:this._data.need[0].count, name:item.name}), function() {
                    init.confidanteProxy.sendUnlock(self._data.type, self._data.id);
                });
            }
        }
    },
});
