class AwakePopup {

  /**
   * Constructor
   * @param selector
   * @param options
   */

  constructor ( selector, options ) {

    this.$button = document.querySelector( selector );
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
    this.$body.append( this.$popup );
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
            buttonWithoutClass.addEventListener( button.handlerType ?? 'click', ( e ) => this.customButtonHandler( e, button ) );
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
      <div class="awake-popup__content">
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

    if (this.$scroll) {
      this.$html.style.paddingRight = this.scrollbarWidth + 'px';
      this.$body.classList.add('no-overflow');
      this.$html.classList.add('no-overflow');
    }
  }

  /**
   * Close popup
   */

  close () {
    this.$popup.classList.remove( 'open' );

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
