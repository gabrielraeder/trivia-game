import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from '../App'
import mockQuestions from "./helpers/mockQuestions";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const mockTokenResponse = {
  "response_code": 0,
  "response_message": "Token Generated Successfully!",
  "token": "59f6d24cb72b5785960e88ede62a65f89fd9d1ed52a63042cf500195af03f990"
  }

describe('Login page tests', () => {
  it('renders all components', () => {
    renderWithRouterAndRedux(<App />);

    // const logo = screen.getByAltText('logo');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const loginBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    // expect(logo).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  })

  it('validates inputs and tests play button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestions).mockResolvedValueOnce(mockTokenResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const loginBtn = screen.getByTestId('btn-play');

    expect(loginBtn).toBeDisabled();
    userEvent.type(emailInput, 'tryber@trybe.com');
    userEvent.type(nameInput, 'Braddock');
    expect(loginBtn).not.toBeDisabled();

    userEvent.click(loginBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe("/game");
  })
  
  it('tests settings button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);
    expect(history.location.pathname).toBe('/settings');
  })
})