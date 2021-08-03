import { useState, useEffect } from "react";

const FSVideoList = () => {
    const [isLoaded, SetIsLoaded] = useState(false);
    const [error, SetError] = useState(null);
    const [items, SetItems] = useState([]);
    // Needs to work on variable declaration and not hardcoded
    const url = 'http://localhost:8080/videos/videolist'

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                SetItems(json.videos);
                SetIsLoaded(true);
            })
            .catch(error => {
                SetError(error);
                SetIsLoaded(true);
            });

    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div className="container">
                {
                    items.map((item) => {
                        return (
                            <div key={item.id} className="col-md-4">
                                <div className="thumbnail">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }



}

export default FSVideoList
