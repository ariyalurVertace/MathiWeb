import React from "react"
import MapPicker from "react-google-map-picker"
import { GoogleAPIKey } from "../../constants/defaultValues"

const DefaultLocation = { lat: 11.1271, lng: 78.6569 }
const DefaultZoom = 10
export class LocationPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultLocation: DefaultLocation,
      location: DefaultLocation,
      zoom: DefaultZoom,
    }
  }

  handleChangeLocation = (lat, lng) => {
    this.setState({ location: { lat: lat, lng: lng } })
    if (this.props && this.props.selectedLatLong)
      this.props.selectedLatLong(lat, lng)
  }

  handleChangeZoom = newZoom => {
    this.setState({ zoom: newZoom })
  }

  handleResetLocation = () => {
    this.setState({ location: DefaultLocation, zoom: DefaultZoom })
  }

  render() {
    const { location, zoom } = this.state
    const { defaultLocation, size } = this.props
    const mapHeight = size ? String(size) + "px" : "700px"
    return (
      <>
        {/* <button onClick={this.handleResetLocation}>Reset Location</button>
        <label>Latitute:</label>
        <input type="text" value={location.lat} disabled />
        <label>Longitute:</label>
        <input type="text" value={location.lng} disabled />
        <label>Zoom:</label>
        <input type="text" value={zoom} disabled /> */}

        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          style={{ height: mapHeight }}
          onChangeLocation={this.handleChangeLocation}
          onChangeZoom={this.handleChangeZoom}
          apiKey={GoogleAPIKey}
        />
      </>
    )
  }
}
export default LocationPicker
