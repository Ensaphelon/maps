import React from 'react';
import PropTypes from 'prop-types';
import { sortable } from 'react-sortable';

class SortableItem extends React.Component {
  render() {
    return (
      <div className="points__list-name" {...this.props}>
        {this.props.children[0]}
      </div>
    );
  }
}

SortableItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default sortable(SortableItem);
