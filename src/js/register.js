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

        // $('.r-text').on('blur',function(){
        //     var tcode = $('.r-text').val();
        //     console.log(tcode);
        //     if(tcode==undefined){
        //         $('.box i2').html('请输入验证码').show();
        //         lock = true;
        //     }
        //     if(tcode*1!=res){
        //         $('.box i2').html('验证码错误！').show();
        //     lock = true;
        //     }
        //     lock = false;
        // });

        var r_pwd;
        $('.pwd').on('blur',function(){
             r_pwd= $('.pwd').val();
             var ret = /^[a-z0-9_-]{6,20}$/
            if(!ret.test(r_pwd)){
                $('.i3').html('密码应为6-20位任意字符组成！').show();
                lock = true;
            }
            lock = false;
        });

        $('.confirm').on('blur',function(){
            var r_confirm = $('.confirm').val();
            if(r_confirm!=r_pwd){
                $('.i4').html('两次密码不一致！').show();
                lock = true;
            }
            lock = false;
        });

        $('.sub').on('click',function(){
            // if(!lock){
            //     return false;
            // }
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
            })
        })

    });
});