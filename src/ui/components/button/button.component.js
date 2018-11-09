import React, { Component } from 'react'
import './button.style.css'

export class Button extends Component {
  render() {
    const onClick = this.props.onClick
    const children = this.props.children
    const style = this.props.className

    // const { onClick, children } = this.props

    return (
      <button 
        className={style} 
        onClick={ onClick }
      > 
       { children }
      </button>
    )
  }
}