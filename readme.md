# Javascript as CSS

This is an experiment where the CSS of an HTML page is expressed in Javascript code.

Doing this enables us to very easily enhance the power available to us, by working on this Javascript API that is provided by silk.

The standard jquery functionality which only updates the style property on an individual element.

Silk style allows you to create CSS rules (classes etc), declare style properties and edit those same rules at a later point if need be.


# Features

- Javascript expressions can be used to calculate property values
- Javascript variables can be used to modularize styles
- Nested rules can be defined
- Themes can be defined independently of the choice to use them (hook them to the elements)
- Themes can be hooked up to elements from the style declaration as opposed to putting the choice of style in the markup.
- (In future) Define custom css properties in through Javascript hooks into this API

# Example

Here's an example style script see index.html:

	<script language="javascript">
	
	/*
	This defines a style where a content div is
		centered in the page,
		only stretches as wide as it's content,
		and is vertically aligned with a top margin that is a 1/4 of the window height (not ideal in most cases, but anyways).
	*/
	
	
	/* silk style is a jquery plugin for now,
		call the sss() function to set the CSS declaration for the rule associated with the selector. */
	
	$('html.centered').sss({

		/* define properties in here */
		
		width: '100%',
		height: '100%',
		
		/* nested rules can be created, when a property starts with / it is assumed to be a sub rule instead of a CSS property. */
		
		'/ body' : {
			height: '100%',
			textAlign: 'center',
			background: 'rgb(230,230,230)',
			
			'/ #content': {
				display: 'inline-block',
				textAlign: 'left',
				position: 'relative',
				top: '25%',
				
				background: 'rgba(240,240,240,70)',
				
				/* the forEach property specifies a function that will be run on all the elements that are currently
					in the document and match this selector (not very useful right now). */
				
				forEach: function() {
					//this.style.top = Math.round(this.parentNode.clientHeight / 4) + 'px';
				}
			}
		}
	})
	
	/* here we choose to actually use this 'centered' style that was defined above
		by using standard jquery to select the elements we want to style and add the class.
		having this functionality directly where we define the style means we are more likely
		to define styles as modular units that can be swapped out because they do not automatically apply themselves,
		it also puts the choice of style where it should be (in the CSS instead of the markup).
	*/
	
	$('html').addClass('centered');
	
	</script>


# Status

This is just a quick experiment. It uses a technique which is almost never used in sites (changing the properties in CSS rules through Javascript) and therefore is currently not very portable / robust.

It is very useful though, has lots of potential for growth, is very straight forward, and is what I've always wanted.