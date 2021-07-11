// Fill out your copyright notice in the Description page of Project Settings.

#include "HealthComponent.h"
#include "ToonTanks/GameModes/TankGameMOdeBase.h"
#include "Kismet/GameplayStatics.h"

// Sets default values
UHealthComponent::UHealthComponent() {
}

// Called when the game starts or when spawned
void UHealthComponent::BeginPlay() {
  Super::BeginPlay();
  Health = DefaultHealth;
  GameModeRef = Cast<ATankGameModeBase>(UGameplayStatics::GetGameMode(GetWorld()));
  GetOwner()->OnTakeAnyDamage.AddDynamic(this, &UHealthComponent::TakeDamage);
}
bool UHealthComponent::IsDead() {
  return Health <= 0;
}
void UHealthComponent::TakeDamage(AActor* DamagedActor, float Damage, const UDamageType* DamageType, AController* InstigatedBy, AActor* DamageCauser) {
  if (!Damage || !GameModeRef || IsDead()) {
    return;
  }

  Health = FMath::Clamp(Health - Damage, 0.f, DefaultHealth);

  if (IsDead()) {
    GameModeRef->ActorDied(DamagedActor);
  }
}
