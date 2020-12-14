setTimeout(() => {
	class Canvas {
		constructor(id, width, height) {
			this.canvas = document.createElement("canvas");
			this.canvas.width = this.width = width;
			this.canvas.height = this.height = height;
			this.draw = this.canvas.getContext("2d");
			
			this.canvas.style.position = "absolute";
			this.canvas.style.margin = "auto";
			this.canvas.style.top = "0px";
			this.canvas.style.left = "0px";
			this.canvas.style.bottom = "0px";
			this.canvas.style.right = "0px";
			
			document.body.appendChild(this.canvas);
		}
	}
	
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
	
	screen = new Canvas("FLand", 600, 400);
	
	FLand = screen.draw.createImageData(screen.width, screen.height);
	
	w = FLand.width;
	h = FLand.height;
	
	func = (x, y) => hue(((Math.abs(x - (w / 2)) + Math.abs(y - (h / 2))) / 2) / 0.875 + 170);
	
	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			colours = func(x, y);
			FLand.data[(x * 4) + (y * w * 4)] = colours[0];
			FLand.data[(x * 4) + (y * w * 4) + 1] = colours[1];
			FLand.data[(x * 4) + (y * w * 4) + 2] = colours[2];
			FLand.data[(x * 4) + (y * w * 4) + 3] = 255;
		}
	}
	
	screen.draw.putImageData(FLand, 0, 0);
}, 10);