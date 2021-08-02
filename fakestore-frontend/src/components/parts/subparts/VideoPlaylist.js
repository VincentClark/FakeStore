import React from 'react';
import PlayList from '../../../fakedata/PlayList';
import VideoParts from './VideoParts';
class VideoPlaylist extends React.Component{
    constructor(props){
        super(props);
            this.state = {
               videos:[0,1]
            };
        
    }
        
        

    handleChange(event){

    }
    componentDidMount(){
        //const url = "/videos/videofiles"
        //const url = PlayList;
        // console.log(url);
        // fetch(PlayList)
        // .then((data) => {
        //     // this.setState({
        //     //     list: [data]
        //     // })
        //     console.log("JSON",data)
        // })
        // .then(console.log(this.state.list))
        // .catch((error) => console.log(error));
        const fakeObj1 = {'title':'vincent clark'};
        const fakeObj2 = {'title': 'Jennifer clark'};
        const fakerJson = [fakeObj1, fakeObj2];
        const fakeJson = [{"name":"Vincent Clark"}];
        //const data = JSON.stringify(fakeJson)
        this.setState({videos:fakerJson});

    }
    renderItems(){
        return this.state.videos.map((item)=>(
            <VideoParts key={item.is} item={item} />
        ));
    }
    render(){
        return(
            <>
            <div>
                {
                    <ul>
                        {this.renderItems()}
                    </ul>
                }
            </div>
            <div className="container-fluid">Hello</div>
            </>
        );
    }
}

export default VideoPlaylist;