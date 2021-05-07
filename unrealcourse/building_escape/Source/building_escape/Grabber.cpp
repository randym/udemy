// Fill out your copyright notice in the Description page of Project Settings.
#include "DrawDebugHelpers.h"
#include "Engine/World.h"
#include "Grabber.h"

// Sets default values for this component's properties
UGrabber::UGrabber() {
  // Set this component to be initialized when the game starts, and to be ticked
  // every frame.  You can turn these features off to improve performance if you
  // don't need them.
  PrimaryComponentTick.bCanEverTick = true;
}

void UGrabber::BeginPlay() {
  Super::BeginPlay();

  FindPhysicsHandle();
  BindInputComponent();
}

void UGrabber::TickComponent(float DeltaTime, ELevelTick TickType,
                             FActorComponentTickFunction *ThisTickFunction) {
  Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

  if (!PhysicsHandle) {
    return;
  }

  if (PhysicsHandle->GrabbedComponent) {
    PhysicsHandle->SetTargetLocation(GetReachEnd());
  }
}

void UGrabber::BindInputComponent() {
  InputComponent = GetOwner()->FindComponentByClass<UInputComponent>();

  if (!InputComponent) {
    UE_LOG(LogTemp, Error, TEXT("No InputComponent found on %s"),
           *GetOwner()->GetName());
    return;
  }

  InputComponent->BindAction("Grab", IE_Pressed, this,
                             &UGrabber::GrabComponent);
  InputComponent->BindAction("Grab", IE_Released, this,
                             &UGrabber::ReleaseComponent);
}

void UGrabber::FindPhysicsHandle() {
  PhysicsHandle = GetOwner()->FindComponentByClass<UPhysicsHandleComponent>();

  if (!PhysicsHandle) {
    UE_LOG(LogTemp, Error, TEXT("No PhysicsHandle found on %s"),
           *GetOwner()->GetName());
    return;
  }
}

FVector UGrabber::GetLocation() const {
  return GetPawn()->GetPawnViewLocation();
}

APawn *UGrabber::GetPawn() const {
  return GetWorld()->GetFirstPlayerController()->GetPawn();
}

FVector UGrabber::GetReachEnd() const {
  FRotator Rotator = GetPawn()->GetViewRotation();
  return GetLocation() + Rotator.Vector() * Reach;
}

UPrimitiveComponent *UGrabber::GetHitComponent() const {
  FHitResult Hit;
  FCollisionQueryParams TraceParams(FName(TEXT("")), false, GetOwner());

  GetWorld()->LineTraceSingleByObjectType(
      Hit, GetLocation(), GetReachEnd(),
      FCollisionObjectQueryParams(ECollisionChannel::ECC_PhysicsBody),
      TraceParams);

  return Hit.GetComponent();
}

void UGrabber::GrabComponent() {
  UPrimitiveComponent *Component = GetHitComponent();

  if (!Component || !PhysicsHandle) {
    return;
  }

  PhysicsHandle->GrabComponentAtLocation(Component, NAME_None, GetReachEnd());
}

void UGrabber::ReleaseComponent() {
  if (!PhysicsHandle) {
    return;
  }

  PhysicsHandle->ReleaseComponent();
}

void UGrabber::ShowDebugLine() const {
  DrawDebugLine(GetWorld(), GetLocation(), GetReachEnd(), FColor(0, 255, 0),
                false, 0.f, 0, 5.f);
}
