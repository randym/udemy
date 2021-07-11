// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "Components/InputComponent.h"
#include "Components/PrimitiveComponent.h"
#include "Components/SceneComponent.h"
#include "CoreMinimal.h"
#include "PhysicsEngine/PhysicsHandleComponent.h"
#include "Grabber.generated.h"

#define OUT

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class BUILDING_ESCAPE_API UGrabber : public USceneComponent {
  GENERATED_BODY()

 public:
  // Sets default values for this component's properties
  UGrabber();

  virtual void TickComponent(
      float DeltaTime, ELevelTick TickType,
      FActorComponentTickFunction *ThisTickFunction) override;

 protected:
  // Called when the game starts
  virtual void BeginPlay() override;

 private:
  UPROPERTY()
  UPhysicsHandleComponent *PhysicsHandle = nullptr;

  UPROPERTY()
  UInputComponent *InputComponent = nullptr;

  void ShowDebugLine() const;  // keeping this around for reference if/when I
                               // need to the same thing later
  APawn *GetPawn() const;
  FVector GetLocation() const;
  FVector GetReachEnd() const;

  void FindPhysicsHandle();
  void BindInputComponent();

  UPrimitiveComponent *GetHitComponent() const;
  void GrabComponent();
  void ReleaseComponent();

  UPROPERTY(EditAnywhere)
  float Reach = 100.f;
};
