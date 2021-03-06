// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "PawnBase.generated.h"

class UCapsuleComponent;
class AProjectileBase;
class UHealthComponent;
UCLASS()
class TOONTANKS_API APawnBase : public APawn {
  GENERATED_BODY()

 private:
  // COMPONENTS
  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UCapsuleComponent* CapsuleComp;

  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UStaticMeshComponent* BaseMesh;

  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UStaticMeshComponent* TurretMesh;

  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  USceneComponent* ProjectileSpawnPoint;

  UPROPERTY(VisibleDefaultsOnly, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UHealthComponent* HealthComponent;

  // VARIABLES
  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Projectile Type", meta = (AllowPrivateAccess = "true"))
  TSubclassOf<AProjectileBase> ProjectileClass;

  UPROPERTY(EditAnywhere, Category = "Effects")
  UParticleSystem* DeathParticle;

  UPROPERTY(EditAnywhere, Category = "Effects")
  USoundBase* DeathSound;

  UPROPERTY(EditAnywhere, Category = "Effects")
  TSubclassOf<UMatineeCameraShake> DeathShake;

 public:
  APawnBase();
  // void PawnDestroyed();
  virtual void HandleDestruction();

 protected:
  void RotateTurret(FVector LookAtTarget);
  void Fire();
};
