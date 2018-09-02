import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ImageGallery, Stepper } from './Components';

const baseUrl = `http://${process.env.REACT_APP_URL}/image_processing`;

const bufferLength = `${baseUrl}/image_buffer_length`;

const imagesById = id => `${baseUrl}/image?ID=${id}`;

const fetchImages = cb => {
  return fetch(bufferLength, { mode: 'cors' })
    .then(res => {
      return res.json();
    })
    .then(jsonRes => {
      const len = jsonRes.ImageBufferLength;
      const imgRequests = [];

      for (let i = 0; i < len; i++) {
        imgRequests.push(fetch(imagesById(i), { mode: 'cors' }));
      }
      return Promise.all(imgRequests)
        .then(imgRes => {
          return imgRes.map(res => {
            return res.blob().then(res => {
              var a = URL.createObjectURL(res);
              return a;
            });
          });
        })
        .then(urls => {
          return Promise.all(urls).then(vals => cb(vals, len));
        });
    });
};

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '100%'
  },
  stepContainer: {
    width: '100%',
    maxWidth: 400,
    flex: 1
  },
  gridListContainer: {
    minWidth: '100%',
    maxWidth: '100%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    paddingLeft: 4,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  img: {
    overflow: 'hidden',
    width: '100%'
  },
  loader: {
    margin: 30,
    color: '#6cbcde'
  }
};

export default class ImageStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      length: 0,
      images: [],
      favedImages: [],
      loaded: false
    };
  }

  componentDidMount() {
    return fetchImages((vals, len) => {
      return this.setState({
        length: len,
        images: vals,
        loaded: true
      });
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  favImage = () => {
    const { activeStep, favedImages } = this.state;
    if (favedImages.indexOf(activeStep) === -1) {
      return this.setState({ favedImages: [activeStep, ...favedImages] });
    }

    return;
  };

  isFaved = () => {
    const { activeStep, favedImages } = this.state;
    const index = favedImages.indexOf(activeStep);
    if (index === -1) {
      return false;
    }

    return true;
  };

  unFavImage = () => {
    const { activeStep, favedImages } = this.state;
    const index = favedImages.indexOf(activeStep);
    if (index !== -1) {
      favedImages.splice(index, 1);
      return this.setState({ favedImages: favedImages });
    }

    return;
  };

  handleFav = (e, checked) => {
    if (this.isFaved()) {
      return this.unFavImage();
    }
    return this.favImage();
  };

  unFavImageById = id => {
    console.log('here', id);
    const { favedImages } = this.state;
    const index = favedImages.indexOf(id);
    if (index !== -1) {
      favedImages.splice(index, 1);
      return this.setState({ favedImages: favedImages });
    }

    return;
  };

  renderStepper = () => {
    const { activeStep, length, images, loaded } = this.state;
    const stepper = (
      <Stepper
        activeStep={activeStep}
        length={length}
        images={images}
        isFaved={this.isFaved}
        handleFav={this.handleFav}
        onChangeIndex={this.handleStepChange}
        onNext={this.handleNext}
        onBack={this.handleBack}
      />
    );
    const loader = <CircularProgress style={styles.loader} size={50} />;

    return loaded ? stepper : loader;
  };

  render() {
    const { images, favedImages } = this.state;
    return (
      <div style={styles.root}>
        <div style={styles.stepContainer}>{this.renderStepper()}</div>
        <div style={styles.gridListContainer}>
          <ImageGallery
            images={images}
            ids={favedImages}
            onClick={this.unFavImageById}
          />
        </div>
      </div>
    );
  }
}
