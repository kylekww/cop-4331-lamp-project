import React, { Component, createContext } from 'react'

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = {
        isHot: false,
        hot: {syntax: '', ui: '', bg: '' },
        new: {syntax: '', ui: '', bg: '' },
    }
    render() {
        return (
            <ThemeContext.Provider value = {{...this.state}} >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider