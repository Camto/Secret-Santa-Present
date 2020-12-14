setTimeout(() => {
	function map_x_to_y(val, min1, max1, min2, max2) {
		return (((val - min1) / (max1 - min1)) * (max2 - min2)) + min2;
	}
	
	function hue(given) {
		colour = given;
		
		for(var count = 0; count < 100; count++) {
			if(colour > 360) {
				colour -= 360;
			} else if(colour < 0) {
				colour += 360;
			} else {
				break;
			}
		}
		
		var red = green = blue = 0;
		if(colour <= 60 || colour >= 300) {
			red = 255;
		}
		if(colour >= 60 && colour <= 180) {
			green = 255;
		}
		if(colour >= 180 && colour <= 300) {
			blue = 255;
		}
		
		if(colour >= 60 && colour <= 120) {
			red = map_x_to_y(colour, 60, 120, 255, 0);
		} else if(colour <= 300 && colour >= 240) {
			red = map_x_to_y(colour, 240, 300, 0, 255);
		}
		if(colour >= 0 && colour <= 60) {
			green = map_x_to_y(colour, 0, 60, 0, 255);
		} else if(colour >= 180 && colour <= 240) {
			green = map_x_to_y(colour, 180, 240, 255, 0);
		}
		
		if(colour >= 120 && colour <= 180) {
			blue = map_x_to_y(colour, 120, 180, 0, 255);
		} else if(colour >= 300 && colour <= 360) {
			blue = map_x_to_y(colour, 300, 360, 255, 0);
		}
		
		return [Math.round(red), Math.round(green), Math.round(blue)];
	}
	
	screen = document.createElement("canvas");
	screen.width = 672;
	screen.height = 224;
	ctx = screen.getContext("2d");
	document.body.appendChild(screen);
	screen.style.position = "absolute";
	screen.style.margin = "auto";
	screen.style.top = screen.style.left = screen.style.bottom = screen.style.right = "0px";
	
	FLand = ctx.createImageData(screen.width, screen.height);
	
	FLand.data.fill(255);
	
	poss = [2, 4, 7, 9];
	d = Array(14).fill(0).map(()=>Array(42).fill(false));
	for(var i = 0; i < poss.length; i+=2) {
		d[poss[i+1]][poss[i]] = true;
	}
	
	t = 0;
	white = "255;".repeat(3).split(";").slice(0,-1).map(i=>+i);
	
	setInterval(() => {
		t++;
		for(var y = 0; y < screen.height; y++) {
			for(var x = 0; x < screen.width; x++) {
				colours = d[Math.floor(y/16)][Math.floor(x/16)] ? hue(t) : white;
				for(var i = 0; i < 3; i++) {
					FLand.data[(x * 4) + (y * screen.width * 4) + i] = colours[i];
				}
			}
		}
		
		ctx.putImageData(FLand, 0, 0);
	}, 1000/15);
}, 10);