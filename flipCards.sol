//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 < 0.9.0;

contract flipCards{
    ///@dev owner is intended to be superuser 
    address public owner;
    
    ///@dev dealer is intended to be an administrator
    address public dealer;
    
    ///@dev this state variable holds the higest scorer for the game, ever 
    address public allTimeHighScorePlayer;
    
    ///@dev this state variable holds the higest score for the game, ever 
    uint256 public allTimeHighScore;
    
    //@dev this mapping holds the highScore for each user
    mapping (address => uint256) public usersScores;
    
    
    // Constructor code is only run when the contract
    // is created
    constructor() {
        owner = msg.sender;
        dealer = msg.sender;
        allTimeHighScore = 0;
    }
    
  /*
  
  A game consists of:
        an owner
            [ original sender]
        a dealer
            [ owner-appointed user //an admin role ]
        a player
            [   
                address
                high score
                decks owned 
            
            ]
        game instance state
            [
                player 
                game board size //# of cards in play //or the number of pairs
                cards in-play 
                card locations  //must be internal and not accessible to the public
                score
                consecuitive match count
                
                
            ]
        a number of cards
            each card has exactly one other like it 
        a configuration of cards 
        a number of possible events
            choose a pair of cards
            your end score is greater than your high score
            your high score is greater than anyone's high score
        an event's consequence
            a match = + n points
            an N consecuitive match = N*N-1(n points) + n points
                //if n = 100, 1N=100, 2N=300, 3N=700, 4N=1300, etc... (as an example)
            high score = + M bonus points
            high score > anyone's high score = + P bonus points 
        a score
            current user's score
            current user's high score
            the game's highest score ever 
            the game's highest scor ever user name
        a number of tries
            to get a match before you lose a life 
            to lose lives before game is over 
            to solve the board?
            
        
        a verdict 
            action's verdict
                match, no match
            game's verdict
                in-progress
                lose
                win
                
Maybe the dealer/admin has the ability to issue time-limited points bonuses
Maybe high scores release tokens to the user?
Maybe users can pay the contract by:
    writing to the blockchain (highschore/name)
    paying a tip to the dealer  //may require dealer persona
    buying access to new card decks
  
  */
    
  
  

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    
    
    
}
