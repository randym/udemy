// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "PawnBase.h"
#include "PawnTank.generated.h"

class USpringArmComponent;
class UCameraComponent;

UCLASS()
class TOONTANKS_API APawnTank : public APawnBase {
  GENERATED_BODY()

 private:
  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  USpringArmComponent* SpringArm;

  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UCameraComponent* Camera;

  FVector MoveDirection;
  FQuat RotationDirection;
  APlayerController* PlayerControllerRef;
  bool bIsPlayerAlive = true;

  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Movement", meta = (AllowPrivateAccess = "true"))
  float MoveSpeed = 100.f;

  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Movement", meta = (AllowPrivateAccess = "true"))
  float TurnSpeed = 100.f;

  void CalculateMoveInput(float Value);
  void CalculateRotateInput(float Value);

  void Move();
  void Rotate();
  void Hide();

 public:
  APawnTank();

  // Called every frame
  virtual void Tick(float DeltaTime) override;

  virtual void HandleDestruction() override;
  virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

  bool GetIsPlayerAlive();

 protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;
};
