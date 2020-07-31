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
    //$("#clock").html(result);
    document.getElementById('clock').innerHTML=result
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


window.onload=function(){
    new Typed("#sText", {
        strings: ['一个人，一座城，一世心疼。<br/>一个人，一支伞，一世等待。'],
        startDelay: 1000,//开始前延迟时间
        typeSpeed: 100,//数值越大 速度越慢
        loop: true,
        backSpeed: 50,
        showCursor: true
    });
    const sakura = new Sakura('body', {
        colors: [
            {
                gradientColorStart: 'rgba(255, 183, 197, 0.9)',
                gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
                gradientColorDegree: 10,
            },
            // {
            //     gradientColorStart: 'rgba(255,189,189)',
            //     gradientColorEnd: 'rgba(227,170,181)',
            //     gradientColorDegree: 10,
            // },
            // {
            //     gradientColorStart: 'rgba(212,152,163)',
            //     gradientColorEnd: 'rgba(242,185,196)',
            //     gradientColorDegree: 10,
            // },
        ],
    });
    s();
    setInterval(function(){
        s()
    },1000);
}