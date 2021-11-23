import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
export default class IconCard extends Component {
  render() {
    const {
      icon,
      HearingDate,
      HearingDateInEnglish,
      value,
      title,
    } = this.props;
    return (
      <Card className="">
        <CardBody
          className="text-center radius shadow"
          style={{ minHeight: "135px", background: this.props.color }}
        >
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">{title}</p>
          {HearingDate ? <p>{HearingDate}</p> : <br />}
          <p>{HearingDateInEnglish}</p>
          <p className="lead text-center">{value}</p>
        </CardBody>
      </Card>
    );
  }
}
