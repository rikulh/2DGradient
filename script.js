document.getElementById("save").onclick = (event) => {
    let canvas = document.getElementById("canvas");

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "gradient.png";
    link.click();
}
function make() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var width = imageData.width, height = imageData.height;
    var pixels = imageData.data;  // ピクセル配列：RGBA4要素で1ピクセル
    
    // ピクセル単位で操作できる
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        var base = (y * width + x) * 4;
        let xdeg = x / width;
        let ydeg = y / height;
        pixels[base + 0] = mix2D(tl[0],tr[0],bl[0],br[0],xdeg,ydeg);  // Red
        pixels[base + 1] = mix2D(tl[1],tr[1],bl[1],br[1],xdeg,ydeg);;  // Green
        pixels[base + 2] = mix2D(tl[2],tr[2],bl[2],br[2],xdeg,ydeg);;  // Blue
        pixels[base + 3] = 255;  // Alpha
      }
    }
    context.putImageData(imageData, 0, 0);
    let icon = document.getElementById("favicon")
    icon.href = canvas.toDataURL("image/png");
}

onload = function() {
    make();
};

function changeValue() {
    tl = hexToArr($tl.value);
    tr = hexToArr($tr.value);
    bl = hexToArr($bl.value);
    br = hexToArr($br.value);
    make()
}

let tl = [255,255,0];
let tr = [255,0,0];
let bl = [0,255,0];
let br = [0,0,255];
$tl.value = "#FFFF00";
$tr.value = "#FF0000";
$bl.value = "#00FF00";
$br.value = "##0000FF"
function mix(l,r,deg) {
    return l+(r-l)*deg
}
function mix2D(tl,tr,bl,br,xdeg,ydeg) {
    return mix(mix(tl,tr,xdeg),mix(bl,br,xdeg),ydeg)
}
function hexToArr(hex) {
    let val = hex.replace("#", '');
    return val.match(/.{2}/g).map(x => parseInt(x,16)); 
}