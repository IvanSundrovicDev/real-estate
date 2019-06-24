import React, {Component} from "react"
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

console.log(faSearch);
const MY_API_KEY = 'AIzaSyD4-l2kGos97BvnKN3FKNTE1z-I82Ejuww'

export default class HeadSearch extends React.Component {
    state = {
        search: "",
        value: "",
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    }

    handleNoResult = () => {
        console.log('No results for ', this.state.search)
    }

    handleStatusUpdate = (status) => {
        console.log(status)
    }

    render() {
        const {search, value} = this.state
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <GooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                        <div className="wrap">
                           <div className="search">
                              <input type="text" className="searchTerm" value={value} onChange={this.handleInputChange} placeholder="What are you looking for?" />
                              <button type="submit" className="searchButton">
                                <FontAwesomeIcon icon={faSearch} />
                             </button>
                           </div>
                        </div>
                        </GooglePlacesSuggest>
                    )
                }
            />
        )
    }
}
