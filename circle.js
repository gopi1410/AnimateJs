/****************************************************************************
PARAMETERS: lineWidth, lineColour, divisions, duration, fill, fillColour, start, draw, stop

NOTE THAT divisions/totalTime should not exceed 100.
*****************************************************************************/

HTMLCanvasElement.prototype.animateCircle=function(x,y,r,params) {
	if(params)
		initCircle(this,x,y,r,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initCircle(this,x,y,r);
};

function initCircle(id,x,y,r,lineColor,lineWidth,interval,totalTime,fill,fillColor,start,draw,stop)
{
	if(!interval)
		interval=100;
	if(!totalTime)
		totalTime=1
	var canvasId=id;
	var context=canvasId.getContext('2d');
	
	var data=[];
	var i=0;
	for(i=0;i<=interval;i++)
	{
		data[i]=i*(2*Math.PI/interval);
	}
	if(start)
		start();
	if(fill==="fillBefore")
	{
		context.beginPath();
		if(fillColor)
			context.fillStyle=fillColor;
		context.arc(x,y,r,0,2*Math.PI);
		context.fill();
		context.closePath();
	}
	
	context.beginPath();
	if(lineColor)
		context.strokeStyle=lineColor;
	if(lineWidth)
		context.lineWidth=lineWidth;
	else
		lineWidth=1;
	i=0;
	var length=data.length;
	var pid = setInterval(function() {
		context.arc(x,y,r,data[i],data[i+1]);
		context.stroke();
		if(draw)
			draw();
		if(i++===length)
		{
			context.closePath();
			clearInterval(pid);
			if(fill==="fillAfter")
			{
				context.beginPath();
				if(fillColor)
					context.fillStyle=fillColor;
				context.arc(x,y,r-(lineWidth/2),0,2*Math.PI);
				context.fill();
				context.closePath();
			}
			if(stop)
			{
				stop();
			}
		}
	}, (1000*totalTime/interval));
}