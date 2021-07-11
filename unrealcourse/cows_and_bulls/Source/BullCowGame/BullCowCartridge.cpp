// Fill out your copyright notice in the Description page of Project Settings.
#include "BullCowCartridge.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include <ctime>

void UBullCowCartridge::BeginPlay() {
  Super::BeginPlay();
  srand(time(NULL));

  UBullCowCartridge::LoadWords();

  PrintLine(Intro);
  PrintLine(StartPrompt);
}

void UBullCowCartridge::LoadWords() {
  const FString Path = FPaths::ProjectContentDir() / Isograms;

  FFileHelper::LoadFileToStringArray(Words, *Path);
  UBullCowCartridge::ShuffleWords();
}

// HA! 77 shows me that Unreal has its own thing...
// got ahead of my self but yeah -.. this is still
// better as it shuffles once, and then just pulls
// in order instead of doing a random range every time.
// And then in 78 they do the right thing, kinda...
// Still randoming every time but at least they cache
// the culled isograms. Someone tell these people that
// if you dont put garbage in, you wont get garbage out...
void UBullCowCartridge::ShuffleWords() {
  int32 i = Words.Num();

  while (--i) {
    Words.Swap(i, rand() % (i + 1));
  }
}

void UBullCowCartridge::OnInput(const FString &PlayerInput) {
  ClearScreen();

  if (isGameActive) {
    UBullCowCartridge::HandleGuess(PlayerInput);
    return;
  }

  PlayerInput == Affirmative ? UBullCowCartridge::StartNewGame()
                             : PrintLine(StartPrompt);
}

void UBullCowCartridge::StartNewGame() {
  UBullCowCartridge::SetIsogram();
  UBullCowCartridge::ShowLives();
  isGameActive = true;

  PrintLine(Instruction);
  PrintLine(Guess);
  PrintLine("");
  PrintLine(Motivate);
}

void UBullCowCartridge::HandleGuess(const FString &UserGuess) {
  if (UserGuess == CheatCode) {
    PrintLine(TEXT("CHEATER: %s"), *HiddenWord);
    return;
  }

  if (UserGuess.ToLower() == HiddenWord.ToLower()) {
    UBullCowCartridge::EndGame(true);
    return;
  }

  if (--Lives) {
    UBullCowCartridge::Score(UserGuess);
    UBullCowCartridge::TryAgain();
    return;
  }

  UBullCowCartridge::EndGame(false);
}

void UBullCowCartridge::Score(const FString &UserGuess) {
  int32 Bulls = 0;
  int32 Cows = 0;
  int32 i = 0;

  TArray<char16_t> Completion;

  for (; i < UserGuess.Len() && i < HiddenWord.Len(); i++) {
    if (UserGuess[i] == HiddenWord[i]) {
      Completion.Emplace(UserGuess[i]);
      Bulls++;
      continue;
    }

    Completion.Emplace('_');
    HiddenWord.Find(&UserGuess[i]) != -1 && Cows++;
  }
  PrintLine(TEXT("You said: %s"), *UserGuess);
  PrintLine(TEXT("HANGMAN: %s"), *FString(Completion));
  PrintLine(TEXT("You have %i Bulls, and %i Cows"), Bulls, Cows);
}

void UBullCowCartridge::TryAgain() {
  UBullCowCartridge::ShowLives();
  PrintLine(Demotivate);
  PrintLine(Failure);
  PrintLine(Guess);
  UBullCowCartridge::ShowHint();
}

void UBullCowCartridge::EndGame(const bool isWon) {
  isGameActive = false;

  isWon ? PrintLine(YouWin) : PrintLine(YouLose);

  PrintLine(TEXT("The isogram was %s"), *HiddenWord);
  PrintLine("");
  PrintLine(StartPrompt);
}

void UBullCowCartridge::SetIsogram() {
  // HiddenWord = Words[FMath::RandRange(0, Words.Num() - 1)]; -- erm ... no ...
  HiddenWord = Words[WordIndex++];
  Lives = HiddenWord.Len();
}

void UBullCowCartridge::ShowHint() const {
  PrintLine(TEXT("(hint: %i letters long)"), HiddenWord.Len());
}

void UBullCowCartridge::ShowLives() const {
  PrintLine(TEXT("Lives Remaining: %i"), Lives);
}
