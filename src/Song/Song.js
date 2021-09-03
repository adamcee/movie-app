import React from 'react';
import PropTypes from 'prop-types';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      haveListenedTo: false,
    };

    this.handleChangeFavorite = this.handleChangeFavorite.bind(this);
  }

  myMethod() {
    console.log('myMethod: ');

    this.setState((previousState) => {
      console.log('previous state ')
      return { isFavorite: 'bananas' }
    });
  }

  renderTitle() {
    return (
        <h4>Title is {this.props.title}</h4>
    );
  }

  handleChangeFavorite() {
    this.myMethod();
    this.setState((previousState) => {
      const newState = { 
        isFavorite: 'bananas',
      }

      return newState;
  })
  }

  render() {
    const { artist } = this.props;

    return (
      <div> 
        {this.renderTitle()}
        <p>{artist}</p>
        <div>
        <input 
          type="checkbox" 
          id="isFavorite" 
          name="favorite" 
          checked={this.state.isFavorite} 
          onChange={this.handleChangeFavorite}
        />

        <input type="checkbox" id="haveListenedTo" name="haveListenedTo" checked={this.state.haveListenedTo} />
        </div>
      </div>
    );
  }
}

Song.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
}

export default Song;
