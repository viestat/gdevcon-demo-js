import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import GridList from '@material-ui/core/GridList';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const baseUrl = 'http://192.168.192.42:8001/image_processing';

const bufferLength = `${baseUrl}/image_buffer_length`;

const imagesById = (id) => `${baseUrl}/image?ID=${id}`;

const fetchImages = (cb) => {
  return fetch(bufferLength, { mode: 'cors' })
    .then((res) => {
      return res.json();
    })
    .then((jsonRes) => {
      const len = jsonRes.ImageBufferLength;
      const imgRequests = [];

      for (let i = 0; i < len; i++) {
        imgRequests.push(fetch(imagesById(i), { mode: 'cors' }));
      }
      return Promise.all(imgRequests)
      .then(imgRes => {

        return imgRes.map(res => {
          return res.blob()
          .then(res => {
            var a = URL.createObjectURL(res)
            return a;
          })
        });
      })
      .then(urls => {
        return Promise.all(urls)
        .then(vals => cb(vals, len));
      });
    })
};


const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    paddingLeft: 4,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  favBorder: {
    color: 'red'
  }
};

export default class ImageStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      length: 0,
      images: [],
      favedImages: [],

    };
  }

  componentDidMount() {
    return fetchImages((vals, len) => {
      return this.setState({
        length: len,
        images: vals
      });
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  favImage = () => {
    const { activeStep, favedImages } = this.state;
    if(favedImages.indexOf(activeStep) === -1) {
      return this.setState({favedImages: [activeStep, ...favedImages]});
    }

    return;
  }

  isFaved = () => {
    const { activeStep, favedImages } = this.state;
    const index = favedImages.indexOf(activeStep);
    if(index === -1) {
      return false;
    }

    return true;
  }

  unFavImage = () => {
    const { activeStep, favedImages } = this.state;
    const index = favedImages.indexOf(activeStep);
    if(index !== -1) {
      favedImages.splice(index, 1);
      return this.setState({favedImages: favedImages});
    }

    return;
  }

  handleFav = (e, checked) => {
    const x = this.isFaved();
    if(this.isFaved()) {
      return this.unFavImage();
    }
    return this.favImage();

  }

  unFavImageById = (id) => {
    console.log('here', id)
    const { favedImages } = this.state;
    const index = favedImages.indexOf(id);
    if(index !== -1) {
      favedImages.splice(index, 1);
      return this.setState({favedImages: favedImages});
    }

    return;
  }


  render() {
    const { activeStep, length, images, favedImages } = this.state;
    return (
      <div style={styles.root}>
        <Paper square elevation={0} style={styles.header}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={this.isFaved()}
            value="checkedH"
            onChange={this.handleFav}
          />
          <IconButton  aria-label="SaveAlt">
            <a href={images[activeStep]} download>
              <SaveAltIcon />
            </a>
          </IconButton>
          <Typography>IMG ID:{activeStep}</Typography>
        </Paper>
        <SwipeableViews
          axis={'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {images.map((image, i) => (
            <img key={i} style={styles.img} src={image} />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={length}
          position="static"
          activeStep={activeStep}
          style={styles.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === length - 1}>
              Next
              {<KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {<KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
        <GridList style={styles.gridList} cols={2.5}>
          {favedImages.map((favIndex) => {
            return (
              <GridListTile key={"tile.img"}>
                <img src={images[favIndex]} />
                <GridListTileBar
                  title={`ID: ${favIndex}`}
                  actionIcon={
                    <IconButton>
                      <Favorite
                        style={styles.favBorder}
                        onClick={()=>this.unFavImageById(favIndex)}
                      />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}
