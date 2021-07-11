# 03_BullCowGame

note - LightmassImportanceVolume missing
Ignore it

Fixing Intellisense:

- dont bother -

# TODO

## _Explore Resource Loading_

#include "Misc/FileHelper.h"
#include "Misc/Paths.h"

TArray<FString> Words;
const FString WordListPath = FPaths::ProjectContentDir();
FFileHelper::LoadFileToStringArray(Words, \*WordListPath);

**note**
Unreal requres that you add a folder under Content with your assets and then
add then configure the unreal project via edit -> project settings, search for Additional Non-Asset Directories to add the new folder to your project.

This will likely bork your mac and you will need to restart UnrealEditor as it force captures focus....
