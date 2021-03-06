import React, { Component } from 'react'
import './App.css'
import spinner from './icon-spinner.gif'

// This component brings in all the characters.
class Characters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      characters: [],
      isLoading: false
    }
  }
  componentDidMount () {
    this.setState({ isLoading: true })

    fetch('https://www.moogleapi.com/api/v1/characters')
      .then(response => response.json())
      .then(characters => {
        this.setState({ characters: characters, isLoading: false })
      }
      )
  }
  render () {
    const isLoading = this.state.isLoading
    let render
    let divSpacing = {
      margin: '10% auto 0 auto'
    }

    if (isLoading) {
      render = <div className='random' style={divSpacing} isLoading={isLoading}>
        <img className='img' src={spinner} alt='Random character' />
      </div>
    } else {
      render = <div className='container contained'>
        <table className='table table-striped desktop'>
          <tr className='font-weight-bolder bg-dark text-white'>
            <td>Name</td>
            <td>Age</td>
            <td>Race</td>
            <td>Gender</td>
            <td>Job/Class</td>
          </tr>
          <tbody>
            {this.state.characters.map(c =>
              <tr>
                <td><img className='img-character' src={c.picture} alt={c.name} /> {c.name}</td><td>{c.age}</td><td>{c.race}</td><td>{c.gender}</td><td>{c.job}</td>
              </tr>
            )}
          </tbody>
        </table>
        <table className='table table-striped mobile'>
          <tr className='font-weight-bolder bg-dark text-white'>
            <td>Name</td>
            <td>Job/Class</td>
          </tr>
          <tbody>
            {this.state.characters.map(c =>
              <tr>
                <td><img className='img-character' src={c.picture} alt={c.name} /> {c.name}</td><td>{c.job}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }

    return (
      <div className='container text-center buffered'>
        <span className='font-weight-bolder display-4'>Characters</span>
        {render}
      </div>
    )
  }
}

export default Characters
