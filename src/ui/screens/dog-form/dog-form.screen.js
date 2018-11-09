import React, { Component, Fragment } from 'react'
import './dog-form.style.css'
import { DogService } from '../../../service'
import { 
  Card,
  Button, 
} from '../../components'

export class DogFormScreen extends Component {
  state = {
    dogs: [],
    selectedDogs: [],
  }

  dogService = new DogService()

  /*
  *
  * Helpers
  * 
  */


  checkIfDogIsSelected = dog => {
    return this.state.selectedDogs.some(selectedDog => selectedDog === dog)
  }

  unselectDog = dog => {
    const newSelectedDogs = this.state.selectedDogs.filter(selectedDog => selectedDog !== dog)

    this.setState({ selectedDogs: newSelectedDogs })
  }

  filterDogs = (dogs, dogToBeFiltered) => {
    return dogs.filter(dog => dog !== dogToBeFiltered)
  }


  /*
  *
  * Handlers
  * 
  */

  handleFetchDog = () => {
    this.dogService.getRandomDog()
      .then(res => { 
        this.setState({
          dogs: [ 
            ...this.state.dogs, 
            res.message,
          ]}
      )})
      .catch(err => {
        alert('oh no')
      })
  }

  handleDeleteAllDogs = () => {
    this.setState({ dogs: [], selectedDogs: [] })
  }

  handleDeleteDog = (event, dogToDelete, isSelected) => {
    // to stop onClick from parent element
    event.stopPropagation()

    const newDogs = this.filterDogs(this.state.dogs, dogToDelete)
    let newSelectedDogs = this.state.selectedDogs
    
    if (isSelected) {
      newSelectedDogs = this.filterDogs(this.state.selectedDogs, dogToDelete)
    }

    this.setState({ 
      dogs: newDogs, 
      selectedDogs: newSelectedDogs 
    })
  }

  handleSelectDog = (dog, isSelected) => {
    if (isSelected) {
      this.unselectDog(dog)
    } else {
      this.setState({ selectedDogs: [
        ...this.state.selectedDogs,
        dog,
      ]})
    }
  }

  handleUnselectAllDogs = () => {
    this.setState({ selectedDogs: [] })
  }


  /*
  *
  * Renders
  * 
  */

  renderImage = dog => {
    const isSelected = this.checkIfDogIsSelected(dog)    

    return (
      <div className="form__item">
        <Card
          data={dog}
          isSelected={isSelected}
          handleDeleteDog={this.handleDeleteDog}
          handleSelectDog={this.handleSelectDog}
        />
      </div>
    )
  }

  renderFormActions = () => {
    const hasDogs = this.state.dogs.length > 0
    const hasDogsSelected = hasDogs && this.state.selectedDogs.length > 0

    return (
      <div className='form__actions'>
        <Button 
          className="form__actions__button" 
          onClick={this.handleFetchDog}
        >
          <span className="sum">Get Dog</span>
        </Button>
        { hasDogsSelected > 0 && (
          <Button 
            className="form__actions__button" 
            onClick={this.handleUnselectAllDogs}
          > 
            <span className="sum">Unselect All Dogs</span>
          </Button>
        )}
        { hasDogs > 0 && (
          <Button 
            className="form__actions__button" 
            onClick={this.handleDeleteAllDogs}
          > 
            <span className="sum">Delete All Dogs</span>
          </Button>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          { this.state.dogs.map(dog => 
            this.renderImage(dog)  
          )}
        </div>
        { this.renderFormActions() }
      </div >
    )
  }
}