// Fill out your copyright notice in the Description page of Project Settings.

#include "PawnTurret.h"
#include "Kismet/GameplayStatics.h"
#include "PawnTank.h"

APawnTurret::APawnTurret() {}

// Called when the game starts or when spawned
void APawnTurret::BeginPlay() {
  Super::BeginPlay();

  PlayerPawn = Cast<APawnTank>(UGameplayStatics::GetPlayerPawn(this, 0));

  GetWorld()->GetTimerManager().SetTimer(FireRateTimerHandle, this, &APawnTurret::CheckFireCondition, FireRate, true);
}

// Called every frame
void APawnTurret::Tick(float DeltaTime) {
  Super::Tick(DeltaTime);

  if (!PlayerPawn || ReturnDistanceToPlayer() > FireRange) {
    return;
  }

  RotateTurret(PlayerPawn->GetActorLocation());
}

float APawnTurret::ReturnDistanceToPlayer() {
  // TODO- check if player is dead
  if (!PlayerPawn) {
    return 0;
  }

  return FVector::Dist(PlayerPawn->GetActorLocation(), GetActorLocation());
}

void APawnTurret::CheckFireCondition() {
  // TODO- check if player is dead
  if (!PlayerPawn) {
    return;
  }

  if (ReturnDistanceToPlayer() > FireRange) {
    return;
  }
  // if Player == null || is Dead
  //   - return

  Fire();
}
void APawnTurret::HandleDestruction() {
  Super::HandleDestruction();
  Destroy();
}