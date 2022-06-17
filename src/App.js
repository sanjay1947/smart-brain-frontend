// "react-scripts": "5.0.1",

import React, {Component} from 'react';

import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';



const particlesOptions = {
  particles: {
    number: { 
      value: 30, 
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

// so that each time new user registers, after getting logged in, the previous 
// image searched by last logged in user wont appear 
const initialState = {
  input: '', // input will have onInputChnage function
  imageUrl: '',
  box: {},
  // route keeps track of where we are on the page
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
} 


class App extends Component {
  // for search bar functionality
  constructor() {
    super(); 
    this.state = initialState;
  }
  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      // total width * times of percentage where the left column should be
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      // 
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  //  when there is any sort of event listener we receive an event
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://secure-scrubland-66020.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input             
            })
          })
          .then(response => response.json())

        // promise
        .then(response => {
          if(response) {
            fetch('https://secure-scrubland-66020.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id              
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))              
            })
            .catch(console.log)
        }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    }else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return(
    <div className="App">
      <Particles className='particles' params={particlesOptions}  />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
    {/*  to make signin run first using if i.e.  this.state.route === 'home'
    if it is home then render home screen */}
      { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank  
              name={this.state.user.name}
              entries={this.state.user.entries}  
             />  
            {/* passing onInputChange as props
            since belongs to this class so this keyword is used*/}
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />          
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>  
          // otheriwise another expression will executes which also have ternary
        : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
      }
    </div>
    );
  }
}

export default App;
