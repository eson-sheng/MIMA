$(function(){
    /*ajax获取数据*/
    $.ajax({
        type:"POST",
        url:'',
        dataType:"json",
        data:{
            "api":'get'
        },
        success:function(ret){
            //做有意义的事
            index(ret);
        },
        error:function(jqXHR){
            if (jqXHR.status!=200) {
                alert("发生错误：" + jqXHR.status);
            }
        }
    });

    /*执行函数*/
    function index(json)
    {
        var html = '';
        var html_str = page_html_model();
        for (var k in json) {
            var data = json[k];
            // console.log(data);
            /*ID编号*/
            var num = data.id;
            /*名称*/
            var appname = data.appname;
            /*账号*/
            var username = data.username;
            /*密码*/
            var password = data.password;
            /*图标*/
            var logo = data.logo;
            /*备注*/
            var note = data.note;
            /*页面*/
            html += string_format(html_str,num,logo,appname,username,password,note);
        }
        /*赋值页面*/
        $("#main").html(html);
        /*不显示note备注提示*/
        $(".note").parent().hide();
        $(".note").parent().attr('st','hide');
        $(".flip").hide();
        $(".del").hide();
        $(".edit").hide();
        /*滚动条美化*/
        $("#main > li > p").each(function(){
            $(this).addClass('noscrollbar').removeClass('scrollbar');
            $(this).mouseover(function(){
                $(this).addClass('scrollbar').removeClass('noscrollbar');
            });
            $(this).mouseout(function(){
                $(this).addClass('noscrollbar').removeClass('scrollbar');
            });
        });
        /*动画查看note内容*/
        $("#main > li").mouseover(function(){
            $(this).find('span > .flip').show();
            $(this).find('span > .del').show();
            $(this).find('span > .edit').show();
        });
        $("#main > li").mouseout(function(){
            $(this).find('span > .flip').hide();
            $(this).find('span > .del').hide();
            $(this).find('span > .edit').hide();
        });
        $("#main > li > span:nth-child(3)").find('i').click(function(){
            // console.log($(this).parent().parent().html());
            $(this).parent().parent().find('p').slideToggle(666);
            var obj = $(this).parent().parent().find('p').last();
            var st = $(this).parent().parent().find('p').last().attr('st');
            if (st == 'hide') {
                $(this).css({"transform":"rotate(180deg)"});
                obj.show({duration: 666});
                obj.attr('st','show');
            } else {
                $(this).css({ "transform": "rotate(0deg)"});
                obj.hide({duration: 666});
                obj.attr('st','hide');
            }
        });
        /*新增密码卡元素生成*/
        var add_page_html = add_page_html_model();
        $("#main").append(add_page_html);
        /*添加密码*/
        action_add();
        /*删除数据*/
        action_del();
        /*修改数据*/
        action_edit();
    }

    /*数据列表模板*/
    function page_html_model()
    {
        var html_str = 
        '<li>' +
            '<span><i class="del" num="{0}"></i></span>' +
            '<span><i class="edit" num="{0}"></i></span>' +
            '<span><i class="flip"></i></span>' +
            '<img src="{1}" height="32" width="32">' +
            '<span>{2}</span>' +
            '<p><i class="uname"></i>{3}</p>' +
            '<p><i class="passd"></i>{4}</p>' +
            '<p><i class="note"></i>{5}</p>' +
        '</li>';
        return html_str;
    }

    /*添加数据模板*/
    function add_page_html_model()
    {
        var html_str = 
        '<li>' +
            '<span><i class="add"></i></span>' +
        '</li>';
        return html_str;
    }

    /*拼接字符串*/
    function string_format(pattern) 
    {
        var args = Array.prototype.slice.call(arguments, 1);
        return pattern.replace(/\{([0-9]|10|11)\}/g, function () {
            var i = parseInt(arguments[1]);
            if (i >= args.length) {
                throw "Exception occurs: index " + i + " outof range " + args.length;
            }
            return args[i];
        });
    }

    /*添加密码*/
    function action_add()
    {
        $(".add").click(function(){
            layer.open({
                type: 1,
                title: false,
                shadeClose: true,
                skin: 'layui-layer-nobg',
                area: ['520px', '620px'], //宽高
                btn: ['提交', '取消'],
                content: add_input_html(),
                yes: function(index){
                    var params = {
                        "appname":$("#appname").val(),
                        "username":$("#username").val(),
                        "password":$("#password").val(),
                        "logo":$("#logo").val(),
                        "note":$("#note").val()
                    }
                    // console.log(params);
                    /*ajax*/
                    $.ajax({
                        type:"POST",
                        url:'index.php',
                        dataType:"json",
                        data:{
                            "json":params,
                            "api":'add'
                        },
                        success:function(ret){
                            //做有意义的事
                            console.log(ret);
                            if (ret.status) {
                                layer.close(index);
                                layer.msg('保存成功！', {icon: 1});
                                setTimeout("history.go(0)",1000);
                            } else {
                                layer.msg('处理错误：' + ret.errmsg, {icon: 2});
                            }
                        },
                        error:function(jqXHR){
                            if (jqXHR.status!=200) {
                                console.log("发生错误：" + jqXHR.status);
                            }
                        }
                    });
                },
                btn2: function(index){
                    layer.msg('取消操作！', {icon: 0});
                }
            });
        });
    }

    /*添加提交表单模板*/
    function add_input_html()
    {
        return  '<center><h1>新建密码数据：</h1>\n'+
                '<form>\n' +
                    '<br>\n' +
                    '<label for="appname">名称：</label>\n' +
                    '<input type="text" name="appname" id="appname"/>\n' +
                    '<br>\n' +
                    '<label for="username">账号：</label>\n' +
                    '<input type="text" name="username" id="username"/>\n' +
                    '<br>\n' +
                    '<label for="password">密码：</label>\n' +
                    '<input type="text" name="password" id="password"/>\n' +
                    '<br>\n' +
                    '<label for="logo">图标：</label>\n' +
                    '<textarea name="logo" id="logo" cols="30" rows="10"></textarea>\n' +
                    '<br>\n' +
                    '<label for="note">备注：</label>\n' +
                    '<textarea name="note" id="note" cols="30" rows="10"></textarea>\n' +
                '</form></center>';
    }

    /*删除数据*/
    function action_del()
    {
        $("#main > li > span:first-child").find('.del').click(function(){
            var num = $(this).attr("num");
            var params = {
                "id":num
            }
            //弹窗询问层
            layer.confirm('确定删除么？', {
                title: false,
                icon: 0,
                btn: ['是的', '算了'] //按钮
            }, function(){
                $.ajax({
                    type:"POST",
                    url: 'index.php',
                    dataType:"json",
                    data:{
                        "json":params,
                        "api":"del"
                    },
                    success:function(ret){
                        if (ret.status) {
                            layer.msg('已删除', {icon: 1});
                            setTimeout("history.go(0)",1000);
                        } else {
                            layer.msg('删除失败:' + ret.errno, {icon: 2});
                        }
                    },
                    error:function(jqXHR){
                        if (jqXHR.status!=200) {
                            console.log("发生错误：" + jqXHR.status);
                        }
                    }
                }); 
            }, function(){
                layer.msg('已取消', {time: 3000});
            });
        });
    }

    /*编辑密码*/
    function action_edit()
    {
        $("#main > li > span:nth-child(2)").find('.edit').click(function(){
            /*ID编号*/
            var num = $(this).attr('num');
            /*名称*/
            var appname = $(this).parent().parent().find('span:last').html().replace(/\"/g,'\'');
            /*账号*/
            var username = $(this).parent().parent().find('p').html().replace(/<[^>]*><\/i>/,'');
            /*密码*/
            var password = $(this).parent().parent().find('p').next().html().replace(/<[^>]*><\/i>/,'');
            /*图标*/
            var logo = $(this).parent().parent().find('img').attr('src');
            /*备注*/
            var note = $(this).parent().parent().find('p').next().next().html().replace(/<[^>]*><\/i>/,'');
            /*html 页面文本*/
            var html_str =  '<center><h1>修改密码数据：</h1>\n'+
                            '<form>\n' +
                                '<br>\n' +
                                '<label for="appname">名称：</label>\n' +
                                '<input type="text" name="appname" id="appname" value="{0}"/>\n' +
                                '<br>\n' +
                                '<label for="username">账号：</label>\n' +
                                '<input type="text" name="username" id="username" value="{1}"/>\n' +
                                '<br>\n' +
                                '<label for="password">密码：</label>\n' +
                                '<input type="text" name="password" id="password" value="{2}"/>\n' +
                                '<br>\n' +
                                '<label for="logo">图标：</label>\n' +
                                '<textarea name="logo" id="logo" cols="30" rows="10">{3}</textarea>\n' +
                                '<br>\n' +
                                '<label for="note">备注：</label>\n' +
                                '<textarea name="note" id="note" cols="30" rows="10">{4}</textarea>\n' +
                            '</form></center>';
            var html = string_format(html_str,appname,username,password,logo,note);
                        layer.open({
                type: 1,
                title: false,
                shadeClose: true,
                skin: 'layui-layer-nobg',
                area: ['520px', '620px'], //宽高
                btn: ['提交', '取消'],
                content: html,
                yes: function(index){
                    var params = {
                        "id":num,
                        "appname":$("#appname").val(),
                        "username":$("#username").val(),
                        "password":$("#password").val(),
                        "logo":$("#logo").val(),
                        "note":$("#note").val()
                    }
                    // console.log(params);
                    /*ajax*/
                    $.ajax({
                        type:"POST",
                        url:'index.php',
                        dataType:"json",
                        data:{
                            "json":params,
                            "api":'edit'
                        },
                        success:function(ret){
                            //做有意义的事
                            console.log(ret);
                            if (ret.status) {
                                layer.close(index);
                                layer.msg('保存成功！', {icon: 1});
                                setTimeout("history.go(0)",1000);
                            } else {
                                layer.msg('处理错误：' + ret.errmsg, {icon: 2});
                            }
                        },
                        error:function(jqXHR){
                            if (jqXHR.status!=200) {
                                console.log("发生错误：" + jqXHR.status);
                            }
                        }
                    });
                },
                btn2: function(index){
                    layer.msg('取消操作！', {icon: 0});
                }
            });
        });
    }

});