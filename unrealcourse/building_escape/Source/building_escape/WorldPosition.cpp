// Fill out your copyright notice in the Description page of Project Settings.

#include "WorldPosition.h"
#include "GameFramework/Actor.h"

// Sets default values for this component's properties
UWorldPosition::UWorldPosition() {
  // Set this component to be initialized when the game starts, and to be ticked
  // every frame.  You can turn these features off to improve performance if you
  // don't need them.
  PrimaryComponentTick.bCanEverTick = true;

  // ...
}

// Called when the game starts
void UWorldPosition::BeginPlay() {
  Super::BeginPlay();
  /*
    FString Log = TEXT("Hello!");
    FString *PtrLog = &Log;

    int32 Size = PtrLog->Len();

    UE_LOG(LogTemp, Warning, TEXT("%s"), **PtrLog);
    UE_LOG(LogTemp, Warning, TEXT("%i"), Size);
  AActor *Owner = GetOwner();
        FString ObjectName = GetOwner()->GetName();

  UE_LOG(LogTemp, Warning, TEXT("Owner: % s"), *Owner->GetName());
  UE_LOG(LogTemp, Warning, TEXT("Owner: % s"), *ObjectName);
  UE_LOG(LogTemp, Warning, TEXT("Owner: % s"), *GetOwner()->GetName());
        */
  // ...
  AActor *Owner = GetOwner();
  FString Name = Owner->GetName();
  FVector Location = Owner->GetActorLocation();
  UE_LOG(LogTemp, Warning, TEXT("Owner: % s"), *Name);
  UE_LOG(LogTemp, Warning, TEXT("Location: % s"), *Location.ToString());
}

// Called every frame
void UWorldPosition::TickComponent(
    float DeltaTime, ELevelTick TickType,
    FActorComponentTickFunction *ThisTickFunction) {
  Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

  // ...
}
