/*	
BITS AND WHAT THEY DO UNO
0- LEFT HAND ROTATE
1- LEFT FOREARM ROTATE
2- LEFT ARM ROTATE
3- RIGHT HAND ROTATE
4- RIGHT FOREARM ROTATE
5- RIGHT ARM ROTATE
6- BODY SWAY
7- BODY EXPAND
8- NECK SWAY
9- NECK EXPAND
10- HEAD ROTATE
11- HEAD EXPAND
12- LEFT HAND EXPAND
13- LEFT FOREARM EXPAND
14- LEFT ARM EXPAND
15- RIGHT HAND EXPAND
16- RIGHT FOREARM EXPAND
17- RIGHT ARM EXPAND
18- REVERSE ALL DIRECTIONS

*/

let rsw = 0;
let d;

function setup() 
{
	createCanvas(500, 500);
	angleMode(DEGREES)
	d = new Ditto();
}

function draw()
{
	background(0);
	noStroke();
	rsw.toString(2).split("").reverse().map((val, idx) => {
		if (val === "1") {
			switch(idx) {
				case 0:
					d.thangs[0].rotate = true;
					break;
				case 1:
					console.log("llmmasda")
					d.thangs[1].rotate = true;
					break;
				case 2:
					d.thangs[2].rotate = true;
					break;
				case 3:
					d.thangs[3].rotate = true;
					break;
				case 4:
					d.thangs[4].rotate = true;
					break;
				case 5:
					d.thangs[5].rotate = true;
					break;
				case 6:
					d.body.sway = true;
					break;
				case 7:
					d.body.expand = true;
					break;
				case 8:
					d.thangs[6].sway = true;
					break;
				case 9:
					d.thangs[6].expand = true;
					break;
				case 10:
					d.thangs[7].rotate = true;
					break;
				case 11:
					d.thangs[7].expand = true;
					break;
				case 12:
					d.thangs[0].expand = true;
					break;
				case 13:
					d.thangs[1].expand = true;
					break;
				case 14:
					d.thangs[2].expand = true;
					break;
				case 15:
					d.thangs[3].expand = true;
					break;
				case 16:
					d.thangs[4].expand = true;
					break;
				case 17:
					d.thangs[5].expand = true;
					break;
			}
		}
		else {
			switch(idx-1) {
				case 0:
					d.thangs[0].rotate = false;
					break;
				case 1:
					d.thangs[1].rotate = false;
					break;
				case 2:
					d.thangs[2].rotate = false;
					break;
				case 3:
					d.thangs[3].rotate = false;
					break;
				case 4:
					d.thangs[4].rotate = false;
					break;
				case 5:
					d.thangs[5].rotate = false;
					break;
				case 6:
					d.body.sway = false;
					break;
				case 7:
					d.body.expand = false;
					break;
				case 8:
					d.thangs[6].sway = false;
					break;
				case 9:
					d.thangs[6].expand = false;
					break;
				case 10:
					d.thangs[7].rotate = false;
					break;
				case 11:
					d.thangs[7].expand = false;
					break;
				case 12:
					d.thangs[0].expand = false;
					break;
				case 13:
					d.thangs[1].expand = false;
					break;
				case 14:
					d.thangs[2].expand = false;
					break;
				case 15:
					d.thangs[3].expand = false;
					break;
				case 16:
					d.thangs[4].expand = false;
					break;
				case 17:
					d.thangs[5].expand = false;
					break;
			}
		} 	
	})
	d.show();
}

class Ditto {
	constructor() {
		this.x = width/2;
		this.y = height/1.75;
		this.w = 0;
		this.h = 0;
		this.thangs = [];
		this.parts = [];
		this.body = new BodyPart(0, 0, 100,250,0,[255,255,0]);
		this.body.x = this.x-this.body.w/2;
		this.body.y = this.y;

		let neck = new BodyPart(-this.body.w/2,-this.body.h/2,75,50,270,[0,255,0]);
		neck.swayMin = 225;
		neck.swayMax = 315;
		let head = new BodyPart(-37.5,0,75,75,0,[255,125,0]);
		neck.swayMin = 225;
		neck.swayMax = 315;
		neck.addKiddy(head);
		this.body.addKiddy(neck);

		let rightArm = new BodyPart(0,-this.body.h/2+20,150,40,45,[255,0,0])
		let rightForeArm = new BodyPart(0,0,100,35,45,[255,0,0])
		let rightHand = new BodyPart(0,0,50,25,45,[255,0,0])
		rightForeArm.addKiddy(rightHand);
		rightArm.addKiddy(rightForeArm);
		this.body.addKiddy(rightArm)

		let leftArm = new BodyPart(-this.body.w,-this.body.h/2+20,-150,40,-45,[0,0,255])
		let leftForeArm = new BodyPart(0,0,-100,35,-45,[0,0,255])
		let leftHand = new BodyPart(0,0,-50,25,-45,[0,0,255])
		leftArm.rDir = -leftArm.rDir;
		leftForeArm.rDir = -leftForeArm.rDir;
		leftHand.rDir = -leftHand.rDir;
		leftForeArm.addKiddy(leftHand);
		leftArm.addKiddy(leftForeArm);
		this.body.addKiddy(leftArm)

		this.thangs[0] = leftHand;
		this.thangs[1] = leftForeArm;
		this.thangs[2] = leftArm;
		this.thangs[3] = rightHand;
		this.thangs[4] = rightForeArm;
		this.thangs[5] = rightArm;
		this.thangs[6] = neck;
		this.thangs[7] = head
	}

	show() {
		this.body.show();
	}
}

class BodyPart {
	constructor(x, y, w, h, r, color) {
		this.daddy = undefined;
		this.offsetX = x;
		this.offsetY = y;
		this.x = 0;
		this.y = 0;
		this.w = w;
		this.h = h;

		this.rotate = false;
		this.expand = false;
		this.sway = false;

		this.swayMin = 0;
		this.swayMax = 0;
		this.swayDir = 2;

		this.rotation = r;
		this.rDir = 2;

		this.expandMax = this.w*1.5;
		this.expandMin = this.w/2;
		this.expandDir = 5;

		this.color = color;
		this.kiddies = [];
	}

	addKiddy(kiddy) {
		kiddy.daddy = this;
		this.kiddies.push(kiddy);
	}

	show() {
		push()
		if (this.daddy !== undefined) {
			this.x = this.daddy.x+this.daddy.w/2 + this.offsetX;
			this.y = this.daddy.y+this.daddy.h/2 + this.offsetY;
			translate(this.daddy.w+this.offsetX, this.offsetY);
		}
		else {
			translate(this.x, this.y);
		}
		fill(255)
		ellipse(0,0,20)
		fill(this.color);
		rotate(this.rotation);
		rect(0, -this.h/2, this.w, this.h, 20);
		this.kiddies.map((kiddy) => kiddy.show());
		pop();
		if (this.rotate) this.rotation += this.rDir;
		if (this.sway) {
			this.rotation += this.swayDir;
			if (this.rotation >= this.swayMax || this.rotation <= this.swayMin) {
				this.swayDir = -this.swayDir;
			}
		}
		if (this.expand) {
			this.w += this.expandDir;
			if (this.w < 0) {
				if (this.w >= this.expandMin || this.w <= this.expandMax) {
					this.expandDir = -this.expandDir;
				}
			}
			else {
				if (this.w <= this.expandMin || this.w >= this.expandMax) {
					this.expandDir = -this.expandDir;
				}
			}
		}
	}
}
