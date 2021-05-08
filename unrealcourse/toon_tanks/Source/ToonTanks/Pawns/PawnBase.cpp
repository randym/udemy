// Fill out your copyright notice in the Description page of Project Settings.

#include "PawnBase.h"
#include "Components/CapsuleComponent.h"
#include "ToonTanks/Actors/ProjectileBase.h"
// Sets default values
APawnBase::APawnBase() {
  // Set this pawn to call Tick() every frame.  You can turn this off to improve
  // performance if you don't need it.
  PrimaryActorTick.bCanEverTick = true;

  CapsuleComp = CreateDefaultSubobject<UCapsuleComponent>(TEXT("Capsule Collider"));
  RootComponent = CapsuleComp;

  BaseMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Base Mesh"));
  BaseMesh->SetupAttachment(RootComponent);

  TurretMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Turret Mesh"));
  TurretMesh->SetupAttachment(BaseMesh);

  ProjectileSpawnPoint = CreateDefaultSubobject<USceneComponent>(TEXT("Projectile Spawn Point"));
  ProjectileSpawnPoint->SetupAttachment(TurretMesh);
}

void APawnBase::RotateTurret(FVector LookAtTarget) {
  FVector LookAtTargetClean = FVector(LookAtTarget.X, LookAtTarget.Y, TurretMesh->GetComponentLocation().Z);
  FVector StartLocation = TurretMesh->GetComponentLocation();

  FRotator TurretRotation = FVector(LookAtTargetClean - StartLocation).Rotation();

  TurretMesh->SetWorldRotation(TurretRotation);
}

void APawnBase::Fire() {
  // Get ProjectileSpawnPoint Location && Rotation -> Spawn Projectile class at location, fire towards rotation.
  if (!ProjectileClass) {
    return;
  }

  FVector SpawnLocation = ProjectileSpawnPoint->GetComponentLocation();
  // pulling rotation off location will spit on the floor if you "look down"
  FRotator SpawnRotation = ProjectileSpawnPoint->GetComponentRotation();

  AProjectileBase* TempProjectile = GetWorld()->SpawnActor<AProjectileBase>(ProjectileClass, SpawnLocation, SpawnRotation);
  // So it doesn't hurt us!
  TempProjectile->SetOwner(this);
}

void APawnBase::HandleDestruction() {
  // --- Universal functionality ---
  // Play death effects (particle, sound, shake)

  // in child classses:
  // -- Pawn Turret - Inform GameMode Turret died -> then destroy() self;

  // -- Pawn Tank - Inform GameMode Player died -> then Hide() all components && stop movement input
}
