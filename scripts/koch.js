var DEG = Math.PI/180;
var pc=1, lc=16, ki, kcolor='#FFF', kscale=0.5, fps={counter:0, value:"FPS"};

function canvasApp( ctx ) {
	var w, h;
	var kcan=document.createElement("canvas");
	var kcurve = defineKoch( document.createElement("canvas"), "#000", lc/2 );
	ctx.id = "layer1";
	ctx.alt = "Rotating Rainbowed Fractal";
	ctx.src = "http://"+ window.location.host +"/js-demos/kochflake.png";
	ctx.width = ctx.width || "1024";
	ctx.height = ctx.height || "576";
	ctx.setAttribute( 'onmouseover', 'mouseOver=true;' );
	ctx.setAttribute( 'onmouseout', 'clearInterval(window.zoomEvent);mouseOver=false;' );
	ctx.setAttribute( 'onmousemove', 'zoomKoch(event);' );
	w = ctx.width;
	h = ctx.height;
	ctx = ctx.getContext("2d");

	kcan.width = w*2;
	kcan.height = h*2;
	window.mouseOver = false;
	window.zoomEvent = 0;
	window.tx = 0;
	window.zoomKoch = function(evt){
		clearInterval(window.zoomEvent);
		if( mouseOver )	window.zoomEvent = setTimeout( function(evt) {
			var width = window.innerWidth,
	    		height = window.innerHeight;
			Debugger.log( "width: "+ width +" mouse x: "+ evt.clientX );
			if(evt.clientX > width/2) {
				kscale*=1.03;
				ctx.fillStyle = 'rgba(0,0,0,0.5)';
				ctx.fillRect(0,0,w,h);
				//ctx.translate(-kscale*64, 0);			
				tx += kscale*6;
			} else {
        		kscale*=0.99;
				ctx.fillStyle = 'rgba(0,0,0,0.5)';
				ctx.fillRect(0,0,w,h);
				//ctx.translate(tx, 0);
				if( tx !== 0) tx -= kscale*64;
				if( tx < 0 ) tx = 0;
			}
		}, 6, evt);
    };
    window.spinKoch = function(evt) {
		ctx.translate( kscale*w, kscale*h );
		ctx.rotate(DEG*(pc/4));
		ctx.translate( -kscale*w, -kscale*h );
    };
   
    var midp = (Math.tan(DEG*30)*kcan.width/4);
    var data = [ {'0':kcan.width/4,'1':(kcan.height/2+midp)-3,'2':kcan.width/2,'3':0},
                        {'0':kcan.width/4+kcan.width/2-2,'1':(kcan.height/2+midp),'2':kcan.width/2,'3':-120},
                        {'0':kcan.width/2+2,'1':(kcan.height/2+midp)+(Math.sin(DEG*-120)*kcan.width/2),'2':kcan.width/2,'3':120},
                     ];
	
	
    ctx.fillStyle = "#000";
    ctx.fillRect( 0, 0, w, h);
    //drawKoch( kcan, kcurve, data, kcolor, ++pc);
    //drawKoch( kcan, kcurve, data, kcolor, ++pc);
    //drawKoch( kcan, kcurve, data, kcolor, ++pc);
	ctx.strokeStyle = "#FFF";
	ctx.font = "20px Comfortaa, Consolas, Courier";
	
	/* FPS counter with low-pass filter by Phrogz from
	 * http://stackoverflow.com/questions/4787431/check-fps-in-js
	 * The higher this value, the less the fps will reflect temporary variations
	 * A value of 1 will only keep the last value
	 */
	var filterStrength = 10;
	var frameTime = 0, lastLoop = new Date();
			
	window.fps.counter = setInterval(function(){
		window.fps.value = (1000/frameTime).toFixed(1) + " fps";
	}, 533);
	
    ki = setInterval(function() {
		ctx.clearRect( 0, 0, w, h);
		ctx.fillStyle = "rgba(0%, 0%, 0%, 1.0)";
		ctx.fillRect( 0, 0, w, h);
		ctx.save();
		spinKoch(ctx);
		if (data.length < 3072) {
			kcolor = "hsl("+ pc%360 +", 100%, 50%)";
			if( !(pc%4) && (pc%3) && (pc%5) && (pc%7) && (!(Math.sqrt(pc/4)%2)) ) 
			  defineKoch( kcurve, kcolor, lc*=2, Debugger.log(lc+', '+pc) );
			  drawKoch( kcan, kcurve, data, kcolor, ++pc);
		} else if (pc) pc++
      	ctx.drawImage( kcan,
	        ( ctx.canvas.width - kscale*(kcan.width) )/2, 
			( ctx.canvas.height - kscale*(kcan.height) )/2, 
			kscale*kcan.width, 
			kscale*kcan.height
		);
      	ctx.restore();
		ctx.fillStyle = "#FFF";
		ctx.fillText( window.fps.value, w-100, 50 );
		
		/* FPS counter */
		var thisFrameTime = (new Date()) - lastLoop;
		frameTime+= (thisFrameTime - frameTime) / filterStrength;
		lastLoop = new Date();
    }, 33);
	
	return ctx;
}

