import React from 'react';
import Loader from 'react-loader-spinner'


class Loading extends React.Component{

  render(){
    return (
      <div className="loader">
        <div className="center">
          <Loader
             type="ThreeDots"
             color="#001f3f"
             height="100"
             width="100"
          />
        </div>
      </div>
    )
  }


}

export default Loading
