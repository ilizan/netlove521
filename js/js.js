$(function () {
    /*var config = {

    }
    CanvasParticle(config);*/

    function timeElapse(date){
        var current = Date();
        var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
        var days = Math.floor(seconds / (3600 * 24));
        seconds = seconds % (3600 * 24);
        var hours = Math.floor(seconds / 3600);
        if (hours < 10) {
            hours = "0" + hours;
        }
        seconds = seconds % 3600;
        var minutes = Math.floor(seconds / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        seconds = seconds % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var result = "第 <span class=\"digit\">" + days + "</span> 天 <br/><span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒";
        $("#clock").html(result);
    }

    function s(){
        var together = new Date();
        together.setFullYear(2012, 12, 31);
        together.setHours(21);
        together.setMinutes(04);
        together.setSeconds(00);
        together.setMilliseconds(0);
        timeElapse(together)
    }
    s();
    setInterval(function(){
        s()
    },1000);
    $('body').on('mousemove', function(e) {
        var offsetX = e.clientX / window.innerWidth - 0.5,
            offsetY = e.clientY / window.innerHeight - 0.5;
        var _left = -40 * offsetX;    //如果想动的幅度更大，可以调整 -40 的值
        var _top = -40 * offsetY;     //如果想动的幅度更大，可以调整 -40 的值
        //应用公式
        $('.content').css('left',_left*1.2).css('top',_top*0.2);  //将您的left值和top值先+此数值，*的小数越大，动的越大，否则越小
    });
})