function defineKoch( kcanvas, kcolor, kr ) {
    kcanvas.width = 640;
    kcanvas.height = 320;
    var ctx=kcanvas.getContext("2d"), w=kcanvas.width, h=kcanvas.height,
            xA=kr/2, yA=kr, theta=0, a, b, c;
    ctx.strokeStyle = kcolor;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = kr;
    a = w / 2 - kr/2;
    b = a/(Math.sqrt(2) + 1);
    c = a - b;
    ctx.fillStyle = "#000";
    //ctx.fillRect( 0, 0, w, h );
    ctx.beginPath();
    ctx.moveTo( xA, yA);
    var xB=(Math.cos(DEG*theta)*c), yB=(Math.sin(DEG*theta)*c);
    ctx.lineTo( xA+xB, yA+yB );
    var xC=(Math.cos(DEG*(theta+45))*c), yC=(Math.sin(DEG*(theta+45))*c);
    ctx.lineTo( xA+xB+xC, yA+yB+yC );
    var xD=(Math.cos(DEG*(theta-45))*c), yD=(Math.sin(DEG*(theta-45))*c);
    ctx.lineTo( xA+xB+xC+xD, yA+yB+yC+yD );
    ctx.lineTo( xA+(Math.cos(DEG*theta)*(a*2)), yA+(Math.sin(DEG*theta)*(a*2)) );
    ctx.stroke();
    return kcanvas;
}

function drawKoch( canvas, curve, data, kc) {
    var ctx=canvas.getContext("2d"), A=data.shift();
    var xA=A[0], yA=A[1], r=A[2], theta=A[3], a, b, c;
    a = r / 2;
    b = a/(Math.sqrt(2) + 1);
    c = a - b;
    ctx.save();
    ctx.translate(xA, yA);
    ctx.rotate(DEG*theta);
    ctx.drawImage( curve, 0, 0, r, a);
    ctx.restore();
    data.push( {'0':xA,'1':yA,'2':c,'3':theta} );
    var xB=(Math.cos(DEG*theta)*c), yB=(Math.sin(DEG*theta)*c);
    data.push( {'0':( xA+xB ),'1':( yA+yB ),'2':c,'3':( theta+45 )} );
    var xC=(Math.cos(DEG*(theta+45))*c), yC=(Math.sin(DEG*(theta+45))*c);
    data.push( {'0':( xA+xB+xC ),'1':( yA+yB+yC ),'2':c,'3':( theta-45 )} );
    var xD=(Math.cos(DEG*(theta-45))*c), yD=(Math.sin(DEG*(theta-45))*c);
    data.push( {'0':( xA+xB+xC+xD ),'1':( yA+yB+yC+yD ),'2':c,'3':theta} );
    ctx.strokeStyle=kc;
    ctx.beginPath();
    ctx.moveTo( canvas.width/2, canvas.height/2 );
    ctx.lineTo( xA, yA );
    ctx.closePath();
    ctx.stroke();
    return A;
}



/*
var spinKoch = function spinKoch (ctx) {
    ctx.translate( kscale*640, kscale*360 );
    ctx.rotate(DEG*(pc*6));
    ctx.translate( -kscale*640, -kscale*360 );
};
           onclick='kscale*=0.85;ctx.fillRect(0,0,640,360);' /><br>
           onclick='spinKoch=function spinKoch(ctx){document.getElementById("spin").style.display="none";ctx.translate( kscale*640, kscale*360 );ctx.rotate(DEG*(pc*6));ctx.translate( -kscale*640, -kscale*360 );};' />
           onclick='clearInterval(ki)' />
*/