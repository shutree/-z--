
// 登录验证

require(['config'],function(){
    require(['jquery','common'],function($,com){
        var lock = false;
        var res = randomNumber(1000,9999);
        $('.code').on('click',function(){
            $('.code').html(res);
        })
        $('.sub_login').on('click',function(){
            
            var tel = $('.tel-txt').val();
            var codes = res;
            $.ajax({
                url:'../api/login.php',
                data:{
                    username:tel
                },
                success:function(res){
                    console.log(res);
                    if(res==='yes'&& $('.txt_code').val()==codes){
                        location.href= '../index.html';
                        lock = true;
                    }else{
                        lock = false;
                    }
                }
            });

            if(!lock){
                return false;
            }
        });

    });
});