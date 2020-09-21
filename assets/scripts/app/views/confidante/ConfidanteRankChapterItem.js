var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var shader = require("../../utils/ShaderUtils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //章节
        lblIndex: {
            default: null,
            type: cc.Label
        },
        //名字
        lblChapter: {
            default: null,
            type: cc.Label
        }
    },
    showData () {
        var t = this._data;
        this.lblIndex.string = i18n.t("CONFIDANTE_LBL_CHAPTER_NAME", {num:t.lv});
        this.lblChapter.string = t.name;

        this.node.active = init.confidanteProxy.checkCpLevel(t.lv, 1);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { 

    },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickItem() {
        //选中直接发送该章的第一节
        init.confidanteProxy.sendRank(this._data.lv, 2);
        facade.send(init.guanxiProxy.ON_CON_DATING_RANK_SLECT);
    },
});

