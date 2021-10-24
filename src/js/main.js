const popup = new AwakePopup('.btn', {
  content: `<div>
    <h2>Your popup title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dicta dolorum libero minus, natus nemo numquam reprehenderit sit vero voluptatibus! Blanditiis corporis et incidunt nemo odit officiis pariatur provident reiciendis unde! Fuga magni odit sed similique voluptates! Ad aliquam distinctio eaque eius error facere, inventore iste laudantium minus molestias non numquam odio, quasi quisquam quod repellat repudiandae tempore unde? Aliquam animi, asperiores consequatur delectus deleniti dicta, enim eveniet, hic illum ipsam modi molestiae obcaecati perferendis provident quia soluta vitae? Assumenda autem beatae corporis distinctio, itaque labore laborum nihil nobis quibusdam reiciendis velit vero. Eum ex maxime nisi recusandae? Nobis, reprehenderit!</p>
</div>`,
  closeButton: true,
  overlayClose: true,
  overlay: true,
  noScroll: true,
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
});

window.pop = popup;
