import React, { Component } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';

const styles = {
  container: {
    minWidth: '100%',
    maxWidth: '100%'
  },
  img: {
    overflow: 'hidden',
    width: '100%'
  },
  favedImg: {
    maxHeight: 320,
    maxWidth: 240,
    overflow: 'hidden',
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    margin: 12
  },
  favBorder: {
    color: 'red'
  }
};

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { images, ids } = this.props;
    return (
      <div style={styles.container}>
        <GridList
          style={styles.gridList}
          cols={0}
          cellHeight={'auto'}
          spacing={16}
        >
          {ids.map((id, i) => {
            return (
              <GridListTile key={i}>
                <img
                  style={styles.favedImg}
                  src={images[id]}
                  alt={`ID: ${id}`}
                />
                <GridListTileBar
                  title={`ID: ${id}`}
                  actionIcon={
                    <IconButton>
                      <Favorite
                        style={styles.favBorder}
                        onClick={() => this.props.onClick(id)}
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
