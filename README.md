# awake-popup-plugin
This is custom popup plugin


**USAGE**

    Add script and css from dist folder to your .html/.php file. Awake-popup.js before your main script file.



In your main js file: 

// Usage example - "options" is Object

    const popup = new AwakePopup(options)


**OPTIONS: {**

    clickButtonSelector: string, // default empty, add selector to button (click handler will be added for open popup)

    content: string, // default empty, add your html here for popup content
    
    closeButton: boolean, // default false, adding close icon and handler to close popup
    
    overlayClose: boolean, // default true, allow closing popup by click on overlay
    
    overlay: boolean, // default false, if true - will add overlay on popup
    
    noScroll: boolean, // default false, if true - will disable scroll

    position: object, // default centered in window, use property as in css - bottom, top, left, right (only numbers will allow)
        //example
          position: {
            bottom: 20,
            right: 20,
          },
          
    animation: object, // animationName(string - only "fade" and "zoom"), durationOpen(number) and durationClose(number)
        //example
            animation: {
                animationName: 'zoom',
                durationOpen: 1200,
                durationClose: 100,
              },
    
    buttons: array of objects, one object is button, that contain text, classes, button type, handler and handler type, handler get 2 args - event and object(button)
     usage Example: 
        buttons: [
          {
            buttonText: '1234',
            buttonClasses: ['some-button', 'btn'],
            buttonType: 'button',
            handler: (event, button) => {
              popup.close()
            },
            handlerType: 'click'
          },
          {
            buttonText: 'another button',
            handler: (event, button) => {
              console.log('click on another button');
            },
          }
        ]
}

**METHODS:**

    open() - open popup,

    close() - close popup,

    destroy() - destroy popup and remove from page


**GET METHOD:**

    isOpen() - get status of popup (is it open or close) - return boolean



