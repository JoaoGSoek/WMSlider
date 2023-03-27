class WMSlider extends HTMLElement{
	
	constructor(){
		
		super();
		
		this.activeChild;
		this.childList = [];
		this.appendedChildList = [];
		
		document.onreadystatechange = () => {
			
			if(document.readyState === 'complete'){
				
				this.childList = [...this.children];
								
				var activeChild = this.querySelector(':scope > *[active]');
				var activeChildIndex = activeChild ? this.childList.indexOf(activeChild) : 0;
				
				// Scrolling to active child
				this.allowInput = true;
				this.setActiveChild(activeChildIndex, 'auto');
				this.#repositionChildren();
		
				// Auto Sliding
				this.autoSlide();
				
			}
			
		}
		
	}
	
	connectedCallback(){
		
		var that = this;
				
		if(this.isDraggable){

			this.addEventListener('mousedown', function(e){
				
				var startX = e.clientX;
				var initialScrollLeft = that.scrollLeft;
				
				that.setAttributeNode(document.createAttribute('dragging'));

				document.addEventListener('mouseup', mouseUpHandler);
				document.addEventListener('mousemove', mouseMoveHandler);
				
				function mouseMoveHandler(e){
				
					var endX = e.clientX;
					that.scrollLeft = initialScrollLeft + startX - endX;
					
				}
				
				function mouseUpHandler(e){
				
					var endX = e.clientX;
					var finalScrollLeft = initialScrollLeft + startX - endX;
					
					that.setActiveChild(that.childList.indexOf(that.children[Math.round(finalScrollLeft/(that.actualWidth/that.indexedElementAmount) - 2)]));
					that.removeAttribute('dragging');
					
					document.removeEventListener('mouseup', mouseUpHandler);
					document.removeEventListener('mousemove', mouseMoveHandler);

				}
				
			});
			
		}
		
	}
	
	// Auto Sliding	
	autoSlide(){
		
		if(this.autoSlideInterval > -1){
			
			var activeIndex = this.childList.indexOf(this.activeChild) + this.elementSlidingAmount;
			if(activeIndex > this.childList.length - 1) activeIndex = 0;
			
			this.autoSlideTimeout = setTimeout(() => this.setActiveChild(activeIndex), this.autoSlideInterval);
		
		}
		
	}
	
	// Setting Active Child
	setActiveChild(index = 0, behavior){
		
		var that = this;
		
		if(this.allowInput){
			
			this.allowInput = false;

			// Avoiding timeout overlaping
			if(this.autoSlideTimeout) clearInterval(this.autoSlideTimeout);

			// Deactivating Child
			for(var child of this.childList) child.removeAttribute('active');

			// Sanitazing Index
			index = Math.min(this.childList.length - 1, Math.max(0, index));

			// Activating Child
			this.activeChild = this.childList[index];
			this.activeChild.setAttributeNode(document.createAttribute('active'));

			// Activating Trigger
			for(var trigger of document.querySelectorAll(`button[slider="${this.id}"]`)) trigger.removeAttribute('active');

			for(var trigger of document.querySelectorAll(`button[slider="${this.id}"][slide-to="${index}"]`)) trigger.setAttributeNode(document.createAttribute('active'));

			// Sliding to active child
			this.slideToActive(behavior);

			// Auto Sliding
			this.autoSlide();
	
		}
		
	}	
	
	// Sliding To Active Child
	slideToActive(behavior = 'smooth'){
		
		var targetedChild = this.activeChild;
		
		if(!this.isInfinite){
			
			if(this.childList.indexOf(this.activeChild) > this.childList.length - this.indexedElementAmount &&
				this.activeElementAlign === 'left'){
				
				targetedChild = this.childList[this.childList.length - this.indexedElementAmount];
			
			}else if(this.childList.indexOf(this.activeChild) < this.indexedElementAmount &&
				this.activeElementAlign === 'right'){
				
				targetedChild = this.childList[this.indexedElementAmount - 1];
				
			}
		
		}
		
		var activeChildWidth = targetedChild.offsetWidth; // Child Width
		var activeStyle = targetedChild.style;
		activeChildWidth += (parseFloat(activeStyle.marginLeft) + parseFloat(activeStyle.marginRight)) || 0;
		activeChildWidth += (parseFloat(activeStyle.paddingLeft) + parseFloat(activeStyle.paddingRight)) || 0;
		activeChildWidth += (parseFloat(activeStyle.borderLeftWidth) + parseFloat(activeStyle.borderRightWidth)) || 0;
		
		var scrollTarget;
		
		switch(this.activeElementAlign){ // Calculating Alignment

			case 'right':
				scrollTarget = targetedChild.offsetLeft - this.actualWidth + activeChildWidth;
			break;
			case 'center':
				scrollTarget = targetedChild.offsetLeft - (this.actualWidth - activeChildWidth)/2;
			break;
			default:
				scrollTarget = targetedChild.offsetLeft;
			break;

		}
		
		if(behavior === 'smooth'){
			
			this.#scrollAnimation(scrollTarget);
		
		}else{
			
			this.scrollLeft = scrollTarget;
			this.allowInput = true;
		
		}
		
	}
	
	// Scroll animation
	#scrollAnimation(scrollTarget, initialScroll = this.scrollLeft, startingTime = Date.now()){
	
		var that = this;
		var interpolatedTime = Math.min(1, (Date.now() - startingTime)/this.slideDuration);
		
		this.scrollLeft = easing();

		if(interpolatedTime < 1){
			
			window.requestAnimationFrame(() => that.#scrollAnimation(scrollTarget, initialScroll, startingTime));
										 
	 	}else{
										 
			this.#repositionChildren();										 
			this.allowInput = true;
										 
		}
	
		// MAYBE TODO Add customizability to the easing function
		// https://spicyyoghurt.com/tools/easing-functions
		function easing(){
		
			var t = interpolatedTime;
			var b = initialScroll;
			var c = scrollTarget - b;
			var d = 1;
		
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    		return -c / 2 * ((--t) * (t - 2) - 1) + b;
		
		}
		
	}
	
	// Repositioning children for infinite scroll effect
	#repositionChildren(){

		if(this.isInfinite){ // Fixing Children
		   		
			var that = this;
			var indexedChildren = [this.activeChild];
		
			var index = this.childList.indexOf(this.activeChild);
			var previousIndex = index - 1;
			var nextIndex = index + 1;
		
			for(var i = 0; i < this.elementSlidingAmount + this.indexedElementAmount - 1; i++){
		
				if(previousIndex < 0) previousIndex = this.childList.length - 1;
				if(nextIndex > this.childList.length - 1) nextIndex = 0;
		
				var nextChild = this.childList[nextIndex];
				var previousChild = this.childList[previousIndex];
		
				if(indexedChildren.includes(nextChild)) nextChild = nextChild.cloneNode(true);
				indexedChildren.push(nextChild);
		
				if(indexedChildren.includes(previousChild)) previousChild = previousChild.cloneNode(true);
				indexedChildren.splice(0, 0, previousChild);		
		
				previousIndex--;
				nextIndex++;
		
			}
			
			this.innerHTML = '';
			indexedChildren.forEach((child) => that.appendChild(child));
			
			this.slideToActive('auto');
			
		}
	
	}
	
	// Quality of Life
	get actualWidth(){
		
		var width = this.offsetWidth; // Slider Width
		var sliderStyle = this.style;
		width += (parseFloat(sliderStyle.marginLeft) + parseFloat(sliderStyle.marginRight)) || 0;
		width += (parseFloat(sliderStyle.paddingLeft) + parseFloat(sliderStyle.paddingRight)) || 0;
		width += (parseFloat(sliderStyle.borderLeftWidth) + parseFloat(sliderStyle.borderRightWidth)) || 0;
		return width;
		
	}
	
	// Attributes
	get isDraggable(){return this.getAttribute('draggable') !== null;}
	get isInfinite(){return this.getAttribute('infinite') !== null;}
	get autoSlideInterval(){return parseInt(this.getAttribute('auto-slide')) || -1;}
	
	// Styles
	get activeElementAlign(){return getComputedStyle(this).getPropertyValue('--active-element-align').replace(' ', '') || 'left';}
	get indexedElementAmount(){return parseFloat(getComputedStyle(this).getPropertyValue('--indexed-element-amount')) || 1;}
	get elementSlidingAmount(){return parseInt(getComputedStyle(this).getPropertyValue('--element-sliding-amount')) || 1;}
	get slideDuration(){return parseInt(getComputedStyle(this).getPropertyValue('--slide-duration')) || 500;}
	
}

class WMSliderTrigger extends HTMLButtonElement{
	
	constructor(){
		
		super();
		
		var that = this;
		
		this.onclick = (e) => {
			
			e.preventDefault();
			if(that.slider && that.slideTo){
			   
				var slider = document.getElementById(that.slider);
				var activeIndex = [...slider.childList].indexOf(slider.querySelector('*[active]'));
				
				switch(that.slideTo){
					   
					case 'left':
						var newIndex = activeIndex - slider.elementSlidingAmount;
						return slider.setActiveChild((newIndex >= 0) ? newIndex : slider.childList.length + newIndex);
					case 'right':
						var newIndex = activeIndex + slider.elementSlidingAmount;
						return slider.setActiveChild((newIndex < slider.childList.length) ? newIndex : newIndex - slider.childList.length);
					default:
						return slider.setActiveChild(parseInt(that.slideTo));
					   
				}
			   
		   	}
			
		}
		
	}
	
	// Attributes
	get slider(){return this.getAttribute('slider');}
	get slideTo(){return this.getAttribute('slide-to');}
	
}

window.customElements.define('wm-slider', WMSlider);
window.customElements.define('wm-slider-trigger', WMSliderTrigger, {extends: 'button'});