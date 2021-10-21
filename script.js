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
    // tl = hexToArr(.tl.value);
    // tr = hexToArr(.tr.value);
    // bl = hexToArr(.bl.value);
    // br = hexToArr(.br.value);
    make()
}

let tl = [255,255,0];
let tr = [255,0,0];
let bl = [0,255,0];
let br = [0,0,255];

function mix(l,r,deg) {
    return l+(r-l)*deg;
}
function mix2D(tl,tr,bl,br,xdeg,ydeg) {
    return mix(mix(tl,tr,xdeg),mix(bl,br,xdeg),ydeg);
}
function multiMix(color,pos,deg) {
    for (let i=0;i<pos.length;i++) {
        if (pos[i] <= p && p <= a[i+1]) {
            return mix(color[i],color[i+1],((deg - pos[i]) / (pos[i+1] - pos[i])));
        }
    }
}
function multiMix2D(top,bottom,left,right,xdeg,ydeg) {
    let a = mix(mmix(left,ydeg),mmix(right,ydeg),xdeg);
    let b = mix(mmix(top,xdeg),mmix(bottom,xdeg),ydeg);
    let c = mix(mix(top.first,top.slice(-1)[0],xdeg),mix(bottom.first,bottom.slice(-1)[0],xdeg),ydeg);
    return a + b - c;
}

function hexToArr(hex) {
    let val = hex.replace("#", '');
    return val.match(/.{2}/g).map(x => parseInt(x,16)); 
}
function colorToArr(color) {
    let arr = new Array(3);
    for (let i=0;i<3;i++) {
        arr[i] = Number(parseInt(color[i],16));
    };
    return arr;
}

const tlPic = Pickr.create({
    el: '.tl',
    name: 'tl',
    theme: 'nano',
    default: "ffff00",
    showAlways: false,
    closeWithKey: 'Escape',
    defaultRepresentation: 'HEXA',
    components: {
        preview: true,
        opacity: false,
        hue: true,

        interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true
        }
    }
});
const trPic = Pickr.create({
    el: '.tr',
    name: 'tr',
    theme: 'nano',
    default: "ff0000",
    showAlways: false,
    closeWithKey: 'Escape',
    defaultRepresentation: 'HEXA',
    components: {
        preview: true,
        opacity: false,
        hue: true,

        interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true
        }
    }
});
const blPic = Pickr.create({
    el: '.bl',
    name: 'bl',
    theme: 'nano',
    default: "00ff00",
    showAlways: false,
    closeWithKey: 'Escape',
    defaultRepresentation: 'HEXA',
    components: {
        preview: true,
        opacity: false,
        hue: true,

        interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true
        }
    }
});
const brPic = Pickr.create({
    el: '.br',
    name: 'br',
    theme: 'nano',
    default: "0000ff",
    showAlways: false,
    closeWithKey: 'Escape',
    defaultRepresentation: 'HEXA',
    components: {
        preview: true,
        opacity: false,
        hue: true,

        interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true
        }
    }
});

let flag = 0;
trPic.on('save', (color, instance) => {
    console.log(instance.options.name);
    tr = colorToArr(color.toHEXA());
    make();
}).on('change', (color, source, instance) => {
    if ((flag%10) == 0) {
        tr = colorToArr(color.toHEXA());
        make();
    }
    flag++;
});
tlPic.on('save', (color, instance) => {
    console.log(instance.options.name);
    tl = colorToArr(color.toHEXA());
    make();
}).on('change', (color, source, instance) => {
    if ((flag%10)== 0) {
        tl = colorToArr(color.toHEXA());
        make();
    }
    flag++;
});
brPic.on('save', (color, instance) => {
    console.log(instance.options.name);
    br = colorToArr(color.toHEXA());
    make();
}).on('change', (color, source, instance) => {
    if ((flag%10) == 0) {
        br = colorToArr(color.toHEXA());
        make();
    }
    flag++;
});
blPic.on('save', (color, instance) => {
    console.log(instance.options.name);
    bl = colorToArr(color.toHEXA());
    make();
}).on('change', (color, source, instance) => {
    if ((flag%10) == 0) {
        bl = colorToArr(color.toHEXA());
        make();
    }
    flag++;
});