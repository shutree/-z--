require(['config'],function(){
    require(['jquery','common'],function($,com){

        // if(!window.localStorage){
        //     alert("浏览器支持localstorage");
        //     return false;
        // }else{
        //     console.log(666);
        // }



        // url传参数据库获取数据
        /*var params = location.search.slice(1);
        params = params.split('&');
        var goods = {};
        params.forEach(function(item){
            var arr = item.split('=');
            var key = arr[0];
            var value = arr[1];
            goods[key] = decodeURI(value);

        });
        console.log(goods.id);
        var arr = [];
        $.ajax({
            url:'../api/car.php',
            data:{
                    guid:goods.id
                },
            success:function(res){
                res = JSON.parse(res);
                localStorage.setItem('key',JSON.stringify(res));
                arr.unshift(res);
                render(res);
            }
        });*/
        
        // 读取cookie
        

        var goodslist = Cookie.get('goodslist');

        if(goodslist.length<=0){
            goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
        }
        render();


        // 页面渲染
        var storeName = ['东方双狮旗舰店','天梭旗舰店','赫柏林','劳力士','浪琴','江诗丹顿'];
        var s = storeName[randomNumber(1,6)];
        $('.store_name').html(s);
        function render(){
           console.log(goodslist);

            var lis = goodslist.map(function(item){
                return `<li>
                <input type="checkbox" />
                <img src="${item.imgurl}"/>
                <i></i>
                <p class="des_goods">
                <span class="des-g">${item.title}</span>
                <span class="texture">不锈钢</span>
                <span class="car-color">深蓝色</span>
                </p>
                <p class="cost">
                <span>￥</span>
                <span class="s-pri">${item.price}</span>
                </p>
                <p class="goods_num">
                <span class="reduce calc-btns">-</span>
                <input class="num" value="1"type="text">
                <span class="add calc-btns">+</span>
                </p>
                <p class="total-cost">
                <span>￥</span>
                <span class="t-pri">${item.price}</span>
                </p>
                <p class="ope-goods">
                <span class="g-del">删除</span>
                <span class="g-move">移入收藏夹</span>
                </p>
            </li>`;
            }).join('');
            


            // 数据库方式获取信息渲染页面
            /*var lis = data.map(function(item){
                return `<li>
                <input type="checkbox" />
                <img src="${item.imgurl}"/>
                <i></i>
                <p class="des_goods">
                <span class="des-g">${item.title}</span>
                <span class="texture">不锈钢</span>
                <span class="car-color">深蓝色</span>
                </p>
                <p class="cost">
                <span>￥</span>
                <span class="s-pri">${item.price}</span>
                </p>
                <p class="goods_num">
                <span class="reduce calc-btns">-</span>
                <input class="num" value="1"type="text">
                <span class="add calc-btns">+</span>
                </p>
                <p class="total-cost">
                <span>￥</span>
                <span class="t-pri">${item.price}</span>
                </p>
                <p class="ope-goods">
                <span class="g-del">删除</span>
                <span class="g-move">移入收藏夹</span>
                </p>
            </li>`;}).join('');*/

            $('.c-goodslist>ul').html(lis);
            
            
            
            //删除
            var dels = document.querySelector('.g-del');
            dels.onclick = function(){
                var lis = dels.parentNode.parentNode.parentNode;
                lis.parentNode.removeChild(lis);
                
            }

             // 输入框设置
            var r1= $('.s-pri').text();
            $('.goods_num').on('click','span',function(){
                if($(this).get(0).innerText == '-'){
                    var res = $('.goods_num .num').get(0).value--;

                    if($('.goods_num .num').get(0).value*1 <= 0){
                        $('.goods_num .num').get(0).value = 0;
                        
                    }
                    res = r1*res;
                    $('.t-pri').html(res);
                    return false;
                }
                if($(this).get(0).innerText=="+"){
                    var res1 = $('.goods_num .num').get(0).value++;
                    res = r1*res1;
                    $('.t-pri').html(res);
                    return false;
                }
                
            });
            
            
            $('.goods_num .num').on('change',function(){
                var r1= $('.s-pri').text();
                var r2 = $('.num').val();
                var res = r1*r2;
                $('.t-pri').html(res);
                if($(this).closest('li').find(':checkbox').prop('checked')){
                    $('.total_n').html(res);
                    $('.total_p').html(res);
                }
                
            });

            // 全选，单选
        
            var $checkbox = $('input');

            // var lis = document.querySelector('.c-goodslist>ul li');
            var $lis = $('.c-goodslist>ul').children('li');
            console.log($lis);
            // 全选/不选
            var t1 = 0;
            $('#check-all').click(function(){
                
                $checkbox.prop('checked',this.checked);
                if($('#check-all').prop('checked')){
                    $lis.each(function(idx){
                        var pri = $lis.eq(idx).find('.t-pri').text();
                        t1 += pri*1;

                        console.log(t1);
                    });
                }else{
                   t1 = 0; 
                }
                
                $('.total_n').html(t1);
                $('.total_p').html(t1);
            });


            // 点击任意位置勾选当前行
            $('.c-goodslist>ul').on('click','input',function(){
                var $currentLi = $(this).closest('li');
                $currentLi.find(':checkbox').prop('checked');
                var t2 = $currentLi.find('.t-pri').text();
                if($currentLi.find(':checkbox').prop('checked')){
                    $('.total_n').html(t2);
                    $('.total_p').html(t2);
                }else{
                    $('.total_n').text('0');
                    $('.total_p').text('0');
                }
                

                checkAll();
            });


            function checkAll(){
                var $checked = $checkbox.filter(':checked');
                $('#check-all').prop('checked',$checked.length === $checkbox.length);
            }
        }
        
    });
});
