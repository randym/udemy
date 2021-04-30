// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Console/Cartridge.h"
#include "BullCowCartridge.generated.h"

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class BULLCOWGAME_API UBullCowCartridge : public UCartridge
{
	GENERATED_BODY()

public:
	virtual void BeginPlay() override;
	virtual void OnInput(const FString &Input) override;

	// Your declarations go below!
private:
	void StartNewGame();
	void HandleGuess(const FString &UserGuess);
	void TryAgain() const;
	void EndGame(const bool isWon);
	void SelectIsogram();
	void ShowHint() const;
	void ShowLives() const;
	bool IsIsogram(const FString &Word) const;
	bool isGameActive = false;

	FString HiddenWord;
	int32 Lives, Cows, Bulls;

	const FString Intro = TEXT("Howdy, partner...\nGot a hankering for some cows and bulls?");
	const FString StartPrompt = TEXT("Type 'Y' and hit enter to play.");

	const FString Motivate = TEXT("C'mon now, get a mooooove on");
	const FString Demotivate = TEXT("Aw, fooey!");

	const FString Instruction = TEXT("Try and guess the isogram");

	const FString Failure = TEXT("Looks like you got it wrong hoss.");
	const FString Success = TEXT("Nice one, Cowboy!");

	const FString Guess = TEXT("Type your guess and press Enter");

	const FString YouLose = TEXT("....shot and left for dead...");
	const FString YouWin = TEXT("Nice one, Cowboy. Jangle those spurs!");

	const FString GameOver = TEXT("Game Over");
};
