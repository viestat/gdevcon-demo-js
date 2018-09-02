import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const styles = {
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
  render() {
    const {
      activeStep,
      length,
      images,
      handleFav,
      onChangeIndex,
      onNext,
      onBack
    } = this.props;

    return (
      <div>
        <Paper square elevation={0} style={styles.header}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={this.props.isFaved()}
            value="checkedH"
            onChange={handleFav}
          />
          <IconButton aria-label="SaveAlt">
            <a href={images[activeStep]} download>
              <SaveAltIcon />
            </a>
          </IconButton>
          <Typography>
            IMG ID:
            {activeStep}
          </Typography>
        </Paper>
        <SwipeableViews
          axis={'x'}
          index={activeStep}
          onChangeIndex={onChangeIndex}
          enableMouseEvents
        >
          {images.map((image, i) => (
            <img key={i} style={styles.img} src={image} alt={`ID: ${i}`} />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={length}
          position="static"
          activeStep={activeStep}
          style={styles.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={onNext}
              disabled={activeStep === length - 1}
            >
              Next
              {<KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={onBack} disabled={activeStep === 0}>
              {<KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}
