import React from "react";
import PropTypes from "prop-types";

import "../App.css";

export default class TodoItemPresentational extends React.Component {
  render() {
    const {
      itemsList,
      removeItem,
      activeItem,
      activedItems,
      completedItems,
      allItems,
      clTemp,
      count,
      onChange,
      createUserInfor,
      userName,
    } = this.props;

    return (
      <div className="container-item">
        <ul>
          {itemsList.map((item) => {
            const { id } = item;
            const backgroundImg = item.isComplete ? "icon complete" : "icon";
            const itemContent = item.isComplete ? "completed" : "";
            return (
              <div key={id} className="item">
                <button className="delete" onClick={(e) => removeItem(e, item)}>
                  <b>X</b>
                </button>
                <div
                  className={backgroundImg}
                  onClick={(e) => activeItem(e, item)}
                />
                <li className={itemContent}>{item.name}</li>
              </div>
            );
          })}
        </ul>
        <div className="option">
          <div className="count">
            <p className={clTemp}>{count} item left</p>
          </div>
          <div className="btn-control">
            <button
              type="button"
              onClick={() => {
                this.setState({
                  btnClick: "all",
                });
                allItems();
              }}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState({
                  btnClick: "active",
                });
                activedItems();
              }}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState({
                  btnClick: "complete",
                });
                completedItems();
              }}
            >
              Completed
            </button>
          </div>
        </div>
        {userName ? (
          <p>{userName}</p>
        ) : (
          <div className="user-infor">
            <div className="add-infor">
              <form onSubmit={createUserInfor} className="add-form">
                <p>Create a name</p>
                <input
                  type="text"
                  // placeholder="Name"
                  name="name"
                  onChange={onChange}
                  className="add-ip"
                />
                <button type="submit" className="add-btn">
                  Create
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TodoItemPresentational.propTypes = {
  itemsList: PropTypes.array,
  removeItem: PropTypes.func,
  activeItem: PropTypes.func,
  state: PropTypes.string,
  active: PropTypes.func,
  complete: PropTypes.func,
  all: PropTypes.func,
};
