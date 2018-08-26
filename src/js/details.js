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
        // $('.upper-btn .through-car').on('click',function(){
        //     var c_obj = {
        //         id:goods.id,
        //         qty:$('.goods_num .num').get(0).value
        //     }
        //     var cargoods = "";
        //     for(var key in c_obj){
        //         cargoods += key + '=' + encodeURI(c_obj[key])+'&'
        //     }
        //     cargoods = cargoods.slice(0,-1);
        //     location.href = 'buycar.html?' + cargoods;
        // });

        // 添加购物车效果
        $('.upper-btn .through-car').on('click',function(){
            
        });

        // 详情页详情信息分页
        var judge = true;
        $('.dmain-br>ul li').on('click',function(){

            var txt = $(this).text();
            if(txt === '商品详情'&& judge){
                $('.br-first').css('display','block');
                judge = false;
            }else{
                $('.br-first').css('display','none');
                judge = true;

            }
            if(txt === '规格参数'&& judge){
                $('.br-sec').css('display','block');
                judge = false;
            }else{
                $('.br-sec').css('display','none');
                judge = true;

            }
            if(txt === '品牌故事'&& judge){
                $('.br-third').css('display','block');
                judge = false;
            }else{
                $('.br-third').css('display','none');
                judge = true;

            }
            if(txt === '评价629'&& judge){
                $('.br-four').css('display','block');
                judge = false;
            }else{
                $('.br-four').css('display','none');
                judge = true;

            }
        
            console.log(txt);
        });

        // 侧边栏点击显示更多
        var display = true;
        $('.icon-iconfontadd').on('click',function(){
            if(display){
                $(this).closest('li').find('ul').css('display','block');
                display = false;
            }else{
                $(this).closest('li').find('ul').css('display','none');
                display = true;
            }
        });

        // 放大镜自写版
        $('.small-img').on('click','img',function(){
            var url = $(this).attr('src');
            $('.large-img>img').attr('src',url);
            console.log(url);
        });
        $('.small-img').on('mouseover','img',function(){
            var url = $(this).attr('src');
            $('.large-img>img').attr('src',url);
            console.log(url);
        });
        $('.small-img').on('mouseout','img',function(){
            $(this).off('mouseover');
        }
        );
        
        $('.icon-fangdajing').on('click',function(){
            var url1 = $('.large-img>img').attr('src');
            var bigBox = $('<div/>').appendTo('body');
            bigBox.addClass('box');
            var img = $('<img/>').attr('src',url1).appendTo(bigBox);
            var del = $('<span/>').html('&times;').appendTo(bigBox);
            del.get(0).style.fontSize = '30px';
            del.get(0).style.position = 'absolute';
            del.get(0).style.cursor = 'pointer';
            del.addClass('dels');
            del.css({
                left:560,
                top:10
            })
            img.css({
                width:594,
                height:594
            })
            bigBox.css({
                width:600,
                height:600,
                left:300,
                top:400
            });
            bigBox.get(0).style.position = 'absolute';
            bigBox.get(0).style.border = '3px solid #000';
            console.log(bigBox.width());

            var dels = document.querySelector('.dels');
            dels.onclick = function(){
                var box = document.querySelector('.box');
                box.parentNode.removeChild(box);
            };
            
        });   
        document.onkeydown = function(e){
            e = e || window.event;
            var key = e.keyCode || e.which;
            if(key === 27){
                console.log(777);
                var box = document.querySelector('.box');
                box.parentNode.removeChild(box);
            }
        };
        // cookie写入
        
        var goodslist = Cookie.get('goodslist');
        
        if(goodslist === ''){
            goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
        }
        var num = document.querySelector('.goods_num .num');
        var cart = document.querySelector('.through-car');
        cart.onclick = function(){

            var currentGoods = goodslist.filter(function(item){
                console.log(666)
                return item.id === goods.id;
            });
            console.log(currentGoods);
            if(currentGoods.length>0){
                currentGoods[0].qty = currentGoods[0].qty+num.value;
            }else{
                var good = {
                        id:goods.id,
                        title:goods.title,
                        imgurl:goods.imgurl,
                        price:goods.price,
                        sales:goods.sales,
                        qty:num.value
                    }
                    goodslist.push(good);
            }

            Cookie.set('goodslist',JSON.stringify(goodslist));
        }
        console.log(goodslist);
        // 右侧边效果
        $('.side').load('html/sidebar.html');
        $('.car-s1').hide();
        var lock = true;
        $('.side').on('click','div',function(){
        console.log(666)
        // 回到顶部效果
        if($(this).get(0).className == 'back'){
            let timer = setInterval(()=>{
                // 计算缓冲速度
                let speed = Math.ceil(window.scrollY/5);//1

                scrollBy(0,-speed);

                if(window.scrollY <= 0){
                    clearInterval(timer);
                }
            },30);
        }
        var car = $(this).find('.car-s1');
        if(lock){
            car.show();
            lock = false;
        }else{
            car.hide();
            lock = true;
        }
    });
        
        
    });
});

