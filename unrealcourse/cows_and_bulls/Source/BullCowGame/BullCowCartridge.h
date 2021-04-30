// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "Console/Cartridge.h"
#include "CoreMinimal.h"
#include "BullCowCartridge.generated.h"

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class BULLCOWGAME_API UBullCowCartridge : public UCartridge {
  GENERATED_BODY()

 public:
  virtual void BeginPlay() override;
  virtual void OnInput(const FString& PlayerInput) override;

  // Your declarations go below!
 private:
  void LoadWords();
  void ShuffleWords();
  void StartNewGame();
  void SetIsogram();

  void HandleGuess(const FString& UserGuess);
  void TryAgain();
  void Score(const FString& UserGuess);
  void EndGame(const bool isWon);

  void ShowHint() const;
  void ShowLives() const;

  bool isGameActive = false;

  TArray<FString> Words;
  FString HiddenWord;
  int32 Lives = 0, WordIndex = 0;

  const FString CheatCode = TEXT("MOMMY");
  const FString Isograms = TEXT("Isograms/isograms.txt");
  const FString Affirmative = TEXT("Y");
  const FString Intro =
      TEXT("Howdy, partner...\nGot a hankering for some cows and bulls?");
  const FString StartPrompt = TEXT("Type 'Y' and hit enter to play.");

  const FString Motivate = TEXT("C'mon now, get a mooooove on");
  const FString Demotivate = TEXT("Aw, fooey!");

  const FString Instruction = TEXT("Try and guess the isogram");

  const FString Failure = TEXT("Looks like you got it wrong hoss.");

  const FString Guess = TEXT("Type your guess and press Enter");

  const FString YouLose = TEXT("....shot and left for dead...");
  const FString YouWin = TEXT("Nice one, Cowboy. Jangle those spurs!");
};
