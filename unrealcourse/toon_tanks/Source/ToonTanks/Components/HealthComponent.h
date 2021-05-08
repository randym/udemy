// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "HealthComponent.generated.h"

class ATankGameModeBase;

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class TOONTANKS_API UHealthComponent : public UActorComponent {
  GENERATED_BODY()

 private:
  UPROPERTY(EditAnywhere)
  float DefaultHealth = 100.f;
  float Health = 0.f;
  ATankGameModeBase* GameModeRef;

  bool IsDead();

 public:
  // Sets default values for this actor's properties
  UHealthComponent();

 protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;

  UFUNCTION()
  void TakeDamage(AActor* DamagedActor, float Damage, const UDamageType* DamageType, AController* InstigatedBy, AActor* DamageCauser);
};
