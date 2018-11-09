import React, { Component, Fragment } from 'react'
import { Button } from '../button/button.component'
import './card.style.css'

export class Card extends Component {

  render() {
    const dog = this.props.data
    const isSelected = this.props.isSelected

    const selectedClass = isSelected ? 'dog__image--selected' : ''

    return (
      <Button onClick={() => this.props.handleSelectDog(dog, isSelected)}>
        <div className='dog'>
          <img className={`dog__image ${selectedClass}`} src={dog} />
          <Button onClick={(event) => this.props.handleDeleteDog(event, dog, isSelected)} className='dog__image__action'>
            X
          </Button>
        </div>
      </Button>
    )
  }
}