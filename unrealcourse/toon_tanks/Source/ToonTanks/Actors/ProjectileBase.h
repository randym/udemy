// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ProjectileBase.generated.h"

class UProjectileMovementComponent;
class UStaticMeshComponent;
UCLASS()
class TOONTANKS_API AProjectileBase : public AActor {
  GENERATED_BODY()

 private:
  // COMPONENTS
  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UProjectileMovementComponent* ProjectileMovement;

  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UStaticMeshComponent* ProjectileMesh;

  UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
  UParticleSystemComponent* ParticleTrail;

  // VARIABLES

  UPROPERTY(EditDefaultsOnly, Category = "Projectile")
  TSubclassOf<UDamageType> DamageType;

  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Projectile", meta = (AllowPrivateAccess = "true"))
  float Velocity = 1300;

  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Projectile", meta = (AllowPrivateAccess = "true"))
  float Damage = 50;

  UPROPERTY(EditAnywhere, Category = "Effects")
  UParticleSystem* HitParticle;

  UPROPERTY(EditAnywhere, Category = "Effects")
  USoundBase* HitSound;

  UPROPERTY(EditAnywhere, Category = "Effects")
  USoundBase* LaunchSound;

  UPROPERTY(EditAnywhere, Category = "Effects")
  TSubclassOf<UMatineeCameraShake> HitShake;

  // FUNCTIONS
  UFUNCTION()
  void OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, FVector NormalImpulse, const FHitResult& Hit);

 public:
  // Sets default values for this actor's properties
  AProjectileBase();

 protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;
};
