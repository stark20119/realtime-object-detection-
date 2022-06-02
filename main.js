img = ""
statuss = ""
object = [];

function preload() {




}


function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()

    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()

    

}

function start(){
    objectdetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status-detecting objects"



}

function modelLoaded() {
    console.log("cocossd is loaded!!")

    statuss = true
}

function gotResult(error, results) {
    if (error) {
        console.log("error")
    } else {
        console.log(results)
        object = results


    }

}

function draw() {
    image(video, 0, 0, 380, 380)

    if (statuss != "") {
        objectdetector.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {

            document.getElementById("status").innerHTML = "Status:Object detected";
            document.getElementById("no_ofObject").innerHTML = "No.of object detected are"+object.length;
            red=random(255)
            green=random(255)
            blue=random(255)
            fill(red,green,blue);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(red,green,blue)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)


        }
    }


}