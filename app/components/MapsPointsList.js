import React, { Component } from 'react';
import SortableList from './SortableList';
import Maps from './Maps';

class MapsPointsList extends Component {
  /**
   * Setting initial state.
   * @param {object} props - Component's properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      center: null,
    };
  }
  /**
   * Sets maps center to state
   * @param {object} coords - Google maps location coordinates
   */
  setCenter = (coords) => {
    this.setState({ center: coords });
  }
  /**
   * Adding new point to state after pressing 'Enter'
   * @param {object} event - key pressing event
   */
  handleKeyPress = (event, newItemName) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.addItem(event.target.value);
    } else if (newItemName !== undefined) {
      this.addItem(newItemName);
    }
  }
  /**
   * Add point
   * @param {string} item - point's name
   */
  addItem = (item) => {
    if (item !== '') {
      const newItems = this.state.items;
      newItems.push([item, this.state.center.lat, this.state.center.lng]);
      this.setState({ items: newItems });
    }
  }
  /**
   * Delete point
   * @param {number} index - point's position number
   */
  deleteItem = (index) => {
    const newItems = this.state.items;
    newItems.splice(index, 1);
    this.setState({
      items: newItems,
    });
  }
  /**
   * State update after sorting points
   * @param {object} items - added points
   */
  sortComplete = (items) => {
    this.setState({ items });
  }

  render() {
    return (
      <div className="points">
        <div className="points__list-wrapper">
          <label htmlFor="points" className="points__label">Please, enter marker name here</label>
          <input id="points" className="points__field" type="text" onKeyPress={this.handleKeyPress} />
          <SortableList
            items={this.state.items}
            onDelete={this.deleteItem}
            onSortComplete={this.sortComplete}
          />
        </div>
        <div className="points__map">
          <Maps
            items={this.state.items}
            setCenter={this.setCenter}
          />
        </div>
      </div>
    );
  }
}

export default MapsPointsList;
