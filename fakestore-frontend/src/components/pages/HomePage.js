/*
    eslint linebreak-style: ["error", "windows"]
*/
import fakestore from '../../assetes/images/fakestore.jpg';

const HomePage = () => (
    <>
    <div className = "grid-container">
    <div className="grid-child purple"><img src={fakestore} alt="fake$tore"></img></div>
        
    </div>
    <div className="grid-child purple">
        <p>Currently testing levels. No links work, just dummys, except for the Video Shorts</p>
    </div>
    </>
);

export default HomePage;
