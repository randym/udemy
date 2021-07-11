// Fill out your copyright notice in the Description page of Project Settings.
#include "OpenDoor.h"

// Sets default values for this component's properties
UOpenDoor::UOpenDoor() {
  // Set this component to be initialized when the game starts, and to be ticked
  // every frame.  You can turn these features off to improve performance if you
  // don't need them.
  PrimaryComponentTick.bCanEverTick = true;

  // ...
}

// Called when the game starts
void UOpenDoor::BeginPlay() {
  Super::BeginPlay();

  FRotator Rotator = GetOwner()->GetActorRotation();
  ClosedAngle = Rotator.Yaw;
  OpenedAngle += ClosedAngle;
  FindPressurePlate();
  FindAudioComponent();
}

// Called every frame
void UOpenDoor::TickComponent(float DeltaTime, ELevelTick TickType,
                              FActorComponentTickFunction *ThisTickFunction) {
  Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

  DeltaTimeCache = DeltaTime;
  TotalMassOfActors() >= MassToOpen ? Open() : Close();
}

void UOpenDoor::FindPressurePlate() const {
  if (!PressurePlate) {
    UE_LOG(LogTemp, Error, TEXT("Pressure Plate is not defined on %s!"),
           *GetOwner()->GetName());
  }
}

void UOpenDoor::FindAudioComponent() {
  AudioComponent = GetOwner()->FindComponentByClass<UAudioComponent>();

  if (!AudioComponent) {
    UE_LOG(LogTemp, Error, TEXT("No AudioComponent found on %s"),
           *GetOwner()->GetName());
    return;
  }
}

float UOpenDoor::TotalMassOfActors() const {
  float TotalMass = 0.f;
  if (!PressurePlate) {
    return TotalMass;
  }

  TArray<AActor *> OverlappingActors;
  PressurePlate->GetOverlappingActors(OUT OverlappingActors);

  for (AActor *Actor : OverlappingActors) {
    TotalMass += Actor->FindComponentByClass<UPrimitiveComponent>()->GetMass();
  }

  return TotalMass;
}

float UOpenDoor::Now() const { return GetWorld()->GetTimeSeconds(); }

void UOpenDoor::Open() {
  if (!OpenedAt) {
    AudioComponent->Play();
  }

  SwingTo(OpenedAngle, OpenSpeed);
  OpenedAt = Now();
}

void UOpenDoor::Close() {
  if (Now() - OpenedAt < CloseDelay) {
    return;
  }
  if (OpenedAt) {
    AudioComponent->Play();
  }

  SwingTo(ClosedAngle, CloseSpeed);
  OpenedAt = 0;
}
void UOpenDoor::SwingTo(float Yaw, float Speed) const {
  FRotator Rotator = GetOwner()->GetActorRotation();
  Rotator.Yaw = FMath::FInterpTo(Rotator.Yaw, Yaw, DeltaTimeCache, Speed);

  GetOwner()->SetActorRotation(Rotator);
}
