/*
 * EaselJS Text Arc Plugin
 *
 * Copyright (c) 2012 Luca Corbo
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * This plugin was inspired by:
 * - http://www.html5canvastutorials.com/labs/html5-canvas-text-along-arc-path
 * - http://tympanus.net/codrops/2012/01/24/arctext-js-curving-text-with-css3-and-jquery
 * - https://github.com/CreateJS/EaselJS/blob/master/examples/TextLink.html
 *
 */



this.createjs = this.createjs || {};





(function ()
{

	function TextArc (text, font, color, radius, letterSpacing)
	{
		this.Text_constructor (text, font, color);
		this.radius = radius;

		if (letterSpacing)
		{
			this.letterSpacing = letterSpacing / 10;
		}
	}


	var p = createjs.extend (TextArc, createjs.Text);


	p.draw = function(ctx)
	{
		this.Text_draw (ctx);
	};


	p._drawTextLine = function (ctx, text, y)
	{
		var wordWidth = ctx.measureText (text).width;
		// var angle = 2 * Math.asin (wordWidth / ( 2 * this.radius ));
		// var angle = 2 * Math.asin (wordWidth / ( 1.6 * this.radius ));
		var angle = 2 * Math.asin (wordWidth / ( (2 - this.letterSpacing) * this.radius ));
		ctx.save ();
		ctx.rotate (-1 * angle / 2);
		ctx.rotate (-1 * (angle / text.length) / 2);

		for (var i = 0; i < text.length; i ++)
		{
			ctx.rotate (angle / text.length);
			ctx.save ();
			ctx.translate (0, -1 * this.radius);
			this.Text__drawTextLine (ctx, text[i], y);
			ctx.restore ();
		}

		ctx.restore();
	};


	createjs.TextArc = createjs.promote (TextArc, "Text");
}());