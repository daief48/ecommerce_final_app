import React from 'react'
import "./cafe.css";
const Carsour = () => {
    return (
        <div>
            <div className="w-100">
                <div className="banner-ani">
                    <div className="row">
                        <div className="col-lg-2 col-sm-2 col-2">
                            <div className="engin-ani">
                                <div className="picton_footer">
                                    <img src="images/piston/81NAfng2FML._AC_SL1500_.png" alt />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-8 col-7">
                            <div className="picton_footeer">
                                {/* Carousel */}
                                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                                    {/* Indicators/dots */}
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#demo" data-bs-slide-to={0} className="active" />
                                        <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                                        <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
                                    </div>
                                    {/* The slideshow/carousel */}
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="Bmw cafe/2.jpg" alt="Los Angeles" className="d-block w-100" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="Bmw cafe/4.jpg" alt="Chicago" className="d-block w-100" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="Bmw cafe/3.jpg" alt="New York" className="d-block w-100" />
                                        </div>
                                    </div>
                                    {/* Left and right controls/icons */}
                                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" />
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" />
                                    </button>
                                </div>



                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-2 col-2">
                            <div className="engin-ani">
                                <div className="picton_footer">
                                    <img src="images/piston/81NAfng2FML._AC_SL1500_.png" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Carsour
