import React from 'react';
import Pokemon from './Pokemon';
import './Pokedex.css'

class Pokedex extends React.Component {
    constructor(){
        super()
        this.state = {
            index: 0,
            filter: 'All',
        }
    }

    nextButton(numberOfPokemons) {
      console.log(this)
        if (this.state.index < numberOfPokemons.length - 1) {
            this.setState((oldstate, _props) => ({
                index: oldstate.index + 1
            }))
        } else {
            this.setState(() => ({
                index: 0
            }))
        }
    }

    applyFilter(type) {
        this.setState({
          filter: type,
          index: 0,
        })
    }

    fetchFilteredPokemons() {
      const { pokemons } = this.props;
      const { filter} = this.state;
      return pokemons.filter(pokemon => {
        if (filter === 'All') return true;
        return pokemon.type === filter;
      });
    }

    pokemonTypes() {
      const { pokemons } = this.props;
      return pokemons.reduce((acc, curr) => {
        if (acc.includes(curr.type)) {
         return acc;
        }
        return [...acc, curr.type]},[])
    }

    render() {
      const filteredPokemons = this.fetchFilteredPokemons();
      const pokemon = filteredPokemons[this.state.index];
        return (
            <div >
                <div className="pokedex">
                <Pokemon  pokemon={ pokemon } />
                </div>
                <section className='pokedex-buttons-panel'>
                <button
                onClick = {() => this.applyFilter('All')}
                className='filter-button'
                > All
                </button>
                {this.pokemonTypes().map((type) =>
                <button
                onClick={() => this.applyFilter(type)}
                className='filter-button'
                key={type}>
                {type}
                </button>)}
                </section>
                <button
                onClick = {() => this.nextButton(filteredPokemons)}
                disabled={ filteredPokemons.length <= 1 }
                className='pokedex-button'>
                &rarr;
                </button>
            </div>
        );
    }
}

export default Pokedex;