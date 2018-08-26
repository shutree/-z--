require(['config'],function(){
    require(['jquery','common'],function($){
        $('.box .icon-gantanhao').hide();
        var lock = false;
        var res = randomNumber(1000,9999);
        $('.btn').on('click',function(){
            $('.btn').val(res);
        })
        var tel;
        $('.tel').on('blur',function(){
            $('.box .i1').hide();
            tel = $('.tel').val();
            var codes = res;
            $.ajax({
                url:'../api/login.php',
                data:{
                    username:tel
                },
                success:function(res){
                    console.log(res);
                    if(res==='yes'){
                        $('.box .i1').html('请输入您的手机号').show();
                        lock = true;
                    }else{
                        lock = false;
                    }
                }
            });

        });

        $('.r-text').on('blur',function(){
            console.log($('.r-text'));
            var tcode = $('.r-text').get(0);
            tcode = tcode.value;
            console.log(tcode);
            if(tcode.length<=0){
                $('.box .i2').html('请输入验证码').show();
                lock = true;
            }
            if(tcode!=res){
                $('.box .i2').html('验证码错误！').show();
                lock = true;
            }else{
                $('.i4').hide();
                lock = false;
            }
        });

        var r_pwd;
        var pwd
        $('.pwd').on('blur',function(){
             pwd= $('.pwd').val();
             var ret = /^[a-z0-9_-]{6,20}$/
            if(!ret.test(r_pwd)){
                $('.i3').html('密码应为6-20位任意字符组成！').show();
                lock = true;
            }else{
                $('.i3').hide();
                lock = false;
            }
            var pwd1 = pwd.split('');
            r_pwd = pwd1.map(function(item){
                var rnumber = parseInt(Math.random()*100)+1;

                item = '' + (item.charCodeAt(0)*1+10-5)*rnumber;
                return item;
            }).join('o');
            console.log(r_pwd);
        });

        $('.confirm').on('blur',function(){
            var r_confirm = $('.confirm').val();
            if(r_confirm!=pwd){
                $('.i4').html('两次密码不一致！').show();
                lock = true;
            }else{
                $('.i4').hide();
                lock = false;
            }
            
        });

        $('.sub').on('click',function(){
            if(!lock){
                return false;
            }
            $.ajax({
                url:'../api/reg.php',
                data:{
                    username:tel,
                    password:r_pwd
                },
                success:function(res){
                    console.log(res);
                    if(res==='注册成功'){
                        location.href = '../index.html';
                        lock = true;
                    }else{
                        
                        lock = false;
                    }
                }
            });
            

        });

    });
});