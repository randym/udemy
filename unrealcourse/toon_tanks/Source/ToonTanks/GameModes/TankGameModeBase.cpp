// Fill out your copyright notice in the Description page of Project Settings.

#include "TankGameModeBase.h"
#include "ToonTanks/Pawns/PawnTank.h"
#include "ToonTanks/Pawns/PawnTurret.h"
#include "Kismet/GameplayStatics.h"
#include "ToonTanks/PlayerControllers/PlayerControllerBase.h"

// Called when the game starts or when spawned
void ATankGameModeBase::BeginPlay() {
  Super::BeginPlay();
  HandleGameStart();
}

void ATankGameModeBase::HandleGameStart() {
  TargetTurrets = GetTargetCount();
  PlayerTank = Cast<APawnTank>(UGameplayStatics::GetPlayerPawn(this, 0));
  PlayerControllerRef = Cast<APlayerControllerBase>(UGameplayStatics::GetPlayerController(this, 0));

  GameStart();
  if (PlayerControllerRef) {
    PlayerControllerRef->SetPlayerEnabledState(false);
    FTimerHandle PlayerEnableHandle;
    FTimerDelegate PlayerEnableDelegate = FTimerDelegate::CreateUObject(PlayerControllerRef, &APlayerControllerBase::SetPlayerEnabledState, true);
    UE_LOG(LogTemp, Warning, TEXT("WHAAAT?"));
    GetWorld()->GetTimerManager().SetTimer(PlayerEnableHandle, PlayerEnableDelegate, StartDelay, false);
  }

  // start countdown, activate turrets pawn check, etc
  // Call Blueprint version GameStart()
}

int32 ATankGameModeBase::GetTargetCount() {
  TArray<AActor*> TurretActors;
  UGameplayStatics::GetAllActorsOfClass(GetWorld(), APawnTurret::StaticClass(), TurretActors);
  return TurretActors.Num();
}
void ATankGameModeBase::HandleGameOver(bool PlayerWon) {
  // player won ? show win : show lose
  // BP GameOver(bool)

  GameOver(PlayerWon);
}

void ATankGameModeBase::ActorDied(AActor* DeadActor) {
  if (!DeadActor || !PlayerTank) {
    return;
  }

  if (DeadActor == PlayerTank) {
    PlayerTank->HandleDestruction();
    HandleGameOver(false);
    if (PlayerControllerRef) {
      PlayerControllerRef->SetPlayerEnabledState(false);
    }
    return;
  }

  if (APawnTurret* DeadTurret = Cast<APawnTurret>(DeadActor)) {
    DeadTurret->HandleDestruction();
  }

  if (--TargetTurrets <= 0) {
    HandleGameOver(true);
  }
}