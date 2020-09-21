var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/CreateProxy"),
    s = require("../../component/RoleSpine"),
    c = require("../../utils/ApiUtils"),
    _ = require("../../Config"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.editName = null;
            e.list = null;
            e.animation = null;
            e.btnFemale = null;
            e.btnMale = null;
            e.spine = null;
            e.face = null;
            e.faces = [];
            e.lblName = null;
            e.nodeFace = null;
            e.femaleData = new Array();
            e.maleData = new Array();
            e.count = 3;
            e.faceStr = ["zhengchang", "beishang", "jianyi", "kaixin"];
            e.soundStr = ["", "001", "002", "003"];
            e.lastTime = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            this.editName.placeholder = i18n.t("COMMON_INPUT_TXT");
            l.utils.setCanvas();
            l.utils.setWaitUI();
            for (
                var e = this,
                    o = localcache.getItem(localdb.table_officer, 0),
                    i = 0;
                i < this.count;
                i++
            ) {
                this.femaleData.push(new a.CreateData(2, i + 1, o.shizhuang));
                this.maleData.push(new a.CreateData(1, i + 1, o.shizhuang));
            }
            for (
                i = 0;
                _.Config.addShowCreateHeadId &&
                i < _.Config.addShowCreateHeadId.length;
                i++
            )
                this.femaleData.push(
                    new a.CreateData(
                        2,
                        _.Config.addShowCreateHeadId[i],
                        o.shizhuang
                    )
                );
            this.list.selectHandle = function(o) {
                if (null != o) {
                    e.spine.setLevel(o.sex, o.job, 0);
                    e.spine.actionString(t.faceStr[0]);
                } else {
                    e.list.selectIndex = 0;
                    l.alertUtil.alert18n("CREATE_UNOPEN");
                }
            };
            this.onClickRandom();
            this.onClickSex(null, 2);
            facade.subscribe(
                n.createProxy.CREATE_RANDOM_NAME,
                this.update_Name,
                this
            );
            facade.subscribe("USER_DATA_OVER", this.onRoleData, this);
            l.utils.showEffect(this, 0);
            this.spine.actionString(this.faceStr[0]);
            cc.sys.isMobile
                ? this.node.parent.on(
                      cc.Node.EventType.TOUCH_START,
                      this.onClick,
                      this,
                      !0
                  )
                : this.node.parent.on(
                      cc.Node.EventType.MOUSE_DOWN,
                      this.onClick,
                      this,
                      !0
                  );
        };
        e.prototype.onClickSex = function(t, e) {
            var o = parseInt(e);
            this.face.node.active = 2 == o;
            this.btnFemale.interactable = 2 != o;
            this.list.data = 2 == o ? this.femaleData : this.maleData;
            var i = this.list.data.length,
                n = this.list.selectIndex;
            n = -1 == n ? Math.floor(Math.random() * i) : n > i ? i - 1 : n;
            this.list.selectIndex = n;
        };
        e.prototype.onClickFace = function() {
            if (this.face.node.active) {
                for (
                    var t = Math.floor(Math.random() * this.faces.length),
                        e = 0;
                    e < 10 && this.face.spriteFrame == this.faces[t];
                    e++
                )
                    t = Math.floor(Math.random() * this.faces.length);
                var o = this.soundStr[t];
                l.stringUtil.isBlank(o) ||
                    l.audioManager.playSound(
                        (this.btnFemale.interactable ? "m" : "w") + o,
                        !0,
                        !0
                    );
                this.face.spriteFrame = this.faces[t];
                this.spine.actionString(this.faceStr[t]);
            } else this.spine.actionString(this.faceStr[0]);
        };
        e.prototype.onClickRandom = function() {
            n.createProxy.sendRandomName();
        };
        e.prototype.onClickCreate = function() {
            if (l.stringUtil.isBlank(this.editName.string))
                l.alertUtil.alert(i18n.t("CREATE_IS_LIMIT"));
            else {
                //防止点击太快
                if(cc.sys.now() - this.lastTime > 3000)
                {
                    this.lastTime = cc.sys.now();

                    var t = this.list.selectData;
                    n.createProxy.sendCreate(t.sex, t.job, this.editName.string);
                }
            }
        };

        e.prototype.onRoleData = function() {
            if (!l.stringUtil.isBlank(n.playerProxy.userData.name)) {
                cc.director.loadScene("PreloadScene");
                c.apiUtils.createSuccess();
            }
        };
        e.prototype.onTestChange = function() {
            this.lblName.string = this.editName.string;
        };
        e.prototype.onClickClost = function() {};
        e.prototype.update_Name = function() {
            this.lblName.string = this.editName.string =
                n.createProxy.randomName;
        };
        e.prototype.onClick = function(t) {
            r.clickEffectUtils.showEffect(t);
            l.audioManager.playClickSound();
        };
        e.prototype.onDestroy = function() {
            l.utils.clearLayer();
        };
        __decorate([p(cc.EditBox)], e.prototype, "editName", void 0);
        __decorate([p(i.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Animation)], e.prototype, "animation", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnFemale", void 0);
        __decorate([p(cc.Button)], e.prototype, "btnMale", void 0);
        __decorate([p(s.default)], e.prototype, "spine", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "face", void 0);
        __decorate([p([cc.SpriteFrame])], e.prototype, "faces", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeFace", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
