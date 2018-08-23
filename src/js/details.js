require(['config'],function(){
    require(['jquery','common','lxzoom'],function($,com){

        var params = location.search.slice(1);
        params = params.split('&');
        var goods = {};
        params.forEach(function(item){
            var arr = item.split('=');
            var key = arr[0];
            var value = arr[1];
            goods[key] = decodeURI(value);

        });
        // 根据传入id页面渲染
        function render(){
            $('.large-img').children('img').attr('src',goods.imgurl);
            $('.small-img').children('img').eq(0).attr('src',goods.imgurl);
            $('.upper-title').html(goods.title);
            $('.upper-s').html(goods.sales);
            $('.upper-price li .upper-num').text(goods.price);
            $('.upper-choice>ul>li>img').attr('src',goods.imgurl);
        }
        render();

        
        $('.upper-choice ul').on('click','li',function(){
            $('.upper-choice ul').children('li').each(function(idx){
                $('.upper-choice ul').eq(idx).find('i').css('display','none');
            });
            $(this).find('i').css('display','inline-block');
            $(this).addClass('active');
        });

        // 输入框设置
        $('.goods_num').on('click','span',function(){
            if($(this).get(0).innerText == '-'){
                var res = $('.goods_num .num').get(0).value--;

                console.log(res);
                return false;
            }
            if($(this).get(0).innerText=="+"){
                var res1 = $('.goods_num .num').get(0).value++;
                console.log(res1);
                return false;
            }
        });

        $('.goods_num .num').on('change',function(){
            if($('.goods_num .num').get(0).value*1 <= 0){
                $('.goods_num .num').get(0).value = 0;
                
            }
        });

        // 加入购物车
        $('.upper-btn .through-car').on('click',function(){
            var c_obj = {
                id:goods.id,
                qty:$('.goods_num .num').get(0).value
            }
            var cargoods = "";
            for(var key in c_obj){
                cargoods += key + '=' + encodeURI(c_obj[key])+'&'
            }
            cargoods = cargoods.slice(0,-1);
            location.href = 'buycar.html?' + cargoods;
        });

        // 放大镜
        $('.large-img').lxzoom({width:500,height:500}).addClass('box');

            $('.small-img').on('click','img',function(){
                $('.large-img img').attr({
                    'src':this.src,
                    'data-big':this.dataset.big
                });
            })

    });
});

