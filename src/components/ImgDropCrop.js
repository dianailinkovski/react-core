import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";

import "./custom-image-crop.css";
import {
  image64toCanvasRef,
  downloadBase64File,
  base64StringtoFile,
  extractImageFileExtensionFromBase64
} from "./ResuableUtils";

//https://github.com/react-dropzone/react-dropzone
//https://github.com/DominicTobias/react-image-crop
//Proparties for the image upload
const imageMaxSize = 10000000000; // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

class ImgDropCrop extends React.Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.state = {
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1
      }
    };
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            });
          },
          false
        );
        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleImageLoaded = image => {
    console.log(image);
  };
  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    //console.log(crop, pixelCrop)

    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };

  handleDownloadClick = event => {
    event.preventDefault();
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
      const myFilename = "previewFile." + fileExtension;

      //file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      //download file
      downloadBase64File(imageData64, myFilename);
      this.handleClearToDefault();
    }
  };

  handleClearToDefault = event => {
    if (event) event.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1
      }
    });
    //this.fileInputRef.current.value = null;
  };

  render() {
    const { imgSrc } = this.state;
    return (
      <div>
        {imgSrc !== null ? (
          <div>
            <ReactCrop
              src={imgSrc}
              crop={this.state.crop}
              onImageLoaded={this.handleImageLoaded}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
            />
            <br />
            <p>Preview Canvas Crop </p>
            <canvas ref={this.imagePreviewCanvasRef} />
            <button onClick={this.handleDownloadClick}>Download</button>
            <button onClick={this.handleClearToDefault}>Clear</button>
          </div>
        ) : (
          ""
        )}
        <Dropzone
          onDrop={this.handleOnDrop.bind(this)}
          accept={acceptedFileTypes}
          multiple={false}
          maxSize={imageMaxSize}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              Drag & Drop Here
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default ImgDropCrop;
