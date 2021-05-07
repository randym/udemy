// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "Components/ActorComponent.h"
#include "Components/AudioComponent.h"
#include "Components/PrimitiveComponent.h"
#include "CoreMinimal.h"
#include "Engine/TriggerVolume.h"
#include "Engine/World.h"
#include "GameFramework/Actor.h"
#include "GameFramework/PlayerController.h"
#include "OpenDoor.generated.h"
#define OUT
UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class BUILDING_ESCAPE_API UOpenDoor : public UActorComponent {
  GENERATED_BODY()

 public:
  // Sets default values for this component's properties
  UOpenDoor();

 protected:
  // Called when the game starts
  virtual void BeginPlay() override;

 public:
  // Called every frame
  virtual void TickComponent(
      float DeltaTime, ELevelTick TickType,
      FActorComponentTickFunction *ThisTickFunction) override;

 private:
  void SwingTo(float Yaw, float Speed) const;
  float TotalMassOfActors() const;
  void FindAudioComponent();
  void FindPressurePlate() const;
  void Open();
  void Close();
  float Now() const;

  float DeltaTimeCache = 0.f;
  float ClosedAngle = 0.f;
  float OpenedAt = 0.f;

  UPROPERTY() UAudioComponent *AudioComponent = nullptr;

  UPROPERTY(EditAnywhere)
  ATriggerVolume *PressurePlate = nullptr;

  UPROPERTY(EditAnywhere)
  float OpenedAngle = -90.f;

  UPROPERTY(EditAnywhere)
  float OpenSpeed = 2.f;

  UPROPERTY(EditAnywhere)
  float CloseSpeed = 2.f;

  UPROPERTY(EditAnywhere)
  float CloseDelay = 0.5;

  UPROPERTY(EditAnywhere)
  float MassToOpen = 50.f;
};
