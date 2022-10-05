import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

const storage = require('../services/helpers');

const initialState = {
    player: {
        name: 'Lucas',
        assertions: 0,
        score: 0,
        gravatarEmail:'tryber@trybe.com'
    }
}

const mockRanking = [
    {
        name: 'Lucas',
        picture: "https://www.gravatar.com/avatar/393c6a21bf6c51d10ec6d25d7b84de6d",
        score: 150,
    },
    {
        name: 'Gabriel',
        picture: "https://www.gravatar.com/avatar/8d599a53ed418b2bdd84e5aa7ccaea7c",
        score: 100,
    }
]

describe('Test ranking page', () => {
    it('Check rating title IDs and home button', () => {
        const { history} = renderWithRouterAndRedux(<App />)
    
        history.push('/ranking')
        const rankingTitleId = screen.getByTestId('ranking-title');
        const homeButtonId = screen.getByTestId('btn-go-home');
    
        expect(rankingTitleId).toBeInTheDocument();
        expect(homeButtonId).toBeInTheDocument();
    
    })
    it('Check if it contains the stings contained in the page', () => {
        const { history } = renderWithRouterAndRedux(<App/>);
        history.push('/ranking');
        
        const picHeader = screen.getByRole('columnheader',{name:/profile picture/i});
        expect(picHeader).toBeInTheDocument();
        const nameHeader = screen.getByRole('columnheader',{name:/nome/i})
        expect(nameHeader).toBeInTheDocument();
        const scoreHeader = screen.getByRole('columnheader',{name:/score/i} )
        expect(scoreHeader).toBeInTheDocument();

        const btnHome = screen.getByRole('button', {
            name:/home/i
        })
        userEvent.click(btnHome)

        expect(history.location.pathname).toBe('/');
    })
    it('Check table content', () => {
        storage.readingRank = jest.fn().mockReturnValue(mockRanking);

        renderWithRouterAndRedux(<App />, initialState, '/ranking');

        const firstName = screen.getByRole('cell', {
            name: /lucas/i
        })
        expect(firstName).toBeInTheDocument();
        const secondName = screen.getByRole('cell', {
            name: /gabriel/i
        })
        expect(secondName).toBeInTheDocument();

        const firstScore = screen.getByRole('cell', {
            name:'150',
        })
        expect(firstScore).toBeInTheDocument();

        const secondScore = screen.getByRole('cell', {
            name:'100',
        })
        expect(secondScore).toBeInTheDocument();

        const urlFirst = 'https://www.gravatar.com/avatar/393c6a21bf6c51d10ec6d25d7b84de6d';
        const firstImage = screen.getAllByAltText(/gravatar profile/i)
        expect(firstImage[0].src).toBe(urlFirst);

        const urlSecond = 'https://www.gravatar.com/avatar/8d599a53ed418b2bdd84e5aa7ccaea7c';
        const secondImage = screen.getAllByAltText(/gravatar profile/i)
        expect(secondImage[1].src).toBe(urlSecond);

    })
})