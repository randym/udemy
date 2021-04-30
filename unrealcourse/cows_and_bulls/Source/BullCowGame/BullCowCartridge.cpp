// Fill out your copyright notice in the Description page of Project Settings.
#include "BullCowCartridge.h"

void UBullCowCartridge::BeginPlay() // When the game starts
{
    Super::BeginPlay();
    PrintLine(Intro); 
    PrintLine(StartPrompt); 
}

void UBullCowCartridge::OnInput(const FString& Input) // When the player hits enter
{
    ClearScreen();

    if(isGameActive == false) {
        Input == "Y" ? UBullCowCartridge::StartNewGame() : PrintLine(StartPrompt); 
        return;
    } 

    UBullCowCartridge::HandleGuess(Input);
}


void UBullCowCartridge::StartNewGame()
{
    PrintLine(Instruction);
    PrintLine(Guess);
    PrintLine("");
    PrintLine(Motivate); 


    UBullCowCartridge::SelectIsogram();
    Lives = HiddenWord.Len();

    UBullCowCartridge::ShowLives();
    isGameActive = true;

    Cows = 0;
    Bulls = 0;
}

void UBullCowCartridge::TryAgain() const
{
    PrintLine(Demotivate);
    PrintLine(Failure);
    UBullCowCartridge::ShowLives();
    PrintLine(Guess);
    UBullCowCartridge::ShowHint();
}


void UBullCowCartridge::EndGame(const bool isWon)
{
    isGameActive = false;

    isWon ? PrintLine(YouWin) : PrintLine(YouLose);

    PrintLine(TEXT("The isogram was %s"), *HiddenWord);
    PrintLine("");
    PrintLine(StartPrompt);
}

void UBullCowCartridge::SelectIsogram() {
    HiddenWord = TEXT("surge");
}

bool UBullCowCartridge::IsIsogram(const FString& Word) const
{
  for(int i = 0; i < Word.Len(); i++)
  {
    const char letter = Word[i];
    for(int j = i + 1; j < Word.Len(); j++) {
      if(Word[j] == letter) {
          return false;
      }
    }
  }

  return true;
}

void UBullCowCartridge::HandleGuess(const FString& UserGuess) {
    if(UserGuess.ToLower() == HiddenWord.ToLower()) {
        UBullCowCartridge::EndGame(true);
        return;
    }

    bool isSameLength = UserGuess.Len() == HiddenWord.Len();
    bool isIsogram = UBullCowCartridge::IsIsogram(UserGuess);

    if(--Lives == 0) {
        UBullCowCartridge::EndGame(false);
        return;
    }

    UBullCowCartridge::TryAgain();
}

void UBullCowCartridge::ShowHint() const
{
    PrintLine(TEXT("(hint: %i letters long)"), HiddenWord.Len());
}

void UBullCowCartridge::ShowLives() const
{
    PrintLine(TEXT("You only have %i lives!"), Lives);
}

