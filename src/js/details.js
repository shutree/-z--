require(['config'],function(){
    require(['jquery','common'],function($,com){

        var params = location.search.slice(1);
        params = params.split('&');
        var goods = {};
        params.forEach(function(item){
            var arr = item.split('=');
            var key = arr[0];
            var value = arr[1];
            goods[key] = decodeURI(value);

        });
        console.log(goods);

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
    });
});