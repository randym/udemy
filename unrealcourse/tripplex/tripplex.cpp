#include <iostream>
#include <ctime>
void PrintIntroduction()
{
    std::cout << "Making Bank!!\n";
    std::cout << "----------------------\n";
    std::cout << "Well done - you've duplicated enough debit cards to start emptying accounts\n";
    std::cout << "All you need to do now is guess the three number PIN for each card to collect the balance.\n";
    std::cout << "Be careful! if you get it wrong the police will catch you...\n";
    std::cout << std::endl;
}

void PrintQuiz(int PinSum, int PinProduct)
{
    std::cout << "HINT * The PIN number is three single digits.\n";
    std::cout << "HINT * The codes add to " << PinSum << "\n";
    std::cout << "HINT * The codes multiple to " << PinProduct << "\n";
}
int GetPinNumber(int Range) {
  return rand() % Range + Range;
}
int PlayGameAtDifficulty(int GameDifficulty)
{
    int PinA = GetPinNumber(GameDifficulty);
    int PinB = GetPinNumber(GameDifficulty);
    int PinC = GetPinNumber(GameDifficulty);

    const int PinSum = PinA + PinB + PinC;
    const int PinProduct = PinA * PinB * PinC;

    PrintQuiz(PinSum, PinProduct);

    int GuessA, GuessB, GuessC;
    std::cin >> GuessA >> GuessB >> GuessC;

    int GuessSum = GuessA + GuessB + GuessC;
    int GuessProduct = GuessA * GuessB * GuessC;

    if (GuessSum == PinSum && GuessProduct == PinProduct)
    {
        return PinSum + PinProduct;
    }
    else
    {
        return 0;
    }
}

// ##first challenge - What does main do
// it setups up the difficulty boundries
// and then while the difficulty is less than the
// maximum allowed it will repeatedly start a game at
// the current difficulty
// Asssuming you correctly answered, we clear the input buffer
// and *failbit?*, increment the difficulty and start a new round.
// After maxing out difficulty, presumably without error
// it says your a master hacker and exits without error.

// I assume somewere else in the code we exit with a
// non-zero value to indicate your failure

int main()
{
    const int MaxDifficulty = 10, MaxRetry = 3;
    int RetryCount = 0;
    int Difficulty = 2;
    int GameAward = 0, TotalAward = 0;
    char Retry = 'N';

    PrintIntroduction();
    srand(time(NULL));

    while (Difficulty <= MaxDifficulty)
    {
        GameAward = PlayGameAtDifficulty(Difficulty);
        std::cin.clear();  // clears any input error messages
        std::cin.ignore(); // discards the buffer

        if (GameAward)
        {
            std::cout << std::endl;
            std::cout << "Well done - we scored " << GameAward << " fraggle-bucks.\nLet's try the next card\n";
            std::cout << std::endl;
            TotalAward += GameAward;
            Difficulty++;
        }
        else
        {
            if (RetryCount >= MaxRetry)
            {
                std::cout << "Shit... The machine has locked you out.\n";
                std::cout << "Can't you hear the sirens?!!? You might want to start running now.\n";
                return -1;
            }

            std::cout << "Uh-oh... You got it wrong. Try Again? (Y/N)\n";
            std::cin >> Retry;
            std::cin.clear();  // clears any input error messages
            std::cin.ignore(); // discards the buffer


            if(Retry != 'Y') {
                std::cout << "Good choice - Run away with your " << TotalAward << " fraggle-bucks while you can.\n";
                return -1;
            }

            RetryCount++;
        }
    }

    std::cout << "WOW - You're a master hacker!\n";
    std::cout << "You stole " << TotalAward << " fraggle-bucks!\n";
    return 0;
}
