import { toPng } from 'html-to-image';

export const GenerateImage = (element) => {
    toPng(element)
      .then(function (dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        // console.log(dataUrl)

        console.log(element)
        

        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

