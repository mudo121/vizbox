var ws = new WebSocket("ws://localhost:8888/ws");

ws.onmessage = function (evt) {
    var json = JSON.parse(evt.data);

    switch(json.label)
    {
        case "operator_text":
        case "robot_text":
            var subtitles = document.getElementById("subtitles");
            var txt = document.createElement("li");
            txt.appendChild(document.createTextNode(json.text));
            txt.setAttribute("class", json.label + " subtitle-line");
            console.log(json.label) // added line
            subtitles.insertAdjacentElement('afterbegin', txt);

            var footer = $(".footer");
            footer.animate({ scrollTop: footer.prop("scrollHeight") - footer.height() }, 100);
            break
        case "challenge_step":
            $old = $(".activated").removeClass('activated');

            $next_active = $('#storyline li').eq(json.index)
            $next_active.addClass('activated');
            break
        case "image_1":
            var image_1 = "data:image/png;base64," + json.image;
            console.log("Got image: '"+image_1+"'")
            document.getElementById('visualization_img_1').setAttribute('src', image_1);
            break;
        case "image_2":
            var image_2 = "data:image/png;base64," + json.image;
            console.log("Got image: '"+image_2+"'")
            document.getElementById('visualization_img_2').setAttribute('src', image_2);
            break;
        case "image_3":
            var image_3 = "data:image/png;base64," + json.image;
            console.log("Got image: '"+image_3+"'")
            document.getElementById('visualization_img_3').setAttribute('src', image_3);
            break;
        case "image_4":
            var image_4 = "data:image/png;base64," + json.image;
            console.log("Got image: '"+image_4+"'")
            document.getElementById('visualization_img_4').setAttribute('src', image_4);
            break;
        case "story":
            $("#title").text(json.title)

            console.log("Got story: '"+json+"'")

            $("#storyline").empty();
            $(json.storyline).each(function(index){
                console.log("Got line: '"+this+"'")
                $("#storyline").append('<li>' + this + '</li>');
            });
            break;
    }
};

function send_to_ws() {
    var formdata = $( "#command_enter_form" ).serialize();
    ws.send(formdata);
}

$("#submit").on("click", send_to_ws);

$("#btn1").click(function () {
                $.ajax({
                    type: 'POST',
                    url: "/",
                    data : {'btn' : 1}
                });
            });


$("#btn2").click(function () {
    $.ajax({
        type: 'POST',
        url: "/",
        data : {'btn' : 2}
    });
});