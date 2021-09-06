img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(250);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {

        
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are:" + objects.length;
  
            fill("r, g, b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("r, g, b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
                }
    }
    fill("#000000");
    text("Dog",45,75);
    noFill();
    stroke("#00ffff");
    rect(30,60,450,350);

    fill("#000000");
    text("Cat",320,120);
    noFill();
    stroke("#ff6666");
    rect(300,90,270,320)


function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
    
}