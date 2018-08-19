
// jQuery(function($){
        

//     });
(function(){

    var main = document.querySelector('.main-r-list');
    var ul = main.children[0];
    let status = [200,304];
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(status.indexOf(xhr.status)>=0){
            var data= JSON.parse(xhr.responseText);
            cre(data);
        }
    }
    xhr.open('get','../api/goods.php');
    xhr.send(null);

    function cre(data){
        ul.innerHTML = data.map(function(item){
            return `<li>
                    <img src="${item.imgurl}" />
                    <div>
                    <p><span>￥</span><span class="pro_price">${item.price}</span></p>
                    <p><span>销量</span><span class="sales">${item.sales}</span></p>
                    </div>
                    <h5>${item.title}</h5>
                    <p>${item.dealer}</p>
                    <div>
                    <span>加入收藏</span>
                    <span>加入购物车</span>
                    </div>
                </li>`;
        }).join('');
    }
})();