var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var initializer = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //属性名
        lblName:  { default: null, type: cc.Label },
        //当前值
        lblCurProp:  { default: null, type: cc.Label },
        //增加以后的值
        lblNextProp:  { default: null, type: cc.Label }
    },
    showData: function () {
        var t = this._data;
        if(!t)
        {
            //
            return;
        }

        //名字
        var prop = "GUANXI_LBL_PROP_NAME_" + t.ep_type;
        this.lblName.string = i18n.t(prop);

        //cur
        this.lblCurProp.string = t.curPt;

        //next
        this.lblNextProp.string = t.nextPt > 0 ? t.nextPt : i18n.t("GUANXI_LBL_MAX_RWD");
    },

    onLoad() { 

    },

    // start () {

    // },

    // update (dt) {},
});

