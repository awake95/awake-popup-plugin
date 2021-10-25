class AwakePopup {

  /**
   * Constructor
   * @param selector
   * @param options
   */

  constructor ( options ) {

    this.$clickBtnSelector = options.clickButtonSelector;

    if (this.$clickBtnSelector) {
      this.$button = document.querySelector( this.$clickBtnSelector );
    }

    this.$popup = null;
    this.$closeBtn = null;
    this.$body = document.querySelector( 'body' );
    this.$html = document.querySelector( 'html' );
    this.$options = options;
    this.$options.content = options.content ?? '';
    this.$options.overlay = options.overlay ?? false;
    this.$options.closeButton = this.$options.closeButton ?? false;
    this.$buttons = options.buttons?.length ? options.buttons : [];
    this.$overlayClose = options.overlayClose ?? true;
    this.$scroll = options.noScroll ?? false;
    this.$position =  options.position ?? false;
    this.$showAfter = options.showAfterMs;
    this.$animation = options.animation ?? false;
    this.$animationDurationOpen = this.$animation && this.$animation.durationOpen ? this.$animation.durationOpen / 1000 : null;
    this.$animationDurationClose = this.$animation && this.$animation.durationClose ? this.$animation.durationClose / 1000 : null;
    this.$content = null;

    this.#render();
    this.#assign();
  }

  /**
   * Render popup
   */

  #render () {
    this.$popup = document.createElement( 'div' );
    this.$popup.classList.add( 'awake-popup' );
    this.$popup.setAttribute( 'data-type', 'popup-overlay' );

    if ( this.$options.overlay ) {
      this.$popup.classList.add( 'overlay' );
    }

    this.$popup.innerHTML = this.getPopupTemplate( this.$options );
    this.$content = this.$popup.querySelector('div[data-type="content"]')
    if ( this.$position && this.$content ) {

      this.$content.style.position = 'absolute'
      this.$content.style.top = this.$position.top ? this.$position.top + 'px' : 'unset';
      this.$content.style.left = this.$position.left ? this.$position.left + 'px' : 'unset';
      this.$content.style.bottom = this.$position.bottom ? this.$position.bottom + 'px' : 'unset';
      this.$content.style.right = this.$position.right ? (this.$position.right * 2) + 'px' : 'unset';
    }

    this.$body.append( this.$popup );

    if ( this.$showAfter ) {
      this.showAfterTimeout();
    }

    if (this.$animation.animationName) {
      if (this.$content) {
        this.$content.classList.add( this.$animation.animationName );
       this.animationInitialized();
      }

    }
  }

  animationOpen() {
    if (this.$animation.animationName === 'zoom') {
      this.$content.style.transform = 'scale(1)';
      this.$content.style.transitionProperty = 'transform';
    }

    if (this.$animation.animationName === 'fade') {
      this.$content.style.opacity = '1';
      this.$content.style.transitionProperty = 'opacity';
    }

    if (this.$animationDurationOpen) {
      this.$content.style.transitionDuration = this.$animationDurationOpen + 's';
      this.$popup.style.transitionDuration = this.$animationDurationOpen + 's';
    }else {
      this.$content.style.transitionDuration = '0.2s';
      this.$popup.style.transitionDuration = '0.2s';
    }
  }

  animationInitialized() {
    if (this.$animation.animationName === 'zoom') {
      this.$content.style.transitionProperty = 'transform';
      this.$content.style.transform = 'scale(0)';
    }

    if (this.$animation.animationName === 'fade') {
      this.$content.style.opacity = '0';
      this.$content.style.transitionProperty = 'opacity';
    }

    if (this.$animationDurationClose) {
      this.$content.style.transitionDuration = this.$animationDurationClose + 's';
      this.$popup.style.transitionDuration = this.$animationDurationClose + 's';
    }else {
      this.$content.style.transitionDuration = '0.2s';
      this.$popup.style.transitionDuration = '0.2s';
    }
  }

  /**
   * Assign handlers
   */

  #assign () {
    this.clickHandler = this.clickHandler.bind( this );
    this.overlayClickHandler = this.overlayClickHandler.bind( this );
    this.closeButtonHandler = this.closeButtonHandler.bind( this );

    if ( this.$button ) {
      this.$button.addEventListener( 'click', this.clickHandler );
    }

    if (this.$overlayClose && !this.isOpen && this.$popup ) {
      this.$popup.addEventListener( 'click', this.overlayClickHandler );
    }

    if ( this.$options.closeButton ) {
      this.$closeBtn = this.$popup.querySelector( 'button[data-close]' );
      this.$closeBtn.addEventListener( 'click', this.closeButtonHandler );
    }

    // assign handlers to custom buttons
    if ( this.$buttons.length ) {
      this.$buttons.find( ( button, index ) => {
        if ( button.handler ) {
          this.customButtonHandler = this.customButtonHandler.bind( this );
            const buttonWithoutClass = this.$popup.querySelector( `button[data-index="${ index }"]` );
            if (buttonWithoutClass) {
              buttonWithoutClass.addEventListener( button.handlerType ?? 'click', ( e ) => this.customButtonHandler( e, button ) );
            }
        }
      } );
    }
  }

  /**
   * Handler for custom buttons
   * @param e
   * @param button
   */

  customButtonHandler ( e, button ) {
    button.handler( e, button );
  }

  /**
   * Get status of popup - open or not
   * @returns {null|boolean}
   */

  get isOpen () {
    return this.$popup && this.$popup.classList.contains( 'open' );
  }

  /**
   * Get width of scrollbar
   * @returns {number}
   */

  get scrollbarWidth() {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
  }

  /**
   * Close popup on exit icon
   */

  closeButtonHandler () {
    this.close();
  }

  /**
   * Close popup on overlay
   * @param event
   */

  overlayClickHandler ( event ) {
    let { type } = event.target.dataset;

    if ( type === 'popup-overlay' ) {
      this.close();
    }
  }

  showAfterTimeout() {
    let _this = this;
    setTimeout(function (  ) {
      _this.open();
    }, this.$showAfter )
  }

  /**
   * Button click handler to open popup
   */

  clickHandler () {
    this.open();
  }

  /**
   * Template for popup
   * @param $options
   * @returns {string}
   */

  getPopupTemplate ( $options ) {
    let buttons;

    if ( $options.buttons?.length > 0 ) {
      buttons = [ ...$options.buttons ].map( ( button, index ) => {
        return `<button type="${ button.buttonType ?? 'button' }" class="${ button.buttonClasses?.length ? button.buttonClasses.join( ' ' ) : '' }" data-index="${ index }">${ button.buttonText }</button>`;
      } );
    }

    return `
      <div class="awake-popup__content" data-type="content">
        ${ $options.closeButton ? '<button class="awake-popup__close" data-close></button>' : '' }
        ${ $options?.content ?? '' }
        <div class="awake-popup__custom-buttons">${ buttons ? buttons.join( '' ) : '' }</div>
     </div>
    `;
  }

  /**
   * Open popup
   */

  open () {
    this.$popup.classList.add( 'open' );

    if ( this.$position ) {
      const scrollBarWidth = this.scrollbarWidth;
      if (this.$content) {
        this.$content.style.right = this.$position.right ? this.$position.right * 2 - (+this.$position.right - +scrollBarWidth) + 'px' : 'unset';
      }
    }

    if (this.$scroll) {
      this.$html.style.paddingRight = this.scrollbarWidth + 'px';
      this.$body.classList.add('no-overflow');
      this.$html.classList.add('no-overflow');
    }

    if (this.$content) {
     this.animationOpen();
    }

  }

  /**
   * Close popup
   */

  close () {
    this.$popup.classList.remove( 'open' );

    if ( this.$position ) {
      this.$content.style.left = this.$position.left ? this.$position.left + 'px' : 'unset';
      this.$content.style.right = this.$position.right ? this.$position.right + 'px' : 'unset';
    }


    if (this.$content) {
      this.animationInitialized();
    }

    if (this.$scroll) {
      this.$html.style.paddingRight = '0';
      this.$body.classList.remove('no-overflow');
      this.$html.classList.remove('no-overflow');
    }
  }

  /**
   * Destroy popup
   */

  destroy () {
    if ( this.$button ) {
      this.$button.removeEventListener( 'click', this.clickHandler );
    }

    this.$popup.remove();
  }
}
