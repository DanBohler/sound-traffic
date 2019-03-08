import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });
    this.service = service;
  }

  errorHandler = (err) => {
    console.error(err);
    throw err;
  };

  handleUpload = (theFile) => {
    return this.service
      .post('/api/upload', theFile)
      .then((res) => res.data)
      .catch(this.errorHandler);
  };

  saveNewPhoto = (imageUrl, username) => {
    console.log(imageUrl);
    return this.service
      .post('/api/updatephoto', { imageUrl, username })
      .then((res) => res.data)
      .catch(this.errorHandler);
  };

  listAdverts = (articles) => {
    return this.service
      .get('/listAll/articles', { articles })
      .then((res) => res.data)
      .catch(this.errorHandler);
  };

  listOneArticle = (id_article) => {
    return this.service
      .post('/listAll/oneAdInfo', { id_article })
      .then((res) => res.data)
      .catch(this.errorHandler);
  };

  listMyAds = (article) => {
    return this.service
    .post('/listAll/myads',{article})
    .then((res) => res.data)
    .catch(this.errorHandler);
  }

  uploadAdvert = (advert) => {    
    console.log(advert)
    return this.service
    .post('/ad/createad', { advert })
    .then((res) => res.data)
    .catch(this.errorHandler);
  };

  saveAdvertPhoto = (imageUrl) => {
    console.log(imageUrl);
    return this.service
      .post('/api/articlephoto', {imageUrl})
      .then((res) => res.data)
      .catch(this.errorHandler)
  }
}

export default Service;
