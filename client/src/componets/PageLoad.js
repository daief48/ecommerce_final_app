import React from 'react'
import './cafe.css';
const PageLoad = () => {
  return (
    <div className="container-fluid" style={{ position: 'fixed', top: "25%" }}>
      <div className="intro_img">
        <div className="row">
          <div className="col-lg-12">
            <div className="intro_img1">
              <img src="/intro.png" className alt />
              <center>
                <hr style={{ background: '#060000', height: 14, border: 'dashed', color: '#ff0505', marginTop: 0 }} />
              </center>
            </div>
          </div>
        </div>
        <h4 style={{textAlign:"center"}}>Loading...</h4>
      </div>
    </div>

  )
}

export default PageLoad

