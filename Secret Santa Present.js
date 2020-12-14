map_range = (v,af,bf,at,bt) => ((v-af)/(bf-af))*(bt-at)+at

function hue(c) {c%=360;var r,g,b;if(c<=60||c>=300)r=255;if(c>=60&&c<=180)g=255;if(c>=180&&c<=300)b=255;if(c>=60&&c<=120)r=map_range(c,60,120,255,0);else if(c<=300&&c>=240)r=map_range(c,240,300,0,255);if(c>=0&&c<=60)g=map_range(c,0,60,0,255);else if(c>=180&&c<=240)g=map_range(c,180,240,255,0);if(c>=120&&c<=180)b=map_range(c,120,180,0,255);else if(c>=300&&c<=360)b=map_range(c,300,360,255,0);return[r,g,b].map(Math.round)}

gen = b => (function*(){}).constructor("var t=[0,0,0,0];var p=0;"+b.replace(/[+\-<>.[\]]/g, c=>"t[p]++;t[p]--;p--;p++;yield t[p];while(t[p]){;}".split(";")["+-<>.[]".indexOf(c)]+";"))()

setTimeout(() => {
	screen = document.createElement("canvas");
	screen.width = 608;
	screen.height = 160;
	ctx = screen.getContext("2d");
	document.body.appendChild(screen);
	screen.style.position = "absolute";
	screen.style.margin = "auto";
	screen.style.top = screen.style.left = screen.style.bottom = screen.style.right = "0px";
	
	FLand = ctx.createImageData(screen.width, screen.height);
	
	FLand.data.fill(255);
	
	c = 0;
	g=gen(`
		// j
		+++.>.+>+++++++[-<<.>+.>]<<-.>+.<-.>.<-.>-.<
		// p
		+++++.>+.>+++++++[-<<.>-.>]+++[-<<+.>.>]<<+>>++++[-<<.>+.>]<+>+++[-<<-.>.>]<<
		// V
		+++++>-------->+++[-<<.>+.>]<<+>>+++[-<<.>+.>]<<+.>+.<.>+.<+>->+++[-<<.>-.>]<<+>>+++[-<<.>-.>]<<
		// i
		++.>.+>++++++[-<<.>+.>]<<
		// nn
		>>>++[-<<< ++>------>++++++[-<<.>+.>]<<+.>----.<+.>-.<+.>.<+>>+++++[-<<.>+.>] >]<<<
		// i
		++.>-------.+>++++++[-<<.>+.>]<<
		// e
		++++++.>-.+>+++[-<<-.>.>]<<->>++++[-<<.>-.>]<->+++[-<<+.>.>]<<+.>+.+>++++[-<<.->.>]
	`);
	d = Array(10).fill(0).map(()=>Array(38).fill(""));
	
	t = 72;
	
	setInterval(() => {
		t++;
		for(var y = 0; y < screen.height; y++) {
			for(var x = 0; x < screen.width; x++) {
				if(d[Math.floor(y/16)][Math.floor(x/16)]) {
					for(var i = 0; i < 3; i++) {
						FLand.data[(x * 4) + (y * screen.width * 4) + i] = hue(t)[i];
					}
				}
			}
		}
		
		if(!(x=g.next()).done) {
			d[g.next().value][x.value] = [];
		}
		ctx.putImageData(FLand, 0, 0);
	}, 1000/30);
}, 10);