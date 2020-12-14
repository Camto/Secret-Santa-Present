class Canvas {
	constructor(id, width, height) {
		this.canvas = document.getElementById(id);
		this.canvas.width = this.width = width;
		this.canvas.height = this.height = height;
		this.draw = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
		
		this.canvas.style.position = "absolute";
		this.canvas.style.margin = "auto";
		this.canvas.style.top = "0px";
		this.canvas.style.left = "0px";
		this.canvas.style.bottom = "0px";
		this.canvas.style.right = "0px";
	}
}