var e = module,
    o = exports;
var i = {
    shaderPrograms: {},
    setShader: function(t, e) {
        var o = this.getShader(e);
        o && t._sgNode.setShaderProgram(o);
    },
    setShaderBlur: function(t, e) {
        var o =
                arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 3,
            i =
                arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 1,
            n = [];
        n.push({
            type: "float",
            key: "widthStep",
            value: o / t.node.getContentSize().width
        });
        n.push({
            type: "float",
            key: "heightStep",
            value: o / t.node.getContentSize().height
        });
        n.push({
            type: "float",
            key: "strength",
            value: i
        });
        this.setShaderParam(t, e, n);
    },
    setShaderParam: function(t, e, o) {
        var i = this.getShader(e);
        if (null != i) {
            for (var n = 0; n < o.length; n++) {
                switch ((r = o[n]).type) {
                    case "float":
                        r.uni = i.getUniformLocationForName(r.key);
                }
            }
            if (cc.sys.isNative) {
                var l = cc.GLProgramState.getOrCreateWithGLProgram(i);
                for (n = 0; n < o.length; n++) {
                    switch ((r = o[n]).type) {
                        case "float":
                            l.setUniformFloat(r.uni, r.value);
                    }
                }
            } else
                for (n = 0; n < o.length; n++) {
                    var r;
                    switch ((r = o[n]).type) {
                        case "float":
                            i.setUniformLocationWith1f(r.uni, r.value);
                    }
                }
            t._sgNode.setShaderProgram(i);
        }
    },
    getShader: function(e) {
        if ("" == e || null == e) {
            sprite._sgNode.setShaderProgram(null);
            return null;
        }
        var o = this.shaderPrograms[e];
        if (!o) {
            o = new cc.GLProgram();
            var i = require("default.vert"),
                n = require(cc.js.formatStr("%s.frag", e));
            if (cc.sys.isNative) o.initWithString(i, n);
            else {
                o.initWithVertexShaderByteArray(i, n);
                o.addAttribute(
                    cc.macro.ATTRIBUTE_NAME_POSITION,
                    cc.macro.VERTEX_ATTRIB_POSITION
                );
                o.addAttribute(
                    cc.macro.ATTRIBUTE_NAME_COLOR,
                    cc.macro.VERTEX_ATTRIB_COLOR
                );
                o.addAttribute(
                    cc.macro.ATTRIBUTE_NAME_TEX_COORD,
                    cc.macro.VERTEX_ATTRIB_TEX_COORDS
                );
            }
            o.link();
            o.updateUniforms();
            this.shaderPrograms[e] = o;
        }
        return o;
    }
};
e.exports = i;
