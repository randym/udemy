// Fill out your copyright notice in the Description page of Project Settings.

#include "ProjectileBase.h"
#include "GameFramework/ProjectileMovementComponent.h"
#include "Kismet/GameplayStatics.h"
#include "Particles/ParticleSystemComponent.h"
#include "Components/StaticMeshComponent.h"

// Sets default values
AProjectileBase::AProjectileBase() {
  // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
  PrimaryActorTick.bCanEverTick = false;

  ProjectileMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Projectile Mesh"));

  RootComponent = ProjectileMesh;

  ProjectileMovement = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("Projectile Movement"));
  ProjectileMovement->InitialSpeed = Velocity;
  ProjectileMovement->MaxSpeed = Velocity;

  ParticleTrail = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("Partile Trail"));
  ParticleTrail->SetupAttachment(RootComponent);

  InitialLifeSpan = 3.0f;
}

// Called when the game starts or when spawned
void AProjectileBase::BeginPlay() {
  Super::BeginPlay();
  ProjectileMesh->OnComponentHit.AddDynamic(this, &AProjectileBase::OnHit);
  UGameplayStatics::PlaySoundAtLocation(this, LaunchSound, GetActorLocation());
  GetWorld()->GetFirstPlayerController()->ClientStartCameraShake(HitShake);
}

void AProjectileBase::OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, FVector NormalImpulse, const FHitResult& Hit) {
  AActor* MyOwner = GetOwner();
  if (!MyOwner || !OtherActor || OtherActor == this || OtherActor == MyOwner) {
    return;
  }

  UGameplayStatics::ApplyDamage(OtherActor, Damage, MyOwner->GetInstigatorController(), this, DamageType);
  UGameplayStatics::SpawnEmitterAtLocation(this, HitParticle, GetActorLocation());
  UGameplayStatics::PlaySoundAtLocation(this, HitSound, GetActorLocation());
  GetWorld()->GetFirstPlayerController()->ClientStartCameraShake(HitShake);
  Destroy();
}