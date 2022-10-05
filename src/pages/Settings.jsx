import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategoryAction, chosenSettingsAction } from '../store/actions';

class Settings extends Component {
  state = {
    categorySelected: '',
    difficultySelected: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoryAction());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(chosenSettingsAction(this.state));
    history.push('/');
  };

  render() {
    const { categorySelected, difficultySelected } = this.state;
    const { categorys } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="category">
          Categoria:
          <br />
          <select
            name="categorySelected"
            id="category"
            value={ categorySelected }
            onChange={ this.handleChange }
          >
            { categorys.map((category) => (
              <option key={ category.id } value={ category.id }>{category.name}</option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="difficulty">
          Dificuldade:
          <br />
          <select
            name="difficultySelected"
            id="difficulty"
            value={ difficultySelected }
            onChange={ this.handleChange }
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Dificil</option>
          </select>
        </label>
        <br />
        <br />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Salvar
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  categorys: settings.categorys,
});

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categorys: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Settings);
