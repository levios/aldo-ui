import React  from 'react';
/* import React, { Image }  from 'react';
import ImageViewer from 'react-simple-image-viewer'; */
import PersonService from "../services/person.service";
//import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import Viewer from 'react-viewer';
/**
 * props => id1
 */
class ImageBox extends React.Component {
    constructor(props) {
        super(props);

        this.getImagesCount = this.getImagesCount.bind(this);
        this.getImage = this.getImage.bind(this);
        this.openImageViewer = this.openImageViewer.bind(this);
        this.closeImageViewer = this.closeImageViewer.bind(this);

        this.state = {
            image:  null,
            imageCount: 0,
            image64: null,
            imageName: "",
            isViewerOpen: false
        };
    }

    componentDidMount() {
        if (this.props.id1) {
          this.getImagesCount(this.props.id1);
        }
    }

    openImageViewer() {
        console.log(`Opening image: ${this.props.id1}`);
        if (!this.state.image){
            this.getImage(this.props.id1)
        }
        this.setState({
            isViewerOpen: true
        });
    };
    
    closeImageViewer() {
        console.log(`Closing image: ${this.props.id1}`);
        this.setState({
            isViewerOpen: false
        });
    };

    getImagesCount(id) {
        PersonService.getImageCount(id)
        .then(response => {
            this.setState({
                imageCount: response.data
              });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    /**
     * Downloads image
     * Also sets image in state
     * @param {} id 
     */
    getImage(id) {
        PersonService.getImage(id)
        .then(response => {
            this.setState({
                image: response.data[0].picByte,
                imageName: response.data[0].name
            });
            console.log(response.data);
            console.log(`pic_byte: ${response.data[0].picByte}`);
            const src = `data:image/jpeg;base64, ${response.data[0].picByte}`;
            this.setState({
                image64: src
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    // 2. bind it with fat arrows.
    mouseOver = () => {
        this.setState({hover: true});
    }
    mouseOut = () => {
        this.setState({hover: false});
    }

    render() {
      return (
            <div>
                {this.state.imageCount ? (
                    <button onClick={this.openImageViewer} >Megnyitás</button>
                    
                ) : (
                    <div><i>nem található</i></div>
                )}

               {(this.state.imageCount && this.state.isViewerOpen) ? (
                    <div>
                        <Viewer
                            visible={true}
                            onClose={this.closeImageViewer}
                            images={[ {src: this.state.image64, alt: this.state.imageName} ]}
                            noToolbar={false}
                            rotatable={false}
                            scalable={false}
                            zoomable={false}
                            />

                    </div>
                ) : (
                    <div></div>
                )
                }
            </div>
        )
    }
}


export default ImageBox;