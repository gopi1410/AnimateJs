/****************************************************************************
PARAMETERS: lineWidth, lineColour, divisions, duration, start, draw, stop

NOTE THAT divisions/totalTime should not exceed 100.
*****************************************************************************/

HTMLCanvasElement.prototype.animateLine=function(x1,y1,x2,y2,params) {
	if(params)
		initLine(this,x1,y1,x2,y2,params.lineColour,params.lineWidth,params.divisions,params.duration,params.start,params.draw,params.stop);
	else
		initLine(this,x1,y1,x2,y2);
};

function initLine(id,x1,y1,x2,y2,lineColor,lineWidth,interval,totalTime,start,draw,stop)
{
	if(!interval)
		interval=100;
	if(!totalTime)
		totalTime=1;
	var canvasId=id;
	var context=canvasId.getContext('2d');
	context.beginPath();
	if(lineColor)
		context.strokeStyle=lineColor;
	if(lineWidth)
		context.lineWidth=lineWidth;
	context.moveTo(x1,y1);
	var data=[];
	var i=0;
	data[0]=new Array(interval);
	data[1]=new Array(interval);
	var xInt=(x2-x1)/interval;
	var yInt=(y2-y1)/interval;
	for(i=0;i<=interval;i++)
	{
		data[0][i]=x1+(i*xInt);
		data[1][i]=y1+(i*yInt);
	}
	if(start)
		start();
	
	i=0;
	var length=data[0].length;
	var pid = setInterval(function() {
		context.lineTo(data[0][i],data[1][i]);
		context.stroke();
		if(draw)
			draw();
		if(i++===length)
		{
			context.closePath();
			clearInterval(pid);
			if(stop)
				stop();
		}
	}, (1000*totalTime/interval));
}