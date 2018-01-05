import React from 'react';
import PropTypes from 'prop-types';
import SortableItem from './SortableItem';

class SortableList extends React.Component {
  state = {
    items: this.props.items,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items) {
      this.setState({ items: nextProps.items });
    }
  }

  onSortItems = (items) => {
    this.props.onSortComplete(items);
    this.setState({ items });
  }

  render() {
    const { items } = this.state;
    const listItems = items.map((item, i) => {
      return (
        <div className="points__list-item" key={i}>
          <SortableItem
            key={i}
            onSortItems={this.onSortItems}
            items={items}
            sortId={i}>
            {item}
          </SortableItem>
          <button title="Delete marker" className="points__list-item-delete" onClick={() => { this.props.onDelete(i); }}>remove</button>
        </div>
      );
    });

    return (
      <div className="points__list">
        {listItems}
      </div>
    );
  }
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSortComplete: PropTypes.func.isRequired,
};

export default SortableList;
