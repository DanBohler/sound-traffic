import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
    });
    this.service = service;
  }

  errorHandler = err => {
    console.error(err);
    throw err;
  };

  handleUpload = (theFile) => {
    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  };

  saveNewPhoto = (imageUrl , username) => {
    console.log(imageUrl)
    return this.service.post('/updatephoto', {imageUrl, username})
      .then(res => res.data)
      .catch(this.errorHandler);
  }

}


export default Service;
